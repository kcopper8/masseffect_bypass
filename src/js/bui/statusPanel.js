/**
 * Created by user on 2014-10-17.
 */
define(['jquery', 'backbone'], function ($, Backbone) {
    var StatusPanel = Backbone.View.extend({
        initialize : function () {
            this.$foundCodeViews = this.$el.find("DD .img_container");
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
        }
    });
    return StatusPanel;
});