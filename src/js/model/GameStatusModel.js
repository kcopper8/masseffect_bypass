/**
 * Created by user on 2014-11-01.
 */
define(['backbone', 'model/code'], function (Backbone, Code) {
    return Backbone.Model.extend({
        defaults : {
            'remain_time' : 100,
            'completed' : false
        },
        initialize : function () {
            this.currentTargetCode = null;
            this.hackedCodes = [];
        },
        setCurrentTargetCode : function (code) {
            this.currentTargetCode = code;
            this.set('path', code.getPath());
        },
        getCurrentTargetCode : function () {
            return this.currentTargetCode;
        },
        addHacked : function (code) {
            this.hackedCodes.push(code);
            var param = {};
            _.each(this.hackedCodes, function (code, idx) {
                param['path'+idx] = code.getPath();
            });

            this.set(param);
            if (this.isSucessed()) {
                this.trigger("hackingSuccessed");
            }
        },
        isSucessed : function () {
            return this.hackedCodes.length >= 3;
        },
        isGameStopped : function () {
            return this.isSucessed();
        }
    });
});