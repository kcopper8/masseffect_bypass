/**
 * Created by user on 2014-11-07.
 */
define([
    'jquery',
    'underscore',
    'app/config',
    'bui/layout/viewContainer',
    'model/GameStageModel',
    'model/sliderRow',
    'model/code',
    'constant/Stage',
    'controller/gameHelper',
    'controller/gameStageController',
    'controller/prizeController'
], function (
    $,
    _,
    Config,
    ViewContainer,
    GameStageModel,
    SliderRow,
    Code,
    Stage,
    gameHelper,
    gameStageController,
    prizeController
) {

    var StartController = function () {
        var sliderRow = new SliderRow();
        var gameStageModel = window.model = new GameStageModel();
        var viewContainer = ViewContainer.build(".bp_container", sliderRow, gameStageModel);

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
            gameStageModel.setStage(Stage.SUCCESS);

            gameStageModel.once("firewallRemoved", function () {
                this.firewallRemovedStage();
            }, this);
        };

        this.firewallRemovedStage = function () {
            gameStageModel.setStage(Stage.FIREWALL_REMOVED);
            _.delay(function () {
                prizeController.moveToSuccessTarget();
            }, Config.WaitSecondAfterCompleted * 1000);
        };

        this.accessDeniedStage = function () {
            gameStageModel.setStage(Stage.ACCESS_DENIED);
            _.delay(function () {
                prizeController.moveToFailedTarget();
            }, Config.WaitSecondAfterCompleted * 1000);
        };
    };

    new StartController().startStage();
    return {};
});