/**
 * Created by wangdi on 26/11/16.
 */
'use strict';

import * as TYPES from '../actions/actionTypes'

const initialState = {
    loading: true,
    dataSource: [],
    isRenderFooter: false,
    pageNumber: 0,
    error: false
};

export default function targetData(state=initialState, action) {
    switch(action.type){
        case TYPES.FETCH_TARGET_DATA_REQUEST:
            return Object.assign({}, state, {
                ...state,
                loading: true,
                isRenderFooter: false,
                dataSource: [],
            });

        case TYPES.FETCH_TARGET_MORE_DATA_REQUEST:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: true,
                dataSource: state.dataSource,
            });

        case TYPES.FETCH_TARGET_DATA_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: false,
                dataSource: state.dataSource.concat(action.dataSource),
                pageNumber: state.pageNumber + 1
            });

        case TYPES.FETCH_TARGET_MORE_DATA_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: false,
                dataSource: state.dataSource.concat(action.dataSource),
                pageNumber: state.pageNumber + 1
            });

        case TYPES.FETCH_TARGET_DATA_FAILURE:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: false,
                error: true
            });

        default:
            return state;
    }
}