/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

import * as types from './actionTypes';
import fetchUrl from '../constants/fetchUrl';
import {getYesterdayFromDate} from '../utils/getDate';
import HomeDataDAO from '../dao/HomeDataDAO';

function requestData() {
    return {
        type: types.FETCH_HOME_DATE_REQUEST,
    };
}

function receiveData(json, date){
    // var homeDataDao = new HomeDataDAO();
    // homeDataDao.save('dddddd');
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
    console.log(url);
    return function (dispatch) {
        //dispatch(requestData());
        return fetch(url)
            .then(response => response.json())
            .then(json => {
                //if today's data hasn't updated yet, it will fetch yesterday's data
                if(isValidData(json)){
                    dispatch(receiveData(json, date));
                }else{
                    dispatch(fetchData(getYesterdayFromDate(date)));
                }
            });
    }
}