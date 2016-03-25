$(document).ready(function()
{
    // On récupère la balise <div> en question qui contient l'attribut « data-prototype » qui nous intéresse.
    var $container = $('div#portfolio_realisationsbundle_project_contents');

    // On ajoute un lien pour ajouter un nouveau contenu
    var $addLink = $('<a href="#" id="add_content" class="btn btn-blue btn_round"><i class="fa fa-2x fa-plus"></i></a>');

    $container.append($addLink);

    // On ajoute un nouveau champ à chaque clic sur le lien d'ajout.
    $addLink.click(function(e)
    {
        addContent($container);

        e.preventDefault(); // évite qu'un # apparaisse dans l'URL

        return false;
    });

    // On définit un compteur unique pour nommer les champs qu'on va ajouter dynamiquement
    var index = $container.find(':input').length;

    // On ajoute un premier champ automatiquement s'il n'en existe pas déjà un (cas d'une nouvelle annonce par exemple).
    if (index == 0)
    {
        addContent($container);

    }
    else
    {
        // Pour chaque catégorie déjà existante, on ajoute un lien de suppression
        $container.children('div').each(function()
        {
            addDeleteLink($(this));
        });
    }

    // La fonction qui ajoute un formulaire Content
    function addContent($container)
    {
        // Dans le contenu de l'attribut « data-prototype », on remplace :
        // - le texte "__name__label__" qu'il contient par le label du champ
        // - le texte "__name__" qu'il contient par le numéro du champ
        var $prototype = $($container.attr('data-prototype').replace(/__name__label__/g, 'Image ' + (index+1)).replace(/__name__/g, index));

        // On ajoute au prototype un lien pour pouvoir supprimer la catégorie
        addDeleteLink($prototype);

        // On ajoute le prototype modifié à la fin de la balise <div>
        $container.append($prototype);

        // Enfin, on incrémente le compteur pour que le prochain ajout se fasse avec un autre numéro
        index++;
    }

    // La fonction qui ajoute un lien de suppression d'une catégorie
    function addDeleteLink($prototype)
    {
        // Création du lien
        $deleteLink = $('<a href="#" class="btn btn-magenta btn_round"><i class="fa fa-2x fa-minus"></i></a>');

        // Ajout du lien
        $prototype.append($deleteLink);

        // Ajout du listener sur le clic du lien
        $deleteLink.click(function(e)
        {

        $prototype.remove();

        e.preventDefault(); // évite qu'un # apparaisse dans l'URL

        return false;
        });
    }

});