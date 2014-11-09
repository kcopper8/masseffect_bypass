/**
 * Created by user on 2014-11-08.
 */
define(['backbone'], function (Backbone) {
    var GameModel = Backbone.Model.extend({
        defaults : {
            'remain_time' : 100
        }
    });

    return GameModel;
});