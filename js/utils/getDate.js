/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

function convertTime(time) {
    if (time <= 9)
        return '0' + time;
    return time;
}

export function getCurrentDate() {
    var date = new Date();
    return date.getFullYear() + '/' + convertTime(date.getMonth() + 1) + '/' + convertTime(date.getDate());
}

export function getYesterdayFromDate(date) {
    var date = new Date(date);
    date.setDate(date.getDate() - 1);

    return date.getFullYear() + '/' + convertTime(date.getMonth() + 1) + '/' + convertTime(date.getDate());
}