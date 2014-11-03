/**
 * Created by user on 2014-10-17.
 */
define(['jquery', 'underscore', 'backbone', 'model/cardSet', 'bui/layout/sliderView', 'model/sliderRow', 'model/code', 'model/GameStatusModel'], function ($, _, Backbone, CardSet, SliderView, SliderRow, Code, GameStatusModel) {

    var gameStatusModel = new GameStatusModel();
    var collection = new SliderRow();

    var slider = SliderView.create(collection, gameStatusModel);
    $(".bp_container").html("").append(slider.$el);

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