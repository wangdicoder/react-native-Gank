/**
 * Created by wangdi on 26/11/16.
 */
'use strict';

import * as TYPES from '../actions/actionTypes'

const initialState = {
    loading: true,
    dataSource: [],
    isRenderFooter: false,
    pageNumber: 1,
    isFullData: false,
    error: false
};

export default function targetData(state=initialState, action) {
    switch(action.type){
        case TYPES.FETCH_CATEGORY_DATA_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                isRenderFooter: false,
                isFullData: false,
                pageNumber: 1,
                dataSource: [],
                error: false
            });

        case TYPES.FETCH_CATEGORY_MORE_DATA_REQUEST:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: true,
                dataSource: state.dataSource,
                error: false
            });

        case TYPES.FETCH_CATEGORY_DATA_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: false,
                dataSource: state.dataSource.concat(action.dataSource),
                pageNumber: state.pageNumber + 1
            });

        case TYPES.FETCH_CATEGORY_DATA_FAILURE:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: false,
                error: true
            });

        case TYPES.FETCH_CATEGORY_MORE_DATA_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isRenderFooter: false
            });

        case TYPES.FETCH_CATEGORY_DATA_IS_FULL:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: true,
                isFullData: true
            });

        default:
            return state;
    }
}