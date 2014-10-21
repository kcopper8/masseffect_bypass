/**
 * Created by user on 2014-10-16.
 */
define(['app/config', 'jquery', 'underscore', 'backbone', 'bui/card', 'bui/cursor'], function (Config, $, _, Backbone, Card, Cursor) {
    var Slider = Backbone.View.extend({

        initialize : function () {
            this.$container = this.$("UL:first");
            this.listenTo(this.collection, "add", this.onAdd);
            this.listenTo(this.collection, "reset", this.onReset);

            this.onReset();
            this.cardRows = [];
            this.cursor = new Cursor({
                el : this.$('.bp_cursor')
            });
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
            });
            this.$container.append($li);
            this.cardRows.push(cardRow);
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