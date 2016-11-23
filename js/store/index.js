/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import {createStore, applyMiddleware} from 'redux';
import reduces from '../reducers/index';
import thunk from 'redux-thunk';

const applyStoreMiddleware = applyMiddleware(thunk)(createStore);
export const store = applyStoreMiddleware(reduces);