/**
 * Created by user on 2014-11-03.
 */
define([
    'backbone',
    'underscore',
    'text!bui/layout/headerViewTemplate.html',
    'bui/progress'], function (
    Backbone,
    _,
    headerViewTemplate,
    Progress) {

    var HeaderView = Backbone.View.extend({
        className : "bp_header",
        initialize : function () {
            this.$el.html(headerViewTemplate);
            this.progress = new Progress({
                model : this.model
            });

            this.$(".bp_progresser").append(this.progress.$el);
        }
    });

    HeaderView.build = function (selector, model) {
        return new HeaderView({
            el : $(selector),
            model : model
        });
    };

    HeaderView.create = function (model) {
        return new HeaderView({
            model : model
        });
    };

    return HeaderView;
});