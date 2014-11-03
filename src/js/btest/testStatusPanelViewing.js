/**
 * Created by user on 2014-10-17.
 */
define(['jquery', 'bui/descripter/statusPanelView', 'backbone', 'test/TestTool', 'model/code'], function ($, StatusPanelView, Backbone, TestTool, Code) {
    var model = new Backbone.Model();

    var panel = StatusPanelView.create(model);

    $(".bp_status_panel").remove();
    $(".bp_descripter").append(panel.$el);

    TestTool.test(function() {
            model.set("completed", true);
        },
        function() {
            model.set("completed", false);
        },
        function() {
            model.set("path0", "");
            model.set("path1", "");
            model.set("path2", "");
        },
        function () {
            model.set("path0", Code.getRandom().getPath());
        },
        function() {
            model.set("path1", Code.getRandom().getPath());
        },
        function () {
            model.set("path2", Code.getRandom().getPath());
        });
    return {};
});