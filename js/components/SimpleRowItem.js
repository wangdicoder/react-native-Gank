/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, Platform, View, Text, TouchableNativeFeedback, TouchableHighlight, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../constants/theme';
import px2dp from '../utils/px2dp';

export default class SimpleRowItem extends Component{
    static propTypes = {
        title: PropTypes.string.isRequired,
        icon: PropTypes.string,
        onPress: PropTypes.func,
        renderSegment: PropTypes.bool
    };

    static defaultProps = {
        renderSegment: true
    }

    render(){
        if(Platform.OS === 'android') {
            return (
                <TouchableNativeFeedback onPress={this.props.onPress}>
                    {this._renderContent()}
                </TouchableNativeFeedback>
            );
        }else if(Platform.OS === 'ios'){
            return(
                <TouchableOpacity
                    onPress={this.props.onPress}>
                    {this._renderContent()}
                </TouchableOpacity>
            );
        }
    }

    _renderContent(){
        const {title, icon, renderSegment} = this.props;
        return(
            <View style={styles.container}>
                <View style={styles.leftCell}>
                    <View style={styles.iconBorder}>
                        <Icon name={icon} color="#fff" size={16}/>
                    </View>
                </View>
                <View style={styles.rightCell}>
                    <View style={styles.cell}>
                        <Text style={styles.title}>{title}</Text>
                        <Icon name="ios-arrow-forward" color={theme.segment.color} size={18}/>
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
        backgroundColor: theme.mainThemeColor,
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