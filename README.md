[Octopress](http://octopress.org/) Theme for [k-ui.jp](http://k-ui.jp/)

## Install

```sh
$ cd octopress-home/.theme
$ git clone git://github.com/kui/k-ui-octopress-theme.git kui
$ cd ..
$ rake install["kui"]
$ rake generate
```

## optional

you can add recent tumblr posts.

write tumblr setting on `_config.yml` as below.

```yml
# add "asides/tumblr.html" to default_asides
default_asides: [ asides/tumblr.html, ...
```
```yml
tumblr_user: demo # your domain (demo.tumblr.com -> demo)
tumblr_post_num: 5
```