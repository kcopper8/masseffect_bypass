/**
 * Created by user on 2014-10-21.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'bui/layout/viewContainer',
    'model/sliderRow',
    'model/code',
    'model/GameStatusModel',
    'controller/prizeController',
    'controller/gameController'
], function (
    $,
    _,
    Backbone,
    ViewContainer,
    SliderRow,
    Code,
    GameStatusModel,
    prizeController,
    GameController
    ) {

    var gameStatusModel = window.model = new GameStatusModel();
    gameStatusModel.setCurrentTargetCode(Code.getRandom());

    var sliderRowCollection = new SliderRow();

    var viewContainer = new ViewContainer(".bp_container", sliderRowCollection, gameStatusModel);

    var gameController = new GameController(viewContainer, sliderRowCollection, gameStatusModel, prizeController);

    gameStatusModel.on("hackingSuccessed", function () {
        gameController.gameCompletelySuccessed();
    });

    gameStatusModel.on("accessDenied", function () {
        gameController.gameCompletelyFailed();
    });

    viewContainer.sliderView.slideUp(function () {
        gameController.addRandomCard();
        return true;
    });
    gameStatusModel.startGameTime();
    return {};
});