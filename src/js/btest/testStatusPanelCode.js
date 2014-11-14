/**
 * Created by user on 2014-10-17.
 */
define(['jquery', 'bui/layout/descriptorView', 'backbone', 'test/TestTool', 'model/code', 'model/GameStageModel'], function ($, DescriptorView, Backbone, TestTool, Code, GameStageModel) {
    var model = window.model = new GameStageModel();

    var descriptor = DescriptorView.create(model);
    $(".bp_container").append(descriptor.$el);
    var panel = descriptor.statusPanelView;

    $(".bp_status_panel").remove();
    $(".bp_descriptor").append(panel.$el);


    window.Code = Code;
    return {};
});