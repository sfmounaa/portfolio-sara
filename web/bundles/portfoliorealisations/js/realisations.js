$(function($) {

/*================================================
     BUTTON
 ================================================*/
    $btnFlap.addClass('btn-blue');


/*================================================
     CHECKBOX
 ================================================*/
    $img = $('.js_gallery');
    $ckbxAll = $('#js_ckbx-all input');
    $ckbxCatTag = $('.js_checkbox input.ckbx');
    $ckbxCat = $('.js_ckbx-category input');
    $ckbxTag = $('.js_ckbx-tags input');

    // Lors du clic sur Tout
    $ckbxAll.on('click',function() {
        if($(this).is(':checked')) {    // Si 'Tout' est coché :
            $img.show(500);                     // On affiche tout
            $img.addClass($value+'active');     // On active

            $('#js_dropAll label').removeClass('ckbxOn');      // On débleute arrow drop de Tout
        }else{                          // Sinon :
            $img.hide(500);                     // On cache tout
            $img.removeClass($value+'active');  // On desactive
        }
        // On décoche toutes les autres
        $ckbxCat.prop("checked", false);
        $ckbxTag.prop("checked", false);
        // On débleute tout
        $('#js_categories label').removeClass('ckbxOn');
    });

    // Lors du clic sur autre ckbx
    $ckbxCatTag.click(function() {
        $value = $(this).attr('value');             // Récupère value de l'élément coché
        $dataCat = $(this).attr('data-category');   // Récupère catId de la cat selectionnée
        $catId = $(this).closest('.js_checkbox').find('.js_ckbx-category input').attr('value'); // Récup catId du tag selectionné
        $elemCat = $(this).closest('.js_checkbox').find('.js_ckbx-category input'); // Pointe sur la ckbx Cat du tag selectionné
        $type = $value.substring(0,3); //Détermine si cat ou tag
        $ckbxCatActive = $('.js_ckbx-category input:checked').length;
        $ckbxTagActive = $('.js_ckbx-tags input:checked').length;


        if($(this).is(':checked'))
        {
            //if($ckbxCatActive <= 1 && $ckbxTagActive == 0   // Si 1 cat selectionnée mais aucun tag
            //    || $ckbxCatActive == 0 && $ckbxTagActive <= 1 // Si 1 tag selectionné mais aucune cat
            //    || $catId == $dataCat && $elemCat.is(':checked') && $ckbxCatActive <= 1 && $ckbxTagActive <= 1 // Si 1 tag select après sa cat
            //){
            //
            //}

            $('#js_dropAll label').addClass('ckbxOn');      // On bleute arrow drop de Tout

            $('.js_' + $value).addClass($value+'active'); // Si coché => alors actif

            $("article:not(.js_" + $value + ")").hide(500);                     // On cache les img non concernées par cette ckbx
            $("article:not(.js_" + $value + ")").removeClass($value+'active');  // On desactive les img non concernées par cette ckbx

            // Si cat select
            if ( $type == 'cat') {
                $('#js_' + $value + ' li label').addClass('ckbxOn');                // On bleute les tags de la cat selectionnée
                $('#js_' + $value + ' .js_ckbx-category label').removeClass('ckbxOn');   // On débleute la cat select
            } else if ( $type == 'tag') {
                $('#js_' + $dataCat + ' .js_ckbx-category label').addClass('ckbxOn');   // On bleute la cat select
                $('#js_' + $dataCat + ' li label').removeClass('ckbxOn');                // On débleute les tags de la cat selectionnée
            }



        }else{

            $('.js_' + $value).removeClass($value+'active'); // Si décoché => alors plus actif
            $('.js_' + $value).hide(500);                    // On cache img deselectionnée

            // Si cat deselect
            if ( $type == 'cat') {
                $('#js_' + $value + ' li label').removeClass('ckbxOn');                // On débleute les tags de la cat selectionnée
            // Si on décoche le der tag
            } else if ( $type == 'tag' && $ckbxTagActive < 1 ) {
                $('#js_' + $dataCat + ' .js_ckbx-category label').removeClass('ckbxOn');   // On débleute la cat select
            }

            // Si aucune tag ou cat de select
            if( $ckbxTagActive < 1 && $ckbxCatActive <1 ) {
                $('#js_dropAll label').removeClass('ckbxOn');      // On débleute arrow drop de Tout
            }
        }

        $ckbxAll.prop("checked", false);                                        // Décoche 'Tout'
        $('#js_' + $value + ' li input').prop("checked", false);                // Décoche les tags de la cat selectionnée
        $('.js_ckbx-category input#' + $dataCat).prop("checked", false);        // Décoche la category du tag selectionné
        $('.js_ckbx-category input#' + $dataCat).removeClass($value+'active');  // Desactive la category du tag selectionné

//$arrayTags = $('.js_checkbox input:checked').get(); // => idem que each
        $('.js_checkbox input:checked').each(function(){
            $val = $(this).attr('value');            // On récupère la valeur des éléments cochés
            $('.' + $val +'active').show(500);       // On affiche toutes les img actives
        });

    });


});
