/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

import * as types from './actionTypes';
import fetchUrl from '../constants/fetchUrl';
import fetchWithTimeout from '../utils/fetchWithTimeout';
import {getYesterdayFromDate} from '../utils/getDate';
import HomeDataDAO from '../dao/HomeDataDAO';
import Toast from 'react-native-root-toast';
import px2dp from '../utils/px2dp';

function requestData() {
    return {
        type: types.FETCH_HOME_DATE_REQUEST,
    };
}

function receiveData(json, date){
    return {
        type: types.FETCH_HOME_DATA_SUCCESS,
        dataSource: json,
        dataTime: date
    }
}

function fetchFailure() {
    return {
        type: types.FETCH_HOME_DATA_FAILURE
    };
}

function isValidData(responseData) {
    if(responseData.category.length > 0)
        return true;
    return false;
}

export function onlyFetchLocalData(date) {
    return (dispatch)=> {
        var dao = new HomeDataDAO();
        dao.fetchLocalData(date).then((localData) => {
            //Toast.show('local', {position: px2dp(-80)});
            dispatch(receiveData(localData, date));
        }, (localData) => {
            //Toast.show('local', {position: px2dp(-80)});
            dispatch(onlyFetchLocalData(getYesterdayFromDate(date)));
        });
    }
}

export function fetchDataIfNeed(date) {
    const url = fetchUrl.daily + date;
    return (dispatch) => {
        dispatch(requestData());
        var dao = new HomeDataDAO();
        dao.fetchLocalData(date).then((localData) => {
            Toast.show('已是最新数据了', {position: px2dp(-80)});
            dispatch(receiveData(localData, date));
        }, (localData)=>{
            fetchWithTimeout(5000, fetch(url))
                .then(response => response.json())
                .then(json => {
                    if(isValidData(json)){
                        //save data action is only triggered once for one day
                        Toast.show('欢迎阅读新干货', {position: px2dp(-80)});
                        dao.save(json, date);
                        dispatch(receiveData(json, date));
                    }else{
                        if(localData === null) {
                            //if today's data is also null, it will fetch yesterday's data
                            Toast.show('今日未更新，为您获取往日干货', {position: px2dp(-80)});
                            dispatch(fetchDataIfNeed(getYesterdayFromDate(date)));
                        }else {
                            Toast.show('今日干货还未更新', {position: px2dp(-80)});
                            dispatch(receiveData(localData, date));
                        }
                    }
                }).catch((error)=>{
                    Toast.show('获取数据失败', {position: px2dp(-80)});
                    dispatch(fetchFailure());
            });
        });

    }
}