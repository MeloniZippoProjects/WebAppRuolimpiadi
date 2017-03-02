<?php
    $xml = new DOMDocument();
    $xml->load('../documents.xml');

    $docs = $xml->getElementsByTagName('document');

    foreach ($docs as $doc)
    {
        $id = $doc->getAttribute('id');
    
    	if(isset($_POST[$id ]) && $_POST[$id] == 'on')
        {
            $doc->setAttribute('visible', 'yes');
        }
        else
        {
            $doc->setAttribute('visible', 'no');
        }
    }
    $xml->save('../documents.xml');
?>