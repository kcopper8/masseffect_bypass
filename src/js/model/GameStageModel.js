/**
 * Created by user on 2014-11-09.
 */
define(['backbone', 'model/code', 'constant/Stage'], function (Backbone, Code, Stage) {
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
        }
    });

    return GameStageModel;
});