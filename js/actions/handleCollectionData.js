/**
 * Created by wangdi on 2/12/16.
 */
'use strict';

import * as TYPES from './actionTypes';
import FavouriteDataDAO from '../dao/FavouriteDataDAO';
import Toast from 'react-native-root-toast';
import px2dp from '../utils/px2dp';

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
    };
}

function unStarDataSuccess(list) {
    return {
        type: TYPES.UNSTAR_DATA_SUCCESS,
        list: list
    };
}

function updateStarState(state) {
    return {
        type: TYPES.UPDATE_STAR_STATE,
        isStarred: state
    }
}

export function fetchStarList() {
    return (dispatch) => {
        let dao = new FavouriteDataDAO();
        dao.getFavouriteList().then((result)=>{
            starList = result;
            dispatch(updateList(starList));
        },(nullList)=>{
            starList = [];
            dispatch(updateList(starList));
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
    };
}

export function starData(rowData) {
    return (dispatch) => {
        let dao = new FavouriteDataDAO();

        starList.unshift(rowData);
        dao.save(starList).then((msg) => {
            dispatch(starDataSuccess(starList));
            Toast.show('收藏成功', {position: px2dp(-80)});
        },(msg) => {
            starList.shift();  //save failed, pop the data from the list
            Toast.show('收藏失败', {position: px2dp(-80)});
        });
    };
}

export function unStarData(rowData) {
    return (dispatch) => {
        let dao = new FavouriteDataDAO();
        for(let i in starList){
            if(starList[i]._id === rowData._id) {
                starList.splice(i, 1);
                dao.save(starList).then((msg) => {
                    dispatch(unStarDataSuccess(starList));
                    dispatch(updateStarState(false));
                    //Toast.show(msg, {position: -80});
                }, (msg) => {
                    starList.splice(i, 1, rowData); //if save failed, roll back the list
                    Toast.show('取消失败', {position: px2dp(-80)});
                });
                return;
            }
        }
    }
}