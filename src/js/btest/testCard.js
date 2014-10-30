/**
 * Created by user on 2014-10-17.
 */
define(['jquery', 'backbone', 'bui/card', 'model/code', 'test/TestTool'], function ($, Backbone, Card, Code, TestTool) {
    var model = new Backbone.Model({
        'imgPath' : Code.getRandom().getPath()
    });

    var card = new Card({
        model : model
    });

    $(".bp_slider UL").append("<LI>");
    $(".bp_slider LI:first")
        .empty()
        .append(card.$el);

    TestTool.test(function () {
        model.set("state", "selected");
    }, function () {
        model.set("state", "districted");
    }, function () {
        model.set("state", "");
    });
    return {};
});