/**
 * Created by user on 2014-10-17.
 */
define(['jquery', 'backbone', 'underscore'], function ($, Backbone, _) {
    var StatusPanel = Backbone.View.extend({
        initialize : function () {
            this.$foundCodeViews = this.$el.find("DD .img_container");
            this.$foundCodeViewCovers = this.$el.find("DD .bp_cover");
            this.listenTo(this.model, "change", this.render);
            this.render();
        },

        _setCodePath : function (path, idx) {
            if (!!path) {
                this.$foundCodeViews[idx].innerHTML = "<IMG src='" + path + "'>";
            } else {
                this.$foundCodeViews[idx].innerHTML = '';
            }
        },
        
        render : function () {
            this.$el.toggleClass("bp_completed", !!this.model.get("completed"));
            this._setCodePath(this.model.get("path0"), 0);
            this._setCodePath(this.model.get("path1"), 1);
            this._setCodePath(this.model.get("path2"), 2);
        },

        _setCodeAccepted : function (idx) {
            $(this.$foundCodeViewCovers[idx]).addClass('bp_accepted');
        },

        hackingSuccessed : function () {
            this._setCodeAccepted(0);

            var thisSetCodeAccepted = _.bind(this._setCodeAccepted, this);
            _.delay(thisSetCodeAccepted, 500, 1);
            _.delay(thisSetCodeAccepted, 1000, 2);

            _.delay(_.bind(function () {
                this.trigger("codeCompiled")
            }, this), 3000);

        }
    });

    StatusPanel.build = function (selector, model) {
        return new StatusPanel({
            el : $(selector)[0],
            model : model
        });
    };
    return StatusPanel;
});