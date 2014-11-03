/**
 * Created by user on 2014-11-04.
 */
define(['underscore', 'app/config', 'model/cardModel', 'tool', 'model/code'], function (_, Config, CardModel, tool, Code) {
    var GameController = function (viewContainer, sliderRowCollection, gameStatusModel, prizeController) {
        this.gameCompletelyFailed = function () {
            _.delay(function () {
                prizeController.moveToFailedTarget();
            }, 2000);
        };

        this.gameCompletelySuccessed = function () {
            viewContainer.descriptorView.statusPanelView.once("codeCompiled", function () {
                gameStatusModel.set('completed', true);
                _.delay(function () {
                    prizeController.moveToSuccessTarget();
                }, 2000);
            });
            viewContainer.descriptorView.statusPanelView.hackingSuccessed();
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


        viewContainer.footerView.on("exit", function () {
            gameStatusModel.accessDenied();
        });

        viewContainer.sliderView.on("cursor:moved", function (card) {
            var cardModel = card.model;
            if (cardModel.isDistricted()) {
                this.failureOnce(cardModel);
            }
        }, this);


        viewContainer.sliderView.on("cursor:selected", function (card) {
            var cardModel = card.model;
            if (cardModel.isSelected()) {
                // 이미 선택한 코드는 반응하지 않는다.
                return;
            }

            var code = cardModel.getCode();
            if (code != gameStatusModel.getCurrentTargetCode()) {
                // 실패 처리
                this.failureOnce(cardModel);
                return;
            }

            cardModel.setSelected();
            gameStatusModel.addHacked(code);
            gameStatusModel.setCurrentTargetCode(Code.getRandom());
        }, this);

        _.times(Config.RowsCountInSlide + 1, this.addRandomCard);

        viewContainer.sliderView.setCursorToSomePoint();
    };

    return GameController;
});