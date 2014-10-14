/**
 * Created by user on 2014-10-12.
 */
define(['jquery', 'model/code'], function($){
    var StatusPanel = function(el) {
        var $el = this.$el = $(el);
        var $foundCodeViews = $el.find("DD .img_container");

        this.setCompleted = function () {
            $el.addClass("bp_completed");
        };

        this.setUncompleted = function() {
            $el.removeClass("bp_completed");
        };

        this.setFoundCode = function(nIndex, code) {
            if (!!code) {
                $foundCodeViews[nIndex].innerHTML = "<IMG src='" + code.getPath() + "'>";
            } else {
                $foundCodeViews[nIndex]. innerHTML = '';
            }
        };

        this.clearFocusCode = function () {
            this.setFoundCode(0);
            this.setFoundCode(1);
            this.setFoundCode(2);
        };

        (function initialize() {
            this.setUncompleted();
            this.clearFocusCode();
        }).call(this);
    };

    return StatusPanel;

});