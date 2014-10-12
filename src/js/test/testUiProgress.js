/**
 * Created by user on 2014-10-12.
 */
define(['jquery', 'ui/Progress'], function($, Progress) {
    return function() {
        var progress = new Progress($(".bp_progress"));
        var aaa = 100;
        setInterval(function() {
            console.log("aaa", aaa);
            progress.set(aaa--);
        }, 50);
    };
});
