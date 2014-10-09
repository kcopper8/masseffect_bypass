/**
 * Created by user on 2014-10-09.

 */
define(['jquery'], function($) {
    var Progress = function (el) {
        var $el = this.$el = $(el);

        function _max() {
            return $el.children().length;
        }

        this.set = function(stat) {
            var max = _max(),
                nOnItemAmount = Math.max(parseInt(stat * max / 100), 0);

            $.each(this.$el.children(), function(index) {
                if (index < nOnItemAmount) {
                    $(this).css({'visibility': 'visible'});
                } else {
                    $(this).css({'visibility': 'hidden'});
                }

            });

        };
    };
    return Progress;
});