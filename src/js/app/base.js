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
    'bui/slider',
    'bui/cursor',
    'model/sliderRow',
    'model/code',
    'model/cardModel',
    'model/gameStatusModel',
    'controller/CardContainer',
    'app/config',
    'tool'
], function (
    $,
    _,
    Backbone,
    Progress,
    TargetPanel,
    StatusPanel,
    Slider,
    Cursor,
    SliderRow,
    Code,
    CardModel,
    GameStatusModel,
    CardContainer,
    Config,
    tool
    ) {

    var gameStatusModel = new GameStatusModel();
    var sliderRowCollection = new SliderRow();

    var progress = Progress.build(".bp_progress", gameStatusModel);
    var targetPanel = TargetPanel.build(".bp_target_panel", gameStatusModel);
    var statusPanel = StatusPanel.build(".bp_status_panel", gameStatusModel);

    gameStatusModel.setCurrentTargetCode(Code.getRandom());


    var slider = Slider.build('.bp_slider', sliderRowCollection, gameStatusModel);

    function failure(card) {
        card.model.setUnauthorizedAccess();
        gameStatusModel.addFailure();
    }


    slider.on("cursor:moved", function (card) {
        if (card.model.isDistricted()) {
            console.log('isDistricted');
            failure(card);
        }
    });

    gameStatusModel.on("hackingSuccessed", function () {
        statusPanel.once("codeCompiled", function () {
           gameStatusModel.set('completed', true);
        });
        statusPanel.hackingSuccessed();
    });

    gameStatusModel.on("accessDenied", function () {
       alert('access Deined!');
        alert('access Deined!');
        alert('access Deined!');
    });


    slider.on("cursor:selected", function (card) {
        var code = card.model.getCode();
        if (code != gameStatusModel.getCurrentTargetCode()) {
            // 실패 처리
            console.log('failed', card);
            failure(card);
            return;
        }

        card.model.setSelected();
        gameStatusModel.addHacked(code);
        gameStatusModel.setCurrentTargetCode(Code.getRandom());
    });

    function createRandomCard() {
        var card = CardModel.build(Code.getRandom());
        if (tool.randomBoolean(Config.CardDistrictedRatio)) {
            card.setDistricted();
        }
        return card;
    }

    function addRandomCard() {
        sliderRowCollection.addCodes(
            createRandomCard(),
            createRandomCard(),
            createRandomCard()
        );
    }

    _.times(Config.RowsCountInSlide + 1, addRandomCard);

    slider.setCursorToSomePoint();

    slider.slideUp(function () {
        addRandomCard();
        return true;
    });

    return {};
});