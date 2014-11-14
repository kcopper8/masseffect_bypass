/**
 * Created by user on 2014-10-17.
 */
define(['jquery', 'bui/layout/descriptorView', 'backbone', 'test/TestTool', 'model/code', 'model/GameStageModel'], function ($, DescriptorView, Backbone, TestTool, Code, GameStageModel) {
    var model = new GameStageModel();

    var descriptor = DescriptorView.create(model);
    $(".bp_container").append(descriptor.$el);
    var panel = descriptor.statusPanelView;

    $(".bp_status_panel").remove();
    $(".bp_descriptor").append(panel.$el);

    TestTool.test(function() {
            model.addHackedCode(Code.getRandom());
        },
        function () {
            model.addHackedCode(Code.getRandom());
        },
        function() {
            model.removeHackedCode();
        },
        function () {
            model.removeHackedCode();
        });
    return {};
});