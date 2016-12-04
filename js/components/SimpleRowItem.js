/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, Platform, View, Text, TouchableNativeFeedback, TouchableHighlight, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../constants/theme';
import px2dp from '../utils/px2dp';
import {connect} from 'react-redux';

class SimpleRowItem extends Component{
    static propTypes = {
        title: PropTypes.string.isRequired,
        icon: PropTypes.string,
        iconColor: PropTypes.string,
        onPress: PropTypes.func,
        renderSegment: PropTypes.bool,
        isShowRightArrow: PropTypes.bool
    };

    static defaultProps = {
        renderSegment: true,
        iconColor: '#000',
        isShowRightArrow: true
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
                <TouchableHighlight
                    onPress={this.props.onPress}
                    underlayColor={theme.touchableHighlightUnderlayColor}>
                    {this._renderContent()}
                </TouchableHighlight>
            );
        }
    }

    _renderContent(){
        const {title, icon, renderSegment, iconColor, isShowRightArrow, rowItemBackgroundColor, segmentColor, titleColor, arrowColor} = this.props;
        return(
            <View style={[styles.container, {backgroundColor: rowItemBackgroundColor}]}>
                <View style={styles.leftCell}>
                    <View style={[styles.iconBorder, {backgroundColor: iconColor}]}>
                        <Icon name={icon} color={rowItemBackgroundColor} size={px2dp(16)}/>
                    </View>
                </View>
                <View style={styles.rightCell}>
                    <View style={styles.cell}>
                        <Text style={[styles.title, {color: titleColor}]}>{title}</Text>
                        {isShowRightArrow ?
                            <Icon name="ios-arrow-forward" color={arrowColor} size={px2dp(18)}/>
                            :
                            null
                        }
                    </View>
                    { renderSegment ?
                        <View style={[styles.segmentLine, {backgroundColor: segmentColor}]}/>
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
        alignItems: 'center'
    },
    title: {
        marginLeft: px2dp(5)
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
        height: theme.segment.width
    }
});

const mapStateToProps = (state) => {
    return {
        segmentColor: state.settingState.colorScheme.segmentColor,
        titleColor: state.settingState.colorScheme.titleColor,
        rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor,
        arrowColor: state.settingState.colorScheme.arrowColor
    };
};

export default connect(mapStateToProps)(SimpleRowItem);