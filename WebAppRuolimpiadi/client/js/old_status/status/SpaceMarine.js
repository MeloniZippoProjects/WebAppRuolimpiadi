function SpaceMarine( canvasElement, nameElement, viewElement)
{
    this.canvas = canvasElement;
    this.name = nameElement;
    this.view = viewElement;

    this.HP = 20;

    this.shownView = "body";

    this.bodyStatus = { head: 0, torso: 0, armR: 0, armL: 0, legR: 0, legL: 0 };    //Danni critici al corpo
    this.armorStatus = { head: 0, torso: 0, armR: 0, armL: 0, legR: 0, legL: 0 };   //Danni critici all'armatura
}

SpaceMarine.prototype.switchView = function() {
    if (this.shownView == "body") {
        this.shownView = "armor";
        this.view.firstChild.nodeValue = "Armatura";
    }
    else {
        this.shownView = "body";
        this.view.firstChild.nodeValue = "Corpo";
    }
}

SpaceMarine.prototype.fireAlarm = function () {
    //Feedback anche grafico per nuovi danni critici.
    //Gestito qui perchè da qui gestiamo il canvas

    //O si fa direttamente sul div??
}


SpaceMarine.prototype.draw = function () {

    var status = (this.shownView == "body") ? this.bodyStatus : this.armorStatus;

    this.headFill(status.head);

    this.rectFill(100, 100, 150, 150, status.torso);

    this.rectFill(20, 100, 50, 150, status.armR);
    this.rectFill(280, 100, 50, 150, status.armL);

    this.rectFill(100, 280, 50, 100, status.legR);
    this.rectFill(200, 280, 50, 100, status.legL);
};

SpaceMarine.prototype.headFill = function(crit)
{
    var centerX = 175;
    var centerY = 45;
    var radius = 25;

    var context = this.canvas.getContext("2d");

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = fillStylePicker(this.HP, crit);
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.stroke();
}

SpaceMarine.prototype.rectFill = function (x, y, w, h, crit) {
    var context = this.canvas.getContext("2d");
    
    context.beginPath();
    context.rect(x, y, w, h);
    context.fillStyle = fillStylePicker(this.HP, crit);
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.stroke();    
}

function fillStylePicker (hp, crit)
{
    if(crit.toString().trim() == 'removed')
        return "Black";
    else if(hp > 7)
    {
        return "LawnGreen";
    }
    else
    {
        crit *= 1;
        if(crit == 0)
            return "Yellow";
        else if(crit <= 4)
            return "Orange"
        else return "Red";
    }
}

