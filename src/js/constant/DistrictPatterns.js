/**
 * Created by user on 2014-11-13.
 */
define(['underscore', 'app/config', 'logic/PathFinder'], function (_, Config, PathFinder) {
    var PATTERNS = [
        [false,false,false],
        [true ,false,false],
        [false,true ,false],
        [false,false,true ],
        [true ,true ,false],
        [true ,false,true ],
        [false,true ,true ]
    ];

    var PATTERN_TYPES = [
      0,1,1,1,2,2,2
    ];

    var DistrictPattern = function (pattern, __index) {
        this.applyPattern = function (array, applyer) {
            _.each(array, function (item, index) {
                if (!!pattern[index]) {
                    applyer.call(null, item);
                }
            }, this);
        };

        this.isClearPattern = function () {
            return __index == 0;
        };

        this.raw = function () {
            return pattern;
        }
    };

    var DistrictPatterns = _.map(PATTERNS, function (pattern, index) {
        return new DistrictPattern(pattern, index);
    });


    function selectNumberUsingProbabilities(greenPatternNumbers) {
        var patternTypeGroups = _.groupBy(greenPatternNumbers, function(number) {
            return PATTERN_TYPES[number];
        });


        var mapped = _(patternTypeGroups)
            .keys()
            .map(function (patternType) {
                var arr = [];
                for (var i = 0; i < Config.DistrictProbabilities[patternType]; i++) {
                    arr.push(patternType);
                }
                return arr;
            });

        var selectedType = _.sample(_.flatten(mapped));
        return _.sample(patternTypeGroups[selectedType]);
    }


    DistrictPatterns.pick = function (lastPatterns) {
        var RAW_PATTERNS = _.map(lastPatterns, function (_districtPattern) {
            return _districtPattern.raw();
        });
        
        var greenPatternNumbers = _.filter(_.range(1, 7), function(n){
            var newRawPatterns = _.clone(RAW_PATTERNS);
            newRawPatterns.push(PATTERNS[n]);

            return PathFinder.noDeadEndStartingPoint(newRawPatterns);
        });

        greenPatternNumbers.push(0);
        var num = selectNumberUsingProbabilities(greenPatternNumbers);
        return DistrictPatterns[num];
    };

    DistrictPatterns.pickClearPattern = function () {
        return DistrictPatterns[0];
    };

    return DistrictPatterns;
});