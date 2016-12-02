/**
 * Created by wangdi on 25/11/16.
 */
'use strict';

import * as types from './actionTypes';
import fetchUrl from '../constants/fetchUrl';
import {getYesterdayFromDate} from '../utils/getDate';
import HomeDataDAO from '../dao/HomeDataDAO';
import Toast from 'react-native-root-toast';

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
        dao.fetchLocalData(date).then((localData) => {
            Toast.show('local Data', {position: -80});
            dispatch(receiveData(localData, date));
        }, (localData)=>{
            fetch(url)
                .then(response => response.json())
                .then(json => {
                    if(isValidData(json)){
                        //save data action is only triggered once for one day
                        Toast.show('server Data', {position: -80});
                        dao.save(json, date);
                        dispatch(receiveData(json, date));
                    }else{
                        if(localData === null) {
                            //if today's data is also null, it will fetch yesterday's data
                            Toast.show('yesterday data', {position: -80});
                            dispatch(fetchData(getYesterdayFromDate(date)));
                        }else {
                            Toast.show('server Data has not updated yet', {position: -80});
                            dispatch(receiveData(localData, date));
                        }
                    }
                });
        });

    }
}