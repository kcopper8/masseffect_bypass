/**
 * Created by user on 2014-11-01.
 */
define(['backbone', 'model/code'], function (Backbone) {
    return Backbone.Model.extend({
        defaults : {
            'remain_time' : 100,
            'completed' : false
        },
        initialize : function () {
            this.currentTargetCode = null;
            this.hackedCodes = [];
            this.accessDenied = false;
        },
        setCurrentTargetCode : function (code) {
            this.currentTargetCode = code;
            this.set('path', code.getPath());
        },
        getCurrentTargetCode : function () {
            return this.currentTargetCode;
        },
        _applyCurrentHackedCode : function () {
            var param = {};
            for(var i = 0; i < 3; i++) {
                if (!!this.hackedCodes[i]) {
                    param['path'+i] = this.hackedCodes[i].getPath();
                } else {
                    param['path'+i] = '';
                }
            }

            this.set(param);
        },
        addHacked : function (code) {
            this.hackedCodes.push(code);
            this._applyCurrentHackedCode();
            if (this.isSucessed()) {
                this.trigger("hackingSuccessed");
            }
        },
        addFailure : function () {
            if (this.hackedCodes.length > 0) {
                this.hackedCodes.pop();
                this._applyCurrentHackedCode();
            } else {
                this.accessDenied = true;
                this.trigger('accessDenied');
            }
        },
        isSucessed : function () {
            return this.hackedCodes.length >= 3;
        },
        isGameStopped : function () {
            return this.isSucessed() || this.accessDenied;
        }
    });
});