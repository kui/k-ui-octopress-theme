---
layout: post
comment: true
title: cygterm 使用時、mkgroup, mkpasswd しても起動時のエラーが取れない
---
<a href="http://k-ui.jp/?p=107">Cygwin + PuTTY + zsh + screen + emacs での日本語環境設定</a> を参考にして、あらたな Windows 環境を整備していたら思いの外苦労したのでメモ。

### 問題
64 bit 版 Windows 7 でかつドメインコントローラ下のアカウントで <a href="http://k-ui.jp/?p=107">Cygwin + PuTTY + zsh + screen + emacs での日本語環境設定</a>をしてみたら、Cygterm 起動時に、以下のようなエラーを吐きながらシェルが立ち上がる。

<pre>
Your group is currently "mkpasswd".  This indicates that
the /etc/passwd (and possibly /etc/group) files should be rebuilt.
See the man pages for mkpasswd and mkgroup then, for example, run
mkpasswd -l [-d] > /etc/passwd
mkgroup  -l [-d] > /etc/group
Note that the -d switch is necessary for domain users.
</pre>

ふむふむ。んじゃー
<pre>$ mkpasswd -l > /etc/passwd
$ mkgroup  -l  > /etc/group</pre>
って実行して cygterm を再起動してみた。
しかし、相も変わらず上記のエラーを吐きつつ立ち上がる。ちなみに、cygterm を複数個同時起動すると、2個目の端末以降は全く問題なく理想通りに動いてくれる

### 原因
コマンド `id` を使って、uid と gid を確認してみてください。おそらく`mkpasswd -l` や `mkgroup -l` に含まれていないような、uid, gid だったりしませんか？直接的にはこれが原因であると考えられます。

そもそもなんでこうなるかはわかりませんが、ドメインコントローラ下のアカウントと cygterm が相性悪いんですかね。

### 対処方法
`/etc/passwd` と `/etc/group` に以下のように書き加える。

まず `/etc/passwd` には下記のように `root...` を書き加える。
<pre>
...
root::0:0:root::
</pre>

次に `/etc/group` には下記のように `root...` を書き加える。
<pre>
...
root::0:root
</pre>

そして cygterm 経由で起動した PuTTY をすべて終了させることで全行程は終了。
