$(function($){

    $img = $('.js_img-project');            // Pointe sur les img
    $descr = $('#js_viewContent div');      // Pointe sur les descriptions


/*======================================================================
    FOCUS TOOL
 ======================================================================*/

    function focusOn($tools) {
        for ($i = 1; $i < $tools.length; $i++) {
            $tool = $tools[$i];
            $('.tools li:contains("' + $tool + '")').addClass('tool-focus');
        }
    }
    function focusOff($tools) {
        for ($i = 1; $i < $tools.length; $i++) {
            $tool = $tools[$i];
            $('.tools li:contains("' + $tool + '")').removeClass('tool-focus');
        }
    }

    // Hover img
    $img.on({
        'click': function(){
        },'mouseenter': function() {
            $dataTools = $(this).data('tools');// On récupère les tools liés à l'image
            $tools = $dataTools.split('|');// On découpe la chaine pour récup tools - notre tableau commence à [1]

            $(this).addClass('have-border');
            focusOn($tools);
        }, 'mouseleave': function() {
            $(this).removeClass('have-border');
            focusOff($tools);
        }
    });

/*======================================================================
     IMG PROJECT MAX HEIGHT 800PX
 ======================================================================*/
    $(window).on('load resize',function() {

        $img.each(function() {
            // Si hauteur img > 800px
            if ($(this).outerHeight() > 800 ) {
                $(this).addClass('maxHeight800px');
            // Pour le responsive
            } else if ($(this).outerWidth() >= $mainRight.width()){
                $(this).removeClass('maxHeight800px');
            }

        });

    });

});