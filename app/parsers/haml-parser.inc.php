<?php

function parse_haml($input)
{
  require_once('PHamlP/haml/HamlParser.php');

    $haml = new HamlParser(array('style'=>'nested', 'ugly'=>false, 'doctype'=>'html5', 'preserveComments'=>true));
    $xhtml = $haml->parse($input);

    echo $xhtml;
}
