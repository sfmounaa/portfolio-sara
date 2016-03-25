$(function($){
    $btnFlap = $('#js_btn-flap');
    $mainLeft = $('#js_main-left');
    $mainRight = $('#js_main-right');
    $footer = $('.js_footer');

    $btnGoToTop = $('#js_haut-page');
    $btnGoToBottom = $('#js_bas-page');

    $flapInput = $('#js_btn-flap input');
    $flapLabel = $('#js_btn-flap label');
    $valueBtnFlap = $flapLabel.html();


    /*~~~~~~~~~~~~~~~~    POSITION ELEMT LEFT EN FONCTION SCROLLBAR     ~~~~~~~~~~~~~~~~*/

    function scrollWithLeft($elementLeft) {

        // Position fixe
        if ( $scrollTop >=  $heightAboveMain    //(+padding)                                    // ElmtLeft open est au niveau du scroll
            && $scrollTop <= ( ($bodyHeight - $hauteurFooter) - $elementLeft.outerHeight() )    // ElmtLeft open est au dessus du footer
            && $elementLeft.outerHeight() < $hauteurElmtRight ) {                               // ElmtLeft plus petit que Right
            // fixed
            $mainLeft.addClass("fixed");
            $mainLeft.css('top', 0);

            // Action mainLeft en mode smartphone
            if ($(window).width() <= 640 ) {
                //$mainLeft.fadeTo(500, 0.05);
                //$mainLeft.animate({opacity: 0.05}, 500);
                $mainLeft.css('opacity', 0.1); // On laisse la visu du reste du site
                $('.drop-all').slideUp(); // on réduit le main Left
                $('#js_dropAll').removeClass('rotate'); // On remet la fleche à l'endroit
            }

        // Pour que Left soit juste au dessus du footer si scroll en bas page
        } else if ( $scrollTop >= $bodyHeight - ($hauteurFooter + $elementLeft.outerHeight())
            && $elementLeft.outerHeight() < $hauteurElmtRight ) {
            // Bottom
            $mainLeft.removeClass("fixed");
            $mainLeft.css('top', $bodyHeight - ($hauteurFooter + 31 + $elementLeft.outerHeight())); // 50 => padding footer

        // position ini
        } else {
            $mainLeft.removeClass("fixed");
            $mainLeft.css('top', $heightAboveMain);  // Pour le responsive
            //$mainLeft.fadeTo(1, 1);
            //$mainLeft.animate({opacity: 1}, 1);
            $mainLeft.css('opacity', 1);
        }
    }


    /*~~~~~~~~~~~~~~~~    ACTION LORS DU SCROLL etc...     ~~~~~~~~~~~~~~~~*/
    $lastScrollTop = 0;
 $(window).on('load resize scroll',function() {

     //Listen for scroll
     $scrollTop = $(this).scrollTop(); // Retourne position verticale du scroll niveau haut de la fenetre
     $scrollBottom = $scrollTop + $(window).height();

     $hauteurFooter = $footer.outerHeight();
     $hauteurElmtRight = $mainRight.outerHeight();
     $largeurElmtLeft = $mainLeft.width();
     $positionElmtRightTop = $mainRight.offset().top;
     $positionFooterTop = $footer.offset().top; //$('body').height() - $hauteurFooter;

     $heightAboveMain = ( $('.content-header').outerHeight() + 40 );
     $bodyHeight = $('body').outerHeight();

     $x = $largeurElmtLeft + 80;

     // Pour que element inside Left soit tjs entièrement visible sur l'ecran
     $('.content-main-left_content').css('max-height', $(window).outerHeight() - 50 );
     // Pour que element Left tjs à l'interieur de main
     $('main').css('min-height', $mainLeft.outerHeight());

     // Determine la présence ou non des btn haut et bas de page
     if ($scrollTop <= ($bodyHeight / 6) ) {
         $btnGoToTop.fadeOut();
         $btnGoToBottom.fadeIn();
     } else if ( $scrollBottom >= ($bodyHeight / 6)*5 ) {
         $btnGoToTop.fadeIn();
         $btnGoToBottom.fadeOut();
     } else {
         $btnGoToTop.fadeIn();
         $btnGoToBottom.fadeIn();
     }

     // Pour n'afficher que les tags utilisés

     // On cache tout en amont
     $('.js_ckbx-category').hide();
     $('.js_ckbx-tags > li').hide();

     // Get class <img>
     $('.js_gallery').each(function() {
         $listClass = $(this).attr('class');

         // On extrait les tag et cat
         $arrayTagCat = $listClass.match(/\bjs_[ctag]{3}\d{1,3}\b/g);

         // On boucle pour n'afficher que tag et cat appelés
         for ($i=0; $i<$arrayTagCat.length; $i++) {
             $('#' + $arrayTagCat[$i]).show();
         }
     });


     scrollWithLeft($mainLeft);

     //$el = e.target||event.srcElement;
     //console.log(e);




});

    // Action pour montrer mainLeft en mode smartphone
    if ($(window).width() <= 640) {
        $mainLeft.on('click mouseenter mousemove', function() {
            //$mainLeft.fadeTo(1, 1);
            $(this).css('opacity', 1);
        });
    }



    /*~~~~~~~~~~~~~~~~  VOLET COULISSANT MAIN      ~~~~~~~~~~~~~~~~*/

// when click
    $btnFlap.on('click', function() {

        if ( $mainRight.offset().left <= 55 ){
            // show flap - step ini
            $mainLeft.animate({
                margin: '0'
            }, 500, 'linear');
            $mainRight.animate({
                margin: '+= 0 0 25% 0',
                width : '75%'
            }, 500, 'linear');
            $flapLabel.html($valueBtnFlap);

            $(window).on('resize scroll',function() {
                scrollWithLeft($mainLeft);
            });
        } else {
            // hide flap
            $mainLeft.animate({
                margin: ' 0 0 -'+ $x +' 0'
            }, 500, 'linear');
            $mainRight.animate({
                margin: '0',
                width: '100%'
            }, 500, 'linear');
            $flapLabel.html('<i class="fa fa-2x fa-plus"></i>');

            $(window).on('resize scroll', function () {
                scrollWithLeft($btnFlap);
            });
        }
    });

    /*~~~~~~~~~~~~~~~~    DROP ALL MODE SMARTPHONE     ~~~~~~~~~~~~~~~~*/

// Lors du clic sur arrow
    $('.js_drop').on('click', function(){
        $data = $(this).data('drop');

        //target
        $('.' + $data).slideToggle();
        $(this).toggleClass('rotate');

        // On laisse apparaitre le titre entier quand drop open
        $('.title_N1').toggleClass('oneLineWithEllipsis');

    });
/*~~~~~~~~~~~~~~~~    RETOUR HAUT DE PAGE      ~~~~~~~~~~~~~~~~*/

    $btnGoToTop.click(function(){
        $('html').animate({scrollTop:0}, 'slow');
        return false;
    });

/*~~~~~~~~~~~~~~~~    RETOUR BAS DE PAGE      ~~~~~~~~~~~~~~~~*/

    $btnGoToBottom.click(function(){
        $('html').animate({scrollTop:$('body').outerHeight()}, 'slow');
        return false;
    });

/*~~~~~~~~~~~~~~~~    INFOBULLES      ~~~~~~~~~~~~~~~~*/

    $('.js_infobulle').on("mouseenter", function(){

        $(this).children('.infobulle').delay(600).fadeIn('swing');

    }).on("mouseleave", function(){

        $(this).children('.infobulle').fadeOut('swing');
    });
});



