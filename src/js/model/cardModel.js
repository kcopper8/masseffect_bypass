/**
 * Created by user on 2014-10-21.
 */
define(['backbone', 'model/code'], function (Backbone) {
    var CardModel = Backbone.Model.extend({
        initialize : function (code) {
            this.set("imgPath", code.getPath());
        }
    });
    return CardModel;
});