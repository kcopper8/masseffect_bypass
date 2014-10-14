/**
 * Created by user on 2014-10-12.
 */

define(['app/config', 'underscore'], function (Config, _) {
    var Code,
        holder = [];

    Code = function(number) {
        this.number = number;

        this.getPath = function() {
            return Config.CodePathPrefix + this.number + ".png";
        };
    };

    for (var i = 1; i <= Config.CodeTypeCount; i++) {
        holder.push(new Code(i));
    }

    Code.createRandomCode = function() {
        var codeNumber = _.random(1, Config.CodeTypeCount);
        return new Code(codeNumber);
    };
    Code.get = function(number) {
        return holder[number - 1];
    };

    Code.getRandom = function() {
        var idx = _.random(1, Config.CodeTypeCount);
        return Code.get(idx);
    };

    Code.getRandoms = function(count) {
        return [Code.getRandom(), Code.getRandom(), Code.getRandom()];
    };

    var allCodeTypes = _.rest(_.range(Config.CodeTypeCount + 1), 1);

    Code.getSamples = function(count) {
        var selectedCodes = _.sample(allCodeTypes, count);
        return _.map(selectedCodes, function (codeNumber) {
            return Code.get(codeNumber);
        });
    };

    return Code;
});