/**
 * Created by user on 2014-11-04.
 */
define([
    'jquery',
    'bui/layout/headerView',
    'bui/layout/descriptorView',
    'bui/layout/sliderView',
    'bui/layout/footerView',
], function ($, HeaderView, DescriptorView, SliderView, FooterView) {
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
    };
    return ViewContainer;
});