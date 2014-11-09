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
            this.render();
        },
        render : function () {
            this.setAttmeptCount(this.model.getAttemptCount());
        },
        setAttmeptCount : function (nCount) {
            this.$remainCodeCounter.html(nCount);
            this.$remainCodeCounter.attr("class", "bp_number bp_" + nCount);
        }
    });

    Footer.create = function (model) {
        return new Footer({
            model : model
        });
    };

    return Footer;
});