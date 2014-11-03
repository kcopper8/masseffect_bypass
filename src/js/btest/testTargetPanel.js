/**
 * Created by user on 2014-10-17.
 */
define(['bui/descriptor/targetPanelView', 'backbone', 'model/code', 'test/TestTool'], function (TargetPanel, Backbone, Code, TestTool) {
    var model = new Backbone.Model({
        'path' : Code.get(2).getPath()
    });

    var panel = TargetPanel.create(model);
    $(".bp_descriptor").html("").append(panel.$el);

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