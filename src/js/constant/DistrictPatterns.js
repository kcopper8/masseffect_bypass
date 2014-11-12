/**
 * Created by user on 2014-11-13.
 */
define(['underscore'], function (_) {
    var PATTERNS = [
        [false,false,false],
        [true ,false,false],
        [false,true ,false],
        [false,false,true ],
        [true ,true ,false],
        [true ,false,true ],
        [false,true ,true ]
    ];

    var DistrictPattern = function (pattern, __index) {
        this.applyPattern = function (array, applyer) {
            _.each(array, function (item, index) {
                if (!!pattern[index]) {
                    applyer.call(null, item);
                }
            }, this);
        };

        this.getIndex = function () {
            return __index;
        };
    };

    var DistrictPatterns = _.map(PATTERNS, function (pattern, index) {
        return new DistrictPattern(pattern, index);
    });

    DistrictPatterns.pick = function () {
        return _.sample(DistrictPatterns);
    };

    return DistrictPatterns;
});