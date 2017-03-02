//Metodi per la gestione del form

function loadMaps(mapsXML)
{
    var maps = mapsXML.getElementsByTagName('map');
    maps = $(maps);
    var mapList = $('#mapList');

    maps.each(function (idx, map) {
        map = $(map);

        var title = map.attr('title');
        var id = map.attr('id');
        var visible = ( map.attr('visible') == 'yes' );
        var src = map.attr('src');

        mapList.append(
            '<label>' + title +
                '<input type="checkbox" name="' + id + '"' +
                        (visible ? 'checked' : '') + '>' +
            '<label/>');
    });
}

function onMapFormSubmit(event)
{
    console.log(event);

    sendMapsObject.data = $(this).serializeArray();

    $.ajax(sendMapsObject);
    event.preventDefault();
}

//Oggetti per le richieste ajax

var loadMapsObject = {
    url: '../maps.xml',
    type: 'GET',
    dataType: 'xml',
    success: loadMaps
};

var sendMapsObject = {
    url: 'modMaps.php',
    type: 'POST',
    data: 0,
    success: function (data) {
        alert(data);
    }
};

//Funzione di inizializzazione

function onReady_maps()
{
    $("#mapForm").on('submit', onMapFormSubmit);

    $.ajax(loadMapsObject);
}