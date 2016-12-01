/**
 * Created by wangdi on 22/11/16.
 */
'use strict';

import {Provider} from 'react-redux';
import React from 'react';
import {Navigator} from 'react-native';
import {store} from './store/index';
import MainPage from './containers/MainPage';
import Test from './containers/WebViewPage'

export default class App extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <Navigator
                    initialRoute={{component: MainPage}}
                    renderScene={(route, navigator) =>
                        <route.component {...route.args} navigator={navigator} />
                    }
                />
            </Provider>
        );
    }
}
