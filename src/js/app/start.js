/**
 * Created by user on 2014-11-07.
 */
define([
    'jquery',
    'bui/layout/viewContainer',
    'model/GameModel',
    'model/sliderRow'
], function (
    $,
    ViewContainer,
    GameModel,
    SliderRow
) {

    var StartController = function () {
        this.sliderRow = new SliderRow();
        this.gameModel = new GameModel();
        this.viewContainer = new ViewContainer(".bp_container", this.sliderRow, this.gameModel);

        this.startStage = function () {
            this.gameModel.set('stage', 'start');
        };

        this.gameStage = function () {

        };

        this.hackCompletedStage = function () {

        };


        this.accessDeniedStage = function () {

        };

    };

    new StartController().startStage();
    return {};
});