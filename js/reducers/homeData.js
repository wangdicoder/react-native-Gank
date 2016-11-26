/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import * as types from '../actions/actionTypes';

const initialState = {
    loading: true,
    hasData: false,
    error: false,
    dataSource: {},
    dataTime: '',
};

export default function homeData(state=initialState, action){
    switch (action.type){
        case types.REQUEST_HOME_DATA:
            return Object.assign({}, state, {
                ...state,
            });

        case types.RECEIVE_HOME_DATA:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                hasData: true,
                dataSource: action.dataSource,
                dataTime: action.dataTime
            });

        default:
            return state;
    }
}