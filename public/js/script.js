var TC = TC || {}; // my initials; namespace for my js code

//mathiasbynens.be/notes/async-analytics-snippet Change UA-XXXXX-X to be your site's ID 
var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
s.parentNode.insertBefore(g,s)}(document,'script'));

(function ($) {
  var image = $('.image');
  
  // don't init gallery if it consists of a single photo
  if (image.length > 1) {
    // wrap images
    image.wrapAll("<div id='image-wrapper'><div id='image-holder'></div></div>");
    image.show();
    
    // init gallery: Gallery.init(imageHolder, imageWrapperWidth, imageCountHolder, nextButton, prevButton)
    Gallery.init($("#image-holder"), 560, $("p#gallery-count").children("span")[0], $("a#next-image"), $("a#previous-image"));
  } else {
    // hide gallery count and navigation
    $("p#gallery-count, div#gallery-navigation").hide();
    // show project navigation
    $("p#project-count").show();
  }
  
  $(function(){
    TC.setup_twitter();
    if (!UnderScore.isUndefined(TC.twitter)) {
      TC.setup_twitter();
      UnderScore.delay(TC.ensure_twitter_setup,100);
    }
  });
  
  TC.ensure_twitter_setup = function() {
    if (!TC.twitter_setup_complete) {
      TC.twitter_anywhere();
    }
  }

  TC.setup_twitter = function() {
    TC.twitter.script_src_tag_written = false;
    TC.twitter_setup_complete = false;
    TC.setup_twitter_anywhere_script();
  }

  TC.twitter_anywhere = function() {
    if (TC.twitter_anywhere_script_test()) {
      TC.twitter_setup_complete = true;
      TC.twitter.status_template = '<tr class="status"><td class="avatar"><img alt="{{screenName}}" src="{{image_url}}"/></td><td class="screen_name">@{{screenName}}</td><td class="status">{{text}}</td></tr>';
      TC.twitter.status_simple_template = '<tr class="status"><td class="status">{{text}}<span class="timestamp">{{timestamp}}</span></td></tr>';

      $("#timeline .busy:hidden").show();
      twttr.anywhere(function (T) {
        if($("#timeline").length>0) {
          T.User.find(TC.twitter.handle).timeline().each(function(status) {
            $("table#timeline.caption_rounded_bottom").removeClass("caption_rounded_bottom");
            $("#timeline .busy:visible").hide();
            $("#timeline").append(
              Mustache.to_html(TC.twitter.status_simple_template, {
                text: status.text,
                timestamp: status.createdAt
              })
            );
            $("#timeline .timestamp:last").prettyDate();
            T("#timeline td.status").hovercards();
          });
          UnderScore.delay(TC.fix_webkit_captions,500);
        }
        T.hovercards();
        T("#follow-placeholder").followButton(TC.twitter.handle);
      });
    } else {
      UnderScore.delay(TC.ensure_twitter_setup,100);
    }
  }

  TC.setup_twitter_anywhere_script = function() {
    if (!TC.twitter_anywhere_script_test()) {
      if (!TC.twitter.script_src_tag_written) {
        $("head").append(
          '<script src="http://platform.twitter.com/anywhere.js?id='+TC.twitter.api_key+'" type="text/javascript"></script>'
        );
        TC.twitter.script_src_tag_written = true;
      }
      $("head script[src='http://platform.twitter.com/anywhere.js?id="+TC.twitter.api_key+"']").load(function(e){
        TC.twitter_anywhere();
      });
    } else {
      TC.twitter_anywhere();
    }
    return null;
  }

  TC.twitter_anywhere_script_test = function() {
    try {
      return ((!UnderScore.isUndefined(twttr)) && (typeof(twttr)!=='undefined') && UnderScore.isFunction(twttr.anywhere));
    } catch(e) {}
    return false;
  }
  
  TC.fix_webkit_captions = function() {
    if ($.browser.webkit) {
      var off ;
      var that;
      $.each($("table:has(caption)"),function(i,item){
        that = $("table:has(caption):eq("+i+")");
        off = -1;
        off -= parseInt(that.css('border-right-width'),10);
        that.children("caption").css({'margin-right':off+'px'});
      });
    }
  }
  
})(jQuery);
