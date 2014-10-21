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
    'controller/CardContainer'
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
    CardContainer
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

    var CardContainer = new CardContainer();


    return {};
});