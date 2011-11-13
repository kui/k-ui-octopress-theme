---
layout: post
comment: true
title: emacsclient の使い方の種類と、便利な使い方
---
前回の記事からわかるように emacsclient にハマっている。前回も軽く触れている通り、emacsclient、emacs サーバ機能には2通りの使い方があると思う。ちなみに前回は、<a href="http://k-ui.jp/?p=204">後者に関しての問題（文字化け）</a>でした。
<ul>
 <li>母艦派： 一つの emacs を立ち上げっぱなし
  <ul>
   <li>→ `M-x server-start` もしくは、.emacs に`(server-start)` でサーバ化</li>
   <li>→ `emacsclient -n filename` でサーバに表示させ、サーバで閲覧編集する</li>
   <li>認識: 母艦でファイル開くときに、ファイルパスを入力する必要がなくなる！</li>
   <li>補足: オプション `-n` がないと、母艦で編集終了の操作 `C-x C-#` されるまで、端末に「ちょっと待っててね！」という旨のメッセージが表示され操作できません。
  </ul>
 </li>
 <li>デーモン派： デーモンとして使う
  <ul>
   <li>`emacs --daemon` でデーモンとして起動</li>
   <li>→ emacsclient -c -t で現在の端末にemacs を表示し、閲覧編集する</li>
   <li>認識: 高速で起動する emacs だ！</li>
  </ul>
 </li>
</ul>

### emacsclient を便利に使いたいとき
emacsclient を便利に使いたいならこんな感じに成るんでしょうかね。
<h4>母艦派</h4>
alias を割り当てるだけ（？）
{% codeblock lang:bash %}
alias e="emacsclient -n"
# alias emacs="emacsclient -n" 
# alias vi="emacsclient -n" # これはどうなの。。。
{% endcodeblock %}

<h4>デーモン派</h4>
こちらは、既存のコマンド `emacs` の置換になるはずなので、少し複雑になります。サーバの立ち上げなどをシームレスに行うための処理が欲しくなりますしね。僕の .zshrc はこんな感じで落ち着きました。
{% codeblock lang:bash %}
## emacsclient をシームレスに使うための関数
## http://k-ui.jp/?p=243
function e(){
    echo "[$0] emacsclient -c -t $*";
    (emacsclient -c -t $* ||
        (echo "[$0] emacs --daemon"; emacs --daemon &&
            (echo "[$0] emacsclient -c -t $*"; emacsclient -c -t $*)) ||
        (echo "[$0] emacs $*"; emacs $*))
}

# ソケットの場所を環境変数に覚えてもらう
# emacs のバージョンによって少し場所が違うようなので、
# *** "/tmp" を要確認 ***
export USER_ID=`id -u`
export EMACS_TMP_DIR="/tmp/emacs$USER_ID"
export EMACS_SOCK="$EMACS_TMP_DIR/server"

## screen emacsclient をシームレスに使うための関数
function se(){
    if which emacsclient &&
        (echo "[$0] ls $EMACS_SOCK "; ls $EMACS_SOCK) ||
        (echo "[$0] emacs --daemon"; emacs --daemon)
    then
        echo "[$0] screen -t emacs emacsclient -t -c $*";
        screen -t emacs emacsclient -t -c $*
    elif which emacs
    then
        echo "[$0] screen emacs -t -c $*";
        screen emacs -t -c $*
    fi

}

##  $EMACS_TMP_DIR が無いとき
if ! [ -d $EMACS_TMP_DIR ]; then

   #（socket 使わないバージョン、毎回emacs--daemonしてる。。。）
    function se(){
        if which emacsclient
        then
            echo "[$0] emacs --daemon"
            emacs --daemon
            echo "[$0] screen -t emacs emacsclient -t -c $*"
            screen -t emacs emacsclient -t -c $*
        elif which emacs
        then
            echo "[$0] screen emacs -t -c $*";
            screen emacs -t -c $*
        fi
    }
fi

{% endcodeblock %}
`emacsclient -n -c` がダメなら、`emacs --daemon` した後、`emacsclient -n -c` しています。screen 使うときはそうもいかないので、デーモンと通信するためのソケットが存在するかどうか確認をするようになっています。コメントにも書いてありますが、<strong>バージョンによってソケットの場所と名前がビミョーに違う</strong>ので、確認したほうが良いかもしれません。

僕はデーモン派なので、母艦派に関する使い方がどう考えても甘いですね。
