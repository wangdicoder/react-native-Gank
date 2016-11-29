/**
 * Created by wangdi on 30/11/16.
 */
'use strict';

import colors from '../constants/colors';
import * as TYPES from '../actions/actionTypes';

const initialState = {
    mainThemeColor: colors.black
}

export default function themeColor(state=initialState, action) {
    switch(action.type){
        case TYPES.CHANGE_TO_BLUE:
            return Object.assign({}, state, {
                mainThemeColor: colors.lightBlue
            });

        default:
            return state;
    }
}