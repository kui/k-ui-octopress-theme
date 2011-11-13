---
layout: post
comment: true
title: Emacs キーバインドに関する Windows と Mac OSX の差異
---
Mac OS X が手元に来て7ヶ月くらい経とうとしてる。そろそろ軽度（！？）Emacs 病を患っている人間から見た Windows と Mac OS X の違いをまとめてみた。

具体的には、Emacs に関わる話としては、

<ul>
<li>Emacs っぽいエディターについて（?）</li>
<li>普段の GUI 操作において、Emacs キーバインドがどのくらい通用するか（?）</li>
</ul>

という話があります。

しかし?って他探せば幾らでも記事あるだろうから、今回は言及しません。。。というかよくわかりません。普段からローカル環境で開発せず、研究室の Linux サーバや、自宅サーバで開発をしているので、ローカル環境でエディター使わない。

今回は?の話を書いて行こうと思います。少し分かりにくいけど、Windows の話を読めば何となく分かるはず。C-p でフォーカスを上に移動させたり、C-m が改行だったり、C-Space がマークセットだったり、M-v で１ページ分スクロールできたり、といった操作を、webブラウザや、ファイラなどでも使うことです。

### Windows

まずそもそも標準では全くサポートされていません。?を実現させる為には、 <a href="http://mayu.sourceforge.net/">窓使いの憂鬱</a>、<a href="http://www.cam.hi-ho.ne.jp/oishi/">Xkeymacs</a>などのソフトウェアが必要になります。以下、Windows 上での Emacs キーバインド環境の特徴。

<ul>
<li>サポートしている Emacs キーバインド多い！マークセットできるのは windows だけ（？）。C-x から始まる２ストロークキーバインドに対応してるのも特徴。</li>
<li>アプリケーションによって、emacsキーバインドを有効にさせるか否かを設定することが可能。ちょうべんり</li>
<li>時々入力キーをフックし損ねて大変なことに（例：C-nでスクロールしようと連打 → フックし損ねまくる → 新規ウィンドウ大量生成 → はんのうがない　ただの　はこ　のようだ）</li>
<li>時々挙動へん。Xkeymacs に限った話ですが、例えば「C-m と入力すると、Ctrl+Return の入力になってる。」とか、「『Shift+Tab』と入力しようと S-C-i とタイプする→Shift キーがロックされて解除できなくなる」など</li>
<li>MS Office と相性悪過ぎ。ごくごくタマに Office 落ちる。</li>
<li>MS IMEと相性悪い。（ので、MS IME の時は無効化し、MS IME 自体のキーバイン変更機能を利用）</li>
</ul>

実は、VISTA になってからの状況がよくわかってません。とりあえず Xkeymacs は、VISTA 上で問題なく使えました。

### Mac OS X

私が知っている限りだと、二通り存在します。

<ul>
<li>標準のemacsキーバインド（ただしテキストエリア限定）</li>
<li><a href="http://www.pqrs.org/tekezo/macosx/keyremap4macbook/index.html.ja">KeyRemap4MacBook</a></li>
</ul>

標準の方も、素晴らしい点があるのですが、テキストエリア限定なのが残念。

KeyRemap4MacBook の特徴を下でまとめます。

<ul>
<li>安定してる。フックし損ねた経験無し。</li>
<li>マークセットできない。。。（標準だと C-i で出来た記憶があるのですが。）</li>
<li>特定ソフトウェアのときは、無効化するという機能がついて入るのですが、無効化できるソフトウェアが予め決まっている。ソースコード書き換えれば可能なようです。iTerm 使えない。</li>
<li>日本語入力システムに対する Emacs キーバインドは、入力対象のソフトウェアに依存してしまう（例：Terminal.app の時だけ Emacs キーバインドを無効化すると、Terminal.app への日本語入力時も無効化されてしまう）。凄く困ってる。</li>
</ul>

最後のは、OS の構造上仕方の無い問題なんでしょうかね。。。

### ついでに Linux（GNOME）

<a href="http://www.eml.ele.cst.nihon-u.ac.jp/~momma/wiki/wiki.cgi/Ubuntu/Gnome%E3%81%A7Emacs%E3%82%AD%E3%83%BC%E3%83%90%E3%82%A4%E3%83%B3%E3%83%89.html">GNOME の標準機能（要設定）</a>、<a href="http://www.geocities.co.jp/SiliconValley-Bay/7584/keyfake/">keyfake</a> の二通り。

GNOME の標準機能は、Mac OS X の標準機能と似た感じ。テキストエリア限定。

keyfake は。。。うごかにあ！フツーにコンパイルしちゃダメなのかな。

### まとめ

Windows、Mac OS X、Linux(GNOME) における Emacs キーバインドの対応状況を確認しました。
<dl>
<dt>Windows</dt>
<dd>不安定だけど多機能、マークセットできる</dd>
<dt>Mac OS X</dt>
<dd>安定してる。日本語入力システム、他アプリケーションとの兼ね合いがうまくいってない</dd>
<dt>Linux(GNOME)<dt>
<dd>が、がんばれ！しかし皮肉ですね。。。</dd>
</dl>

ということで、Windows が一番好きです。

### しかし。。。

xkeymacs, 窓使いの憂鬱、KeyRemap4MacBook、keyfake のいずれも日本人が開発してる。。。？HENTAI！HENTAI！HENTAI！
