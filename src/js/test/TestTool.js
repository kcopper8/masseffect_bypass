/**
 * Created by user on 2014-10-12.
 */
define(function () {
    window.stopTest = false;
    window.testToolInterval = window.testToolInterval || 1000;
    return {
        test : function test() {
            var suiteCount = arguments.length;
            var suite = arguments;

            var thisCount = 0;

            setInterval(function() {
                if (!!window.stopTest) {
                    return;
                }
                suite[(thisCount++) % suiteCount].call();
            }, window.testToolInterval);
        }
    };
});