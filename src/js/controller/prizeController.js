/**
 * Created by user on 2014-11-02.
 */
define(['app/config', 'lib/query-string'], function (Config, queryString) {

    var parsedQueryString = queryString.parse(location.search);
    parsedQueryString.success_url = parsedQueryString.success_url || Config.DefaultPrizeLocation;
    parsedQueryString.failure_url = parsedQueryString.failure_url || parsedQueryString.success_url || Config.DefaultPrizeLocation;

    var prizeController = function () {
        this.moveToSuccessTarget = function () {
            location.href = parsedQueryString.success_url;
        };

        this.moveToFailedTarget = function () {
            location.href = parsedQueryString.failure_url;
        };
    };

    return new prizeController();
});