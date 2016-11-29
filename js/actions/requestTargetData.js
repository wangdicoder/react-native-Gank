/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

import * as TYPES from './actionTypes';
import fetchUrl from '../constants/fetchUrl';
import fetchWithTimeout from '../utils/fetchWithTimeout';

function requestData() {
    return {
        type: TYPES.FETCH_TARGET_DATA_REQUEST
    }
}

function requestMoreData() {
    return {
        type: TYPES.FETCH_TARGET_MORE_DATA_REQUEST
    }
}

function receiveData(responseData){
    return {
        type: TYPES.FETCH_TARGET_DATA_SUCCESS,
        dataSource: responseData.results
    }
}

function fetchFailure() {
    return {
        type: TYPES.FETCH_TARGET_DATA_FAILURE
    }
}

function fetchedFullData(){
    return {
        type: TYPES.FETCH_TARGET_DATA_IS_FULL
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
        dispatch(requestData());
        setTimeout(()=> {
            return fetchWithTimeout(5000, fetch(url))
                .then(response => response.json())
                .then(json => {
                    if (isValidData(json)) {
                        dispatch(receiveData(json));
                    } else {
                        dispatch(fetchFailure());
                    }
                }).catch((error) => {
                    dispatch(fetchFailure());
                });
        }, 1000);//the server reaction is fast, add a timeout to show the refresh effect
    }
}

export function fetchMoreData(category){
    const url = fetchUrl.category + category;
    return function (dispatch) {
        dispatch(requestMoreData());
        setTimeout(()=>{
            return fetchWithTimeout(5000, fetch(url))
                .then(response => response.json())
                .then(json => {
                    if(isValidData(json)){
                        dispatch(receiveData(json));
                    }else{
                        dispatch(fetchedFullData());
                    }
                }).catch((error) => {
                    dispatch(fetchFailure());
                });
        }, 1000);
    }
}