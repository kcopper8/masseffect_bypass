/**
 * Created by user on 2014-10-17.
 */
define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    var TargetPanel = Backbone.View.extend({
        initialize : function () {
            this.listenTo(this.model, "change", this.render);
            this.$codeSegmentImageTag = this.$el.find(".bp_segment IMG");
            this.render();
        },

        render : function () {
            this.$el.toggleClass("bp_completed", !!this.model.get("completed"));
            this.$codeSegmentImageTag.prop("src", this.model.get("path"));
        }
    });
    return TargetPanel;
});