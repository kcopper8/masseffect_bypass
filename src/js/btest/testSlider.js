/**
 * Created by user on 2014-10-18.
 */
define(['jquery', 'underscore', 'backbone', 'model/cardSet', 'bui/slider', 'model/sliderRow', 'model/code', 'model/GameStatusModel'], function ($, _, Backbone, CardSet, Slider, SliderRow, Code, GameStatusModel) {

    var collection = new SliderRow();
    var gameStatusModel = window.model =  new GameStatusModel();

    var slider = new Slider({
        el : $(".bp_slider"),
        collection : collection,
        model : gameStatusModel
    });

    function prepare(collection) {
        collection.addCodes(Code.getRandom(), Code.getRandom(), Code.getRandom());
        collection.addCodes(Code.getRandom(), Code.getRandom(), Code.getRandom());
        collection.addCodes(Code.getRandom(), Code.getRandom(), Code.getRandom());
        collection.addCodes(Code.getRandom(), Code.getRandom(), Code.getRandom());
        collection.addCodes(Code.getRandom(), Code.getRandom(), Code.getRandom());
    }

    window.slider=  slider;
    window.CardSet = CardSet;

    prepare(collection);


    slider.on("cursor:selected", function () {
        console.log('cursor:selected');
    });
    slider.setCursorToSomePoint();

    slider.slideUp(function () {
        collection.addCodes(Code.getRandom(), Code.getRandom(), Code.getRandom());
        return !window.tpStop;
    });

    return {};
});