/**
 * Created by user on 2014-11-01.
 */
define(['backbone', 'model/code'], function (Backbone, Code) {
    return Backbone.Model.extend({
        defaults : {
            'remain_time' : 100,
            'completed' : false
        },
        setCurrentTargetCode : function (code) {
            this.currentTargetCode = code;
            this.set('path', code.getPath());
        },
        getCurrentTargetCode : function () {
            return this.currentTargetCode;
        }
    });
});