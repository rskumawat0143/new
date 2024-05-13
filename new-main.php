<?php
/**
 * Microsoft's Ckeditor for WonderCMS! :)
 *
 * @author mjxl
 * @version 1.1.1
 */

global $Wcms;

if (defined('VERSION')) {
  define('version', VERSION);
  defined('version') or die('Direct access is not allowed.');
}
$Wcms->addListener('js', 'ckeditorJS');
$Wcms->addListener('css', 'ckeditorCSS');

function ckeditorJS($args)
{
  global $Wcms;
  if ($Wcms->loggedIn) {
    $script = <<<EOT
    <script src='https://code.jquery.com/jquery-3.7.1.js'></script>
    <script src='https://cdn.ckeditor.com/4.15.1/full-all/ckeditor.js'></script>
    <script src='{$Wcms->url('plugins/new-main/js/ckeditor.js')}'></script>
EOT;
    $args[0] .= $script;
  }
  return $args;
}

function ckeditorCSS($args)
{    
  global $Wcms;
  if ($Wcms->loggedIn) {
    $script = <<<EOT

    <link rel='stylesheet' href='{$Wcms->url('plugins/new-main/css/ckeditor.css')}' media='screen'>
EOT;
    $args[0] .= $script;
  }
  return $args;
}

