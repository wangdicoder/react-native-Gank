/**
 * Created by wangdi on 30/11/16.
 */
'use strict';

const HOME_DATA = 'homeData';

import {AsyncStorage, ToastAndroid} from 'react-native';
import {getCurrentDate} from '../utils/getDate';

export default class HomeDataDAO{

    save(json, time){
        let data = {
            time: time,
            content: json
        };

        try {
            AsyncStorage.setItem(HOME_DATA, JSON.stringify(data));
            ToastAndroid.show('save success', ToastAndroid.SHORT);
        } catch (error) {
            ToastAndroid.show('save error', ToastAndroid.SHORT);
        }
    }

    /**
     * get local data firstly, then judge the time of local data is today's date.
     * if the result is true, it will return the local data, 'requestHomeData.js' will not fetch server data.
     * if false, it also returns the local data, 'requestHomeData.js' will fetch server data, but it will judge
     * whether the server data is same as local data, which determines whether to save server data.
     */
    fetchLocalData(){
        const time = getCurrentDate();
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(HOME_DATA, (error, result)=>{
                if(!error){
                    const data = JSON.parse(result);
                    //judge whether the data is updated
                    if(data.time == time) {
                        ToastAndroid.show('fetchLocalSuccess', ToastAndroid.SHORT);
                        resolve(data.content);
                    }else{
                        reject(data.content);
                    }
                }else{
                    ToastAndroid.show('fetchLocalFailed', ToastAndroid.SHORT);
                    reject(error);
                }
            });
        });
    }

    removeLocalData(){
        AsyncStorage.removeItem(HOME_DATA, (error)=>{});
    }
}