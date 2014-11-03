/**
 * Created by user on 2014-10-18.
 */
define(['jquery', 'backbone', 'text!bui/template/cursorTemplate.html', 'bui/card'], function ($, Backbone, cursorTemplate) {
    var Cursor = Backbone.View.extend({
        className : "bp_cursor",
        initialize : function () {
            this.$el.html(cursorTemplate);
        },
        show : function () {
            this.$el.show();
        },
        hide : function () {
            this.$el.hide();
        }
    });
    return Cursor;
});