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

            this._loading();

            this.listenTo(this.model, "decreaseAttempt", this.onDecreaseAttempt);
        },

        _loading : function () {
            this.descriptorView.$el.css("opacity", "0");
            this.$el.css("margin-top", "190px");
            this.footerView.$el.css("margin-top", "-468px");


            var animateOptions = {
                duration : 1000,
                easing : 'easeInOutCubic'
            };

            this.$el.animate({"margin-top": "20px"}, animateOptions);
            this.descriptorView.$el.animate({"opacity": "1"}, animateOptions);
            this.footerView.$el.animate({"margin-top" : "0"}, animateOptions);
        },

        onDecreaseAttempt : function () {
            this.$el.effect("shake");
        },

        slideClose : function() {
            var deferred = $.Deferred();
            this.sliderView.$el.animate({
                'opacity' : "0"
            }, {
                duration : 300,
                complete: _.bind(function () {
                    var animateOptions = {
                        duration: 400,
                        easing: 'easeInOutQuad'
                    };

                    this.$el.animate({"margin-top": "190px"}, animateOptions);
                    this.descriptorView.$el.animate({"opacity": "0"}, animateOptions);
                    this.footerView.$el.animate({"margin-top": "-468px"}, _.extend(animateOptions, {
                        complete : _.bind(function () {
                            deferred.resolve();
                            this.$el.fadeOut();
                        }, this)
                    }));

                }, this)
            });


            return deferred.promise();
        }
    });

    ViewContainer.build = function (selector, sliderRowCollection, gameStatusModel) {
        return new ViewContainer({
            el : $(selector),
            collection : sliderRowCollection,
            model : gameStatusModel
        });
    };

    return ViewContainer;
});