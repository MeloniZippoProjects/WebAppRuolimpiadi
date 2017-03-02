var marines = [];

$(document).ready(load);
    
function load()
{
    var marineDivs = $("#marines div");

    marineDivs.each(function (idx, div) {
        //Qui div è un elemento
        div.dataset.idx = idx;
        div.onclick = marineViewSwitch;

        //Da qui div è un oggetto jQuery
        div = $(div);

        var canv = div.find("canvas")[0];
        var name = div.find(".name")[0];
        var view = div.find(".view")[0];

        marines[idx] = new SpaceMarine(canv, name, view);
    })

/*
    var canv = $("#marines canvas");

    canv.each( function (idx, val) {
        marines[idx] = new SpaceMarine(val);

        val.dataset.idx = idx;
        val.onclick = marineStatusSwitch;
    });
*/
    audioAllowed = false;
    $.ajax(statusRequest);
    setInterval($.ajax, 5000, statusRequest);
}

function marineViewSwitch()
{
    //Curiosità: event.target punta sempre all'elemento origine.
    //this invece punta all'elemento corrente, e serve questo per sfruttare la propagazione
    var idx = this.dataset.idx;
    marines[idx].switchView();
    marines[idx].draw();
}