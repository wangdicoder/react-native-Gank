/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import {combineReducers} from 'redux';
import homeData from './homeData';
import targetData from './targetData';
import themeColor from './themeColor';

export default combineReducers({
    homeData, targetData, themeColor
});