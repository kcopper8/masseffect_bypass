/**
 * Created by user on 2014-11-02.
 */
define(['backbone', 'jquery'], function (Backbone, $) {
    var Footer = Backbone.View.extend({
        initialize : function () {
            this.$remainCodeCounter = this.$(".bp_remain_code_count");
            this.listenTo(this.model, 'change', this.render);
            this.render();
        },
        events : {
            'click .bp_exit A' : function (e) {
                e.preventDefault();
                this.trigger("exit");
            }
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