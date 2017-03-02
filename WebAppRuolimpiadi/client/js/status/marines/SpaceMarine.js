function SpaceMarine(armorObject, bodyObject, nameElement, viewElement, idx)
{
    this.armorObject = armorObject;
    this.bodyObject = bodyObject;

    this.idx = idx;
//    this.armorSvg = armorSvg;
//    this.bodySvg = bodySvg;

    this.name = nameElement;
    this.view = viewElement;
    
    this.HP = 20;

    this.shownView = "armor";

    this.bodyStatus = { head: 0, torso: 0, armR: 0, armL: 0, legR: 0, legL: 0, pack:0 };    //Danni critici al corpo
    this.armorStatus = { head: 0, torso: 0, armR: 0, armL: 0, legR: 0, legL: 0, pack:0 };   //Danni critici all'armatura
}

SpaceMarine.prototype.switchView = function() {
	if (this.shownView == "body")
	{
        this.shownView = "armor";
        this.view.firstChild.nodeValue = "Armatura";

        $(this.bodyObject).hide();
        $(this.armorObject).show();

//        var newSVG = this.armorObject.getSVGDocument();
    }
	else
	{
        this.shownView = "body";
        this.view.firstChild.nodeValue = "Corpo";

        $(this.bodyObject).show();
        $(this.armorObject).hide();

//        var newSVG = this.bodyObject.getSVGDocument();
	}

	do
	{
		newSvg = ((this.shownView == "body") ? this.bodyObject : this.armorObject).getSVGDocument();
	} while (newSvg == null);

	//Fix brutto
	newSvg.dataset = { idx: this.idx };
	newSvg.onclick = marineViewSwitch;
}

SpaceMarine.prototype.fireAlarm = function () {
    //Feedback anche grafico per nuovi danni critici.
    //Gestito qui perchè da qui gestiamo il canvas

    //O si fa direttamente sul div??
}

SpaceMarine.prototype.draw = function ()
{
	//Assegnazione variabili in base al tipo di visualizzazione

    var svgShapes = ['rect', 'ellipse', 'path'];
    var status, svg, parts;
    var hp = this.HP;

    if (this.shownView == "body")
    {
        status = this.bodyStatus;
        svg = $(this.bodyObject.getSVGDocument());
        parts = ['head', 'armR', 'armL', 'legR', 'legL', 'torso'];
    }
    else
    {
        status = this.armorStatus;
        svg = $(this.armorObject.getSVGDocument());
        parts = ['head', 'armR', 'armL', 'legR', 'legL', 'torso', 'pack'];
    }

    //Idea idiota ma forse funziona
	svg.dataset = {idx: this.idx};
    svg.onclick = marineViewSwitch;

    //Blocco esecutivo
    parts.forEach(function (part)
    {
    	var svgPart = svg.find('#' + part);
    	var color = fillStylePicker(hp, status[part]);

    	svgShapes.forEach(function (shape)
    	{
    		svgPart.find(shape).attr('class', color);
    	});
    });
};

function fillStylePicker(hp, crit)
{
    if (crit.toString().trim() == 'removed')
        return "black";
    if (crit.toString().trim() == 'no')
        return 'hide';
    else if (hp > 7) {
        return "green";
    }
    else {
        crit *= 1;
        if (crit == 0)
            return "yellow";
        else if (crit <= 4)
            return "orange"
        else return "red";
    }
}

