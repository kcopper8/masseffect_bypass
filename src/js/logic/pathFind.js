/**
 * Created by user on 2014-11-13.
 */
define(['underscore'], function (_) {
    var nextPositionPicker = {
        'down' : function (pos) {
            return [pos[0] + 1, pos[1]];
        },
        'left' : function (pos) {
            return [pos[0], pos[1] - 1];
        },
        'right' : function (pos) {
            return [pos[0], pos[1] + 1];
        }
    };

    var DistrictedState = {
        NO_VALUE : 'no_value',
        NOT_DISTRICTED : 'not_districted',
        DISTRICTED : 'districted'
    };

    function __getValueOf(data, pos) {
        var row = pos[0],
            col = pos[1];

        if (!data[row]) {
            return DistrictedState.NO_VALUE;
        }

        if (data[row][col] === undefined) {
            return DistrictedState.NO_VALUE;
        } else if (data[row][col] === false) {
            return DistrictedState.NOT_DISTRICTED;
        } else {
            return DistrictedState.DISTRICTED;
        }
    }

    function __isLastRow(data, pos) {
        var row = pos[0];
        return row >= (data.length - 1);
    }

    var Result = {
        PATH_FOUND : true,
        NO_WAY : false
    };

    function __pathFind(data, pos, dir) {
        var districtedState = __getValueOf(data, pos);

        if (_.contains([DistrictedState.NO_VALUE, DistrictedState.DISTRICTED], districtedState)) {
            return Result.NO_WAY;
        }

        if (__isLastRow(data, pos)) {
            return Result.PATH_FOUND;
        }


        var downResult = __pathFind(data, nextPositionPicker.down(pos));
        if (Result.PATH_FOUND == downResult) {
            return downResult;
        }

        var dirs = !!dir ? [dir] : ['left', 'right'];

        for(var i = 0; i < dirs.length; i++) {
            var _dir = dirs[i];

            var dirResult = __pathFind(data, nextPositionPicker[_dir](pos), _dir);
            if (Result.PATH_FOUND == dirResult) {
                return dirResult;
            }
        }

        return Result.NO_WAY;
    }

    function pathFind(data, row, col) {
        return __pathFind(data, [row, col]);
    }




    return pathFind;
});