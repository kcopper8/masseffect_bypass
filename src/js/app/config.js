/**
 * Created by user on 2014-10-12.
 */
define(['underscore', 'lib/query-string'], function (_, queryString) {


    var Config = function (options) {
        _.defaults(this, options);

        var parsedQueryString = queryString.parse(location.search);
        var queryStringKeyMap = {
            "CTC" : "CodeTypeCount",
            "SSPC" : "SlideSpeedPerCard",
            "GTS" : "GameTimeSeconds",
            "SPL" : "SuccessPrizeLocation",
            "FPL" : "FailurePrizeLocation",
            "DP" : "DistrictProbabilities",
            "NR" : "NoRedirect"
        };

        var DECORATERS = {
            'CodeTypeCount' : function (v) {
                return parseInt(v);
            },
            'SlideSpeedPerCard' : function(v) {
                return parseInt(v);
            },
            'GameTimeSeconds' : function(v) {
                return parseInt(v);
            },
            'DistrictProbabilities' : function(v) {
                var splited = v.split("|");
                return _.map(splited, function (v) {
                    return parseInt(v);
                });
            },
            'NoRedirect' : function(v) {
                return !!v;
            }

        };

        function decorate(type, value) {
            if (_.isFunction(DECORATERS[type])) {
                return DECORATERS[type](value);
            }

            return value;
        }


        _.each(parsedQueryString, function (val, key) {
            if (!queryStringKeyMap[key]) {
                return ;
            }

            this[queryStringKeyMap[key]] = decorate(queryStringKeyMap[key], val) || this[queryStringKeyMap[key]];
        }, this);
    };

    return new Config({
        "CodeTypeCount" : 11,
        "CodePathPrefix" : 'img/codes/',
        "CardHeight" : 82,
        "CodeImageHeight" : 81,
        "SlideSpeedPerCard" : 1000,
        "RowsCountInSlide" : 5,
        "GameTimeSeconds" : 40,
        "SuccessPrizeLocation" : 'https://github.com/kcopper8/masseffect_bypass/',
        "FailurePrizeLocation" : '',
        "WaitSecondAfterCompleted" : 3,
        "DistrictProbabilities" : [3, 2, 1],
        "PreLoadImages" : ["img/merged/codes.png","img/merged/headerfooter.png","img/merged/backgrounds.png"],
        "NoRedirect" : false
    });
});


