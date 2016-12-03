/**
 * Created by wangdi on 30/11/16.
 */
'use strict';

import * as TYPES from './actionTypes';
import SettingsDataDAO from '../dao/SettingsDataDAO';

export function changeColor(color) {
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

function getShowThumbnailValue() {
    return (dispatch) => {
        let dao = new SettingsDataDAO();
        dao.getShowThumbnailValue().then((result)=>{
            dispatch(changeShowThumbnail(result, false));
        }, (error)=>{
            dispatch(changeShowThumbnail(error));
        });
    };
}

export function initialSettingsStateFacade() {
    return (dispatch)=>{
        dispatch(getShowThumbnailValue());
    }
}