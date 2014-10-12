/**
 * Created by user on 2014-10-12.
 */
define(['jquery', 'ui/TargetPanel', 'model/code'], function ($, TargetPanel, Code) {
    return function() {
        var targetPanel = window.targetPanel = new TargetPanel($(".bp_target_panel"), Code.createRandomCode());
        var type = 0;
        setInterval(function() {
            switch (type++ % 3) {
                case 0:
                    targetPanel.setCompleted();
                    break;
                case 1:
                    targetPanel.setUncompleted();
                    break;
                default:
                    targetPanel.setUncompleted();
                    targetPanel.setTargetCode(Code.createRandomCode());
                    break;
            }

        }, 1000);
    }
});
