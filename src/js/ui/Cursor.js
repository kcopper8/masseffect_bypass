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

        this.moveTo = function (card) {
            var coordinates = card.getOffset();
            $el.css({
                'top' : coordinates.top + 'px',
                'left' : coordinates.left + 'px'
            })
        };

    };

    return Cursor;
});