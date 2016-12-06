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
        dataSource: json
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
        dataSource: json
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

export function fetchRandomData(isMoreData=false) {
    var results = [];
    const randomCategory = ['Android/1','iOS/1','前端/1','休息视频/1','拓展资源/1','App/1','瞎推荐/1'];
    var index = 0;

    function fetchCategoryData(dispatch) {
        fetchWithTimeout(5000, fetch(fetchUrl.random + randomCategory[Math.floor(Math.random()*7)]))
            .then((response)=> response.json())
            .then((json) => {
                index++;
                results = results.concat(json.results);

                if(index >= 10) {
                    if (isMoreData)
                        dispatch(fetchMoreDataSuccess(results));
                    else
                        dispatch(fetchSuccess(results));
                }else
                    fetchCategoryData(dispatch);
            }).catch((error) => {
            if(isMoreData)
                dispatch(fetchMoreDataFailure());
            else
                dispatch(fetchFailure());
        });
    }

    return (dispatch) => {
        if(isMoreData)
            dispatch(fetchMoreDataRequest());
        else
            dispatch(fetchRequest());

        fetchCategoryData(dispatch);
    }
}