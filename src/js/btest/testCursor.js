/**
 * Created by user on 2014-10-17.
 */
define(['jquery', 'underscore', 'backbone', 'bui/cursor', "test/TestTool", 'bui/card', 'model/code'], function ($, _, Backbone, Cursor, TestTool, Card, Code) {
    $(".bp_slider LI:first").empty();

    var cards = _.map(_.range(3), function (num) {
        var card =  new Card({
            model : new Backbone.Model({
                'imgPath' : Code.getRandom().getPath()
            })
        });

        $(".bp_slider LI:first").append(card.$el);
        return card;
    });


    var cursor = new Cursor({
        el : $(".bp_cursor")
    });
    cursor.show();

    TestTool.test(function () {
       cursor.hide(); 
    }, function () {
        cursor.show();
    }, function () {
        var card = cards[_.random(0, 2)];
        console.log(card);
        cursor.moveTo(card);
    });

    return {};
});