/**
 * Created by user on 2014-10-18.
 */
define(['jquery', 'backbone', 'bui/card'], function ($, Backbone) {
    var template = [
        '<img class="bp_left" src="img/cursor_left.png">',
        '<img class="bp_arrow" src="img/cursor_arrow.png">',
        '<img class="bp_right" src="img/cursor_right.png">'
    ].join('');

    var Cursor = Backbone.View.extend({
        className : "bp_cursor",
        initialize : function () {
            this.$el.html(template);
        },
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