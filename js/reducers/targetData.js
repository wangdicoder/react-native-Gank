/**
 * Created by wangdi on 26/11/16.
 */
'use strict';

import * as types from '../actions/actionTypes'

const initialState = {
    loading: true,
    dataSource: {}
};

export default function targetData(state=initialState, action) {
    switch(action.type){
        case types.RECEIVE_DATA:
            return Object.assign({}, state, {
                loading: false,
                dataSource: action.dataSource
            });

        default:
            return state;
    }
}