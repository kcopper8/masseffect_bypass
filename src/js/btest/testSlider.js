/**
 * Created by user on 2014-10-18.
 */
define(['jquery', 'underscore', 'backbone', 'model/cardSet', 'bui/slider', 'model/sliderRow', 'model/code'], function ($, _, Backbone, CardSet, Slider, SliderRow, Code) {

    var collection = new SliderRow();

    var slider = new Slider({
        el : $(".bp_slider"),
        collection : collection
    });

    function prepare(collection) {
        collection.add(new CardSet(Code.getRandom(), Code.getRandom(), Code.getRandom()));
        collection.add(new CardSet(Code.getRandom(), Code.getRandom(), Code.getRandom()));
        collection.add(new CardSet(Code.getRandom(), Code.getRandom(), Code.getRandom()));
        collection.add(new CardSet(Code.getRandom(), Code.getRandom(), Code.getRandom()));
        collection.add(new CardSet(Code.getRandom(), Code.getRandom(), Code.getRandom()));
        collection.add(new CardSet(Code.getRandom(), Code.getRandom(), Code.getRandom()));
    }

    window.slider=  slider;
    window.CardSet = CardSet;

    slider.slideUp(function () {
        collection.add(new CardSet(Code.getRandom(), Code.getRandom(), Code.getRandom()));
        return true;
    });

    prepare(collection);
    return {};
});