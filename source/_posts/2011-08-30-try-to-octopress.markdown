---
layout: post
title: "Octopress 使う"
date: 2011-08-30 00:29
comments: true
categories: [octpress]
---

ちょっと前に
[Hacker News で話題になっていた](http://news.ycombinator.com/item?id=2799081)、
[Octopress](http://octopress.org) というブログシステムをを試す。

## Octopress って？

Octopress は、Markdown 形式で記事を記述するブログシステム。
[Jekyll](http://jekyllrb.com/) という、Ruby ベースの静的 HTML
ファイル生成システムを利用している。なので、記事の更新は、Markdown ファイルから
HTML ファイルへの変換によって実現される。

「コメントとかどうすんの？」と、感じたのだが、これは、[Disqus](http://disqus.com/)
という、システムを用いて javascript によるコメントシステムを実現している。

同様に静的コンテンツを生成するシステムとしては、
Node 製の [Wheat](https://github.com/creationix/wheat), 
Python 製の [hyde](https://github.com/hyde/hyde) がある。しかし、Octopress は 
Jekyll をラップした形をとっているので、上に挙げたシステムよりも多少リッチになっている。

わかりやすくリッチになってる点としてはこんな感じ。

* プラグインによる機能拡張
	* コードの構文ハイライト
	* twitter アカウントのステータス表示
	* facebook, google+, twitter などのソーシャルボタン
	* Disqus によるコメント機能
* デプロイシステム
	* rake コマンドにより HTML 生成、デプロイ、テーマ管理などを実現
* プレビューサーバー
	* Markdown ファイルの更新を検知し即時 HTML ファイルを生成する WEB サーバ

とは言ってもよくわからないので、まず使ってみた。

## 試しに使う

デプロイまで含めたきちんとした方法は、
[Octopress Setup](http://octopress.org/docs/setup/)
と、[Blogging Basics](http://octopress.org/docs/blogging/)
をひと通り実行した感じになるんだけど、**試しに使ってみる** には煩雑。

そこでローカルで動かすことだけに焦点を当てた手順を示す。

* 必要なもの
	* git
    * rvm
    * エディタ

{% codeblock lang:bash %}
$ echo "\nrvm_project_rvmrc=1" >> ~/.rvmrc	# あると今後便利な設定

# Octopress のダウンロード
$ git clone git://github.com/imathis/octopress.git
$ cd octopress		# 直後に下記のメッセージ
  ===============================================================
  = NOTICE:														=
  ===============================================================
  = RVM has encountered a new or modified .rvmrc file in the	=
  = current working directory. Resource files may execute		=
  = arbitrary instructions, so RVM will not use an .rvmrc file	=
  = that has not been explicitly marked as 'trusted.'			=
  =																=
  = Examine the contents of this file carefully to be sure the	=
  = contents are good before trusting it!						=
  =																=
  = You will now be given a chance to read the .rvmrc file		=
  = before deciding whether or not its contents are safe. After =
  = reading the file, you will be prompted 'yes or no' to set	=
  = the trust level for this particular version of the file.	=
  =																=
  = Note: You will be re-prompted each time the .rvmrc file		=
  = changes, and may change the trust setting manually at any	=
  = time.														=
  ===============================================================
  
  (press enter to review the .rvmrc file)
  
  
  rvm 1.9.2
  
  
  Examination of /Users/kui/toybox/octopress/.rvmrc is now complete.
  
  ================================================================
  = Trusting an .rvmrc file means that whenever you cd into this =
  = directory, RVM will run this .rvmrc script in your shell.	 =
  =																 =
  = If the contents of the file change, you will be re-prompted	 =
  = to review the file and adjust its trust settings. You may	 =
  = also change the trust settings manually at any time with	 =
  = the 'rvm rvmrc' command.									 =
  =																 =
  = Now that you have examined the contents of the file, do you	 =
  = wish to trust this particular .rvmrc?						 =
  ================================================================
  
  Yes or No: [y/N]? y # <- ユーザの入力

$ gem install bundler rake	# 依存するパッケージ類のダウンロード
$ bundle install

$ rake install		# デフォルトテーマのインストール

# ---------------
# 別の端末で実行
$ rake preview 
# ブラウザで http://localhost:4000 にアクセスし確認
# ---------------

$ rake new_post["the title of the first post"] # タイトルを引数に与える、日本語非推奨

# 生成された記事ファイルをこんな漢字に編集
$ cat source/_posts/2011-08-26-the-title-of-the-first-post.markdown
---
layout: post
title: "はじめての投稿！"
date: 2011-08-26 00:54
comments: true
categories: 
---
ここから、このように **Markdown** を記述可能です。
これは、[Octopress](http://octopress.org) のテストです。
{% endcodeblock %}

こんな感じ。ブラウザで [localhost:4000](http://localhost:4000) に行ってみましょう。
それっぽいのができているのが確認できる。

`rake preview` した端末には、`source` ディレクトリ以下のファイル操作や、HTTP 通信があると反応がある。

## 注意

* `rake preview` は高い頻度でポート 4000 番を掴んだままゾンビ化する。
	* source ディレクトリ以下の監視機能は死んでる。
	* しかし、Web サーバとして機能はしてるので、コマンド `rake generate` を実行することで、
	HTML ファイルを手動で生成すれば問題ない。
* zsh を使ってると、`rake new_post["title"]` が上手くいかない。
	* `rake new_post\["title"\]` と実行する。

## まとめ

試しに Jekyll ベースのブログシステム Octopress を使ってみた。感想としては、
下記みたいな人は使ってみてもよいかもしれない。

* Jekyll じゃ低機能すぎる
* 好きなエディタでブログ記事編集したい
* コマンドベースの操作に抵抗がない
* github, Markdown が好き

Wheat, hyde もそうなんだけど、github で管理されているのは、静的コンテンツ生成による
ブログシステムは *git pages* と相性がいいからってのもあるのかね。
