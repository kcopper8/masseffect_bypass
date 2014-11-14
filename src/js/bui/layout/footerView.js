/**
 * Created by user on 2014-11-04.
 */
define(['jquery', 'backbone', 'text!bui/layout/footerViewTemplate.html'], function ($, Backbone, footerTemplate) {
    var Footer = Backbone.View.extend({
        template : _.template(footerTemplate),
        events : {
            'click .bp_exit BUTTON' : function (e) {
                e.preventDefault();
                this.model.trigger("exit");
            }
        },
        className : "bp_footer",

        initialize : function () {
            this.$el.html(this.template());
            this.$remainCodeCounter = this.$(".bp_remaining_attempts .bp_number");
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'change:stage', _.bind(this.onChangeStage, this));
            this.render();
        },
        render : function () {
            this.setAttmeptCount(this.model.getAttemptCount());
        },
        onChangeStage : function () {
            this.$(".bp_button").html(this.model.isStartStage() ? "Skip" : "Exit");
        },
        setAttmeptCount : function (nCount) {
            this.$remainCodeCounter.html(nCount);
            this.$remainCodeCounter.attr("class", "bp_number bp_" + nCount);
        }
    });

    Footer.build = function (selector, model) {
        return new Footer({
            el : $(selector),
            model : model
        });
    };

    Footer.create = function (model) {
        return new Footer({
            model : model
        });
    };

    return Footer;
});