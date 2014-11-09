/**
 * Created by user on 2014-11-09.
 */
define(['backbone', 'model/code'], function (Backbone, Code) {
    var GameStageModel = Backbone.Model.extend({
        defaults : {
            'remain_time' : 100,
            'attempt_count' : 3
        },

        getAttemptCount : function () {
            return this.get('attempt_count');
        },

        setCurrentTargetCode : function (currentTargetCode) {
            this.set('current_target_code', currentTargetCode);
        },

        getCurrentTargetCodePath : function () {
            var code = this.get('current_target_code');
            if (!!code && code instanceof Code) {
                return code.getPath();
            }
        },

        setStage : function (stage) {
            this.set('stage', stage);
        }
    });

    return GameStageModel;
});