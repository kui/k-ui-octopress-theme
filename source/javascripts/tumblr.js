var tumblrLoader;

(function(){

    var API_KEY = "";

    tumblrLoader = function(userId, eleId){
        if(!eleId.match(/^#/)){
            eleId = '#' + eleId;
        }
        render($(eleId)[0]);
    }

    function render(ele){
        var posts = tumblr_api_read.posts;
        var src = '';
        for(var i=0; i<posts.length; i++){
            var post = posts[i];
            src += '<li rel="tumblr-' + post.type + '">';
            src += '<a href="' + post.url + '">' + post.type + '</a>';
            src += ': ' + generateLi(post);
            src += '</li>';
        }
        ele.innerHTML = src;
    }

    function generateLi(post, destEle){
        switch(post.type){
        case "regular":
            return generateRegular(post, destEle);
        case "photo":
            return generatePhoto(post, destEle);
        case "quote":
            return generateQuote(post, destEle);
        case "link":
            return generateLink(post, destEle);
        case "conversation":
            return generateConversation(post, destEle);
        case "video":
            return generateVideo(post, destEle);
        case "audio":
            return generateAudio(post, destEle);
        }
    }

    function generateRegular(post, destEle){
        return post.title;
    }
    function generatePhoto(post, destEle){
        return stripTags(post['photo-caption']) + '<br>' + '<img src="' + post['photo-url-250'] + '" />';
    }
    function generateQuote(post, destEle){
        return post['quote-text'];
    }
    function generateLink(post, destEle){
        return '<a href="' + post.url + '>' + post.name + '</a>';
    }
    function generateConversation(post, destEle){
        return post.conversation;
    }
    function generateVideo(post, destEle){
        return stripTags(post['video-caption']) + '<br>' + post['video-player-250'];
    }
    function generateAudio(post, destEle){
        var div = document.createElement('div');
        div.innerHTML = post['audio-player'];
        var embed = $(div).find('embed');
        embed.attr('src', embed.attr('src').replace("color=FFFFFF","color=CCCCCC"));
        console.log(embed.attr('src'));
        console.log(div.innerHTML);
        return stripTags(post['id3-title']) + '<br>' + div.innerHTML;
    }

    function stripTags(str){
        return str.replace(/<[^>]+>/g, '');
    }
})();
