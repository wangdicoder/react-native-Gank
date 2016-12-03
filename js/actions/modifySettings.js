/**
 * Created by wangdi on 30/11/16.
 */
'use strict';

import * as TYPES from './actionTypes';

export function changeColor(color) {
    return {
        type: TYPES.CHANGE_COLOR,
        color: color
    };
}

export function changeShowThumbnail(value) {
    if(value) {
        return {
            type: TYPES.OPEN_SHOW_THUMBNAIL
        };
    }else {
        return {
            type: TYPES.CLOSE_SHOW_THUMBNAIL
        };
    }
}