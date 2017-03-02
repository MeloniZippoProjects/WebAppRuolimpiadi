$.ajaxSetup({ cache: false });

$(document).ready(function ()
{
    onReady_maps();
    onReady_docs();
    onReady_handler()
});

$(window).load(onLoad_marines);
