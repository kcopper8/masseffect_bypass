/**
 * Created by user on 2014-11-03.
 */
define(['backbone', 'bui/descriptor/targetPanelView', 'bui/descriptor/statusPanelView'], function (Backbone, TargetPanelView, StatusPanelView) {
    var DescriptorView = Backbone.View.extend({
        className : "bp_descriptor",
        initialize : function () {
            this.targetPanelView = TargetPanelView.create(this.model);
            this.$el.append(this.targetPanelView.$el);

            this.statusPanelView = StatusPanelView.create(this.model);
            this.$el.append(this.statusPanelView.$el);
        }
    });

    DescriptorView.create = function (model) {
        return new DescriptorView({
            model : model
        });
    };
    return DescriptorView;
});