/**
 * Created by wangdi on 30/11/16.
 */
'use strict';

import * as TYPES from './actionTypes';

export function changeColor(color) {
    return {
        type: TYPES.CHANGE_COLOR,
        color: color
    }
}