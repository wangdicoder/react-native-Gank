/**
 * Created by wangdi on 26/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, WebView, InteractionManager} from 'react-native';
import theme from '../constants/theme';
import NavigationBar from './NavigationBar';
import BackPageComponent from '../containers/BackPageComponent';

export default class WebViewPage extends BackPageComponent{
    constructor(props){
        super(props);
        this.state = {
            didMount: false
        }
    }

    render(){
        const navigationBarTitle = 'via: '+this.props.rowData.who;
        return(
            <View style={{flex: 1, backgroundColor: theme.pageBackgroundColor}}>
                <View style={styles.toolbar}>
                    <NavigationBar
                        title={navigationBarTitle}
                        isBackBtnOnLeft={true}
                        leftBtnIcon="arrow-back"
                        leftBtnPress={this._handleBack.bind(this)}
                        rightBtnIcon={"refresh"}
                        rightBtnPress={this._refreshOnPressCallback.bind(this)}
                    />
                </View>
                <View style={styles.contentContainer}>
                    {this.state.didMount ?
                        <WebView
                            style={styles.webView}
                            source={{uri: this.props.rowData.url}}
                        />
                        :
                        null
                    }
                </View>
            </View>
        );
    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            this.setState({
                didMount: true
            });
        });
    }

    _refreshOnPressCallback(){

    }
}

const styles = StyleSheet.create({
    contentContainer: {
        marginTop: theme.toolbar.height,
        flex: 1
    },
    toolbar: {
        position: 'absolute',
        width: theme.screenWidth,
        zIndex: 1
    },
    webView: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    }
});