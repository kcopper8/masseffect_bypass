/**
 * Created by user on 2014-10-12.
 */
define(['jquery', 'model/code'], function ($, Code) {
    var template = [
        '<div class="bp_card">',
        '<div class="bp_card_cover"></div>',
        '<img src="{imgPath}">',
        '</div>'
    ].join('');

    var Card = function(code, options) {
        var $el = this.$el = $(template.replace(/{imgPath}/, code.getPath()));

        this.setNormal = function () {
            $el.prop("class", "bp_card");
        };

        this.setDistrict = function() {
            this.setNormal();
            $el.addClass("bp_districted");
        };

        this.setSelect = function() {
            this.setNormal();
            $el.addClass("bp_selected");
        };

        this.getOffset = function () {
            return $el.offset();
        };

        (function() {
            options = options || {};
            if (!!options.district) {
                this.setDistrict();
            }

        }.apply(this));
    };
    return Card;
});