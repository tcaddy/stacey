<?php
require_once('haml/lib/haml.php');

function parse_haml($input)
{
  $haml = new Haml();
  $haml_code = file_get_contents($input);
  $html_code = $haml->parse($haml_code);

   echo $html_code;
}
