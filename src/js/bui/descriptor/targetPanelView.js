/**
 * Created by user on 2014-11-03.
 */
define(['underscore', 'backbone', 'jquery', 'jquery-ui', 'text!bui/descriptor/targetPanelViewTemplate.html', 'model/GameStageModel'], function (_, Backbone, $, $ui, targetPanelViewTemplate) {
    var TargetPanelView = Backbone.View.extend({
        className : "bp_target_panel",
        initialize : function () {
            this.$el.html(targetPanelViewTemplate);
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "change:stage", this.onChangeStage);
            this.listenTo(this.model, "change:current_target_code",
                _.throttle(_.bind(this.glowTitle, this), 1200));
            this.$codeSegment = this.$el.find(".bp_segment");
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
            this.$(".bp_target_code")
                .effect({
                    effect : "pulsate",
                    duration : 3000,
                    easing : 'linear',
                    times : 3
                });
        },

        flickFirewallRemoved : function () {
            this.$(".bp_firewall_removed")
                .effect({
                    effect : "pulsate",
                    duration : 3000,
                    easing : 'linear',
                    times : 3
                });
        },

        flickAccessDenied : function () {
            this.$(".bp_access_denied")
                .effect({
                    effect : "pulsate",
                    duration : 3000,
                    easing : 'linear',
                    times : 3
                });
        },
        render : function () {
            this.$codeSegment
                .css('background-position-y', this.model.getCurrentTargetCodePosition());
        }
    });

    TargetPanelView.create = function (model) {
        return new TargetPanelView({
            model : model
        });
    };

    return TargetPanelView;
});