/**
 * Created by user on 2014-10-09.
 */
define(['jquery',
    'ui/progress',
    'ui/targetPanel'
], function($, Progress) {
    console.log("base", arguments);

    window.test = {
        testUiProgress : function () {
            var progress = new Progress($(".bp_progress"));
            var aaa = 100;
            setInterval(function() {
                console.log("aaa", aaa);
                progress.set(aaa--);
            }, 50);
        }
    }
});