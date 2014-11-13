/**
 * Created by user on 2014-10-18.
 */
define(['jquery', 'underscore', 'backbone', 'model/cardSet', 'bui/layout/sliderView', 'model/sliderRow', 'model/code', 'model/GameStageModel'], function ($, _, Backbone, CardSet, SliderView, SliderRow, Code, GameStageModel) {

    var collection = new SliderRow();
    var gameStatusModel = window.model =  new GameStageModel();

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