/**
 * Created by user on 2014-11-03.
 */
define(['backbone', 'jquery', 'text!bui/descriptor/targetPanelViewTemplate.html', 'model/GameStageModel'], function (Backbone, $, targetPanelViewTemplate) {
    var TargetPanelView = Backbone.View.extend({
        className : "bp_target_panel",
        initialize : function () {
            this.$el.html(targetPanelViewTemplate);
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "change:stage", this.onChangeStage);
            this.$codeSegmentImageTag = this.$el.find(".bp_segment IMG");
            this.render();
        },

        onChangeStage : function () {
            if (this.model.isFirewallRemoved()) {
                this.showFirewallRemoved();
            } else if (this.model.isAccessDenied()) {
                this.showAccessDeniedStage();
            }
        },
        showFirewallRemoved : function () {
            this.$el.toggleClass("bp_completed", true);
        },

        showAccessDeniedStage : function () {
            this.$el.toggleClass('bp_access_denied', true);
        },

        render : function () {
            this.$codeSegmentImageTag.prop("src", this.model.getCurrentTargetCodePath());
        }
    });

    TargetPanelView.create = function (model) {
        return new TargetPanelView({
            model : model
        });
    };

    return TargetPanelView;
});