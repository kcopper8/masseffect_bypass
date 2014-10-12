/**
 * Created by user on 2014-10-12.
 */
define(['jquery', 'ui/StatusPanel', 'model/code','test/testTool'], function ($, StatusPanel, Code, TestTool) {
    return function (){
        var statusPanel = window.statusPanel = new StatusPanel($(".bp_status_panel"));

        TestTool.test(function() {
            statusPanel.setCompleted();
        },
        function() {
            statusPanel.setUncompleted();
        },
        function() {
            statusPanel.setFoundCode(0);
            statusPanel.setFoundCode(1);
            statusPanel.setFoundCode(2);
        },
        function () {
            statusPanel.setFoundCode(0, Code.createRandomCode())
        },
        function() {
            statusPanel.setFoundCode(1, Code.createRandomCode())
        },
            function () {
                statusPanel.setFoundCode(2, Code.createRandomCode())
            });

        return {};
    };
});