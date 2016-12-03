/**
 * Created by wangdi on 3/12/16.
 */
'use strict';

import * as TYPES from './actionTypes';
import fetchUrl from '../constants/fetchUrl';
import fetchWithTimeout from '../utils/fetchWithTimeout';

function fetchSuccess(json) {
    return {
        type: TYPES.FETCH_RANDOM_DATA_SUCCESS,
        dataSource: json.results
    };
}

function fetchFailure() {
    return {
        type: TYPES.FETCH_RANDOM_DATA_FAILURE
    };
}

function fetchRequest() {
    return {
        type: TYPES.FETCH_RANDOM_DATA_REQUEST
    };
}

function fetchMoreDataSuccess(json) {
    return {
        type: TYPES.FETCH_RANDOM_MORE_DATA_SUCCESS,
        dataSource: json.results
    };
}

function fetchMoreDataRequest() {
    return {
        type: TYPES.FETCH_RANDOM_MORE_DATA_REQUEST
    };
}

function fetchMoreDataFailure() {
    return {
        type: TYPES.FETCH_RANDOM_MORE_DATA_FAILURE
    };
}

export function fetchRandomData() {
    var url = fetchUrl.random + 'Android/10';
    return (dispatch) => {
        dispatch(fetchRequest());
        fetchWithTimeout(5000, fetch(url))
            .then((response)=> response.json())
            .then((json) => {
                dispatch(fetchSuccess(json));
            }).catch((error) => {
                dispatch(fetchFailure());
            });
    };
}

export function fetchMoreRandomData() {
    var url = fetchUrl.random + 'Android/10';
    return (dispatch) => {
        dispatch(fetchMoreDataRequest());
        fetchWithTimeout(5000, fetch(url))
            .then((response)=> response.json())
            .then((json) => {
                dispatch(fetchMoreDataSuccess(json));
            }).catch((error) => {
            dispatch(fetchMoreDataFailure());
        });
    };
}