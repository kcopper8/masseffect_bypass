/**
 * Created by user on 2014-10-21.
 */
define(['backbone', 'model/code'], function (Backbone) {
    var CardModel = Backbone.Model.extend({
        initialize : function (code) {
            this.set("imgPath", code.getPath());
        }
    });

    CardModel.build = function (v) {
        if (v instanceof CardModel) {
            return v;
        } else {
            return new CardModel(v);
        }
    };
    return CardModel;
});