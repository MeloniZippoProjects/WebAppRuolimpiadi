<?php
$xml = new DOMDocument();
$xml->formatOutput = true;
$xml->preserveWhiteSpace = false;

$archive = $xml->createElement("archive");
$xml->appendChild($archive);

$id = 0;

$files = scandir("./../docs/");
$pattern = "{^(.+)\.txt$}";

foreach ($files as $name)
{
    if(preg_match($pattern, $name, $matches) != FALSE)
    {
        $map = $xml->createElement("document");
        $archive->appendChild($map);

        $map->setAttribute("id", $id);
        $map->setAttribute("title", $matches[1]);
        $map->setAttribute("visible", "no");
        $map->setAttribute("src", $name);

        $id++;
    }
}

$xml->save("./../documents.xml");
?>