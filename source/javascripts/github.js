// -*- coding:utf-8 -*-
var github = (function(){
  function render(target, repos){
    var i = 0, fragment = '', t = $(target)[0];

    for(i = 0; i < repos.length; i++) {
      fragment += '<li><a href="'+repos[i].html_url+'">'+repos[i].name+'</a> : '+
        repos[i].description+'</li>';
    }
    t.innerHTML = fragment;
  }
  return {
    showRepos: function(options){
      $.ajax({
        url: "https://api.github.com/users/"+options.user+"/repos?"+
          "type="+options.type+
          "&sort="+options.sort+
          "&direction="+options.direction+
          "&callback=?"
        , type: 'jsonp'
        , error: function (err) {
          $(options.target + ' li.loading').addClass('error')
            .text("読み込み失敗");
        }
        , success: function(data) {
          var repos = [];
          if (!data || !data.data) { return; }
          for (var i = 0; i < options.count; i++) {
            if (options.skip_forks && data.data[i].fork) { continue; }
            repos.push(data.data[i]);
          }
          // repos.sort(function(a, b) {
          //   var aDate = new Date(a.pushed_at).valueOf(),
          //   bDate = new Date(b.pushed_at).valueOf();

          //   if (aDate === bDate) { return 0; }
          //   return aDate > bDate ? -1 : 1;
          // });

          render(options.target, repos);
        }
      });
    }
  };
})();
