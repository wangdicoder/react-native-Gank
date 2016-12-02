/**
 * Created by wangdi on 2/12/16.
 */
'use strict';

import * as TYPES from '../actions/actionTypes';

const initialState = {
    dataSource: []
};

export default function favorData(state=initialState, action) {
    switch(action.type){
        case TYPES.STAR_A_DATA:
            return Object.assign({}, state, {
                dataSource: state.dataSource.push(action.data)
            });

        case TYPES.UNSTAR_A_DATA:
            return Object.assign({}, state, {

            });

        default:
            return state;
    }
}