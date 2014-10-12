/**
 * Created by user on 2014-10-12.
 */
define(function () {
    return {
        test : function test() {
            var suiteCount = arguments.length;
            var suite = arguments;

            var thisCount = 0;

            setInterval(function() {
                suite[(thisCount++) % suiteCount].call();
            }, 1000);
        }
    };
});