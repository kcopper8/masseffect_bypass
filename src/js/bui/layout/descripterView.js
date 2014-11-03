/**
 * Created by user on 2014-11-03.
 */
define(['backbone'], function (Backbone) {
    var DescripterView = Backbone.extend({

    });

    DescripterView.create = function (model) {
        return new DescripterView({
            model : model
        });
    };
    return DescripterView;
});