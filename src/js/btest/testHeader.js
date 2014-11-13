/**
 * Created by user on 2014-11-03.
 */
define(['jquery', 'bui/layout/headerView', 'model/GameStageModel'], function ($, HeaderView, GameStageModel) {

    var model = new GameStageModel();
    var headerView = HeaderView.create(model);

    $(".bp_container").html("").append(headerView.$el);

    var aaa = 100;
    setInterval(function() {
        console.log("aaa", aaa);
        model.set("remain_time", aaa--);
    }, 50);
    return {};
});