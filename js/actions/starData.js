/**
 * Created by wangdi on 2/12/16.
 */
'use strict';

import * as TYPES from './actionTypes';

export function star(rowData) {
    return {
        type: TYPES.STAR_A_DATA,
        data: rowData
    };
}

export function unStar(rowData) {
    return {
        type: TYPES.UNSTAR_A_DATA,
        data: rowData
    };
}