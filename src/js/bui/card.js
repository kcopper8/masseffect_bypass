/**
 * Created by user on 2014-10-17.
 */
define(['jquery', 'underscore', 'backbone', 'text!bui/template/cardTemplate.html'], function ($, _, Backbone, cardTemplate) {
    var Card = Backbone.View.extend({
        initialize : function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$card = this.$(".bp_card");

            this.listenTo(this.model, "change:unauthorized_access", _.bind(this.setUnauthorizedAccess, this));
            this.listenTo(this.model, "change:state", _.bind(this.setState, this));
            this.render();
        },
        events : {
            "click .bp_card" : function () {
                this.trigger("click", this);
            }
        },
        className : "bp_card_outline",
        template : _.template(cardTemplate),
        setUnauthorizedAccess : function () {
            this.$el.toggleClass('bp_unauthorized_access', this.model.get('unauthorized_access'));
            this.$(".bp_unauth_cover").show({
                effect : "puff",
                percent : 300,
                duration : 300,
                complete : function () {
                    $(this).hide("pulsate");
                }
            });

        },
        setState : function () {
            var state = this.model.get("state");
            if (state == "districted") {
                this.$card.addClass("bp_districted");
            } else if (state == "selected") {
                this.$card.addClass("bp_selected");
                this.$(".bp_card_cover")
                    .hide()
                    .show({
                        effect : "puff",
                        duration : 300
                    })
                    .effect({
                        effect : "pulsate",
                        duration : 300,
                        times : 2,
                        complete : function() {
                            $(this).removeAttr("style");
                        }
                    });
            }
        },
        render : function () {
            var state = this.model.get("state");
            if (state == "districted") {
                this.$card.addClass("bp_districted");
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