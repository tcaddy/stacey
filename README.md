# Stacey 2.2.2 - HTML5Boilerplate Edition

## Overview
Stacey takes content from `.txt` files, image files and implied directory structure and generates a website.
It is a no-database, dynamic website generator.

If you look in the `/content` and `/templates` folders, you should get the general idea of how it all works.

## Installation

Copy to server, `chmod 777 app/_cache`.

If you want clean urls, `mv htaccess.txt .htaccess`

## Templates

There are an additional two sets of templates which can be found at:

<http://github.com/kolber/stacey-template2> &
<http://github.com/kolber/stacey-template3>

## Read More

See <http://staceyapp.com> and <http://html5boilerplate.com/> for more detailed usage information.

## twitter_anywhere branch of tcaddy fork

See a <a href="http://www.teddycaddy.com/stacey/twitter_anywhere/?/twitter/" target="_blank">Demo</a> of Twitter @Anywhere integration.

This uses Twitter @Anywhere javascript library, which let's users stay on your site, while interacting with Twitter.

You should edit content/_shared.txt and change the Twitter account name and API key.

The left side navigation includes your Twitter username with hovercard.

There is also a sample Twitter content folder which will get your recent Tweets and apply hovercard to all Twitter account names in those Tweets.

User's without Javascript will get degraded content that is probably 'good enough' to let them find you on Twitter.

This has been tested in Firefox 4 and Google Chrome 10 on Linux.  Expect to make some slight CSS / template adjustments to make all the browsers work correctly.

## ajaxification branch of tcaddy fork

See a <a href="http://www.teddycaddy.com/stacey/ajaxification/" target="_blank">Demo</a> of AJAX.

Add AJAX to any link by adding: data-remote="true"

Example:  `<a href="@url" data-remote="true">Click Here</a>`

AJAX requests will replace contents of `<article id="content"></article>`

100% compatible for users without Javascript.

Templates have been changed:

  *  all content before and after `<article id="content"></article>` has been abstracted to partials
  * Templates are rendered appropriately (AJAX or normal) based on value of a new variable called @is_xhr

The app files have been modified slightly:

  *  make a variable called @is_xhr.  
     * You can use this to repsond to AJAX / non-AJAX requests in your templates
  *  Prevent 301 Redirects due to GET variables added to URL in AJAX requests
  
TODO:  AJAX links do not work for index.php or / path.

## twitter_and_ajax branch of tcaddy fork

See a <a href="http://www.teddycaddy.com/stacey/twitter_and_ajax/" target="_blank">Demo</a> of AJAX version of template with Twitter @Anywhere integration.

This is a merge of these two branches:

  * twitter_anywhere
  * ajaxification

## Copyright/License

Copyright (c) 2009 Anthony Kolber. See `LICENSE` for details.

PHP Markdown (c) Michel Fortin (see [1] for license details)

JSON.minify  (c) Kyle Simpson (see [2] for license details).


[1] `/app/parsers/markdown-parser.inc.php`

[2] `/app/parsers/json-minifier.inc.php`
