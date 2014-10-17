/**
 * Created by user on 2014-10-18.
 */
define(['jquery', 'backbone', 'bui/card'], function ($, Backbone) {
    var Cursor = Backbone.View.extend({
        el : $(".bp_cursor"),
        show : function () {
            this.$el.show();
        },
        hide : function () {
            this.$el.hide();
        },
        moveTo : function (card) {
            if (!card) {
                return;
            }
            this.hoverTargetCard = card;

            var coordinates = card.getOffset();
            this.$el.css({
                'top' : coordinates.top + 'px',
                'left' : coordinates.left + 'px'
            });
        },
        getHoverCard : function () {
            return this.hoverTargetCard;
        }
    });
    return Cursor;
});