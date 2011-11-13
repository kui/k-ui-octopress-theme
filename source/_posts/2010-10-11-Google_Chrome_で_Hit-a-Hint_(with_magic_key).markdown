---
layout: post
comment: true
title: Google Chrome で Hit-a-Hint (with magic key)
---
Google Chrome で Hit-a-Hint (HaH) ライクなキーボードナビゲーション拡張機能 <a href="https://chrome.google.com/extensions/detail/pfcgnkljgjobpkbgcifmpnhglafhkifg?hl=ja">KNavi</a> を作りました。

<a href="https://chrome.google.com/extensions/detail/pfcgnkljgjobpkbgcifmpnhglafhkifg?hl=ja"><img src="http://k-ui.jp/wp-content/uploads/2010/10/2f427aaf949c9269fe4b67bebe5a69e4.png" alt="" title="KNaviPageSS" width="50%" class="alignnone size-full wp-image-281" /></a>

使い方はこんな感じ
<ol>
<li>スペースキーを押す → クリック可能な要素（a 要素など）にヒントが割り当てられる</li>
<li>ヒントと同じキーをタイプする （この間、スペース押しっぱなし）</li>
<li>スペースキーを放す → 該当要素のクリックをエミュレート</li>
</ol>
リンククリックなどをキーボードでなんとかする拡張機能です。その中でも上記のようなプロセスを踏むものを、オリジナルの HaH では magickey と呼んでいました。

こういった <a href="https://chrome.google.com/extensions/search?itemlang=&hl=ja&q=keyboard+navigate">HaH ライクなキーボードナビゲーションシステム</a>は結構たくさんあります腐るほどあります。しかし、Firefox の Hit-a-Hint という拡張機能で実装されていた MagicKey を実現している拡張機能を見たこと無いのでついカッとなって作りました。後悔しています。

ちなみに、MagicKey を用いていない HaH は、
<ol>
<li>スペースキーを押す（すぐに放す） → クリック可能な要素（a 要素など）にヒントが割り当てられる</li>
<li>ヒントをタイプ</li>
<li>ヒントにフォーカスがあたる</li>
<li>エンターキーを押す → クリック相当の挙動をする</li>
</ol>
となり、「どうしてエンターキー押さないといけないの！くぁｗせｄｒｆｔｇｙふじこｌｐ」と感じていました。

マイペースにバグフィックスor機能追加をしたいと思います。下に ToDo のようなものを書いておこう。

どうにかするべき点
<ul>
<li>フレームにヒントが届かない、frameset で構成されたページには無力</li>
<li>一部の環境 background.html が暴走</li>
<li>スクロール可能な要素の外に潜り込んだリンクはキーボードじゃどうしようもない</li>
</ul>
