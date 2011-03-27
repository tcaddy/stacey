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

## ajaxification branch of tcaddy fork

See a [Demo](http://www.teddycaddy.com/stacey/ajaxification/) of AJAX.

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


## Copyright/License

Copyright (c) 2009 Anthony Kolber. See `LICENSE` for details.

PHP Markdown (c) Michel Fortin (see [1] for license details)

JSON.minify  (c) Kyle Simpson (see [2] for license details).


[1] `/app/parsers/markdown-parser.inc.php`

[2] `/app/parsers/json-minifier.inc.php`
