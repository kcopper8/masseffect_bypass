/**
 * Created by user on 2014-10-12.
 */
define(['jquery', 'ui/Slider', 'ui/Card', 'model/code', 'test/TestTool', 'tool', 'app/config'], function ($, Slider, Card, Code, TestTool, tool, Config) {

    function testCard(slider) {
        var card = slider.getCard(2, 1);

        TestTool.test(function () {
            card.setNormal();
        }, function () {
            card.setDistrict();
        }, function () {
            card.setSelect();
        });
    }

    function testCursor(slider) {
        var cursor = slider.cursor;

        TestTool.test(function () {
            cursor.hide();
        }, function () {
            cursor.show();
        }, function () {
            // random card;
            var card = slider.getCard(tool.randomInt(4), tool.randomInt(3));
            console.log(card);
            cursor.moveTo(card);

        });
    }

    function testSlider(slider) {


        function addRandomRow () {
            slider.addRow([
                Code.createRandomCode(),
                Code.createRandomCode(),
                Code.createRandomCode()
            ]);
        }

        addRandomRow();
        addRandomRow();
        addRandomRow();
        addRandomRow();
        addRandomRow();

        return;

        for (var i = 0; i < Config.SlideAmount; i++) {
            addRandomRow();
        }


        slider.slideUp(function () {
            addRandomRow();
            return true;
        });
    }

    return function (){
        var slider = window.slider = new Slider($(".bp_slider"));

        testSlider(slider);
        testCard(slider);
        testCursor(slider);
    };
});