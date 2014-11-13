/**
 * Created by user on 2014-11-02.
 */
define(['app/config'], function (Config) {

    var parsedQueryString = {};
    parsedQueryString.success_url = Config.SuccessPrizeLocation;
    parsedQueryString.failure_url = Config.FailurePrizeLocation || parsedQueryString.success_url;
    parsedQueryString.noredirect = Config.NoRedirect;

    var prizeController = function (parsedQueryString) {
        function noredirect() {
            return !! parsedQueryString.noredirect;
        }
        this.moveToSuccessTarget = function () {
            if (!noredirect()) {
                location.href = parsedQueryString.success_url;
            }
        };

        this.moveToFailedTarget = function () {
            if (!noredirect()) {
                location.href = parsedQueryString.failure_url;
            }
        };
    };

    return new prizeController(parsedQueryString);
});