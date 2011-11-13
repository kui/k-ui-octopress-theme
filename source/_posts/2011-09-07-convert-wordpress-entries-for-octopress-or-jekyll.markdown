# -*- coding: utf-8 -*-
---
layout: post
title: "Wordpress から Octopress(Jekyll) に記事を変換"
date: 2011-09-07 00:01
comments: true
categories: [octopress, wordpress]
---

[melwin\'s gist: 374148 - Gist](https://gist.github.com/374148#file_wp_xml_import.rb)
から、日本語向けにいくつか手を加えたスクリプトを用いて、簡単な引越しをした。

下記がそのスクリプト

{% codeblock file_wp_xml_import.rb lang:ruby %}
# -*- coding: utf-8 -*-
require 'fileutils'
require 'date'
require 'yaml'
require 'uri'
require 'rexml/document'
include REXML

doc = Document.new File.new(ARGV[0])

FileUtils.mkdir_p "_posts"

doc.elements.each("rss/channel/item[wp:status = 'publish' and wp:post_type = 'post']") do |e|
  post = e.elements
  #slug = post['wp:post_name'].text
  slug = post['title'].text
  date = DateTime.parse(post['wp:post_date'].text)
  name = "%02d-%02d-%02d-%s.markdown" % [date.year, date.month, date.day, slug]

  content = post['content:encoded'].text

  content = content.gsub(/<code>(.*?)<\/code>/, '`\1`')

  ## 追加
  content = content.gsub(/<pre lang="([^"]*)">(.*?)<\/pre>/m, '{% codeblock lang:\1 %}\2{% endcodeblock %}')

  (1..3).each do |i|
	content = content.gsub(/<h#{i}>([^<]*)<\/h#{i}>/, ('#'*i) + ' \1')
  end

  puts "Converting: #{name}"

  # data = {
  #	  'layout' => 'blog_post',
  #	  'title' => post['title'].text,
  #	  'excerpt' => post['excerpt:encoded'].text,
  #	  'wordpress_id' => post['wp:post_id'].text,
  #	  'wordpress_url' => post['guid'].text
  # }.delete_if { |k,v| v.nil? || v == ''}.to_yaml
   
  File.open("_posts/#{name}", "w") do |f|
	f.puts "---"
	#f.puts data
	f.puts "layout: post"
	f.puts "comment: true"
	f.puts "title: \"#{post['title'].text}\""
	f.puts "---"
	f.puts content
  end
   
end
{% endcodeblock %}

### 使い方

はじめに Wordpress から記事のエクスポートを行います。これにより手に入った
XML を用いて下記を行います。

{% codeblock lang:sh %}
$ ruby -Ku file_wp_xml_import.rb wordpress.2008-10-01.2011-09-01.xml
$ ls _posts
2008-10-14-Libra_の_siteinfo_を_AutoPagerize_の_wedata_に登録.markdown
2008-10-19-last.fm_のラジオ再生のための_Ruby_ライブラリを作ってみた.markdown
2008-10-21-Fedora_9_に_mpg123_をインストール.markdown
2008-10-26-Ruby_でパイプラインな_HTTP_リクエスト.markdown
2008-12-28-Emacs_キーバインドに関する_Windows_と_Mac_OSX_の差異.markdown
2010-02-21-MacOSX_の_Firefox_で、拡張機能_LoL（HaH）_の「新しいタブで開く」問題.markdown
2010-05-23-lucene_の_demo_で_Could_not_find_the_main_class:_org.apache.lucene.demo.IndexFiles..markdown
2010-07-23-Cygwin_+_PuTTY_+_zsh_+_screen_+_emacs_での日本語環境設定.markdown
2010-07-23-Emacs_から_Wordpress_に投稿＋α.markdown
2010-07-27-emacsclient_の文字化け解決法.markdown
2010-07-28-emacsclient_の使い方の種類と、便利な使い方.markdown
2010-08-19-Mac_を音源とし、無線_LAN_経由のリモートスピーカーで再生.markdown
2010-10-11-Google_Chrome_で_Hit-a-Hint_(with_magic_key).markdown
2010-10-16-Last.FM_ラジオクライアント_Ruby_ライブラリ_-_lastfm12.markdown
2011-06-01-cygterm_使用時、mkgroup,_mkpasswd_しても起動時のエラーが取れない.markdown
2011-07-20-using_eclipse_and_maven_with_wtp.markdown
2011-08-29-mail_コマンドでメール送信.markdown
{% endcodeblock %}
