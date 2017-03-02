//Array contenente gli oggetti SpaceMarine
var marines = [];

//Gestione del cambio visione
function marineViewSwitch() {
    var idx = this.dataset.idx;
    marines[idx].switchView();
    marines[idx].draw();
}

//Funzioni di inizializzazione
function marinesObjectsSetup()
{
    var marineDivs = $("#marines div");

    marineDivs.each(function (idx, div) {
        //Qui div è un elemento
        div.dataset.idx = idx;
        div.onclick = marineViewSwitch;

        //Da qui div è un oggetto jQuery
        div = $(div);

        var objects = div.find("object");

        var armorObject = objects[0];
        var bodyObject = objects[1];

//        armorObject.dataset = { idx: idx };
//        bodyObject.dataset = { idx: idx };

//        armorObject.onload = onLoad_object;
//        bodyObject.onload = onLoad_object;

//        var armorSvg = armorObject.getSVGDocument();
//        var bodySvg = bodyObject.getSVGDocument();

        var name = div.find(".name")[0];
        var view = div.find(".view")[0];

        marines[idx] = new SpaceMarine(armorObject, bodyObject, name, view, idx);

        //Elegante come un palo in culo, almeno risolve il problema degli svg che non propagano eventi
        var armorSvg = armorObject.getSVGDocument();

        armorSvg.dataset = { idx: idx };
        armorSvg.onclick = marineViewSwitch;

    	//Ora che gli oggetti sono caricati, possiamo nascondere
		//$(bodyObject).hide();
    })
}

function marinesUpdateSetup()
{
    audioAllowed = false;   //Parte del sistema di 'allarme'
    $.ajax(statusRequest);
    setInterval($.ajax, 2000, statusRequest);
}

function onLoad_marines()
{
    marinesObjectsSetup();
    marinesUpdateSetup();
}

function onLoad_object(event)
{
	var object = event.target;
	var svg = object.getSVGDocument();

	svg.dataset = object.dataset;
	svg.onclick = marineViewSwitch;
}