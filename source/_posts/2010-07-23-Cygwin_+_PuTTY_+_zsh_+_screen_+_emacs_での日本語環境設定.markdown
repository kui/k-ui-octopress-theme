---
layout: post
comment: true
title: Cygwin + PuTTY + zsh + screen + emacs での日本語環境設定
---
この記事の目的は
<ul>
 <li>cygwin を putty 経由で使う</li>
 <li>シェル（zsh）、emacs、screen で日本語の表示、入力ができる</li>
</ul>
ということをすること。以下簡単に箇条書き。

<ol>
 <li><a href="http://www.cygwin.com/">Cygwin</a> をインストール
  <ul>
   <li>emacs, zsh, screen を install にする</li>
  </ul>
 </li>

 <li><a href="http://yebisuya.dip.jp/Software/PuTTY/">PuTTY ごった煮版</a>をインストール</li>
 
 <li><a href="http://sourceforge.jp/projects/ttssh2/releases/" target="_self">Tera Term</a> のインストーラーから cygterm をインストール</li>
 
 <li>putty で、cygterm 用の設定（セッション）を作成
 <blockquote>PuTTYを起動し、localhost:23にtelnet接続するセッションを1つ作成する。
 端末-&gt;行規則オプション-&gt;ローカルエコー　を"強制的にオフ”
 端末-&gt;行規則オプション-&gt;ローカルラインの編集　を"強制的にオフ"
 端末-&gt;キーボード-&gt;バックスペースキー　を"Control-H"に
 ウインドウ-&gt;変換 で文字コードを"MS_Kanji/Auto-Detect Japanese"に

  <a href="http://blog.tbl.jp/2008/11/cygwincygtermputty.html"><em>PuTTYを使ってCygwinに接続する - ばーぶろぐ /var/blog</em></a>
 </blockquote>
  セッションの名前は「cygterm」にしておく。この名前は、次の cygterm.cfg の編集時に使う。
 </li>
 <li>cygterm の設定をする
  <p>おそらく "C:\Program Files\teraterm" に cygterm.cfg というテキストファイルがあるので、適当なエディタで開く</p>
<pre>
TERM = "C:\Program Files\PuTTY\putty.exe" -load "cygterm" -telnet %s -P %d
TERM_TYPE = xterm
PORT_START = 20000
PORT_RANGE = 40
SHELL = /bin/zsh --login -i
ENV_1 = SHELL=/bin/zsh
</pre>

"TERM = ..." の行の cygterm は、前で設定した PuTTY の Cygwin 用セッション名
 </li>
 <li>
  Windows の環境変数 Path に、"C:\cygwin\bin" を追加
 
  マイコンピュータ → 右クリック → プロパティ → 詳細設定タブ → 環境変数 → システム環境変数 Path を編集
 </li>
	<li>cygtem.exe を実行
「cygwin1.dllが見つかりません」 ってエラーがでたら、先程の環境変数 Path に、"C:\cygwin\bin" があるか確認。もしくは cygwin インストールしたフォルダが、"C:\cygwin" じゃない？
また、別の問題だが、関連して、Windows Vista/7 では zsh が起動時にエラーを吐く。対処方法は、<a href="http://d.hatena.ne.jp/kamuycikap/20100217/1266373298">PuTTYを使ってCygwinに接続する - ばーぶろぐ /var/blog</a> を参考にさせていただいた。</li>
	<li>自宅サーバから、.zshrc, .screenrc, .emacs をダウンロード</li>
	<li>.zshrc を編集
下記のように LANG の値を変更、なければ追加
<pre>export LANG=ja_JP.SJIS</pre>
</li>
	<li>.screenrc を編集
下記のように defencoding の値を変更、もしくは追加
<pre>defencoding SJIS</pre>
</li>
	<li>.emacs を編集
下記の三つの値を設定、もしくは値を変更
<pre>(set-language-environment "Japanese")
(set-terminal-coding-system 'sjis)
(set-keyboard-coding-system 'sjis)</pre>
</li>
</ol>
おわり。日本語表示入力に関してはこれで問題ない。
<h4>参考にさせていただいたページ</h4>
<ul>
	<li><a href="http://blog.tbl.jp/2008/11/cygwincygtermputty.html">ばーぶろぐ /var/blog: PuTTYを使ってCygwinに接続する</a></li>
	<li><a href="http://d.hatena.ne.jp/shuichi_h/20060616">cygwin+screen - shuichi_hの日記</a></li>
</ul>
