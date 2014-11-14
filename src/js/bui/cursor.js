/**
 * Created by user on 2014-10-18.
 */
define(['backbone'], function (Backbone) {
    var Cursor = Backbone.View.extend({
        className : "bp_cursor",
        show : function () {
            this.$el.show();
        },
        hide : function () {
            this.$el.hide();
        }
    });
    return Cursor;
});