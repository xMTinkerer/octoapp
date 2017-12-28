
$(function(){
    var $page = window.location.pathname;

    $('ul.nav li.nav a').each(function(){
        var $href = $(this).attr('href');

        if ( ($href == $page) || ($href == '') ) {
            $(this).addClass('on');
        } else {
            $(this).removeClass('on');
        }
    });
});
