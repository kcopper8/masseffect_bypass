/**
 * Created by user on 2014-11-01.
 */
define(['app/config', 'backbone', 'tool', 'model/code'], function (Config, Backbone, tool) {
    return Backbone.Model.extend({
        defaults : {
            'remain_time' : 100,
            'completed' : false,
            'accessDenied' : false
        },
        initialize : function () {
            this.currentTargetCode = null;
            this.hackedCodes = [];

            this.on("startGame", function () {
                this.set("stage", "game");
            });
        },
        setCurrentTargetCode : function (code) {
            this.currentTargetCode = code;
            this.set('path', code.getPath());
            this.set('currentTargetCode', code);
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
        getRemainCodeCount : function () {
            return 3 - this.hackedCodes.length;
        },
        addHacked : function (code) {
            this.hackedCodes.push(code);
            this._applyCurrentHackedCode();
            if (this.isSucessed()) {
                this._stopGameProcess();
                this.trigger("hackingSuccessed");
            }
        },
        addFailure : function () {
            if (this.hackedCodes.length > 0) {
                this.hackedCodes.pop();
                this._applyCurrentHackedCode();
            } else {
                this.accessDenied();
            }
        },
        isSucessed : function () {
            return this.hackedCodes.length >= 3;
        },
        isGameStopped : function () {
            return this.isSucessed() || this.get('accessDenied');
        },

        _stopGameProcess : function () {
            if (!!this.intervalId) {
                clearInterval(this.intervalId);
                delete this.intervalId;
            }
        },
        accessDenied : function () {
            this._stopGameProcess();
            this.set('accessDenied', true);
            this.trigger('accessDenied');
        },
        startGameTime : function () {
            var toEndTime = tool.nowSec() + Config.GameTimeSeconds;

            this.intervalId = setInterval(_.bind(function () {
                var remainTimeSeconds = toEndTime - tool.nowSec();
                remainTimeSeconds = remainTimeSeconds < 0 ? 0 : remainTimeSeconds;

                this.set('remain_time', (remainTimeSeconds / Config.GameTimeSeconds) * 100);

                if (this.get('remain_time') <= 0) {
                    this._stopGameProcess();
                    this.accessDenied();
                }
            }, this), 500);
        }
    });
});