/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

import * as TYPES from './actionTypes';
import fetchUrl from '../constants/fetchUrl';
import fetchWithTimeout from '../utils/fetchWithTimeout';
import Toast from 'react-native-root-toast';
import px2dp from '../utils/px2dp';

function requestData() {
    return {
        type: TYPES.FETCH_CATEGORY_DATA_REQUEST
    }
}

function requestMoreData() {
    return {
        type: TYPES.FETCH_CATEGORY_MORE_DATA_REQUEST
    }
}

function receiveData(json){
    return {
        type: TYPES.FETCH_CATEGORY_DATA_SUCCESS,
        dataSource: json.results
    }
}

function fetchFailure() {
    return {
        type: TYPES.FETCH_CATEGORY_DATA_FAILURE
    }
}

function fetchMoreDataFailure() {
    return {
        type: TYPES.FETCH_CATEGORY_MORE_DATA_FAILURE
    }
}

function fetchedFullData(){
    return {
        type: TYPES.FETCH_CATEGORY_DATA_IS_FULL
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
            fetchWithTimeout(5000, fetch(url))
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
        }, 500);//the server reaction is fast, add a timeout to show the refresh effect
    }
}

export function fetchMoreData(category){
    const url = fetchUrl.category + category;
    return (dispatch) => {
        dispatch(requestMoreData());
        setTimeout(()=>{
            fetchWithTimeout(5000, fetch(url))
                .then(response => response.json())
                .then(json => {
                    if(isValidData(json)){
                        dispatch(receiveData(json));
                    }else{
                        dispatch(fetchedFullData());
                    }
                }).catch((error) => {
                    Toast.show('获取数据失败', {position: px2dp(-80)});
                    dispatch(fetchMoreDataFailure());
                });
        }, 1000);
    }
}