/**
 * Created by wangdi on 3/12/16.
 */
'use strict';

import * as TYPES from '../actions/actionTypes';

const initialState = {
    dataSource: [],
    loading: false,
    error: false,
    isRenderFooter: false,
};

export default function randomDataState(state=initialState, action) {
    switch(action.type){
        case TYPES.FETCH_RANDOM_DATA_REQUEST:
            return Object.assign({}, state, {
                ...state,
                loading: true,
                isRenderFooter: false,
                error: false
            });

        case TYPES.FETCH_RANDOM_MORE_DATA_REQUEST:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: true
            });

        case TYPES.FETCH_RANDOM_DATA_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: false,
                dataSource: action.dataSource
            });

        case TYPES.FETCH_RANDOM_MORE_DATA_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                isRenderFooter: false,
                dataSource: state.dataSource.concat(action.dataSource)
            });

        case TYPES.FETCH_RANDOM_DATA_FAILURE:
            return Object.assign({}, state, {
                ...state,
                error: true,
                loading: false
            });

        case TYPES.FETCH_RANDOM_MORE_DATA_FAILURE:
            return Object.assign({}, state, {
                ...state,
                isRenderFooter: false
            });

        default:
            return state;
    }
}