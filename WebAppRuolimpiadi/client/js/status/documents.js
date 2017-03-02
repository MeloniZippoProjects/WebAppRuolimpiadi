var documentsData;

function docListHandler()
{
    var docListRequestObject = {
        url: '../../../documents.xml',
        dataType: 'xml',
        type: 'GET',
        success: createDocList
    };
    
    $.ajax(docListRequestObject);
}

function createDocList(data)
{
    $('#mapList').hide();
    var list = $('#docList');
    list.show();

    var docs = data.getElementsByTagName('document');
    docs = $(docs);
    documentsData = docs;
    
    //Reset del testo
    $('#docShow').appendTo($('#handlerDiv'));
    $('#docShow').hide();

    //Popolamento lista
    list.empty();
    var stillEmpty = true;

    docs.each(function (idx,doc)
    {
        doc = $(doc);
        var title = doc.attr('title');
        var id = doc.attr('id');
        var visible = (doc.attr('visible') == 'yes');
        var src = doc.attr('src');

        if(visible)
        {
            list.append('<p class="title" doc-id="' + id + '">' + title + '</p>');
            stillEmpty = false;
        }
        
    });

    //Gestione messaggi d'errore
    $('#noMaps').hide();
    if (stillEmpty)
        $('#noDocs').show();
    else
        $('#noDocs').hide();

    $('#handlerDiv').show(400);

	//Assicuriamoci che i pulsanti siano visibili (?)
    $('#handler-icon-close').show();
    $('#handler-icon-rotate').show();
}

function docElemHandler()
{
    var eventElem = $(this);
    var doc = $('#docShow');
    if (eventElem.is('.shown'))
    {
        doc.hide(400);
        eventElem.removeClass('shown');
        return;
    }

    $('#docList').find('.shown').removeClass('shown');
    eventElem.addClass('shown');
    var elemId = eventElem.attr('doc-id');
    
    var eventDoc = documentsData.filter('[id=' + elemId + ']');
    var src = eventDoc.attr('src');

    
    doc.hide(400, hideDoc);
    function hideDoc()
    {
        doc.insertAfter(eventElem);
    }

    var docElemRequestObject = {
        url: '../../../docs/' + src,
        type: 'GET',
        dataType: 'html',
        success: showDocElem
    };

    $.ajax(docElemRequestObject);
}

function showDocElem(data)
{
    var doc = $('#docShow');
    doc.find('#text').html(data);
    doc.show(400);
}

function onReady_docs() {
    $('#docs-icon-open').on('click', docListHandler);

    $('#docList').on('click', 'p.title', docElemHandler);
    $('#docShow').hide();
}