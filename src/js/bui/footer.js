/**
 * Created by user on 2014-11-02.
 */
define(['backbone', 'jquery', 'text!bui/template/footerTemplate.html'], function (Backbone, $, footerTemplate) {
    var Footer = Backbone.View.extend({
        template : _.template(footerTemplate),
        events : {
            'click .bp_exit A' : function (e) {
                e.preventDefault();
                this.trigger("exit");
            }
        },
        className : "bp_footer",

        initialize : function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$remainCodeCounter = this.$(".bp_remain_code_count");
            this.listenTo(this.model, 'change', this.render);
            this.render();
        },
        render : function () {
            this.$remainCodeCounter.html(this.model.getRemainCodeCount());
        }
    });

    Footer.build = function (selector, model) {
        return new Footer({
            el : $(selector),
            model : model
        });
    };

    return Footer;
});