/**
 * Created by wangdi on 1/12/16.
 */
'use strict';

const FAVOR_DATA = 'favorData';

import {AsyncStorage} from 'react-native';

export default class FavouriteDataDAO{

    save(rowData){
        var totalList = [];
        totalList.push(rowData);

        //function setValue() {
            return new Promise((resolve, reject) => {
                AsyncStorage.setItem(FAVOR_DATA, JSON.stringify(totalList), (error)=>{
                    if(!error)
                        resolve('star success');
                    else
                        reject('star failed');
                });
            });
        //}

        // this.getFavouriteList().then((list)=>{
        //     totalList = list;
        //     totalList.push(rowData);
        //     console.log(totalList);
        // }, (error)=>{
        //     totalList.push(rowData);
        //     console.log(totalList);
        // });
    }

    getFavouriteList(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(FAVOR_DATA, (error, result) => {
                if(!error){
                    const list = JSON.parse(result);
                    if(list){
                        resolve(list);
                    }else{
                        reject(null);
                    }
                }else{
                    reject(null);
                }
            });
        });
    }
}