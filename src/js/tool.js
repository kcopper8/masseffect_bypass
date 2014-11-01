/**
 * Created by user on 2014-10-12.
 */
define({
    randomBoolean: function (v) {
        return v > _.random(0, 100);
    },
    
    now : function () {
        return new Date().getTime();
    },
    nowSec : function () {
        return new Date().getTime() / 1000;
    }
});