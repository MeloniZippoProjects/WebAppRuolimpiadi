<?php
$xml = new DOMDocument();
$xml->formatOutput = true;
$xml->preserveWhiteSpace = false;

$archive = $xml->createElement("archive");
$xml->appendChild($archive);

$id = 0;

$files = scandir("./../mappe/");
$pattern = "{^(.+)\.(png|jpg)$}";

foreach ($files as $name)
{
    if(preg_match($pattern, $name, $matches) != FALSE)
    {
        $map = $xml->createElement("map");
        $archive->appendChild($map);

        $map->setAttribute("id", $id);
        $map->setAttribute("title", $matches[1]);
        $map->setAttribute("visible", "no");
        $map->setAttribute("src", $name);

        $id++;
/*
        $title = $xml->createElement("title");
        $title->nodeValue = "mappa".$id;
        $map->appendChild($title);

        $id++;

        $visible = $xml->createElement("visible");
        $visible->nodeValue = "no";
        $map->appendChild($visible);

        $src = $xml->createElement("src");
        $src->nodeValue = $name;
        $map->appendChild($src);
*/  
  }
}

$xml->save("./../maps.xml");

?>