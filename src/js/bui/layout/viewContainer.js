/**
 * Created by user on 2014-11-04.
 */
define([
    'jquery',
    'jquery-ui',
    'backbone',
    'bui/layout/headerView',
    'bui/layout/descriptorView',
    'bui/layout/sliderView',
    'bui/layout/footerView'
], function ($, $ui, Backbone, HeaderView, DescriptorView, SliderView, FooterView) {
    var ViewContainer = Backbone.View.extend({
        initialize : function () {
            this.headerView = HeaderView.create(this.model);
            this.descriptorView = DescriptorView.create(this.model);
            this.sliderView = SliderView.create(this.collection, this.model);
            this.footerView = FooterView.create(this.model);

            this.$el.html("")
                .append(this.headerView.$el)
                .append(this.descriptorView.$el)
                .append(this.sliderView.$el)
                .append(this.footerView.$el);


            this.listenTo(this.model, "decreaseAttempt", this.onDecreaseAttempt);
        },

        onDecreaseAttempt : function () {
            this.$el.effect("shake");
        }
    });

    ViewContainer.build = function (selector, sliderRowCollection, gameStatusModel) {
        return new ViewContainer({
            el : $(selector),
            collection : sliderRowCollection,
            model : gameStatusModel
        });
    };
    /*
    var ViewContainer = function (selector, sliderRowCollection, gameStatusModel) {
        this.headerView = HeaderView.create(gameStatusModel);
        this.descriptorView = DescriptorView.create(gameStatusModel);
        this.sliderView = SliderView.create(sliderRowCollection, gameStatusModel);
        this.footerView = FooterView.create(gameStatusModel)

        $(selector).html("")
            .append(this.headerView.$el)
            .append(this.descriptorView.$el)
            .append(this.sliderView.$el)
            .append(this.footerView.$el);
    };*/
    return ViewContainer;
});