/**
 * Created by user on 2014-10-09.
 */
define(['jquery',
    'ui/Progress',
    'ui/targetPanel',
    'model/code',
    'ui/StatusPanel',

    'test/testUiProgress',
    'test/testTargetPanel',
    'test/testStatusPanel'
], function($, Progress, TargetPanel, Code, StatusPanel,
            testUiProgress, testTargetPanel, testStatusPanel) {
    console.log("base", arguments);

    testUiProgress();
    testTargetPanel();
    testStatusPanel();
});