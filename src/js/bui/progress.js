/**
 * Created by user on 2014-10-16.
 */
define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    var Progress = Backbone.View.extend({
        itemCount : 30,
        tagName : "UL",
        className : "bp_progress",
        initializeHtml : function () {
            var html = '';
            for (var i = 0; i < this.itemCount; i++) {
                html += '<li></li>';
            }

            this.$el.html(html);
        },
        initialize : function () {
            this.initializeHtml();
            this.listenTo(this.model, "change:remain_time", this.render);
            this.render();
        },

        _max : function () {
            return this.$el.children().length;
        },

        _setState : function (state) {
            this.$el
                .attr('class', this.className)
                .addClass('bp_' + state + "_state");
        },

        _set : function (stat) {
            var max = this._max(),
                nOnItemAmount = Math.max(Math.ceil(stat * max / 100), 0);

            if  (stat >= 100) {
                this._setState('full');
            } else if (stat > 40) {
                this._setState('stable');
            } else if (stat > 15) {
                this._setState('warn');
            } else {
                this._setState('critical');
            }

            $.each(this.$el.children(), function(index) {
                if (index < nOnItemAmount) {
                    $(this).css({'visibility': 'visible'});
                } else {
                    $(this).css({'visibility': 'hidden'});
                }
            });
        },

        render : function () {
            var remain_time = this.model.get("remain_time");
            this._set(remain_time);
        }
    });

    Progress.build = function (selector, model) {
        return new Progress({
            el : $(selector)[0]
            , model : model
        });
    };
    return Progress;
});