/**
 * Created by user on 2014-10-16.
 */
define(['app/config', 'jquery', 'underscore', 'backbone', 'bui/card', 'bui/cursor', 'controller/CardContainer'], function (Config, $, _, Backbone, Card, Cursor, CardContainer) {
    var Slider = Backbone.View.extend({

        initialize : function () {
            this.$container = this.$("UL:first");
            this.listenTo(this.collection, "add", this.onAdd);
            this.listenTo(this.collection, "reset", this.onReset);

            this.onReset();

            this.cardContainer = new CardContainer();
            this.cursor = new Cursor();
            this.attachKeyDownListener();
        },
        onAdd : function (model /* , collection, option */) {
            console.log('onAdd');
            var $li = $("<LI>");

            var cardRow = _.map(['card1', 'card2', 'card3'], function (cardNumberPropertyName) {
                var cardModel = model.get(cardNumberPropertyName),
                    cardUi = new Card({
                        model : cardModel
                    });
                $li.append(cardUi.$el);
                return cardUi;
            });
            this.$container.append($li);
            this.cardContainer.addRow(cardRow);
        },

        onReset : function () {
            this.$container.empty();
        },

        _getMarginTop : function () {
            return parseInt(this.$container.css('margin-top'));
        },
        slideUp : function (callback) {
            var self = this;
            this.$container.animate({
                'margin-top' : (this._getMarginTop() - Config.CardHeight) + 'px'
            }, Config.SlideSpeedPerCard, 'linear', function () {
                if (!!callback) {
                    if (callback()) {
                        self.slideUp(callback);
                    }
                }
            });
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
            console.log(rowFix, colFix);

            var movedCard = this.cardContainer.cursorMove(rowFix, colFix);
            if (!movedCard) {
                // can't move target
                return;
            }
            movedCard.moveCursorToHere(this.cursor);
        },
        attachKeyDownListener : function () {
            $(document).keydown(_.bind(function (e) {
                console.log(e);
                if ([32, 37, 38, 39, 40].indexOf(e.keyCode) < 0) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();

                switch (e.keyCode) {
                    case 32: // space
                        break;
                    // arrows start
                    case 37:
                        this.moveCursor(0, -1);
                        break;
                    case 38:
                        this.moveCursor(-1, 0);
                        break;
                    case 39:
                        this.moveCursor(0, 1);
                        break;
                    case 40:
                        this.moveCursor(1, 0);
                        break;
                    // arrows end
                    default:
                        break;
                }
            }, this));
        }
    });
    Slider.build = function (selector, collection) {
        return new Slider({
            el : $(selector)[0],
            collection : collection
        })
    };
    return Slider;
});