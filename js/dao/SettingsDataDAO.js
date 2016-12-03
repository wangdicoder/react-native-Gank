/**
 * Created by wangdi on 4/12/16.
 */
'use strict';

const SHOW_THUMBNAIL = 'showThumbnail';


import {AsyncStorage} from 'react-native';

export default class SettingsDataDAO{

    saveShowThumbnail(value){
        AsyncStorage.setItem(SHOW_THUMBNAIL, value+'');
    }

    getShowThumbnailValue() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(SHOW_THUMBNAIL, (error, result) => {
                if(!error){
                    if(result === 'true')
                        resolve(true);
                    else
                        resolve(false);
                }else{
                    reject(true);
                }
            });
        });
    }


}