/**
 * Created by wangdi on 30/11/16.
 */
'use strict';

import colors from '../constants/colors';
import * as TYPES from '../actions/actionTypes';

const initialState = {
    mainThemeColor: colors.dodgerBlue,
    isOpenThumbnail: false
}

export default function settingState(state=initialState, action) {
    switch(action.type){
        case TYPES.CHANGE_COLOR:
            return Object.assign({}, state, {
                ...state,
                mainThemeColor: action.color
            });

        case TYPES.OPEN_SHOW_THUMBNAIL:
            return Object.assign({}, state, {
                ...state,
                isOpenThumbnail: true
            });

        case TYPES.CLOSE_SHOW_THUMBNAIL:
            return Object.assign({}, state, {
                ...state,
                isOpenThumbnail: false
            });

        default:
            return state;
    }
}