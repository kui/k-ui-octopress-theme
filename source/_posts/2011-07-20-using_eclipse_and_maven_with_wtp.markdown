---
layout: post
comment: true
title: eclipse (3.7, indigo) + maven で WTP 使う
---
<p>Eclipse の新しいやつ出ましたね。</p>
<p>ということで、タイトルの通り、Eclipse 3.7 と Maven で WTP 使う。つまり、Servlet の開発をしようぜって話。</p>
<ol>
 <li>Eclipse (Indigo) 用意</li>
 <li>maven プラグイン (m2e, m2e-wtp) インストール</li>
 <li>新規プロジェクト作成</li>
 <li>つくる（説明なし）</li>
</ol>

### Eclipse (indigo) 用意
<p>いろいろありますが、今回は、<a href="http://www.eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/indigo/R/eclipse-jee-indigo-win32.zip">Eclipse IDE for Java EE Developers</a>（<a href="http://www.eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/indigo/R/eclipse-jee-indigo-win32-x86_64.zip">64bit版</a>）を使いました。解凍→起動で次の工程へ。</p>

### maven プラグイン (m2e, m2e-wtp) インストール
<p>Eclipse から maven をお手軽に使えるプラグイン二つをインストールする。m2e だけだと、WTP と連携ができないので m2e-wtp も必要になる。</p>

<h4>m2e インストール</h4>
<p>Eclipse から maven を使うためのプラグイン</p>
<ol>
 <li>メニューで Help → Install New Software... の順にクリック（Install ウィンドウが出てくる。）</li>
 <li>Work with 欄で `Indigo - http://download.eclipse.org/releases/indigo` を選択</li>
 <li>しばし待つ（インストール可能なソフトのカタログをダウンロードしてる）→いろいろでてくる</li>
 <li>直下のフォームに `maven` と入力し、項目を絞る → "m2e - Maven Integration for Eclipse" 選択（二つでるが、どっちでも同じ）（下の画像）</li>
 <li>Install ウィンドウ消えるまで "Next >" ボタン押し続ける → インストール完了</li>
</ol>

<a href="http://k-ui.jp/wp-content/uploads/2011/07/installing_m2e_1.png"><img src="http://k-ui.jp/wp-content/uploads/2011/07/installing_m2e_1.png" alt="Installing m2e" title="Install_m2e" width="700" class="size-full wp-image-335" /></a>

<h4>m2e-wtp インストール</h4>
<p>Eclipse + maven で WTP 使うためのプラグイン。</p>
<ol>
 <li>メニューで Help → Install New Software... の順にクリック（Install ウィンドウが出てくる。）</li>
 <li>Work with 欄の右の "Add" ボタン押す（Add Repository ウィンドウでてくる）</li>
 <li>Location: 欄に `https://repository.sonatype.org/content/repositories/forge-sites/m2eclipse-wtp/0.13.0/S/0.13.0.20110623-0455` 貼りつける。Name: 欄は空で OK → "OK" ボタン押す</li>
 <li><strong>下の "Group items by category" のチェックを外す。</strong>（なんかでてくる）</li>
 <li>"Maven Integraion for WTP (Optional)" にチェックをつける（下の画像）</li>
 <li>Install ウィンドウ消えるまで "Next >" ボタン押し続ける → インストール完了</li>
</ol>
<p>本来なら、WIndow → Preferences → 右カラムの "Maven" → "Discovery" →  右の "Open Catalog" ってたどって、見つけられるはずなんだけど、どうやらバグがあるらしくここのカタログからは省かれているらしい。（ソース: <a href="http://dev.eclipse.org/mhonarc/lists/m2e-users/msg00938.html">[m2e-users] m2e-wtp temporary removed from m2e marketplace catalog</a>）</p>

<a href="http://k-ui.jp/wp-content/uploads/2011/07/installing_m2e_2.png"><img src="http://k-ui.jp/wp-content/uploads/2011/07/installing_m2e_2.png" alt="installing m2e-wtp" title="installing_m2e-wtp" width="700" class="size-full wp-image-336" /></a>

### 新規プロジェクト作成
<p>WTP に則った新たなプロジェクト作成します。</p>
<ol>
 <li>メニューで File → New... とたどる。（New ウィンドウがでてくる）</li>
 <li>Maven → Maven Project を選択し "Next &gt;" ボタン押す</li>
 <li>New Maven project ってウィンドウになるが、ここでは特に設定なく "Next &gt;"</li>
 <li>Filter: 欄に `maven-archetype-w` まで入力 → Artifact Id が maven-archetype-webapp となってるやつだけになる → 選択して "Next &gt;"</li>
 <li>Group Id: 欄は、パッケージ名の親のようなもの、Artifact Id: 欄は、パッケージ名の一番子要素になる。（Pakage: 欄みるとそんな感じ）。二つ入力して "Finish" ボタン</li>
 <li>Project Explorer に新たなプロジェクトができる。</li>
 <li><strong>作成されたプロジェクトの Java Resources に "src/main/java" って Source Folder 作成。</strong>ここに HttpServlet クラスなどを配置します。</li>
 <li>"Run As" に "Run on Server" があることを確認できれば成功です。</li>
</ol>
<p>"src/main/java" をはじめから作成しないのにはポリシーがあってそうしてるらしいです。（ソース紛失）</p>

### 以上です
<p>あとはフツーにウェブサーブレットの作成が可能になっています。ソースは "src/main/java" に、コンテキストルート？は Deployed Resource がそれになっています。</p>
<p><strong>赤字</strong>で書いたところでハマってしまって辛かった。。。</p>
