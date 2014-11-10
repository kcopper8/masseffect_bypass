/**
 * Created by user on 2014-10-17.
 */
define(['bui/layout/descriptorView', 'backbone', 'test/TestTool', 'model/code', 'model/GameStageModel'], function (DescriptorView, Backbone, TestTool, Code, GameStageModel) {
    var model = new GameStageModel();


    var descriptor = DescriptorView.create(model);
    $(".bp_container").append(descriptor.$el);
    var panel = descriptor.statusPanelView;

    model.set("completed", false);
    model.set("path0", Code.getRandom().getPath());
    model.set("path1", Code.getRandom().getPath());
    model.set("path2", Code.getRandom().getPath());

    setTimeout(function () {
        panel.hackingSuccessed();

        panel.on('codeCompiled', function () {
           model.set('completed', true);
        });
    }, 1000);
});