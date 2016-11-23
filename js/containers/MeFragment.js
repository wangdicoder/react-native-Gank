/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import theme from '../constants/theme';
import NavigationBar from '../components/NavigationBar';
import RowItem from '../components/SimpleRowItem';
import px2dp from '../utils/px2dp';

export default class MeFragment extends Component{

    render(){
        return(
            <View style={styles.container}>
                <NavigationBar title="更多"/>

                <View style={styles.block}>
                    <RowItem title="主题" icon="md-brush"/>
                    <RowItem title="主题" icon="md-brush"/>
                    <RowItem title="主题" icon="md-brush" renderSegment={false}/>
                </View>
            </View>
        );
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