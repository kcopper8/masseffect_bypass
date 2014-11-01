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


    var completeController = new (function(){
        this.moveToSuccessTarget = function () {
            return;
            location.href = "http://masseffect.wikia.com/wiki/Mass_Effect_Wiki";
        };

        this.moveToFailedTarget = function () {
            return;
            location.href = "http://masseffect.wikia.com/wiki/Mass_Effect_Wiki";
        };
    })();

    var gameController = new (function () {
        this.gameCompletelyFailed = function () {
            _.delay(function () {
                completeController.moveToFailedTarget();
            }, 2000);
        };

        this.gameCompletelySuccessed = function () {
            statusPanel.once("codeCompiled", function () {
                gameStatusModel.set('completed', true);
                _.delay(function () {
                    completeController.moveToSuccessTarget();
                }, 2000);
            });
            statusPanel.hackingSuccessed();

        };

        this.failureOnce = function (cardModel) {
            cardModel.setUnauthorizedAccess();
            gameStatusModel.addFailure();
        };

        function createRandomCard () {
            var card = CardModel.build(Code.getRandom());
            if (tool.randomBoolean(Config.CardDistrictedRatio)) {
                card.setDistricted();
            }
            return card;
        }

        this.addRandomCard =function () {
            sliderRowCollection.addCodes(
                createRandomCard(),
                createRandomCard(),
                createRandomCard()
            );
        };
    })();

    gameStatusModel.on("hackingSuccessed", function () {
        gameController.gameCompletelySuccessed();
    });

    gameStatusModel.on("accessDenied", function () {
        gameController.gameCompletelyFailed();
    });

    var slider = Slider.build('.bp_slider', sliderRowCollection, gameStatusModel);

    slider.on("cursor:moved", function (card) {
        var cardModel = card.model;
        if (cardModel.isDistricted()) {
            gameController.failureOnce(cardModel);
        }
    });

    slider.on("cursor:selected", function (card) {
        var cardModel = card.model;
        var code = cardModel.getCode();
        if (code != gameStatusModel.getCurrentTargetCode()) {
            // 실패 처리
            gameController.failureOnce(cardModel);
            return;
        }

        cardModel.setSelected();
        gameStatusModel.addHacked(code);
        gameStatusModel.setCurrentTargetCode(Code.getRandom());
    });

    _.times(Config.RowsCountInSlide + 1, gameController.addRandomCard);

    slider.setCursorToSomePoint();

    slider.slideUp(function () {
        gameController.addRandomCard();
        return true;
    });
    gameStatusModel.startGameTime();

    return {};
});