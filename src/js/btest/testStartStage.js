/**
 * Created by user on 2014-11-03.
 */
define(['bui/layout/descriptorView', 'model/GameStageModel', 'test/TestTool', 'model/code'], function (DescripterView, GameStageModel, TestTool, Code) {
    var model = new GameStageModel();
    var view = DescripterView.create(model);
    $(".bp_container").html("").append(view.el);


    model.setStage('start');

});