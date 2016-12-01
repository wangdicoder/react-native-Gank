/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

import * as types from './actionTypes';
import fetchUrl from '../constants/fetchUrl';
import {getYesterdayFromDate} from '../utils/getDate';
import HomeDataDAO from '../dao/HomeDataDAO';
import {ToastAndroid} from 'react-native';

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

function isValidData(responseData) {
    if(responseData.category.length > 0)
        return true;
    return false;
}

export function fetchData(date) {
    const url = fetchUrl.daily + date;
    return (dispatch) => {
        //dispatch(requestData());
        var dao = new HomeDataDAO();
        dao.fetchLocalData().then((localData) => {
            ToastAndroid.show('localData', ToastAndroid.SHORT);
            dispatch(receiveData(localData, date));
        }, (localData)=>{
            ToastAndroid.show('netData', ToastAndroid.SHORT);
            fetch(url)
                .then(response => response.json())
                .then(json => {
                    //if today's data hasn't updated yet, it will fetch yesterday's data
                    if(isValidData(json)){
                        //if localData is same as serverData, serverData will not be saved
                        if(JSON.stringify(json) !== JSON.stringify(localData)) {
                            dao.save(json);
                        }
                        dispatch(receiveData(json, date));
                    }else{
                        dispatch(fetchData(getYesterdayFromDate(date)));
                    }
                });
        });

    }
}