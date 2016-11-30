/**
 * Created by wangdi on 30/11/16.
 */
'use strict';

const HOME_DATA = 'HOME_DATA';

import {AsyncStorage, ToastAndroid} from 'react-native';

export default class HomeDataDAO{

    save(data){
        AsyncStorage.setItem(HOME_DATA, JSON.stringify(data), (error)=>{
            ToastAndroid.show(error, ToastAndroid.SHORT);
        });
    }

    fetchLocalData(){
        AsyncStorage.getItem(HOME_DATA, (error, result)=>{
            if(error){
                ToastAndroid.show('fetch_failed', ToastAndroid.SHORT);
            }else{
                const s = JSON.parse(result);
                ToastAndroid.show(s, ToastAndroid.SHORT);
            }
        });
    }
}