/**
 * Created by user on 2014-10-17.
 */
define(['jquery', 'underscore', 'backbone', 'text!bui/template/cardTemplate.html'], function ($, _, Backbone, cardTemplate) {
    var Card = Backbone.View.extend({
        initialize : function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$card = this.$(".bp_card");

            this.listenTo(this.model, "change", this.render);
            this.render();
        },
        events : {
            "click .bp_card" : function () {
                this.trigger("click", this);
            }
        },
        className : "bp_card_outline",
        template : _.template(cardTemplate),
        render : function () {
            this._setNormal();

            var state = this.model.get("state");
            if (state == "districted") {
                this.$card.addClass("bp_districted");
            } else if (state == "selected") {
                this.$card.addClass("bp_selected");
            }

            if (this.model.get('unauthorized_access')) {
                this.$card.addClass('bp_unauthorized_access');
            }
        },

        _setNormal : function () {
            this.$card.prop("class", "bp_card");
        },

        getOffset : function () {
            return this.$card.offset();
        },

        moveCursorToHere : function (cursor) {
            this.$el.prepend(cursor.$el);
            cursor.show();
        },

        clearContents : function () {
            this.$el.empty();
        }
    });
    return Card;
});