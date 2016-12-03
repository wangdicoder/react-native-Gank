/**
 * Created by wangdi on 30/11/16.
 */
'use strict';

import * as TYPES from './actionTypes';
import SettingsDataDAO from '../dao/SettingsDataDAO';

export function changeColor(color, flag=true) {
    if(flag) {
        let dao = new SettingsDataDAO();
        dao.saveThemeColor(color);
    }

    console.log(color);
    return {
        type: TYPES.CHANGE_COLOR,
        color: color
    };
}

export function changeShowThumbnail(value, flag=true) {
    if(flag) {
        let dao = new SettingsDataDAO();
        dao.saveShowThumbnail(value);
    }

    if(value) {
        return {
            type: TYPES.OPEN_SHOW_THUMBNAIL
        };
    }else {
        return {
            type: TYPES.CLOSE_SHOW_THUMBNAIL
        };
    }
}

function fetchShowThumbnailValue() {
    return (dispatch) => {
        let dao = new SettingsDataDAO();
        dao.getShowThumbnailValue().then((result)=>{
            dispatch(changeShowThumbnail(result, false));
        }, (error)=>{
            dispatch(changeShowThumbnail(error));
        });
    };
}

function fetchThemeColorValue() {
    return (dispatch) => {
        let dao = new SettingsDataDAO();
        dao.getThemeColorValue().then((result)=>{
            console.log('right');
            dispatch(changeColor(result, false));
        }, (error)=>{
            console.log('wrong');
            dispatch(changeColor(error));
        });
    };
}

export function initialSettingsStateFacade() {
    return (dispatch)=>{
        dispatch(fetchShowThumbnailValue());
        dispatch(fetchThemeColorValue());
    }
}