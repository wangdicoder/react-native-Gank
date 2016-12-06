/**
 * Created by wangdi on 30/11/16.
 */
'use strict';

const HOME_DATA = '@HomeData';

import {AsyncStorage} from 'react-native';

export default class HomeDataDAO{

    save(json, time){
        let data = {
            time: time,
            content: json
        };

        try {
            AsyncStorage.setItem(HOME_DATA, JSON.stringify(data));
        } catch (error) {
            //
        }
    }

    /** Get local data.
     *
     * 1. firstly, to judge the time of the local data is today's date.
     * 2. if the result is true, it will return the local data, 'requestHomeData.js' will not fetch server data.
     *    if false, it also returns the local data, 'requestHomeData.js' will fetch the server data.
     * 3. if it returns null(reject null), which means there are no records or something wrong. This
     *    will also trigger 'requestHomeData.js' to fetch the server data.
     * 4. when the function rejects the local data(reject data.content), 'requestHomeData.js' will
     *    fetch the server data and judge the validation of data. Then to determine whether to save
     *    latest data or still show yesterday's data, since maybe today's data hasn't updated yet.
     */
    fetchLocalData(time){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(HOME_DATA, (error, result)=>{
                if(!error){
                    const data = JSON.parse(result);
                    //judge whether the data is updated
                    if(data) {
                        if (data.time.toString() === time) {
                            resolve(data.content);
                        } else {
                            reject(data.content);
                        }
                    }else{ //no any data records
                        reject(null);
                    }
                }else{ // must fetch server data
                    reject(null);
                }
            });
        });
    }
}