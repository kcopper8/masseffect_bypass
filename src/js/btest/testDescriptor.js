/**
 * Created by user on 2014-11-03.
 */
define(['bui/layout/descriptorView', 'model/GameStageModel', 'test/TestTool', 'model/code'], function (DescripterView, GameStageModel, TestTool, Code) {
    var model = new GameStageModel();
    var view = DescripterView.create(model);
    $(".bp_container").html("").append(view.el);

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


    TestTool.test(function() {
            model.set('accessDenied', false);
            model.set("completed", true);
        },
        function() {
            model.set('accessDenied', false);
            model.set("completed", false);
        },
        function () {
            model.set({
                'completed' : false,
                'path' : Code.getRandom().getPath()
            });
        },
        function () {
            model.set('completed', false);
            model.set('accessDenied', true);
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