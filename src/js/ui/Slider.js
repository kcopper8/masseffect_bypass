/**
 * Created by user on 2014-10-12.
 */
define(['jquery', 'app/config', 'ui/Card', 'ui/Cursor'], function ($, Config, Card, Cursor) {
    var Slider = function(el, cardContainer) {
        var $el = this.$el = $(el);
        var $container = $el.find("UL");
        this.cardContainer = cardContainer;

        function _getMarginTop() {
            return parseInt($container.css('margin-top'));
        }

        this.clear = function() {
            $container.html("");
            cardContainer.clear();
        };

        this.addRow = function(codes) {
            this.addRowWithCards([
                new Card(codes[0])
                , new Card(codes[1])
                , new Card(codes[2])
            ]);
        };

        this.addRowWithCards = function(cards) {
            var $appendedLi = $("<LI></LI>").appendTo($container),
                cardContainerRow = [];

            $.each(cards, function(nIndex, oItem) {
                cardContainerRow.push(oItem);
                $appendedLi.append(oItem.$el);
            });
            cardContainer.addRow(cardContainerRow);
        };

        this.getCard = function(row, col) {
            return cardContainer.get(row, col);
        };
        
        this.slideUp = function (callback) {
            var self = this;
            $container.animate({
                "margin-top": (_getMarginTop() - (Config.CardHeight * Config.SlideAmount)) + "px"
            }, (Config.SlideSpeedPerCard * Config.SlideAmount), 'linear', function() {
                if (!!callback) {
                    for(var i = 0; i < Config.SlideAmount; i++) {
                        if (!callback()) {
                            return;
                        }
                    }
                    if (i > 0) {
                        self.slideUp(callback);
                    }
                }
            });
        };

        (function initialize() {
            this.clear();
            this.cursor = new Cursor($(".bp_cursor"));
        }).call(this);
    };
    return Slider;
});