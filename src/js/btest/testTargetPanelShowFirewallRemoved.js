/**
 * Created by user on 2014-10-17.
 */
define(['bui/layout/descriptorView', 'backbone', 'model/code', 'test/TestTool', 'model/GameStageModel'], function (DescriptorView, Backbone, Code, TestTool, GameStageModel) {
    var model = new GameStageModel();

    var descriptor = DescriptorView.create(model);
    $(".bp_container").append(descriptor.$el);
    var panel = window.panel = descriptor.targetPanelView;



    window.testToolInterval = 3000;
    TestTool.test(function () {
        model.setStage("firewall_removed");

        setTimeout(function () {
            model.setStage("game");
            model.setCurrentTargetCode(Code.getRandom());
        }, 2500);

    });

    return {};
});