/**
 * Created by user on 2014-11-04.
 */
define([
    'app/config',
    'jquery',
    'underscore',
    'backbone',
    'constant/Stage',
    'bui/card',
    'bui/cursor',
    'controller/CardContainer',
    'model/point'], function (Config, $, _, Backbone, Stage, Card, Cursor, CardContainer, Point) {
    var SliderView = Backbone.View.extend({
        className : "bp_slider",

        initialize : function () {
            this.$el.html("<ul></ul>");
            this.$container = $("<UL>").appendTo(this.$el);

            this.listenTo(this.model, "change:stage", this.onChangeStage);
            this.listenTo(this.collection, "add", this.onAdd);
            this.listenTo(this.collection, "reset", this.onReset);

            this.onReset();

            this.cardContainer = new CardContainer();
            this.cursor = new Cursor();
            this.attachKeyDownListener();
            this.overflowdCardRow = -1;
        },
        events : {
            "click .bp_cursor" : "onClickCursor"
        },
        onChangeStage : function () {
            if (this.model.get('stage') == Stage.GAME) {
                this.setCursorToSomePoint();
            }
        },
        onAdd : function (model /* , collection, option */) {
            var $li = $("<LI>");

            var cardRow = _.map(['card1', 'card2', 'card3'], _.bind(function (cardNumberPropertyName) {
                var cardModel = model.get(cardNumberPropertyName),
                    cardUi = new Card({
                        model : cardModel
                    });

                $li.append(cardUi.$el);
                this.listenTo(cardUi, "click", _.bind(this.onClickCard, this));
                return cardUi;
            }, this));
            this.$container.append($li);
            this.cardContainer.addRow(cardRow);
        },

        onClickCursor : function () {
            this.onSelected();
        },

        onClickCard : function (card) {
            var fixs = this.cardContainer.findCardPositionAroundCursor(card);
            if (!!fixs) {
                this.moveCursor(fixs[0], fixs[1]);
            }
        },

        onReset : function () {
            this.$container.empty();
        },


        slideUp : function (callback) {
            var fnOnSlideComplete = _.bind(function () {
                this.overflowdCardRow++;

                var beforeOverflowedCardRow = this.overflowdCardRow;
                setTimeout(_.bind(function () {
                    var cardsForClear = this.cardContainer.getRow(beforeOverflowedCardRow);
                    _.each(cardsForClear, function (card) {
                        card.clearContents();
                    });
                }, this), 0);

                var point = this.cardContainer.getCurrentCardPosition();
                if (point.row - 1 <= this.overflowdCardRow) {
                    this.moveCursor(1, 0);
                }

                if (!!callback && callback()) {
                    this.slideUp(callback);
                }
            }, this);

            var fnOnSlideProgress = _.bind(function (/* Promise */ animation, /* Number */ progress, /* Number */ remainingMs) {
                if (this.model.isGameStopped()) {
                    animation.stop();
                }
            }, this);


            this.$container.animate({
                    'top' : (this.$container.position().top - Config.CardHeight)
                }, {
                    duration: Config.SlideSpeedPerCard,
                    easing: 'linear',
                    complete: fnOnSlideComplete,
                    progress : fnOnSlideProgress
                }
            );
        },
        _isCanMovePosition : function (point) {
            if (!point || !(point instanceof Point)) {
                return false;
            }

            if (this.overflowdCardRow + 1 >= point.row) {
                return false;
            }

            if (this.overflowdCardRow + 1 + Config.RowsCountInSlide <= point.row) {
                return false;
            }

            return true;
        },

        setCursorToSomePoint : function () {
            this.setCursor(1, 1);
        },
        setCursor : function (row, col) {
            this.cardContainer.setCurrent(row, col);

            var card = this.cardContainer.getCurrentCard();
            card.moveCursorToHere(this.cursor);
        },
        moveCursor : function (rowFix, colFix) {
            var toMovePoint = this.cardContainer.getFixedPosition(rowFix, colFix);
            if (!this._isCanMovePosition(toMovePoint)) {
                return;
            }

            this.cardContainer.cursorMoveToPosition(toMovePoint);
            var cursorMovedToCard = this.cardContainer.getCurrentCard();
            cursorMovedToCard.moveCursorToHere(this.cursor);
            this.trigger("cursor:moved", cursorMovedToCard);
        },
        onSelected : function () {
            var card = this.cardContainer.getCurrentCard();
            this.trigger("cursor:selected", card);
        },
        attachKeyDownListener : function () {
            $(document).keydown(_.bind(function (e) {
                if ([32, 37, 38, 39, 40, 65, 68, 83, 87 ].indexOf(e.keyCode) < 0) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();

                if (this.model.isGameStopped()) {
                    return;
                }

                switch (e.keyCode) {
                    case 32: // space
                        this.onSelected();
                        break;
                    // arrows start
                    // left
                    case 37:
                    case 65: // a
                        this.moveCursor(0, -1);
                        break;
                    // up
                    case 38:
                    case 87: // w
                        this.moveCursor(-1, 0);
                        break;
                    // right
                    case 39:
                    case 68: // d
                        this.moveCursor(0, 1);
                        break;
                    // down
                    case 40:
                    case 83: // s
                        this.moveCursor(1, 0);
                        break;
                    // arrows end
                    default:
                        break;
                }
            }, this));
        }
    });

    SliderView.create = function (collection, gameStatusModel) {
        return new SliderView({
            collection : collection,
            model : gameStatusModel
        });
    };
    return SliderView;
});