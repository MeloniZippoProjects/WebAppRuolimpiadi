//Copia locale per lo stato dei marine (marineStatus.xml)
var marineStatus;

//Metodi per la gestione del form

function onMarineFormSubmit(event) 
{
    console.log(event);

    sendMarineObject.data = $(this).serializeArray();

    $.ajax(sendMarineObject);
    event.preventDefault();
}

function onSelectedMarineChange() {
        var id = $(this).find(':checked').attr('value');
        var mar = $(marineStatus).find('marine[id='+id+']');
        updateForm(mar);
}

function updateForm(marine) {
    $("input[name='hp']").attr('value', marine.find('hp').attr('value'));

    var parts = ['head', 'torso', 'armR', 'armL', 'legR', 'legL'];
    var types = ['body', 'armor'];

    $(parts).each(function (idp, part) {
        $(types).each(function (idt, type) {
            var typeStatus = marine.find(type + "Status");
            var val = typeStatus.find(part).attr('value');

            if (val != "removed") {
                $("input[name='" + type + '_' + part + "']").attr('value', val);
                $("input[name='" + type + '_' + part + "']").prop('disabled', false);
                $("input[name='" + type + '_' + part + "rem']").prop('checked', false);
            }
            else {
                $("input[name='" + type + '_' + part + "']").attr('value', 10);
                $("input[name='" + type + '_' + part + "']").prop('disabled', true);
                $("input[name='" + type + '_' + part + "rem']").prop('checked', true);
            }
        });

    })
}

function onRemovedCheckSwitch() {
    //debugger;
    var reg = /(\w+)rem/;       // funziona senza modifiche: trova sia type che part
    var part = reg.exec(this.id)[1];
    if (this.checked) {

        $('input[name=' + part + ']').prop('disabled', true);
    }
    else {
        $('input[name=' + part + ']').prop('disabled', false);
    }
};


//Oggetti per le richieste ajax

sendMarineObject = {
    url: 'modMarine.php',
    type: 'POST',
    data: 0,
    success: function (data) {
        alert(data);
    }
};


loadMarinesObject = {
    url: '../marineStatus.xml',
    type: 'GET',
    dataType: 'xml',
    success: function (data) {
        marineStatus = data;
        var firstMar = $(marineStatus).find('marine[id=0]');

        updateForm(firstMar);
    }
};


//Funzione di inizializzazione 

function onReady_marines()
{
    $('#marineForm').on('submit', onMarineFormSubmit);

    $('#marineForm input:checkbox').on('change', onRemovedCheckSwitch);

    $('#marineForm select').on('change', onSelectedMarineChange);

    $.ajax(loadMarinesObject);
}