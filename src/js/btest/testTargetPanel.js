/**
 * Created by user on 2014-10-17.
 */
define(['bui/targetPanel', 'backbone', 'model/code', 'test/TestTool'], function (TargetPanel, Backbone, Code, TestTool) {
    var model = new Backbone.Model({
        'path' : Code.get(2).getPath()
    });

    var panel = new TargetPanel({
        el : $(".bp_target_panel")[0],
        model : model
    });

    TestTool.test(function () {
        model.set('accessDenied', false);
        model.set("completed", true);
    }, function () {
        model.set('accessDenied', false);
        model.set("completed", false);
    }, function () {
        model.set({
            'completed' : false,
            'path' : Code.getRandom().getPath()
        });
    }, function () {
        model.set('completed', false);
        model.set('accessDenied', true);
    });

    return {};
});