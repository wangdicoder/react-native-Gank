/**
 * Created by wangdi on 6/12/16.
 */
'use strict';

const RANDOM_DATA = '@RandomData';

import {AsyncStorage} from 'react-native';

export default class RandomDataDAO{

    saveData(data){
        try {
            AsyncStorage.setItem(RANDOM_DATA, JSON.stringify({content: data}));
        }catch(error) {

        }
    }

    fetchLocalData(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(RANDOM_DATA, (error, result) => {
                if(!error){
                    const json = JSON.parse(result);
                    if(json) {
                        resolve(json.content);
                    }else
                        reject(null);
                }else
                    reject(null);
            });
        });
    }
}