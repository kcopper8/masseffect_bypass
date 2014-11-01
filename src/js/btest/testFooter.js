/**
 * Created by user on 2014-11-02.
 */
define(['bui/footer', 'backbone', 'test/TestTool','model/GameStatusModel', 'model/code'], function (Footer, Backbone, TestTool, GameStatusModel, Code) {

    var model = new GameStatusModel();
    var footer = Footer.build(".bp_footer", model);

    footer.on('exit', function () {
       alert('exit clicked');
    });
    
    TestTool.test(function () {
       model.addHacked(Code.getRandom());
    });

    return {};
});