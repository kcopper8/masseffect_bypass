/**
 * Created by user on 2014-10-17.
 */
define(['jquery',
    'bui/progress',
], function($, Progress) {
    console.log("base", arguments);

    var model = new Backbone.Model({'remain_time' : 100 });
    var progress = new Progress({
        el : $(".bp_progress")[0]
        , model : model
    });

    var aaa = 100;

    setInterval(function() {
        console.log("aaa", aaa);
        model.set("remain_time", aaa--);
    }, 50);
});