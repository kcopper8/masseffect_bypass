/**
 * Created by user on 2014-10-12.
 */
define(['jquery', 'app/config', 'ui/Card', 'ui/Cursor'], function ($, Config, Card, Cursor) {
    var Slider = function(el) {
        var $el = this.$el = $(el);
        var $container = this.$container = $el.find("UL");
        var cardContainer = [];

        function _getMarginTop() {
            return parseInt($container.css('margin-top'));
        }

        this.clear = function() {
            $container.html("");
            cardContainer = [];
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

            cardContainer.push(cardContainerRow);

            $.each(cards, function(nIndex, oItem) {
                cardContainerRow.push(oItem);
                $appendedLi.append(oItem.$el);
            });
        };

        this.getCard = function(row, col) {
            return cardContainer[row][col];
        };
        
        this.removeFirstRowOfElement = function () {
            $container.find("LI:first").remove();
            $container.css({'margin-top' : '0px'});
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