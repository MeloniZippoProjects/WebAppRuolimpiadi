<?php
    $xml = new DOMDocument();
    $xml->load('../maps.xml');

    $maps = $xml->getElementsByTagName('map');

    foreach ($maps as $map)
    {
        $id = $map->getAttribute('id');
    	if(isset($_POST[$id ]) && $_POST[$id] == 'on')
        {
            $map->setAttribute('visible', 'yes');
        }
        else
        {
            $map->setAttribute('visible', 'no');
        }
    }
    
    $xml->save('../maps.xml');
?>