/**
 * Created by user on 2014-10-09.
 */
define(['jquery',
    'ui/Progress',
    'ui/TargetPanel',
    'model/code',
    'ui/StatusPanel',
    'ui/Slider',


    'test/testUiProgress',
    'test/testTargetPanel',
    'test/testStatusPanel',
    'test/testSlider'
], function($, Progress, TargetPanel, Code, StatusPanel, Slider,
            testUiProgress, testTargetPanel, testStatusPanel, testSlider) {
    console.log("base", arguments);

    testUiProgress();
    testTargetPanel();
    testStatusPanel();
    testSlider();
});