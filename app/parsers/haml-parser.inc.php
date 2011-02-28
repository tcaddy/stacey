<?php

function parse_haml($input, $output)
{
  require_once('PHamlP/haml/HamlParser.php');
  $haml = new HamlParser();
  $output = $haml->parse($input);

  echo $output;
}
