var mapsData;

function zoomHandler() {
    var scrollLeft = $(document).scrollLeft();
    var scrollTop = $(document).scrollTop();

    /*var percentageTop = scrollTop / $(document).height();
    var percentageLeft = scrollLeft / $(document).width()*/

    var centerHeight = scrollTop + ($(window).height() / 2);
    var docHeight1 = $(document).height();

    var centerWidth = scrollLeft + ($(window).width() / 2);
    var docWidth1 = $(document).width();

    var img = $('#map')[0];
    var zoom = $('#zoom input')[0].value;
    img.style.width = zoom * 100 + '%';
    img.style.height = zoom * 100 + '%';

    //gestione scroll

    if ($(document).height() <= $(window).height() && $(document).width() <= $(window).width())
        return;

    var docHeight2 = $(document).height();
    var docWidth2 = $(document).width();

    var newTop = (centerHeight * docHeight2 / docHeight1) - $(window).height() / 2;
    var newLeft = (centerWidth * docWidth2 / docWidth1) - $(window).width() / 2;

    $(document).scrollLeft(newLeft);
    $(document).scrollTop(newTop);
}

function mapListHandler()
{
    var mapListRequestObject = {
        url: '../../../maps.xml',
        dataType: 'xml',
        type: 'GET',
        success: createMapList
    };

    $.ajax(mapListRequestObject);
}

function createMapList(data)
{
    $('#docList').hide();
    var list = $('#mapList');
    list.show();

    var maps = data.getElementsByTagName('map');
    maps = $(maps);
    mapsData = maps;

    //Popolamento Lista
    list.empty();
    var stillEmpty = true;

    maps.each(function (idx, map) {
        map = $(map);
        var title = map.attr('title');
        var id = map.attr('id');
        var visible = (map.attr('visible') == 'yes');
        var src = map.attr('src');

        if (visible) {
            list.append('<p class="title" map-id="' + id + '">' + title + '</p>');
            stillEmpty = false;
        }
    });

    //Gestione messaggi di errore
    $('#noDocs').hide();
    if (stillEmpty)
        $('#noMaps').show();
    else
        $('#noMaps').hide();
    
    $('#handlerDiv').show(400);

	//Assicuriamoci che i pulsanti siano visibili (?)
    $('#handler-icon-close').show();
    $('#handler-icon-rotate').show();
}

function mapElemHandler() {
    var eventElem = $(this);

    if (eventElem.is('.shown'))
        { return; }

    $('#mapList').find('.shown').removeClass('shown');
    eventElem.addClass('shown');

    var elemId = eventElem.attr('map-id');

    var eventMap = mapsData.filter('[id=' + elemId + ']');
    var map = $('#map')[0];

    map.src = "./../../mappe/" + eventMap.attr('src');
}

function onReady_maps()
{
    $('#zoom input').on('input', zoomHandler);

    $("#maps-icon-open").on('click', mapListHandler);
    $("#mapList").on('click', 'p.title', mapElemHandler);

    //gestione lista delle mappe
}