/**
 * Created by user on 2014-11-16.
 */
define(['jquery', 'imagesLoaded'], function ($, imagesLoaded) {
    console.log(imagesLoaded);

    $('<IMG src="https://masseffect.herokuapp.com/bypass/hacking/img/merged/backgrounds.png">')
        .imagesLoaded()
        .always(function () {
            alert("always");
        })
        .done(function () {
            alert("done");
        })
        .fail(function () {
            alert("fail");
        });
    return {};
});