/**
 * Created by user on 2014-11-16.
 */
define([
    'jquery',
    'imagesLoaded',
    'underscore',
    'app/config'
], function ($, imagesLoaded, _, Config) {

    var imageTemplate = _.template('<img src="<%-url%>">');
    var imagesLoadedDeferreds = _.map(Config.PreLoadImages, function (imageUrl) {
        var imgHtml = imageTemplate({
            url : imageUrl
        });

        return $(imgHtml).imagesLoaded();
    });

    $.when.apply($, imagesLoadedDeferreds);





    return prepareChecker;
});