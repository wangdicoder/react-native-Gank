/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import theme from '../../constants/theme';
import NavigationBar from '../../components/NavigationBar';
import RowItem from '../../components/SimpleRowItem';
import px2dp from '../../utils/px2dp';

import ThemeColorPage from './ThemeColorPage';

export default class MeFragment extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <NavigationBar title="更多" leftBtnPress={this._itemClickCallback.bind(this)} leftBtnIcon="arrow-back" isBackBtnOnLeft={true} rightBtnIcon="add" rightBtnPress={this._itemClickCallback.bind(this)}/>

                <View style={styles.block}>
                    <RowItem title="主题" icon="md-brush" onPress={this._itemClickCallback.bind(this)}/>
                    <RowItem title="主题" icon="md-brush" onPress={this._itemClickCallback.bind(this)}/>
                    <RowItem title="主题" icon="md-brush" renderSegment={false} onPress={this._itemClickCallback.bind(this)}/>
                </View>
            </View>
        );
    }

    _itemClickCallback(){

        this.props.navigator.push({
            component: ThemeColorPage
        });
    }
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       backgroundColor: theme.pageBackgroundColor
    },
    block: {
        marginTop: px2dp(15),
        borderBottomColor: theme.segment.color,
        borderBottomWidth: theme.segment.width,
        borderTopColor: theme.segment.color,
        borderTopWidth: theme.segment.width
    }
});