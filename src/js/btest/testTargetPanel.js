/**
 * Created by user on 2014-10-17.
 */
define(['bui/layout/descriptorView', 'backbone', 'model/code', 'test/TestTool', 'model/GameStageModel'], function (DescriptorView, Backbone, Code, TestTool, GameStageModel) {
    var model = new GameStageModel();

    var descriptor = DescriptorView.create(model);
    $(".bp_container").append(descriptor.$el);
    var panel = descriptor.targetPanelView;


    TestTool.test(function () {
        model.set('accessDenied', false);
        model.set("completed", true);
    }, function () {
        model.set('accessDenied', false);
        model.set("completed", false);
    }, function () {
        /*
        model.set({
            'completed' : false,
            'path' : Code.getRandom().getPath()
        });
        */
        model.set("completed", false);
        model.setCurrentTargetCode(Code.getRandom());
    }, function () {
        model.set('completed', false);
        model.set('accessDenied', true);
    });

    return {};
});