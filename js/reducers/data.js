/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import * as types from '../actions/actionTypes';

const initialState = {
    loading: true,
    error: false,
    dataSource: {},
};

export default function data(state=initialState, action){
    switch (action.type){
        case types.REQUEST_DATA:
            return Object.assign({}, state, {
                ...state,
                loading: true
            });

        case types.RECEIVE_DATA:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                dataSource: action.dataSource,
            });

        case types.FETCH_FAILURE:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                error: true
            });

        default:
            return state;
    }
}