/**
 * Created by user on 2014-10-09.

 */
define(['jquery', 'model/code'], function($) {
    var TargetPanel = function(el, initialCode) {
        var $el = this.$el = $(el);
        var $codeSegmentImageTag = $el.find(".bp_segment IMG");

        this.setCompleted = function () {
            $el.addClass("bp_completed");
        };

        this.setUncompleted = function() {
            $el.removeClass("bp_completed");
        };

        this.setTargetCode = function(code) {
            $codeSegmentImageTag.prop("src", code.getPath());
        };

        this.setTargetCode(initialCode);
    };
    return TargetPanel;
});