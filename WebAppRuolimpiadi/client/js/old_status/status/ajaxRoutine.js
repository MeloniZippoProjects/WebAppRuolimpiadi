var audioAllowed;

var statusRequest = {
    url: "./../../marineStatus.xml",
    type: "GET",
    dataType: "xml",
    success: updateStatus
}

function updateStatus(data) {
    var marineData = data.getElementsByTagName('marine');

    for (var i = 0; i < marineData.length; ++i) {
        marines[i].HP = $(marineData[i].childNodes[1]).attr('value') * 1;

        //Gestione bodyStatus

        var newBodyStatus = marineData[i].getElementsByTagName('bodyStatus')[0];
        newBodyStatus = $(newBodyStatus);

        var currentBodyStatus = marines[i].bodyStatus;

        for (var key in currentBodyStatus)
        {
            if(currentBodyStatus.hasOwnProperty(key))
            {
                if( audioAllowed && ( (newBodyStatus.find(key).attr('value') == 'removed' && currentBodyStatus[key] != 'removed') || currentBodyStatus[key]*1 < newBodyStatus.find(key).attr('value')*1))
                {
                    marines[i].fireAlarm();

                    var alarm = $("#alarm")[0];
                    if(alarm.paused)
                    {
                        alarm.load();
                        alarm.play();
                    }
                }

                currentBodyStatus[key] = newBodyStatus.find(key).attr('value');
            }
        }

        //Gestione armorStatus

        var newArmorStatus = marineData[i].getElementsByTagName('armorStatus')[0];
        newArmorStatus = $(newArmorStatus);

        var currentArmorStatus = marines[i].armorStatus;

        for (var key in currentArmorStatus) {
            if (currentArmorStatus.hasOwnProperty(key)) {
                if (audioAllowed && ((newArmorStatus.find(key).attr('value') == 'removed' && currentArmorStatus[key] != 'removed') || currentArmorStatus[key] * 1 < newArmorStatus.find(key).attr('value') * 1)) {
                    marines[i].fireAlarm();

                    var alarm = $("#alarm")[0];
                    if (alarm.paused) {
                        alarm.load();
                        alarm.play();
                    }
                }

                currentArmorStatus[key] = newArmorStatus.find(key).attr('value');
            }
        }

        //Verra' mostrato lo status richiesto
        marines[i].draw();
    }
    audioAllowed = true;
}