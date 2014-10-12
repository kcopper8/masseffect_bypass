/**
 * Created by user on 2014-10-12.
 */

define(['app/config'], function (Config) {
    var Code =  function(number) {
        this.number = number;

        this.getPath = function() {
            return Config.CodePathPrefix + this.number + ".png";
        };
    };

    Code.createRandomCode = function() {
        var codeNumber = Math.ceil(Math.random() * Config.CodeTypeCount);
        return new Code(codeNumber);
    };

    return Code;
});