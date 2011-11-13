---
layout: post
title: "Homebrew 使った ImageMagick のインストールに失敗する"
date: 2011-11-03 01:17
comments: true
categories: [homebrew, imagemagick]
---

この記事書いた時点では、homebrew 使って ImageMagick インストールしようとすると、
下記のエラーが出て困る。

{% codeblock lang:sh %}
$ sudo brew install imagemagick
/usr/local/bin/git
==> Cloning https://github.com/adamv/ImageMagick.git
Cloning into /Library/Caches/Homebrew/imagemagick--git...
fatal: https://github.com/adamv/ImageMagick.git/info/refs not found: did you run git update-server-info on the server?
Error: Failure while executing: git clone --depth 1 https://github.com/adamv/ImageMagick.git /Library/Caches/Homebrew/imagemagick--git
{% endcodeblock %}


### 対処方法

`/usr/local` に移動して、git リポジトリをリセット？すればよいみたい。

[Help to install imagemagick thro homebrew - stackoverflow](http://stackoverflow.com/questions/7053996/help-to-install-imagemagick-thro-homebrew/7407154#7407154)
の Marc L さんのコメントを参考にさせて頂きました。

{% codeblock lang:sh %}
$ cd /usr/local
$ sudo git reset --hard FETCH_HEAD
HEAD is now at 1e8955c Nginx 1.0.9
$ sudo brew install imagemagick
==> Downloading https://github.com/trevor/ImageMagick/tarball/6.7.1-1
######################################################################## 100.0%
==> ./configure --disable-osx-universal-binary --without-perl --prefix=/usr/local/Cellar/imagem
==> make install
==> Caveats
Some tools will complain unless the ghostscript fonts are installed to:
  /usr/local/share/ghostscript/fonts
  ==> Summary
  /usr/local/Cellar/imagemagick/6.7.1-1: 1389 files, 32M, built in 3.7 minutes
{% endcodeblock %}


### 原因

エラーメッセージに書いてあるけれど、`https://github.com/adamv/ImageMagick.git`
が実在しないかららしい。

そもそもここを参照してるのはキャッシュの影響らしく、上記の作業を行い
キャッシュをフラッシュする必要があると言った感じ（？）

参考にしたページに貼られてる対策スクリプトらしきリンクが軒並み消失してるの何なの。
