/**
 * Created by user on 2014-10-17.
 */
define(['bui/descriptor/statusPanelView', 'backbone', 'test/TestTool', 'model/code'], function (StatusPanelView, Backbone, TestTool, Code) {
    var model = new Backbone.Model();

    var panel = StatusPanelView.create(model);
    $(".bp_status_panel").remove();
    $(".bp_descriptor").append(panel.$el);

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

    return;
});