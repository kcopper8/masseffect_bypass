/**
 * Created by user on 2014-11-03.
 */
define(['jquery', 'underscore', 'backbone', 'text!bui/descriptor/statusPanelViewTemplate.html'], function ($, _, Backbone, statusPanelViewTemplate) {
    var StatusPanel = Backbone.View.extend({
        className : "bp_status_panel",
        initialize : function () {
            this.$el.html(statusPanelViewTemplate);

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
            }, this), 1500);
        }
    });

    StatusPanel.create = function (model) {
        return new StatusPanel({
            model : model
        });
    };

    return StatusPanel;
});