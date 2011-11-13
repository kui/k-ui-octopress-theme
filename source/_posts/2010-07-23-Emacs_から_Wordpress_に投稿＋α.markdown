---
layout: post
comment: true
title: Emacs から Wordpress に投稿＋α
---
<a href="http://code.google.com/p/wp-emacs/">Emacs から Wordpress に投稿するための Elisp (wp-emacs)</a> があるようなので試してみた。
<ol>
 <li>ファイルのダウンロードし、パスが通っている場所に配置をする。

  <a href="http://wp-emacs.googlecode.com/svn/trunk/">svn の リポジトリ</a> から、下の二つをダウンロードする
  <ul>
   <li><a href="http://wp-emacs.googlecode.com/svn/trunk/weblogger.el">weblogger.el</a></li>
   <li><a href="http://wp-emacs.googlecode.com/svn/trunk/xml-rpc.el">xml-rpc.el</a></li>
  </ul>
 </li>
 <li>.emacs（もしくは .emacs.el）に下記の記述を追加
  {% codeblock lang:lisp %}(require 'weblogger)
  ;; (global-set-key "\C-cbs" 'weblogger-start-entry) ;; C-c b s とタイプすると新規作成{% endcodeblock %}
 </li>
 <li>wordpress の設定を変更

  標準のままだと、XML-RPC が使えない。下記の様に辿り wordpress の設定を変更する。
  <pre>ダッシュボード → 設定（左上辺り？）→ 投稿設定 → XML-RPC の項目にチェックを入れる</pre>
 </li>
 <li>`M-x weblogger-setup-weblog` とタイプし、server-url, user name, password を設定
  server-url は、http://(サーバー名)/(wordpress のトップまでのパス)/xmlrpc/</li>
 <li>`M-x weblogger-start-entry` とタイプすると、新しい記事を作成できる
  
  あるいは、先程の `;; (grobal-setkey ...` をコメントから外すならば、`C-c b s` で新しい記事を作成できる</li>
</ol>

これで基本的な設定はおしまい。ただしこれだと、記事を編集したいだけの時に、具合が良くない。` M-x weblogger-fetch-entries` でできるはずなのだが、ユーザー情報の読み込みが上手くいかない。次の"＋α"で、その他いくつかの問題点を解決している。

### ＋α
`wordpress` で、emacs を立ち上げ wordpress の編集をできるようにするコマンド（正確にはalias）を作る。ついでに `wordpress_new` ってコマンドで新規記事の作成もできるようにする。
上記に書いた以外に、●時々ユーザ設定を正しく読み込まない、●うっかり `C-x C-s` すると記事が公開されてしまう、●起動のたびにパスワードを入力する必要がある、●emacs 立ち上げてから weblogger を立ち上げるの面倒、●weblogger.el が無い環境だと起動に失敗する、といった問題がある。これらの問題を .emacs と .zshrc に数行書き加えて解決する　。

まずは、.emacs の先程書いた２行を下記に置き換える
{% codeblock lang:lisp %}(require 'weblogger nil t) ;; weblogger.el がないときロードしない
(if (featurep 'weblogger) ;; weblogger.el があるときだけ以下を実行する
    (let ()
      ;; (global-set-key "\C-cbs" 'weblogger-start-entry) ;; C-c b s で新規作成

      ;; C-x C-s を記事の保存だけする
      (define-key weblogger-entry-mode-map "\C-x\C-s" 'weblogger-save-entry)

      ;; C-c C-c で記事の保存 → 公開をする。また公開中の記事は、非公開になる。
      (define-key weblogger-entry-mode-map "\C-c\C-c" 'weblogger-publish-entry)

      ;; weblogger-setup-weblog で自動生成されたユーザ情報
      (custom-set-variables
       '(weblogger-config-alist
	 (quote (("default" ;; ここの "default" は、下の起動オプション用関数に使う。人に依っては別の文字で与えてるかもしれない
		  ("user" . "k-ui")
		  ("pass" . "パスワードだよ") ;; "pass" を設定することでパスワードの入力せずに起動できる
		  ("server-url" . "http://k-ui.jp/xmlrpc/")
		  ("weblog" . "1"))
		 ))))

      ;; コマンドからの起動オプション用関数
      (defun kui-weblogger-edit ()
	"Start weblogger-mode"
	(interactive)
	(weblogger-select-configuration "default") ;; "default" 部分は適切な文字に置き換え
	(weblogger-fetch-entries))

      ;; コマンドからの起動オプション用関数
      (defun kui-weblogger-create ()
	"Start weblogger-mode"
	(interactive)
	(weblogger-select-configuration "default") ;; "default" 部分は適切な文字に置き換え
	(weblogger-start-entry)))){% endcodeblock %}

次に .zshrc に下記を追加
{% codeblock lang:bash %}alias wordpress="emacs -f kui-weblogger-edit"
alias wordpress="emacs -f kui-weblogger-create"{% endcodeblock %}

これで、シェルから `wordpress` ってコマンド一発で Wordpress を編集できる状態になる

### 問題点
<ul>
 <li>タグが消える</li>
 <li>保存・公開した時間がおそらく世界標準時になってしまう</li>
 <li>新規作成周りがやっぱり不安定</li>
</ul>
ここまで書いておいてなんだけれど、ちょっとまだ実用的じゃないのかもしれない。
