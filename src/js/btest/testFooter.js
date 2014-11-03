/**
 * Created by user on 2014-11-02.
 */
define(['bui/layout/footerView', 'backbone', 'test/TestTool','model/GameStatusModel', 'model/code'], function (FooterView, Backbone, TestTool, GameStatusModel, Code) {

    var model = new GameStatusModel();
    var footer = FooterView.create(model);
    $(".bp_container").html("").append(footer.$el);


    footer.on('exit', function () {
       alert('exit clicked');
    });
    
    TestTool.test(function () {
       model.addHacked(Code.getRandom());
    });

    return {};
});