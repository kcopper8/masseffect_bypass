/**
 * Created by user on 2014-10-17.
 */
define(['bui/statusPanel', 'backbone', 'test/TestTool', 'model/code'], function (StatusPanel, Backbone, TestTool, Code) {
    var model = new Backbone.Model();

    var panel = new StatusPanel({
        el : $(".bp_status_panel")[0],
        model : model
    });
    
        model.set("completed", false);
        model.set("path0", Code.getRandom().getPath());
        model.set("path1", Code.getRandom().getPath());
        model.set("path2", Code.getRandom().getPath());

    setTimeout(function () {
        model.trigger("hackingSuccessed");
        panel.on('codeCompiled', function () {
           model.set('completed', true);
        });
    }, 1000);

    return;

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