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