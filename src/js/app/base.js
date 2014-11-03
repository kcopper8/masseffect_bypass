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
    'model/sliderRow',
    'model/code',
    'model/cardModel',
    'model/GameStatusModel',
    'controller/CardContainer',
    'controller/prizeController',
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
    SliderRow,
    Code,
    CardModel,
    GameStatusModel,
    CardContainer,
    prizeController,
    Config,
    tool
    ) {

    var gameStatusModel = new GameStatusModel();
    var sliderRowCollection = new SliderRow();


    var headerView = HeaderView.create(gameStatusModel);
    var descriptorView = DescriptorView.create(gameStatusModel);
    var sliderView = SliderView.create(sliderRowCollection, gameStatusModel);
    var footerView = FooterView.create(gameStatusModel)

    $(".bp_container").html("")
        .append(headerView.$el)
        .append(descriptorView.$el)
        .append(sliderView.$el)
        .append(footerView.$el);

    var progress = headerView.progress;
    var targetPanel = descriptorView.targetPanelView;
    var statusPanel = descriptorView.statusPanelView;
    var footer = footerView;
    var slider = sliderView;

    gameStatusModel.setCurrentTargetCode(Code.getRandom());

    var gameController = new (function () {
        this.gameCompletelyFailed = function () {
            _.delay(function () {
                prizeController.moveToFailedTarget();
            }, 2000);
        };

        this.gameCompletelySuccessed = function () {
            statusPanel.once("codeCompiled", function () {
                gameStatusModel.set('completed', true);
                _.delay(function () {
                    prizeController.moveToSuccessTarget();
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

        this.addRandomCard = function () {
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

    footer.on("exit", function () {
        gameStatusModel.accessDenied();
    });



    slider.on("cursor:moved", function (card) {
        var cardModel = card.model;
        if (cardModel.isDistricted()) {
            gameController.failureOnce(cardModel);
        }
    });

    slider.on("cursor:selected", function (card) {
        var cardModel = card.model;
        if (cardModel.isSelected()) {
            // 이미 선택한 코드는 반응하지 않는다.
            return;
        }

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