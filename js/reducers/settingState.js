/**
 * Created by wangdi on 30/11/16.
 */
'use strict';

import colors from '../constants/colors';
import * as TYPES from '../actions/actionTypes';

const initialState = {
    themeColor: colors.dodgerBlue,
    isOpenThumbnail: true,
    isOpenNightMode: false,
    displayOrder: ['Android','iOS','前端','拓展资源','休息视频','App'],
    colorScheme: {  //dayMode color scheme for the default color
        mainThemeColor: colors.dodgerBlue,
        pageBackgroundColor: '#f4f4f4',
        segmentColor: '#ccc',
        titleColor: '#000',
        subTitleColor: '#aaa',
        rowItemBackgroundColor: '#fff',
        arrowColor: '#ccc',
        tabIconColor: colors.dodgerBlue
    }
}

export default function settingState(state=initialState, action) {
    switch(action.type){
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

        case TYPES.CHANGE_COLOR:
            return Object.assign({}, state, {
                ...state,
                themeColor: action.color,
                colorScheme: {
                    ...state.colorScheme,
                    mainThemeColor: action.color,
                    tabIconColor: action.color
                }
            });

        case TYPES.OPEN_NIGHT_MODE:
            return Object.assign({}, state, {
                ...state,
                isOpenNightMode: true,
                colorScheme: {
                    mainThemeColor: 'rgb(40,40,40)',
                    pageBackgroundColor: 'rgb(58,58,58)',
                    segmentColor: 'rgb(54,54,54)',
                    titleColor: 'rgb(177,177,177)',
                    subTitleColor: 'rgb(130,130,130)',
                    rowItemBackgroundColor: 'rgb(63,63,63)',
                    arrowColor: 'rgb(200,200,200)',
                    tabIconColor: 'rgb(220,220,220)'
                }
            });

        case TYPES.CLOSE_NIGHT_MODE:
            return Object.assign({}, state, {
                ...state,
                isOpenNightMode: false,
                colorScheme: {
                    mainThemeColor: state.themeColor,
                    pageBackgroundColor: '#f4f4f4',
                    segmentColor: '#ccc',
                    titleColor: '#000',
                    subTitleColor: '#aaa',
                    rowItemBackgroundColor: '#fff',
                    arrowColor: '#ccc',
                    tabIconColor: state.themeColor
                }
            });

        default:
            return state;
    }
}