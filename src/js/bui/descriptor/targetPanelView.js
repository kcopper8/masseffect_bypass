/**
 * Created by user on 2014-11-03.
 */
define(['underscore', 'backbone', 'jquery', 'text!bui/descriptor/targetPanelViewTemplate.html', 'model/GameStageModel'], function (_, Backbone, $, targetPanelViewTemplate) {
    var TargetPanelView = Backbone.View.extend({
        className : "bp_target_panel",
        initialize : function () {
            this.$el.html(targetPanelViewTemplate);
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "change:stage", this.onChangeStage);
            this.listenTo(this.model, "change:current_target_code",
                _.throttle(_.bind(this.glowTitle, this), 1200));
            this.$codeSegmentImageTag = this.$el.find(".bp_segment IMG");
            this.render();
        },

        onChangeStage : function () {
            if (!this.model.isGameStopped()) {
                this.showGameStage();
            } else if (this.model.isFirewallRemoved()) {
                this.showFirewallRemoved();
            } else if (this.model.isAccessDenied()) {
                this.showAccessDeniedStage();
            }
        },
        showGameStage : function () {
            this.$el.removeClass("bp_completed");
            this.$el.removeClass('bp_access_denied');
        },
        showFirewallRemoved : function () {
            this.$el.toggleClass("bp_completed", true);
            this.flickFirewallRemoved();
        },

        showAccessDeniedStage : function () {
            this.$el.toggleClass('bp_access_denied', true);
            this.flickAccessDenied();
        },

        glowTitle : function () {
            var el = this.$(".bp_target_code");

            el
                .animate({"opacity" : "0"}, 200).animate({"opacity" : "1"}, 100)
                .animate({"opacity" : "0"}, 200).animate({"opacity" : "1"}, 100)
                .animate({"opacity" : "0"}, 200).animate({"opacity" : "1"}, 100)
                .animate({"opacity" : "0"}, 200).animate({"opacity" : "1"}, 100);

        },

        flickFirewallRemoved : function () {
            var el = this.$(".bp_firewall_removed");
            el
                .animate({"opacity" : "0"}, 500).animate({"opacity" : "1"}, 500)
                .animate({"opacity" : "0"}, 500).animate({"opacity" : "1"}, 500)
                .animate({"opacity" : "0"}, 500).animate({"opacity" : "1"}, 500);
        },

        flickAccessDenied : function () {
            var el = this.$(".bp_access_denied");
            el
                .animate({"opacity" : "0"}, 500).animate({"opacity" : "1"}, 500)
                .animate({"opacity" : "0"}, 500).animate({"opacity" : "1"}, 500)
                .animate({"opacity" : "0"}, 500).animate({"opacity" : "1"}, 500);
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