/**
 * Created by user on 2014-10-09.
 */
define(['jquery',
    'underscore',
    'ui/Progress',
    'ui/TargetPanel',
    'ui/Card',
    'model/code',
    'ui/StatusPanel',
    'ui/Slider'
], function($, _, Progress, TargetPanel, Card, Code, StatusPanel, Slider) {
    function prepareSlider() {
        function addRandomRow(slider) {
            function randomCard() {
                var code = Code.getRandom();
                var option = {};

                if (_.random(0, 5) === 0) {
                    option.district = true;
                }

                var card = new Card(code, option);
                return card;
            }
            slider.addRowWithCards([
                randomCard(),
                randomCard(),
                randomCard()
            ]);
        }

        var slider = new Slider($(".bp_slider"));
        addRandomRow(slider);
        addRandomRow(slider);
        addRandomRow(slider);
        addRandomRow(slider);
        addRandomRow(slider);


        slider.cursor.show();
        setTimeout(function() {
            slider.cursor.moveTo(slider.getCard(2, 1));
        }, 100);

        return slider;
    }


    (function() {
        var targetCodes = window.targetCodes = Code.getSamples(3);
        var targetPanel = window.targetPanel = new TargetPanel($(".bp_target_panel"), targetCodes[0]);
        var statusPanel = window.statusPanel = new StatusPanel($(".bp_status_panel"));
        var slider = window.slider = prepareSlider();

    }());
});