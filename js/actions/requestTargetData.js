/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

import * as types from './actionTypes';
import fetchUrl from '../constants/fetchUrl';
import fetchWithTimeout from '../utils/fetchWithTimeout';

function requestData() {

}

function receiveData(responseData){
    return {
        type: types.FETCH_TARGET_DATA_SUCCESS,
        dataSource: responseData
    }
}

function fetchFailure() {
    return {
        type: types.FETCH_TARGET_DATA_FAILURE
    }
}

function isValidData(responseData) {
    if(responseData.results.length > 0)
        return true;
    return false;
}

export function fetchData(category) {
    const url = fetchUrl.category + category;
    return function (dispatch) {

        return fetchWithTimeout(5000, fetch(url))
            .then(response => response.json())
            .then(json => {
                if(isValidData(json)){
                    dispatch(receiveData(json));
                }else{
                    dispatch(fetchFailure());
                }
            }).catch((error) => {
                dispatch(fetchFailure());
            });
    }
}