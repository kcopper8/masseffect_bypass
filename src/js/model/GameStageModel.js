/**
 * Created by user on 2014-11-09.
 */
define([
    'backbone',
    'app/config',
    'model/code',
    'constant/Stage',
    'tool'
], function (
    Backbone,
    Config,
    Code,
    Stage,
    tool
) {
    var GameStageModel = Backbone.Model.extend({
        defaults : {
            'remain_time' : 100,
            'attempt_count' : 3
        },
        initialize : function () {
            this.hackedCodes = new Backbone.Collection();
            this.listenTo(this.hackedCodes, "add remove", function () {
                this.trigger("change:hackedCodes", this);
                this.trigger("change", this);
            });

            this.on("exit", function () {
                this.trigger("accessDenied", this);
            }, this);

            this.on("change:stage", _.bind(this.onChangeStage, this));
        },

        getAttemptCount : function () {
            return this.get('attempt_count');
        },

        setCurrentTargetCode : function (currentTargetCode) {
            this.set('current_target_code', currentTargetCode);
        },

        getCurrentTargetCode : function () {
            return this.get('current_target_code');
        },

        getCurrentTargetCodePath : function () {
            var code = this.getCurrentTargetCode();
            if (!!code && code instanceof Code) {
                return code.getPath();
            }
        },

        getCurrentTargetCodePosition : function () {
            var code = this.getCurrentTargetCode();
            if (!!code && code instanceof Code) {
                return code.getPosition();
            }
        },

        setStage : function (stage) {
            this.set('stage', stage);
        },
        
        isGameStopped : function () {
            return this.get('stage') != Stage.GAME;
        },
        addHackedCode : function (code) {
            this.hackedCodes.add(new Backbone.Model({
                code : code
            }));

            if (this._isSuccessed()) {
                this.trigger("hackingSuccessed", this);
            }
        },

        _isSuccessed : function () {
            return this.hackedCodes.length >= 3;
        },

        removeHackedCode : function () {
            if (this.hackedCodes.length > 0) {
                this.hackedCodes.pop();
            } else {
                this.trigger("accessDenied", this);
            }
        },

        getHackedCodePath : function(n) {
            var model = this.hackedCodes.at(n);
            if (!!model) {
                var code = model.get('code');
                if (!!code) {
                    return code.getPath();
                }
            }
        },
        getHackedCode : function(n) {
            var model = this.hackedCodes.at(n);
            if (!!model) {
                return model.get('code');
            }
        },

        isGameState : function () {
            return this.get('stage') == Stage.GAME;
        },
        isStartStage : function () {
            return this.get('stage') == Stage.START;
        },

        isHackingSuccessed : function () {
            return this.get('stage') == Stage.SUCCESS;
        },

        isFirewallRemoved : function () {
            return this.get('stage') == Stage.FIREWALL_REMOVED;
        },

        isAccessDenied : function () {
            return this.get('stage') == Stage.ACCESS_DENIED;
        },

        decreaseAttempt : function () {
            this.trigger("decreaseAttempt");
            var attemptCount = this.get('attempt_count');
            if (attemptCount <= 0) {
                this.trigger("accessDenied", this);
                return;
            }

            this.set('attempt_count', --attemptCount);
        },

        onChangeStage : function () {
            if (this.isGameState()) {
                this.__startTimer();
            } else {
                this.__clearTimer();
            }
        },
        
        __startTimer : function () {
            var toEndTime = tool.nowSec() + Config.GameTimeSeconds;

            this.intervalId = setInterval(_.bind(function () {
                var remainTimeSeconds = toEndTime - tool.nowSec();
                remainTimeSeconds = remainTimeSeconds < 0 ? 0 : remainTimeSeconds;

                this.set('remain_time', (remainTimeSeconds / Config.GameTimeSeconds) * 100);

                if (this.get('remain_time') <= 0) {
                    this.__clearTimer();
                    this.trigger("accessDenied", this);
                }
            }, this), 500);
        },

        __clearTimer : function() {
            if (!!this.intervalId) {
                clearInterval(this.intervalId);
                delete this.intervalId;
            }
        }

    });

    return GameStageModel;
});