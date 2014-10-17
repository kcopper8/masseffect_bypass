/**
 * Created by user on 2014-10-17.
 */
define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    var template = [
        '<div class="bp_card_cover"></div>',
        '<img src="<%=imgPath%>">'
    ].join('');

    var Card = Backbone.View.extend({
        initialize : function () {
            this.$el.html(this.template(this.model.toJSON()));

            this.listenTo(this.model, "change", this.render);
        },
        className : "bp_card",
        template : _.template(template),
        render : function () {
            this._setNormal();

            var state = this.model.get("state");
            if (state == "districted") {
                this.$el.addClass("bp_districted");
            } else if (state == "selected") {
                this.$el.addClass("bp_selected");
            }
        },

        _setNormal : function () {
            this.$el.prop("class", "bp_card");
        },

        getOffset : function () {
            return this.$el.offset();
        }
    });
    return Card;
});