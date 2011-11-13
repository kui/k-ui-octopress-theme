---
layout: post
comment: true
title: emacsclient の文字化け解決法
---
ふつーの `emacs` で起動しても文字化けしないのに、`emacs --daemon` で emacs サーバを立ち上げて、`emacsclient -t somefile` すると、文字が化けてしまう問題の解決方法。下記を .emacs などに追加する。

{% codeblock lang:lisp %}
;; emacsclient でアクセスした時の文字コード設定
;; バグ: "emacsclient -c" で起動すると実行されない
(add-hook 'server-visit-hook
          (lambda ()
            (set-terminal-coding-system 'utf-8)
            (set-keyboard-coding-system 'utf-8)
            ))
{% endcodeblock %}

### 補足: 上記の問題点など

少し読める人はわかるかもしれないけれど、本来ふつーに書くべき、`(set-terminal-coding-system 'utf-8)` や`(set-terminal-coding-system 'utf-8)` を、emacsclient がサーバに接続したときにもう一度発動するようになっている。どうやら、<strong>表示する端末ごとにこれらの設定が必要</strong>らしい。

しかしながら、上記のコメントにも書いてあるが、`emacsclient -t -c` ファイル指定無しで開くとやはり文字化けが起きてしまう。残念ながらファイル指定無し起動は、適切な hook が無いよう。なので現状はどうしようもないのかな。。。

そもそも、この原因が起きる人は、`emacsclient -t` で、今の端末に emacs を表示する人たちである。しかし、
<ul>
 <li>ファイル名を指定して実行しないといけない</li>
 <li>オプション `-t` を付けないと、現在の端末では開けない</li>
</ul>
っていう仕様から察するに、このemacs サーバ／emacsclient は、母艦となる emacs をサーバ化して、そこでバッファを一元管理しようってのがそもそも意図なんだろうな。

ぐぐっても全然困ってる人がいないので、おかしいなーと思ったのだけれど、そもそもあまり行儀の良い使い方ではなかった様子。
