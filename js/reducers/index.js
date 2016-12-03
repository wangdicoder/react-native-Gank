/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import {combineReducers} from 'redux';
import homeData from './homeData';
import targetData from './targetData';
import settingState from './settingState';
import favorData from './favorData';
import randomData from './randomData';

export default combineReducers({
    homeData, targetData, settingState, favorData, randomData
});