---
layout: post
comment: true
title: "lucene の demo で Could not find the main class: org.apache.lucene.demo.IndexFiles."
---
Luceneを使いたくて、最新のJDKと最新のAntをインストールし、Luceneをコンパイルして、<a href="http://lucene.apache.org/java/3_0_1/demo.html">Apache Lucene - Building and Installing the Basic Demo</a> を参考に demo を動かしてみようとした。、上記のエラーが出た。

{% codeblock lang:bash %}
$ java -version
java version "1.6.0_18"
OpenJDK Runtime Environment (IcedTea6 1.8) (6b18-1.8-0ubuntu1)
OpenJDK Client VM (build 14.0-b16, mixed mode, sharing)

$ ant -version
Apache Ant version 1.8.1 compiled on April 30 2010

$ java org.apache.lucene.demo.IndexFiles src
Exception in thread "main" java.lang.NoClassDefFoundError: org/apache/lucene/demo/IndexFiles
Caused by: java.lang.ClassNotFoundException: org.apache.lucene.demo.IndexFiles
        at java.net.URLClassLoader$1.run(URLClassLoader.java:217)
        at java.security.AccessController.doPrivileged(Native Method)
        at java.net.URLClassLoader.findClass(URLClassLoader.java:205)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:321)
        at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:294)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:266)
        at java.lang.ClassLoader.loadClassInternal(ClassLoader.java:334)
Could not find the main class: org.apache.lucene.demo.IndexFiles. Program will exit.
{% endcodeblock %}

原因は、Luceneをantでビルドしたときに warning が出ていたところあたりにある様子。

lucene-3.0.1のディレクトリにある <strong>build.xml を書き換えないといけない。</strong>build.xml の中の javac タグに属性includeAntRuntimeを書き加える。（220行目付近に一箇所）
{% codeblock lang:xml %}
      <javac
        srcdir="@{srcdir}"
        destdir="@{destdir}"
        deprecation="off"
        includeAntRuntime="true" ← ここだよ！！！
        debug="on"
        source="${javac.source}"
        target="${javac.target}">
        <nested/>
      </javac>
{% endcodeblock %}

これで動くはず。

しかし実際はダメでした。これは別に原因があった。僕は、CLASSPATH に  lucene-core-3.0.1.jar と lucene-demos-3.0.1.jar を置いてなかった為、下記のようなコマンドで demo を実行する必要があった。
{% codeblock lang:bash %}
$ java -cp /home/kui/lucene/lucene-3.0.1/lucene-core-3.0.1.jar:/home/kui/lucene/lucene-3.0.1/lucene-demos-3.0.1.jar  org.apache.lucene.demo.IndexFiles src
{% endcodeblock %}
これで無事 lucene の demo が動きましたとさ。

ちなみに、ダメな時の ant のエラーは下記のようでした。
{% codeblock lang:bash %}
    [javac] /home/k-ui/lucene/lucene-3.0.1/build.xml:225: warning: 'includeantruntime' was not set, defaulting to build.sysclasspath=last; set to false for repeatable builds
{% endcodeblock %}
Java で HelloWorld さえしてない自分には大変な作業でした。半日使ってしまった悲しい。
