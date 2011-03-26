jQuery.ajaxSetup({
  'beforeSend': function(xhr){
    xhr.setRequestHeader("Accept", "text/javascript");
  }
});

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
    after_load_or_ajax();
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
      }
  });
  
  function after_load_or_ajax() {
    TC.setup_ajax_on_links();
    TC.hide_underlines_on_links();
    TC.hide_spinners();
    TC.setup_twitter();
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
      if ( ($(this).parent("div.pagination")) && ($(this).parent("div.pagination").attr('data-remove-dom-id')) ) {
        data.dom_id = $(this).parent("div.pagination").attr('data-remove-dom-id');
      }
      $.ajax({
        cache: true,
        complete: after_load_or_ajax,
        data: data,
        dataType: "html",
        success: function(data){
          $("article#content").html(data);
        },
        type: 'GET',
        url: $(this).attr('href')
      });
      
      return false;
    });
  }
  
})(jQuery);
