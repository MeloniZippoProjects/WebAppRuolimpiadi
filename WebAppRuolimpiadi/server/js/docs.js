//Metodi per la gestione del form

function loadDocs(docsXML) {
    var docs = docsXML.getElementsByTagName('document');
    docs = $(docs);
    var docList = $('#docList');

    docs.each(function (idx, doc) {
        doc = $(doc);

        var title = doc.attr('title');
        var id = doc.attr('id');
        var visible = (doc.attr('visible') == 'yes');
        var src = doc.attr('src');

        docList.append(
            '<label>' + title +
                '<input type="checkbox" name="' + id + '"' +
                        (visible ? 'checked' : '') + '>' +
            '<label/>');
    });
}

function onDocFormSubmit(event) {
    console.log(event);

    sendDocsObject.data = $(this).serializeArray();

    $.ajax(sendDocsObject);
    event.preventDefault();
}

//Oggetti per le richieste ajax

var loadDocsObject = {
    url: '../../documents.xml',
    type: 'GET',
    dataType: 'xml',
    success: loadDocs
};

var sendDocsObject = {
    url: 'modDocs.php',
    type: 'POST',
    data: 0,
    success: function (data) {
        alert(data);
    }
};

//Funzione di inizializzazione

function onReady_docs() {
    $("#docForm").on('submit', onDocFormSubmit);

    $.ajax(loadDocsObject);
}