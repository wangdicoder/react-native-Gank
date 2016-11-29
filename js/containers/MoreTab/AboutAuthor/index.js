/**
 * Created by wangdi on 24/11/16.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import BackPageComponent from '../../BackPageComponent';
import NavigationBar from '../../../components/NavigationBar';
import theme from '../../../constants/theme';

export default class AboutAuthorPage extends BackPageComponent{

    render(){
        return(
            <View style={styles.container}>
                <NavigationBar
                    title="关于作者"
                    leftBtnIcon="arrow-back"
                    leftBtnPress={this._handleBack.bind(this)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor,
        paddingTop: theme.toolbar.paddingTop
    }
});