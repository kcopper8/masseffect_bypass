/**
 * Created by user on 2014-10-21.
 */
define(['backbone', 'model/code'], function (Backbone) {
    var CardModel = Backbone.Model.extend({
        defaults : {
            unauthorized_access : false
        },
        initialize : function (code) {
            this.set("imgPath", code.getPath());
            this.__code = code;
        },

        setDistricted : function () {
            this.set('state', 'districted');
        },

        isDistricted : function () {
            return this.get('state') == 'districted';
        },

        getCode : function () {
            return this.__code;
        },
        setSelected : function () {
            this.set('state', 'selected');
        },
        isSelected : function () {
            return this.get('state') == 'selected';
        },
        setUnauthorizedAccess : function () {
            this.set({
                'unauthorized_access' : true,
                'state' : 'districted'
            });
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