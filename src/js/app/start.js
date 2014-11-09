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
    'controller/gameHelper',
    'controller/gameStageController'
], function (
    $,
    Config,
    ViewContainer,
    GameStageModel,
    SliderRow,
    Code,
    Stage,
    gameHelper,
    gameStageController
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

            gameStageModel.on("accessDenied", function () {
                this.accessDeniedStage();
            }, this);
        };
        
        this.gameStage = function () {
            gameStageController.prepareStage(viewContainer, gameStageModel, sliderRow);

            gameStageModel.once('hackingSuccessed', function () {
                this.successStage();
            }, this);
            
            gameStageModel.setStage(Stage.GAME);
        };

        this.successStage = function () {
            alert('successed');
            gameStageModel.setStage(Stage.SUCCESS);
        };

        this.accessDeniedStage = function () {
            alert('accessDenied');
            gameStageModel.setStage(Stage.ACCESS_DENIED);

        };
    };

    new StartController().startStage();
    return {};
});