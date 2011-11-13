---
layout: post
comment: true
title: Libra の siteinfo を AutoPagerize の wedata に登録
---
<a href="http://wedata.net/items/2838" target="_self">Libra の siteinfo を AutoPagerize の wedata に登録</a>してみた．たぶん Libra 内で対応漏れページがあると思うけれど，とりあえず目立つところと，よく使うページに対応しておいた．wordpress の対応を見てみたいので siteinfo を貼り付けてみる．

<pre>
{
    url:          '^http://libra\.msra\.cn/(IGResult_paper|AuthorResult|authordetail|AuthorDetail|PaperResult|paperresult|ConferenceResult|JournalResult|IGResult|papercited)\.aspx.+',
    nextLink:     'id("pageLst_next")',
    pageElement:  'id("paperRes authorRes confRes jourRes igRes paperList")',
    exampleUrl:   'http://libra.msra.cn/paperresult.aspx?query=association+rules',
}
</pre>
