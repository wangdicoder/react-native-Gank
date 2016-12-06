/**
 * Created by wangdi on 27/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Platform, Text, PanResponder, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BackPageComponent from '../../components/BackPageComponent';
import NavigationBar from '../../components/NavigationBar';
import px2dp from '../../utils/px2dp';
import theme from '../../constants/theme';
import {changeDisplayOrder} from '../../actions/modifySettings';
import {connect} from 'react-redux';
import {store} from '../../store/index';

class OrderContentPage extends BackPageComponent{
    constructor(props){
        super(props);
        this.items = [];
        this.order = [];
    }

    _okBtnPressCallback(){
        store.dispatch(changeDisplayOrder(this.order));
        this.order = [];
        this._handleBack();
    }

    render(){
        const {pageBackgroundColor, rowItemBackgroundColor, segmentColor, titleColor} = this.props;
        return(
            <View style={[styles.container, {backgroundColor: pageBackgroundColor}]}>
                <NavigationBar
                    title="首页内容展示顺序"
                    leftBtnText="取消"
                    leftBtnPress={this._handleBack.bind(this)}
                    rightBtnText="确定"
                    rightBtnPress={this._okBtnPressCallback.bind(this)}
                />
                {this.props.displayOrder.map((item, i)=>{
                    this.order.push(item);
                    return (
                        <View
                            {...this._panResponder.panHandlers}
                            ref={(ref) => this.items[i] = ref}
                            key={i}
                            style={[styles.item, {top: this._getTopValueYById(i), backgroundColor: rowItemBackgroundColor, borderBottomColor: segmentColor}]}>
                            <Icon name="ios-menu" size={px2dp(25)} color="#ccc"/>
                            <Text style={[styles.itemTitle, {color: titleColor}]}>{item}</Text>
                        </View>
                    );
                })}
            </View>
        );
    }

    componentWillMount(){
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                const {pageY, locationY} = evt.nativeEvent;
                this.index = this._getIdByPosition(pageY);
                this.preY = pageY - locationY;
                //get the taped item and highlight it
                let item = this.items[this.index];
                item.setNativeProps({
                    style: {
                        shadowColor: "#000",
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        shadowOffset: {height: 0, width: 2},
                        elevation: 5,
                        zIndex: 1
                    }
                });
            },
            onPanResponderMove: (evt, gestureState) => {
                let top = this.preY + gestureState.dy;
                let item = this.items[this.index];
                item.setNativeProps({
                    style: {top: top}
                });

                let collideIndex = this._getIdByPosition(evt.nativeEvent.pageY);
                if(collideIndex !== this.index && collideIndex !== -1) {
                    let collideItem = this.items[collideIndex];
                    collideItem.setNativeProps({
                        style: {top: this._getTopValueYById(this.index)}
                    });
                    //swap two values
                    [this.items[this.index], this.items[collideIndex]] = [this.items[collideIndex], this.items[this.index]];
                    [this.order[this.index], this.order[collideIndex]] = [this.order[collideIndex], this.order[this.index]];
                    this.index = collideIndex;
                }
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: this._releaseAndTerminate.bind(this),
            onPanResponderTerminate: this._releaseAndTerminate.bind(this)
        });
    }

    _releaseAndTerminate(evt, gestureState){
        const shadowStyle = {
            shadowColor: "#000",
            shadowOpacity: 0,
            shadowRadius: 0,
            shadowOffset: {height: 0, width: 0,},
            elevation: 0,
            zIndex: 0
        };
        let item = this.items[this.index];
        //go back the correct position
        item.setNativeProps({
            style: {...shadowStyle, top: this._getTopValueYById(this.index)}
        });
    }

    _getIdByPosition(pageY){
        var id = -1;
        const height = px2dp(49);
        const offset = (Platform.OS === 'android') ? px2dp(20) : px2dp(7);

        if(pageY >= height + offset && pageY < height*2 + offset)
            id = 0;
        else if(pageY >= height*2 + offset && pageY < height*3 + offset)
            id = 1;
        else if(pageY >= height*3 + offset && pageY < height*4 + offset)
            id = 2;
        else if(pageY >= height*4 + offset && pageY < height*5 + offset)
            id = 3;
        else if(pageY >= height*5 + offset && pageY < height*6 + offset)
            id = 4;
        else if(pageY >= height*6 + offset && pageY < height*7 + offset)
            id = 5;
        else if(pageY >= height*7 + offset && pageY < height*8 + offset)
            id = 6;

        return id;
    }

    _getTopValueYById(id){
        const height = px2dp(49);
        return (id + 1) * height + ((Platform.OS === 'android') ? px2dp(18) : px2dp(7));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: theme.toolbar.paddingTop,
    },
    item: {
        flexDirection: 'row',
        height: px2dp(49),
        width: theme.screenWidth,
        alignItems: 'center',
        paddingLeft: px2dp(20),
        borderBottomWidth: theme.segment.width,
        position: 'absolute',
    },
    itemTitle: {
        fontSize: px2dp(15),
        marginLeft: px2dp(20)
    }
});

const mapStateToProps = (state) => {
    return {
        displayOrder: state.settingState.displayOrder,
        pageBackgroundColor: state.settingState.colorScheme.pageBackgroundColor,
        segmentColor: state.settingState.colorScheme.segmentColor,
        titleColor: state.settingState.colorScheme.titleColor,
        rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor
    }
}

export default connect(mapStateToProps)(OrderContentPage);