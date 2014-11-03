/**
 * Created by user on 2014-11-03.
 */
define(['backbone', 'bui/descriptor/targetPanelView', 'bui/descriptor/statusPanelView'], function (Backbone, TargetPanelView, StatusPanelView) {
    var DescripterView = Backbone.View.extend({
        className : "bp_descriptor",
        initialize : function () {
            this.targetPanelView = TargetPanelView.create(this.model);
            this.$el.append(this.targetPanelView.$el);

            this.statusPanelView = StatusPanelView.create(this.model);
            this.$el.append(this.statusPanelView.$el);
        }
    });

    DescripterView.create = function (model) {
        return new DescripterView({
            model : model
        });
    };
    return DescripterView;
});