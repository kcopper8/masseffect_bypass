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
            this.headerView = HeaderView.build(".bp_header", this.model);
            this.descriptorView = DescriptorView.build(".bp_descriptor", this.model);
            this.sliderView = SliderView.build(".bp_slider", this.collection, this.model);
            this.footerView = FooterView.build(".bp_footer", this.model);

            this.listenTo(this.model, "decreaseAttempt", this.onDecreaseAttempt);
        },

        doLoading : function () {
            this.headerView.$el.after(this.descriptorView.$el);
            this.footerView.$el.before(this.sliderView.$el);

            var animateOptions = {
                duration : 1000,
                easing : 'easeInOutCubic'
            };

            this.$el.animate({"margin-top": "20px"}, animateOptions);
            this.descriptorView.$el.animate({"opacity": "1"}, animateOptions);
            this.footerView.$el.animate({"margin-top" : "0"}, animateOptions);
        },

        onDecreaseAttempt : function () {
            this.$el.effect({
                effect : "shake",
                distance : 5,
                duration : 200
            });
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