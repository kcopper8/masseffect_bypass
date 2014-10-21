/**
 * Created by user on 2014-10-09.
 */
define(['jquery',
    'underscore',
    'ui/Progress',
    'ui/TargetPanel',
    'ui/Card',
    'controller/CardContainer',
    'model/code',
    'ui/StatusPanel',
    'ui/Slider'
], function($, _, Progress, TargetPanel, Card, CardContainer, Code, StatusPanel, Slider) {
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


        var slider = new Slider($(".bp_slider"), new CardContainer());
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

    function moveCursor(slider, rowFix, colFix) {
        try {
            var cardContainer = slider.cardContainer,
                cursor = slider.cursor,
                moveTargetCard;

            moveTargetCard = cardContainer.findCard(cursor.getHoverCard(), rowFix, colFix);
            cursor.moveTo(moveTargetCard);
        } catch (e) {

        }
    }

    (function() {
        var targetCodes = window.targetCodes = Code.getSamples(3);
        var targetPanel = window.targetPanel = new TargetPanel($(".bp_target_panel"), targetCodes[0]);
        var statusPanel = window.statusPanel = new StatusPanel($(".bp_status_panel"));
        var slider = window.slider = prepareSlider();

        $(document).keydown(function (e) {
            console.log(e);
            if ([37, 38, 39, 40].indexOf(e.keyCode) < 0) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();

            switch (e.keyCode) {
                case 37:
                    moveCursor(slider, 0, -1);
                    break;
                case 38:
                    moveCursor(slider, -1, 0);
                    break;
                case 39:
                    moveCursor(slider, 0, 1);
                    break;
                case 40:
                    moveCursor(slider, 1, 0);
                    break;
                default:
                    break;
            }


        });

    }());
});