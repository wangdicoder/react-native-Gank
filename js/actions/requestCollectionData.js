/**
 * Created by wangdi on 2/12/16.
 */
'use strict';

import * as TYPES from './actionTypes';
import FavouriteDataDAO from '../dao/FavouriteDataDAO';
import Toast from 'react-native-root-toast';

var starList = [];

function updateList(list) {
    return {
        type: TYPES.UPDATE_STAR_LIST,
        list: list
    };
}

function starDataSuccess(list) {
    return {
        type: TYPES.STAR_DATA_SUCCESS,
        list: list
    }
}

function updateStarState(state) {
    return {
        type: TYPES.UPDATA_STAR_STATE,
        isStarred: state
    }
}

export function fetchStarList() {
    return (dispatch) => {
        let dao = new FavouriteDataDAO();
        dao.getFavouriteList().then((result)=>{
            starList = result;
            dispatch(updateList(result));
        },(nullList)=>{
            starList = nullList;
            dispatch(updateList(nullList));
        });
    };
}

export function getStarState(rowData) {
    return (dispatch) => {
        for(let i in starList){
            if(starList[i]._id === rowData._id){
                dispatch(updateStarState(true));
                return;
            }
        }
        dispatch(updateStarState(false));

        // let dao = new FavouriteDataDAO();
        // dao.getFavouriteList().then((result)=>{
        //     for(let i in result){
        //         if(result[i]._id === rowData._id) {
        //             dispatch(updateStarState(true));
        //             return;
        //         }
        //     }
        //     dispatch(updateStarState(false));
        // },(nullList)=>{
        //     dispatch(updateStarState(false));
        // });
    };
}

export function starData(rowData) {
    return (dispatch) => {
        let dao = new FavouriteDataDAO();
        dao.getFavouriteList().then((result)=>{
            result.unshift(rowData);
            dao.save(result).then((msg)=>{
                dispatch(starDataSuccess(result));
                Toast.show(msg, {position: -80});
            },(msg)=>{
                result.shift();  //save failed, pop the data from the list
                Toast.show(msg, {position: -80});
            });
        }, (nullList)=>{
            nullList.unshift(rowData);
            dao.save(nullList).then((msg)=>{
                dispatch(starDataSuccess(nullList));
                Toast.show(msg, {position: -80});
            },(msg)=>{
                nullList.shift(); //save failed
                Toast.show(msg, {position: -80});
            });
        });
    };
}

export function unStarData(rowData) {
    return (dispatch) => {
        let dao = new FavouriteDataDAO();
        dao.getFavouriteList().then((result)=>{
            for(let i in result){
                if(result[i]._id === rowData._id) {
                    result.splice(i, 1);
                    dispatch(updateStarState(false));
                    return;
                }
            }
        }, (nullList)=>{

        });
    }
}