/**
 * Created by wangdi on 23/11/16.
 */
import React, {Component} from 'react';
import {StyleSheet, Platform, View} from 'react-native';
import theme from '../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';

export default class NavigationBar extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View style={styles.toolbar}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    toolbar: {
        height: theme.toolbar.height,
        backgroundColor: theme.toolbar.barColor,
        flexDirection: 'row',

    }
});