/**
 * Created by user on 2014-10-21.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'bui/progress',
    'bui/targetPanel',
    'bui/statusPanel',
    'bui/cursor',
    'bui/layout/headerView',
    'bui/layout/descriptorView',
    'bui/layout/sliderView',
    'bui/layout/footerView',
    'bui/layout/viewContainer',
    'model/sliderRow',
    'model/code',
    'model/cardModel',
    'model/GameStatusModel',
    'controller/CardContainer',
    'controller/prizeController',
    'controller/gameController',
    'app/config',
    'tool'
], function (
    $,
    _,
    Backbone,
    Progress,
    TargetPanel,
    StatusPanel,
    Cursor,
    HeaderView,
    DescriptorView,
    SliderView,
    FooterView,
    ViewContainer,
    SliderRow,
    Code,
    CardModel,
    GameStatusModel,
    CardContainer,
    prizeController,
    GameController,
    Config,
    tool
    ) {

    var gameStatusModel = new GameStatusModel();
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