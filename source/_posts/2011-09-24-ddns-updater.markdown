---
layout: post
title: "バリュードメインで動的 DNS (DDNS) 更新する init.d スクリプト"
date: 2011-09-24 01:22
comments: true
categories: [coding, shellscript, ddns]
---

ドメイン管理を、[さくらインターネット](http://www.sakura.ne.jp/domain/) から、
[バリュードメイン](http://www.value-domain.com/) に移管しました。

理由としては、いままで外部から自宅サーバーに接続するのに、
[Dynamic Do!.jp](http://ddo.jp/) という、DDNS サービスを利用していたのですが、
せっかくこのドメイン(k-ui.jp)を持っているので、これのサブドメインを使って
自宅サーバーにアクセスしたいと考えたからです。（加えて k-ui.jp に DNS
サーバ立てるより管理が簡潔になりそう。）

ついでに、DDNS アップデートを、cron じゃなくて init.d スクリプトにやらせてみよう
って考えて作ったのがこれ。

[kui/ddns-updater - GitHub](https://github.com/kui/ddns-updater)



### インストール

[バリュードメインの"ダイナミックDDNS機能のご利用方法"](http://www.value-domain.com/howto/?action=ddns)
のステップ 12 まで設定したら
[kui/ddns-updater - GitHub](https://github.com/kui/ddns-updater)
の README.md のように実行をする。`etc/ddns-updater` を編集するときは、
バリュードメインに登録したダイナミック DDNS 更新するためのパスワード等を入力する。



### 使い方

設定が正しいかどうか確認するには、

{% codeblock lang:sh %}
$ sudo /etc/init.d/ddns-updater update
{% endcodeblock %}

と実行し、更新を一度だけ実行してみる。これで問題なければ、ほかの init.d スクリプト同様、
システムを再起動するか、下記を実行すれば良い。

{% codeblock lang:sh %}
$ sudo /etc/init.d/ddns-updater start
{% endcodeblock %}



### init.d スクリプト初めて作ってみたんだけど

「cron だと、システムのセットアップする際に毎回 `crontab -e` で登録しないといけないので
めんどうだースクリプトを配置するだけにしたい」という動機で作りました。

しかし、pid や log の管理が意外と面倒なので、次から init.d スクリプト書くときは、
これの update 部分を書き換えて使いまわそうと思いました。。。しかしそれってやってることが
cron と対して変わらないんだよなーとも。

Debian に限った話をすると `start-stop-daemon` が便利そうなんだけど、Debian でしか
動かせなくなるのが嫌なので使いませんでした。
