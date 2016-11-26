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
};

export default function homeData(state=initialState, action){
    switch (action.type){
        case types.REQUEST_DATA:
            return Object.assign({}, state, {
                ...state,
            });

        case types.RECEIVE_DATA:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                hasData: true,
                dataSource: action.dataSource,
            });

        default:
            return state;
    }
}