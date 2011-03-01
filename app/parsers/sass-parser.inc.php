<?php
require_once('PHamlP/haml/HamlParser.php');

function parse_sass($input)
{
  $sass = new SassParser(array('style'=>'nested', 'ugly'=>false));
  $scss = $sass->toCss($input);

  echo $scss;
}
