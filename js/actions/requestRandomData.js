/**
 * Created by wangdi on 3/12/16.
 */
'use strict';

import * as TYPES from './actionTypes';
import fetchUrl from '../constants/fetchUrl';
import fetchWithTimeout from '../utils/fetchWithTimeout';
import RandomDataDAO from '../dao/RandomDataDAO';
import Toast from 'react-native-root-toast';
import px2dp from '../utils/px2dp';

function fetchSuccess(json) {
    return {
        type: TYPES.FETCH_RANDOM_DATA_SUCCESS,
        dataSource: json.sort()
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
        dataSource: json.sort()
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

/**
 * for save cellular network data and improve performance,
 * this random data is only manually refreshed
 */
export function fetchLocalRandomData() {
    return (dispatch) => {
        let dao = new RandomDataDAO();
        dao.fetchLocalData().then((result)=>{
            dispatch(fetchSuccess(result));
        }, (error)=>{
            dispatch(fetchRandomData());
        });
    };
}

export function fetchRandomData(isMoreData=false) {
    var results = [];
    const randomCategory = ['Android/2','iOS/2','前端/2','休息视频/2','拓展资源/2','App/2','瞎推荐/2'];
    var index = 0;

    function fetchCategoryData(dispatch) {
        fetchWithTimeout(5000, fetch(fetchUrl.random + randomCategory[Math.floor(Math.random()*7)]))
            .then((response)=> response.json())
            .then((json) => {
                index += 2;
                results = results.concat(json.results);

                if(index >= 10) {
                    if (isMoreData) {
                        dispatch(fetchMoreDataSuccess(results));
                    }else {
                        let dao = new RandomDataDAO();
                        dao.saveData(results);
                        dispatch(fetchSuccess(results));
                    }
                }else
                    fetchCategoryData(dispatch);
            }).catch((error) => {
                Toast.show('获取数据失败', {position: px2dp(-80)});
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