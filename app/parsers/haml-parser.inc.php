<?php
require_once('PHamlP/haml/HamlParser.php');

function parse_haml($input)
{
  $haml = new HamlParser(array('style'=>'nested', 'ugly'=>false));
  $html = $haml->parse($input);

  echo $html;
}
