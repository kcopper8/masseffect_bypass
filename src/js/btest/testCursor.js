/**
 * Created by user on 2014-10-17.
 */
define(['jquery', 'underscore', 'backbone', 'model/cardSet', 'bui/slider', 'model/sliderRow', 'model/code'], function ($, _, Backbone, CardSet, Slider, SliderRow, Code) {

    var collection = new SliderRow();

    var slider = new Slider({
        el : $(".bp_slider"),
        collection : collection
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

    slider.setCursorToSomePoint();

    return {};
});