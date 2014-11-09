/**
 * Created by user on 2014-11-07.
 */
define([
    'jquery',
    'bui/layout/viewContainer',
    'model/GameStageModel',
    'model/sliderRow',
    'model/code',
    'constant/Stage'
], function (
    $,
    ViewContainer,
    GameStageModel,
    SliderRow,
    Code,
    Stage
) {

    var StartController = function () {
        var sliderRow = new SliderRow();
        var gameStageModel = new GameStageModel();
        var viewContainer = new ViewContainer(".bp_container", sliderRow, gameStageModel);

        this.startStage = function () {
            gameStageModel.setStage(Stage.START);
            gameStageModel.setCurrentTargetCode(Code.getRandom());
            gameStageModel.on("startGame", function () {
                alert('startGame');
            });

            gameStageModel.on("exit", function () {
                alert('exit');
            });
        };
    };

    new StartController().startStage();
    return {};
});