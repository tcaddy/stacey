jQuery.ajaxSetup({
  'beforeSend': function(xhr){
    xhr.setRequestHeader("Accept", "text/javascript");
  }
});

var TC = TC || {}; // my initials; namespace for my js code

(function ($) {

  $(function(){
    after_load_or_ajax();
    TC.setup_bbq();
    //TC.setup_gal();
  });
  
  TC.setup_twitter = function() {
    TC.twitter.status_template = '<tr class="status"><td class="avatar"><img alt="{{screenName}}" src="{{image_url}}"/></td><td class="screen_name">@{{screenName}}</td><td class="status">{{text}}</td></tr>';
    TC.twitter.status_simple_template = '<tr class="status"><td class="status">{{text}}<span class="timestamp">{{timestamp}}</span></td></tr>';

    $("#timeline .busy:hidden").show();
    twttr.anywhere(function (T) {
      T.hovercards();
      T("#follow-placeholder").followButton(TC.twitter.handle);
      if($("#timeline").length>0) {
        T.User.find(TC.twitter.handle).timeline().each(function(status) {
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
        TC.fix_webkit_captions();
      }
    });
  }

  function after_load_or_ajax() {
    TC.setup_ajax_on_links();
    TC.setup_gallery();
    TC.fix_webkit_captions();
    TC.hide_underlines_on_links();
    TC.hide_spinners();
    TC.setup_twitter();
  }
  
  TC.setup_gal = function() {
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', TC.gal.key]);
    _gaq.push(['_setDomainName', '.teddycaddy.com']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
  }

  TC.setup_gallery = function() {
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
  }
  
  TC.add_spinner = function(that) {
    if (typeof(that)!='undefined') {
      var jqsel;
      if (that.length>0) {
        if (($(":input").length>0) && (that[0].constructor==$(":input")[0].constructor)) {
          jqsel = that.parent();
        } else if (($("select").length>0) && (that[0].constructor==$("select")[0].constructor)) {
          jqsel = that.parent();
        } else {
          jqsel = that;
        }
      } else {
        jqsel = that;
      }
      if (jqsel.children("img[src$='"+TC.spinner()+"']").length>0) {
        jqsel.children("img[src$='"+TC.spinner()+"']").show();
      } else {
        if (jqsel.css('text-decoration')=='underline') {
          jqsel.html('<span style="text-decoration:underline;padding:0px;margin:0px;border:0px none;">'+jqsel.html()+'</span>').css({'text-decoration':'none'});
        }
        if (jqsel.height()<16) {
          jqsel.append('<span style="text-decoration:none;padding:0px;margin:0px;border:0px none;background:none;"><img src="'+TC.stacey.root_path+'/public/img/'+TC.spinner()+'" style="padding:0px;margin:0px;border:0px none;background:none;width:'+(parseInt(jqsel.height())-3)+'px;height:'+(parseInt(jqsel.height())-3)+'px"/></span>');
        } else {
          jqsel.append('<span style="text-decoration:none;padding:0px;margin:0px;border:0px none;background:none;"><img src="'+TC.stacey.root_path+'/public/img/'+TC.spinner()+'" style="padding:0px;margin:0px;border:0px none;background:none;"/></span>');
        }
      }
    }
  }
  
  TC.spinner = function() {
    return 'spinner.gif';
  }

  TC.hide_spinners = function() {
    $("img[src$='"+TC.spinner()+"']").hide();
  }

  TC.hide_underlines_on_links = function() {
    $.each($("a[data-remote='true'] > span[style*='text-decoration']"),function(i,item){
      $(this).css({'text-decoration':''});
    });
  }

  TC.setup_ajax_on_links = function(){
    $("a[data-remote='true'], div[data-remote='true'].pagination > a").click(function (e){
      e.stopImmediatePropagation();
      TC.add_spinner($(this));
      var data = {ajax:true};
      TC.cache = TC.cache || {};
      if ( ($(this).parent("div.pagination")) && ($(this).parent("div.pagination").attr('data-remove-dom-id')) ) {
        data.dom_id = $(this).parent("div.pagination").attr('data-remove-dom-id');
      }
      var bbq_key = $.param.querystring($(this).attr("href"),data,0);
      $.ajax({
        cache: true,
        complete: after_load_or_ajax,
        data: data,
        dataType: "html",
        success: function(data){
          $("article#content").html(data).addClass("bbq-content");
          TC.cache[bbq_key] = $("article#content").clone();
        },
        type: 'GET',
        url: $(this).attr('href')
      });
      
      $.bbq.pushState({ url: bbq_key }); // Push this URL "state" onto the history hash.
      return false;  
    });
  }
  
  TC.setup_bbq = function() {
    // Be sure to bind to the "hashchange" event on document.ready, not
    // before, or else it may fail in IE6/7. This limitation may be
    // removed in a future revision.
    
    // Keep a mapping of url-to-container for caching purposes.
    TC.cache = TC.cache || {'': $('.bbq-default')}; // If url is '' (no fragment), display this div's content.

    // Bind a callback that executes when document.location.hash changes.
    $(window).bind( "hashchange", function(e) {
      // In jQuery 1.4, use e.getState( "url" );
      var url = $.bbq.getState( "url" );

      // In this example, whenever the event is triggered, iterate over
      // all `a` elements, setting the class to "current" if the
      // href matches (and removing it otherwise).
      $("a").each(function(){
        var href = $(this).attr( "href" );

        if ( href === url ) {
          $(this).addClass( "current" );
        } else {
          $(this).removeClass( "current" );
        }
      });

      // You probably want to actually do something useful here..
      
      // Remove .bbq-current class from any previously "current" link(s).
      $( 'a.bbq-current' ).removeClass( 'bbq-current' );
      
      // Hide any visible ajax content.
      $( '.bbq-content' ).children( ':visible' ).hide();
      
      if ( TC.cache[ url ] ) {
        // Since the element is already in the cache, it doesn't need to be
        // created, so instead of creating it again, let's just show it!
        $("article#content").html(TC.cache[ url ].html()).addClass("bbq-content");
      } else {
        // save the content to cache
        TC.cache[ url ] = $("article#content").clone();
      }
      
    });

    // Since the event is only triggered when the hash changes, we need
    // to trigger the event now, to handle the hash the page may have
    // loaded with.
    $(window).trigger( "hashchange" );
  }

  TC.fix_webkit_captions = function() {
    if ($.browser.webkit) {
      var off ;
      var that;
      $.each($("table:has(caption)"),function(i,item){
        that = $("table:has(caption):eq("+i+")");
        off = -2;
        off += parseInt(that.css('border-right-width'),10);
        that.children("caption").css({'margin-right':off+'px'});
      });
    }
  }
  
})(jQuery);
