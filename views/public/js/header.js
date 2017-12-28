
$(function(){
    var $page = window.location.pathname;

    $('ul.nav li.nav a').each(function(){
        var $href = $(this).attr('href');
        console.log( 'href check: "' + $href + '" ==? "' + $page + '"');

        if ( ($href == $page) || ($href == '') ) {
            $(this).addClass('on');
        } else {
            $(this).removeClass('on');
        }
    });
});
