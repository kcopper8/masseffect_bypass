/**
 * Created by user on 2014-10-17.
 */
define(['bui/statusPanel', 'backbone', 'test/TestTool', 'model/code'], function (StatusPanel, Backbone, TestTool, Code) {
    var model = new Backbone.Model();

    var panel = new StatusPanel({
        el : $(".bp_status_panel")[0],
        model : model
    });

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
            model.set("path0", Code.createRandomCode().getPath());
        },
        function() {
            model.set("path1", Code.createRandomCode().getPath());
        },
        function () {
            model.set("path2", Code.createRandomCode().getPath());
        });
    return {};
});