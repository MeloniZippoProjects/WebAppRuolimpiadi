function rotateHandler() {
    var handler = $('#handlerDiv');

    var isReverse = handler.is('.reverse');

    if (isReverse) {
        handler.removeClass('reverse');
        handler.addClass('normal');
    }
    else {
        handler.removeClass('normal');
        handler.addClass('reverse');
    }
}

function closeHandler() {
    $('#handlerDiv').hide(400);
}

function onReady_handler()
{
    $('#handler-icon-close').on('click', closeHandler);
    $('#handler-icon-rotate').on('click', rotateHandler);
}