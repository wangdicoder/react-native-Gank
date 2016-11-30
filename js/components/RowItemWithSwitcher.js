/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, Platform, View, Text, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../constants/theme';
import px2dp from '../utils/px2dp';

export default class RowItemWithSwitcher extends Component{
    static propTypes = {
        title: PropTypes.string.isRequired,
        icon: PropTypes.string,
        iconColor: PropTypes.string,
        renderSegment: PropTypes.bool,
        switcherValue: PropTypes.bool,
        onValueChange: PropTypes.func,
        onTintColor: PropTypes.string
    };

    static defaultProps = {
        renderSegment: true,
        iconColor: '#000',
        switcherValue: true
    }

    render(){
        const {title, icon, renderSegment, iconColor, switcherValue, onValueChange, onTintColor} = this.props;
        return(
            <View style={styles.container}>
                <View style={styles.leftCell}>
                    <View style={[styles.iconBorder, {backgroundColor: iconColor}]}>
                        <Icon name={icon} color="#fff" size={px2dp(16)}/>
                    </View>
                </View>
                <View style={styles.rightCell}>
                    <View style={styles.cell}>
                        <Text style={styles.title}>{title}</Text>
                        <Switch value={switcherValue} onValueChange={onValueChange} onTintColor={onTintColor}/>
                    </View>
                    { renderSegment ?
                        <View style={styles.segmentLine}/>
                        :
                        null
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: theme.screenWidth,
        height: px2dp(40),
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    title: {
        color: '#000',
        marginLeft: 5
    },
    iconBorder: {
        borderRadius: 5,
        width: px2dp(23),
        height: px2dp(23),
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftCell: {
        width: px2dp(40),
        height: px2dp(40),
        paddingLeft: px2dp(17),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    rightCell: {
        flex: 1,
        height: px2dp(40),
        marginLeft: px2dp(15),
    },
    cell: {
        flex: 1,
        paddingRight: px2dp(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    segmentLine: {
        backgroundColor: theme.segment.color,
        height: theme.segment.width
    }
});