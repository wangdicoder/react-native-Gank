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
        case TYPES.CHANGE_TO_LIGHT_BLUE:
            return Object.assign({}, state, {
                mainThemeColor: colors.lightBlue
            });

        case TYPES.CHANGE_TO_YELLOW:
            return Object.assign({}, state, {
                mainThemeColor: colors.yellow
            });

        case TYPES.CHANGE_TO_SEA_GREEN:
            return Object.assign({}, state, {
                mainThemeColor: colors.seaGreen
            });

        case TYPES.CHANGE_TO_PURPLE:
            return Object.assign({}, state, {
                mainThemeColor: colors.purple
            });

        case TYPES.CHANGE_TO_ORANGE_RED:
            return Object.assign({}, state, {
                mainThemeColor: colors.orangeRed
            });

        case TYPES.CHANGE_TO_BLACK:
            return Object.assign({}, state, {
                mainThemeColor: colors.black
            });

        case TYPES.CHANGE_TO_DODGER_BLUE:
            return Object.assign({}, state, {
                mainThemeColor: colors.dodgerBlue
            });

        case TYPES.CHANGE_TO_LIGHT_GREEN:
            return Object.assign({}, state, {
                mainThemeColor: colors.lightGreen
            });

        case TYPES.CHANGE_TO_LIME_GREEN:
            return Object.assign({}, state, {
                mainThemeColor: colors.limeGreen
            });

        case TYPES.CHANGE_TO_ORANGE:
            return Object.assign({}, state, {
                mainThemeColor: colors.orange
            });

        default:
            return state;
    }
}