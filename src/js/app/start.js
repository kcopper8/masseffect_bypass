/**
 * Created by user on 2014-11-07.
 */
define([
    'jquery',
    'bui/layout/viewContainer',
    'model/GameStatusModel',
    'model/sliderRow'
], function (
    $,
    ViewContainer,
    GameStatusModel,
    SliderRow
) {

    var StartController = function () {
        this.sliderRow = new SliderRow();
        this.gameStatusModel = new GameStatusModel();
        this.viewContainer = new ViewContainer(".bp_container", this.sliderRow, this.gameStatusModel);

        this.startStage = function () {
            this.gameStatusModel.set('stage', 'start');
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