/**
 * Created by user on 2014-10-12.
 */
define(['jquery', 'ui/Card'], function ($, Card) {
    var Cursor = function (el) {
        var $el = this.$el = $(el);

        this.hide = function () {
            $el.hide();
        };

        this.show = function () {
            $el.show();
        };

        this.hoverTargetCard = null;

        this.moveTo = function (card) {
            this.hoverTargetCard = card;
            var coordinates = this.hoverTargetCard.getOffset();
            $el.css({
                'top' : coordinates.top + 'px',
                'left' : coordinates.left + 'px'
            })
        };

        this.getHoverCard = function () {
            return this.hoverTargetCard;
        };
    };

    return Cursor;
});