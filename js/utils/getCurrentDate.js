/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

export default function getCurrentDate() {
    function convertTime(time) {
        if (time <= 9)
            return '0' + time;
        return time;
    }

    var date = new Date();
    return date.getFullYear() + '/' + convertTime(date.getMonth() + 1) + '/' + convertTime(date.getDate());
}