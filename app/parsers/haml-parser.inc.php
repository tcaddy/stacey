<?php

function parse_haml($input)
{
  require_once('PHamlP/haml/HamlParser.php');
  $haml = new HamlParser(array('style'=>'nested', 'ugly'=>false, 'preserveComments'=>true));
  $output = $haml->parse($input);

  echo $output;
}
