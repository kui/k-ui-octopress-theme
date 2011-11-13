---
layout: post
title: "DNS コンテンツサーバ NSD を使ってみる"
date: 2011-09-12 23:05
comments: true
categories: [NSD,DNS]
---

DNS サーバ といえば BIND ですが、BIND の複雑怪奇な設定ファイルに納得が行かないので、
BIND 以外の DNS サーバを探していたら [NSD](http://www.nlnetlabs.nl/projects/nsd/)
ってのを見つけた。BIND より軽く、フットプリントも小さいらしい。

Debian lenny の aptitude (apt-get) で手に入る NSD は下記のように、若干古いので
ソースからインストールする。

{% codeblock lang:sh %}
$ aptitude show nsd3
  ...
バージョン: 3.0.7-3.lenny2
  ...
{% endcodeblock %}

### ダウンロード・展開・インストール

[NSD](http://www.nlnetlabs.nl/projects/nsd/) から、最新版をダウンロードし、
展開、コンパイル、インストールする。ちなみに、コンパイルの際、gcc, make,
libssl が必要になるそう。

{% codeblock lang:sh %}
$ wget http://www.nlnetlabs.nl/downloads/nsd/nsd-3.2.8.tar.gz
$ tar zxf nsd-3.2.8.tar.gz
$ cd nsd-3.2.8
$ ./configure --help
$ ./configure # --help を参考にオプションつける
$ make && make install
{% endcodeblock %}

### 設定

`make install` の表示見るとわかるが、`/etc/nsd/nsd.conf.sample` ができてる。
これを参考に `/etc/nsd/nsd.conf` を作成する。`/etc/nsd/nsd.conf.sample` 
でコメントアウトされている値が、初期値となっている。なので、全部初期値でいいなら、
正引き逆引きのゾーンファイルの設定だけでいい。

今回は使ってみるだけなので、ゾーンファイルの設定のみ行う。NSD をインストールした
サーバの IP アドレスは `192.168.1.10` とする。

{% codeblock /etc/nsd/nsd.conf lang:yaml %}
# -*- coding:utf-8 -*-

# 正引きの設定
zone:
	name: hoge.k-ui.jp
	zonefile: hoge.k-ui.jp.zone

# 逆引きの設定
zone:
	name: 1.168.192.in-addr.arpa
	zonefile: 1.168.192.in-addr.arpa.zone
{% endcodeblock %}

それぞれの zone ファイルは BIND のものと同じ形式（RFC 1035 と RFC 1034）で構わない。

#### 正引きゾーンファイル 

`/etc/nsd/hoge.k-ui.jp.zone` に配置する。

{% codeblock /etc/nsd/hoge.k-ui.jp.zone lang:cl %}
; -*- coding:utf-8 -*-
@	IN	SOA	dns.hoge.k-ui.jp.	some-user-name.gmail.com.(
	2011091206	; serial number
	10800	; Refresh
	3600	; Retry
	604800	; Expire
	86400	; Min TTL
)

; name servers
	IN	NS	dns.hoge.k-ui.jp.
	IN	A	192.168.1.100

; hoge servers
svr	IN	A	192.168.1.100
router	IN	A	192.168.1.1
laptop	IN	A	192.168.1.2

; CNAMEs
dns	IN	CNAME	svr
{% endcodeblock %}

#### 逆引きゾーンファイル

`/etc/nsd/1.168.192.in-addr.arpa.zone` に配置する。

{% codeblock /etc/nsd/1.168.192.in-addr.arpa.zone lang:cl %}
; -*- coding:utf-8 -*-
@	IN	SOA	dns.hoge.k-ui.jp.	some-user-name.gmail.com.(
	2011091218	; serial number
	10800	; Refresh
	3600	; Retry
	604800	; Expire
	86400	; Min TTL
)

; name servers
	IN	NS	dns.hoge.k-ui.jp.

; PTRs
2	IN	PTR	laptop.hoge.k-ui.jp.
100	IN	PTR	svr.hoge.k-ui.jp.
{% endcodeblock %}

### 設定ファイルのコンパイル、起動、リロード

{% codeblock lang:sh %}
$ sudo nsdc start	# 起動
$ sudo nsdc stop	# 停止
$ sudo nsdc rebuild	# 設定ファイルのコンパイル
$ sudo nsdc reload	# 設定の反映

# なので、設定ファイル（nsd.conf, zone ファイル）を書き換えたら
$ sudo nsdc rebuild && sudo nsdc reload
{% endcodeblock %}

こんな感じ。

### もし NSD を気に入って、かつ Debian 使ってるなら

OS 起動時に起動できるようにしましょう。

{% codeblock lang:sh %}
$ sudo update-rc.d nsdc defaults 90
$ sudo update-rc.d nsdc start 90 2 3 4 5 .
$ sudo update-rc.d nsdc stop 90 1 6 .

# 起動スクリプトからはずすとき
$ sudo update-rc.d nsdc remove 
{% endcodeblock %}

### BIND と違って

NSD は DNS コンテンツサーバです。DNS コンテンツサーバと、DNS キャッシュサーバ
両方の機能を持つ BIND の完全な代わりにはなりません。

DNS キャッシュサーバとしての機能は、NSD を開発している NLnet Labs が同様に
公開している [Unbound](http://unbound.net/) などを使ってみるのも
いいかもしれませんね。
