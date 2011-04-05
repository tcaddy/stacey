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

## twitter_intents branch of tcaddy fork

See a <a href="http://www.teddycaddy.com/stacey/twitter_intents/?/about/" target="_blank">Demo</a> of Twitter Web Intents integration.

This uses <a href="http://dev.twitter.com/pages/intents" target="_blank">Twitter Web Intents</a> javascript widgets, which let's users interact with Twitter using small pop-up windows.

You should edit content/_shared.txt and change the Twitter account name.

The left side navigation includes your Twitter username with Follow Me on Twitter integration.

There is also a sample Twitter content folder which will get your recent Tweets.

Finally, you can make any page Tweetable by setting @tweetable equal to true.  See content/index/index.txt and content/about/page.txt as examples.

User's without Javascript will get degraded content that is probably 'good enough' to let them find you on Twitter.

This has been tested in Firefox 4 and Google Chrome 10 on Linux.  Expect to make some slight CSS / template adjustments to make all the browsers work correctly.

## Copyright/License

Copyright (c) 2009 Anthony Kolber. See `LICENSE` for details.

PHP Markdown (c) Michel Fortin (see [1] for license details)

JSON.minify  (c) Kyle Simpson (see [2] for license details).


[1] `/app/parsers/markdown-parser.inc.php`

[2] `/app/parsers/json-minifier.inc.php`
