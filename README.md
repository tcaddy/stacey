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

This uses Twitter @Anywhere javascript library, which let's users stay on your site, while interacting with Twitter.

You should edit content/_shared.txt and change the Twitter account name and API key.

The left side navigation includes your Twitter username with hovercard.

There is also a sample Twitter content folder which will get your recent Tweets and apply hovercard to all Twitter account names in those Tweets.

User's without Javascript will get degraded content that is probably 'good enough' to let them find you on Twitter.

## Copyright/License

Copyright (c) 2009 Anthony Kolber. See `LICENSE` for details.

PHP Markdown (c) Michel Fortin (see [1] for license details)

JSON.minify  (c) Kyle Simpson (see [2] for license details).


[1] `/app/parsers/markdown-parser.inc.php`

[2] `/app/parsers/json-minifier.inc.php`
