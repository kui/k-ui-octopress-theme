---
layout: post
comment: true
title: MacOSX の Firefox で、拡張機能 LoL（HaH） の「新しいタブで開く」問題
---
マウスなしでもリンクを辿れる拡張機能 LoL（元祖はHit-a-Hint） にはとてもお世話になってます。
Macbook で Firefox の LoL（HaH, Hit-a-Hint） を使っていると、「新しいタブで開く」って動作が正しく行われない問題に関する対処方法について書きたいと思う。
### 問題：mac Firefox にて LoL, HaH の「新しいタブで開く」が正しく動作しない
Win Firefox の LoL だと、新しいタブでリンクを開くには、
<ol>
<li>スペースキーを押す（押したまま）</li>
<li>目的のリンクにあてられたキーを押す</li>
<li>Ctrl キーを押しつつ、スペースキーを放す</li>
</ol>
とやれば良い。が、どういうわけか、Mac Firefox の LoL で同様のことをしようと
<ol>
<li>スペースキーを押す（押したまま）</li>
<li>目的のリンクにあてられたキーを押す</li>
<li>command キーを押しつつ、スペースキーを放す</li>
</ol>
ってやっても、リンクにフォーカスがあたるだけでリンクを開いてくれない。
仕方が無いので、最後に「command+return を押す」をして、新しいタブを開いている。
これが結構ストレス。

何かいい方法ないかなーってグーグル先生に教えて貰った。（ソースを紛失）どうやら、command キーを押すと、スペースキーの開放を検知出来ない仕様らしい。ブラウザレベルか、OSレベルかはわかりませんが。
### 解決方法：アドオン書き換え
ちょっと面倒ですが、LoL を書き換えましょう。command キーではなく control キーで新しいタブを開くように改造します。
<h4>手順1：LoL をダウンロード</h4>
まず <a href="https://addons.mozilla.org/ja/firefox/addon/8781">LoL ダウンロードページ</a>で、右クリックして「別名でリンク先を保存」してください。
<h4>手順2：xpi ファイルと jar ファイルの展開</h4>
ダウンロードしたファイルは zip で圧縮されているので展開します。
{% codeblock lang:bash %}
$ unzip lol-1.4-fx.xpi 
Archive:  lol-1.4-fx.xpi
   creating: chrome/
  inflating: chrome/LoL.jar          
  inflating: chrome.manifest         
   creating: defaults/
   creating: defaults/preferences/
  inflating: defaults/preferences/prefs.js  
  inflating: install.rdf            
{% endcodeblock %}
さらに、LoL.jar も zip で圧縮されているのでやっぱり展開します。
{% codeblock lang:bash %}
$ cd chrome 
$ unzip LoL.jar 
Archive:  LoL.jar
 extracting: content/bindings.xml    
 extracting: content/settings.css    
 extracting: content/overlay.xul     
 extracting: content/preferences.xul  
 extracting: content/overlay.js      
 extracting: locale/fr-FR/hah.dtd    
 extracting: locale/it-IT/hah.dtd    
 extracting: locale/en-US/hah.dtd    
 extracting: locale/fi-FI/hah.dtd    
 extracting: locale/hu-HU/hah.dtd    
 extracting: skin/icon.png           
{% endcodeblock %}

<h4>手順3：overlay.js 書き換え</h4>
書き換えます。僕は Emacs なので Emacs で。
{% codeblock lang:bash %}
$ emacs content/overlay.js
{% endcodeblock %}
そして、「initmouse」で検索してください。四つくらい見つかるかな？そして
{% codeblock lang:javascript %}
                                  evt.initMouseEvent('mousedown', true, true, view, 1, x+1, y+1, 0, 0,
                                                                         event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, 0, null);
                                  elem.dispatchEvent(evt);

                                  var evt = doc.createEvent('MouseEvents');
                                  evt.initMouseEvent('click', true, true, view, 1, x+1, y+1, 0, 0,
                                                                         event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, 0, null);
{% endcodeblock %}
と initMouseEvent が二回使われていますね。そこの第１３引数に書いてある「metaKey」を「ctrlKey」に置換します。
こうなる。
{% codeblock lang:javascript %}
                                 var evt = doc.createEvent('MouseEvents');
                                  evt.initMouseEvent('mousedown', true, true, view, 1, x+1, y+1, 0, 0,
                                                                         event.ctrlKey, event.altKey, event.shiftKey, event.ctrlKey, 0, null);

elem.dispatchEvent(evt);                                                                                 

                                  var evt = doc.createEvent('MouseEvents');
                                  evt.initMouseEvent('click', true, true, view, 1, x+1, y+1, 0, 0,
                                                                         event.ctrlKey, event.altKey, event.shiftKey, event.ctrlKey, 0, null);
                                  elem.dispatchEvent(evt);
{% endcodeblock %}
<h4>手順4：元の通りに圧縮する</h4>
元の通りに圧縮しましょう。何となく勿体無いので、元の xpi ファイルは取っておき、mylol.xpi というファイルを作っています。
{% codeblock lang:bash %}
$ zip -r LoL.jar content locale skin 
  adding: content/ (stored 0%)
  adding: content/bindings.xml (deflated 78%)
  adding: content/overlay.js (deflated 75%)
  adding: content/overlay.js~ (deflated 75%)
  adding: content/overlay.xul (deflated 65%)
  adding: content/preferences.xul (deflated 74%)
  adding: content/settings.css (deflated 35%)
  adding: locale/ (stored 0%)
  adding: locale/en-US/ (stored 0%)
  adding: locale/en-US/hah.dtd (deflated 54%)
  adding: locale/fi-FI/ (stored 0%)
  adding: locale/fi-FI/hah.dtd (deflated 55%)
  adding: locale/fr-FR/ (stored 0%)
  adding: locale/fr-FR/hah.dtd (deflated 55%)
  adding: locale/hu-HU/ (stored 0%)
  adding: locale/hu-HU/hah.dtd (deflated 54%)
  adding: locale/it-IT/ (stored 0%)
  adding: locale/it-IT/hah.dtd (deflated 54%)
  adding: skin/ (stored 0%)
  adding: skin/icon.png (deflated 0%)
$ cd ..
$ zip -r mylol.xpi chrome/LoL.jar chrome.manifest defaults install.rdf
  adding: chrome/LoL.jar (deflated 23%)
  adding: chrome.manifest (deflated 63%)
  adding: defaults/ (stored 0%)
  adding: defaults/preferences/ (stored 0%)
  adding: defaults/preferences/prefs.js (deflated 60%)
  adding: install.rdf (deflated 63%)
{% endcodeblock %}
<h4>手順5：インストールする</h4>
出来上がった mylol.xpi を、Firefox のウィンドウにドラッグアンドドロップして下さい。
おしまい。
こうすることで、
<ol>
<li>スペースキーを押す（押したまま）</li>
<li>目的のリンクにあてられたキーを押す</li>
<li>control キーを押しつつ、スペースキーを放す</li>
</ol>
とすると、新しいタブを開くことが可能になります。以上おしまい。
