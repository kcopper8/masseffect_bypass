/**
 * Created by user on 2014-10-21.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'bui/progress',
    'bui/targetPanel',
    'bui/statusPanel',
    'bui/slider',
    'bui/cursor',
    'model/sliderRow',
    'model/code',
    'model/cardModel',
    'controller/CardContainer',
    'app/config',
    'tool'
], function (
    $,
    _,
    Backbone,
    Progress,
    TargetPanel,
    StatusPanel,
    Slider,
    Cursor,
    SliderRow,
    Code,
    CardModel,
    CardContainer,
    Config,
    tool
    ) {

    var gameStatusModel = new Backbone.Model({
        'remain_time' : 100,
        'completed' : false
        /*
        path : '',
        path0 : '',
        path1 : '',
        path2 : ''
         */
    });
    var sliderRowCollection = new SliderRow();

    var progress = Progress.build(".bp_progress", gameStatusModel);
    var targetPanel = TargetPanel.build(".bp_target_panel", gameStatusModel);
    var statusPanel = StatusPanel.build(".bp_status_panel", gameStatusModel);
    var slider = Slider.build('.bp_slider', sliderRowCollection);
    slider.on("cursor:moved", function (card) {
        if (card.model.isDistricted()) {
            console.log('isDistricted');
        }
    });
    
    slider.on("cursor:selected", function (card) {
        var code = card.model.getCode();
        console.log(code);
    });

    function createRandomCard() {
        var card = CardModel.build(Code.getRandom());
        if (tool.randomBoolean(Config.CardDistrictedRatio)) {
            card.setDistricted();
        }
        return card;
    }

    function addRandomCard() {
        sliderRowCollection.addCodes(
            createRandomCard(),
            createRandomCard(),
            createRandomCard()
        );
    }

    _.times(5, addRandomCard);

    slider.setCursorToSomePoint();

    slider.slideUp(function () {
        addRandomCard();
        return true;
    });

    return {};
});