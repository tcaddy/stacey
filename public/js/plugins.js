Gallery = {
  currentImage: 0,
  imageHolders: null,
  imageHolderWidth: null,
  imageCountHolder: null,
  maxCount: null,
  nextButton: null,
  prevButoon: null,
  init: function (imageHolder, imageWrapperWidth, imageCountHolder, nextButton, prevButton, descriptionHolder, descriptionWidth) {
    // set custom variables
    this.imageHolder = imageHolder;
    this.imageWrapperWidth = imageWrapperWidth;
    this.imageCountHolder = imageCountHolder;
    this.maxCount = $("img", imageHolder).length;
    this.nextButton = nextButton;
    this.prevButton = prevButton;
    this.descriptionHolder = descriptionHolder;
    this.descriptionWidth = descriptionWidth;
    
    // check if a specific image has been specified in the URL
    if (document.URL.match(/#[0-9]+/)) {
      this.gotoImage(new Number(new String(document.URL.match(/#[0-9]+/)).replace("#", "")) - 1);
    } else {
      // write maxCount
      this.updateCount(0);
    } 
    // 
    this.attachEvents();
  },
  attachEvents: function () {
    // write next/prev functions
    this.nextButton.click(function () {
      Gallery.next();
      this.blur();
      return false;
    });
    this.prevButton.click(function () {
      Gallery.previous();
      this.blur();
      return false;
    });
  },
  next: function () {
    // show next image
    this.gotoImage(this.currentImage + 1);
  },
  previous: function () {
    // show previous image
    this.gotoImage(this.currentImage - 1);
  },
  updateCount: function (newCount) {
    // set current image
    this.currentImage = newCount;
    // update current image display
    this.imageCountHolder.innerHTML = (newCount + 1) + "/" + this.maxCount;
    // update url hash
    //window.location.hash = (newCount + 1);
  },
  gotoImage: function (num) {
    // if not too high
    if(num >= this.maxCount) {
      num = 0;
    } else if(num < 0) {
      num = this.maxCount - 1;
    }
    //animate
    this.animateContainers(num);
    // update count
    this.updateCount(num);
  },
  animateContainers: function (num) {
    this.imageHolder.animate({
      marginLeft: (num * this.imageWrapperWidth) * -1 + "px"
    }, { duration: 600, queue: false });
    
    // skip attempt to animate description holder if it does not exist
    if(!this.descriptionHolder) return;
    
    this.descriptionHolder.animate({
      marginLeft: (num * this.descriptionWidth) * -1 + "px"
    }, { duration: 600, queue: false });
  }
}

/* prettyDate() is copied from CouchApp */
jQuery.fn.prettyDate = function() {
  jQuery(this).each(function() {
    var string, title = jQuery(this).attr("title");
    if (title) {
      string = jQuery.prettyDate(title);
    } else {
      string = jQuery.prettyDate(jQuery(this).text());
    }
    jQuery(this).text(string);
  });
};

jQuery.prettyDate = function(time){
  var date;
  try {
    date = new Date(time);
  } catch(e) {
    date=null;
  }
  if (!(!!(date && date.getTimezoneOffset && date.setUTCFullYear))) { // copied for underscore.js isDate()
	  date = new Date(time.replace(/-/g,"/").replace("T", " ").replace("Z", " +0000").replace(/(\d*\:\d*:\d*)\.\d*/g,"$1")) ;
	}

	// IE cannot parse created_at datetime string from Twitter JSON response
  // Let's try to fix it:
  // the fix comes from a @BRENEN's comment at: http://www.quietless.com/kitchen/format-twitter-created_at-date-with-javascript/
  if (isNaN(date) || (!(!!(date && date.getTimezoneOffset && date.setUTCFullYear))) ) {
    date = new Date(time.replace(/(\+\S+) (.*)/, '$2 $1'));
  }
  // end IE Twitter created_at fix

	var diff = (((new Date()).getTime() - date.getTime()) / 1000),
		day_diff = Math.floor(diff / 86400);

  if (isNaN(day_diff)) return time;

	return day_diff < 1 && (
			diff < 60 && "just now" ||
			diff < 120 && "1 minute ago" ||
			diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
			diff < 7200 && "1 hour ago" ||
			diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
		day_diff == 1 && "yesterday" ||
		day_diff < 21 && day_diff + " days ago" ||
		day_diff < 45 && Math.ceil( day_diff / 7 ) + " weeks ago" ||
    time;
    // day_diff < 730 && Math.ceil( day_diff / 31 ) + " months ago" ||
    // Math.ceil( day_diff / 365 ) + " years ago";
};
