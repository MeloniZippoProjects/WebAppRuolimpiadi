<?php
    function getValue($obj)
    {
        return $obj->item(0)->attributes->getNamedItem('value')->value;
    };
    
    function setValue($obj,$val)
    {
        $obj->item(0)->attributes->getNamedItem('value')->value = $val;
    }

    $id = $_POST['marine'];


    $dom = new DOMDocument();

    $dom->load('../marineStatus.xml');

    $marine = $dom->getElementsByTagName('marine')->item($id);

    setValue($marine->getElementsByTagName('hp'),$_POST['hp']);

    $parts = ['head', 'torso', 'armR', 'armL', 'legR', 'legL'];
    $types = ['body', 'armor'];

    foreach($parts as $part)
    {
        foreach($types as $type)
        {
            if(isset($_POST[ $type.'_'.$part.'rem' ]))
                $val = 'removed';
            else
                $val = $_POST[ $type.'_'.$part ];

            setValue( $marine->getElementsByTagName($type."Status")->item(0)->getElementsByTagName($part), $val);
        }
    }

    $newfile = $dom->saveXML();
    $fl = fopen('../marineStatus.xml','w');
    fwrite($fl,$newfile);

    /*
    if(isset($_POST['headrem']))
        $val = 'removed';
    else
        $val = $_POST['head'];

    setValue($marine->getElementsByTagName('head'),$val);


    if(isset($_POST['torsorem']))
        $val = 'removed';
    else
        $val = $_POST['torso'];
    
    setValue($marine->getElementsByTagName('torso'),$val);

    if(isset($_POST['armRrem']))
        $val = 'removed';
    else
        $val = $_POST['armR'];

    setValue($marine->getElementsByTagName('armR'),$val);

    if(isset($_POST['armLrem']))
        $val = 'removed';
    else
        $val = $_POST['armL'];

    setValue($marine->getElementsByTagName('armL'),$val);

    if(isset($_POST['legRrem']))
        $val = 'removed';
    else
        $val = $_POST['legR'];

    setValue($marine->getElementsByTagName('legR'),$val);

    if(isset($_POST['legLrem']))
        $val = 'removed';
    else
        $val = $_POST['legL'];

    setValue($marine->getElementsByTagName('legL'),$val);

    */
?>