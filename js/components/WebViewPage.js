/**
 * Created by wangdi on 26/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, WebView} from 'react-native';
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
                <NavigationBar
                    title={navigationBarTitle}
                    isBackBtnOnLeft={true}
                    leftBtnIcon="arrow-back"
                    leftBtnPress={this._handleBack.bind(this)}
                    rightBtnIcon={"heart-outline"}
                    rightBtnPress={this._collectionOnPressCallback.bind(this)}
                />
                {this.state.didMount ?
                    <WebView
                        style={styles.webView}
                        source={{uri: this.props.rowData.url}}
                    />
                    :
                    null
                }
            </View>
        );
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                didMount: true
            });
        }, 1000);
    }

    _collectionOnPressCallback(){

    }
}

const styles = StyleSheet.create({
   webView: {
       flex: 1
   }
});