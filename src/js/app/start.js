/**
 * Created by user on 2014-11-07.
 */
define([
    'jquery',
    'app/config',
    'bui/layout/viewContainer',
    'model/GameStageModel',
    'model/sliderRow',
    'model/code',
    'constant/Stage',
    'controller/gameHelper'
], function (
    $,
    Config,
    ViewContainer,
    GameStageModel,
    SliderRow,
    Code,
    Stage,
    gameHelper
) {

    var StartController = function () {
        var sliderRow = new SliderRow();
        var gameStageModel = new GameStageModel();
        var viewContainer = new ViewContainer(".bp_container", sliderRow, gameStageModel);

        this.startStage = function () {
            gameStageModel.setStage(Stage.START);
            gameStageModel.setCurrentTargetCode(Code.getRandom());
            gameStageModel.once("startGame", function () {
                this.gameStage();
            }, this);

            gameStageModel.once("exit", function () {
                alert('exit');
            }, this);
        };
        
        this.gameStage = function () {
            _.times(Config.RowsCountInSlide + 1, function () {
                gameHelper.addRandomCardRow(sliderRow);
            });


            gameStageModel.setStage(Stage.GAME);
        }
    };

    new StartController().startStage();
    return {};
});