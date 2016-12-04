/**
 * Created by wangdi on 30/11/16.
 */
'use strict';

import colors from '../constants/colors';
import * as TYPES from '../actions/actionTypes';

const initialState = {
    isOpenThumbnail: true,
    displayOrder: ['Android','iOS','前端','拓展资源','休息视频','App'],
    dayMode: {
        mainThemeColor: colors.dodgerBlue,
        pageBackgroundColor: '#f4f4f4',
        segmentColor: '#ccc',
        titleColor: '#000',
        subTitleColor: '#aaa',
        rowItemBackgroundColor: '#fff'
    },
    nightMode: {
        mainThemeColor: 'rgb(47,47,47)', //200
        pageBackgroundColor: 'rgb(58,58,58)',
        segmentColor: 'rgb(54,54,54)',
        titleColor: 'rgb(177,177,177)',
        subTitleColor: 'rgb(130,130,130)',
        rowItemBackgroundColor: 'rgb(63,63,63)',
    }
}

export default function settingState(state=initialState, action) {
    switch(action.type){
        case TYPES.CHANGE_COLOR:
            return Object.assign({}, state, {
                ...state,
                mainThemeColor: action.color,
                dayMode: {
                    ...state.dayMode,
                    mainThemeColor: action.color
                }
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

        case TYPES.CHANGE_DISPLAY_ORDER:
            return Object.assign({}, state, {
                ...state,
                displayOrder: action.displayOrder
            });

        default:
            return state;
    }
}