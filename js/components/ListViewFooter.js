/**
 * Created by wangdi on 7/12/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import theme from '../constants/theme';
import px2dp from '../utils/px2dp';

export default class ListViewFooter extends Component{
    static propTypes = {
        isRenderFooter: PropTypes.bool,
        isFullData: PropTypes.bool,
        indicatorColor: PropTypes.string
    };

    render(){
        if(this.props.isRenderFooter) {
            if (this.props.isFullData)
                return (
                    <View style={styles.footer}>
                        <Text style={{color: this.props.indicatorColor}}>已加载全部</Text>
                    </View>
                );
            else
                return (
                    <View style={styles.footer}>
                        <ActivityIndicator
                            color={this.props.indicatorColor}
                        />
                        <Text style={{marginLeft: 10, color: this.props.indicatorColor}}>拼命获取中...</Text>
                    </View>
                );
        }
        return null;
    }
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        width: theme.screenWidth,
        height: px2dp(60),
        alignItems: 'center',
        justifyContent: 'center',
    }
});