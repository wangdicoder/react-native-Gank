/**
 * Created by wangdi on 27/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, PanResponder, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BackPageComponent from '../BackPageComponent';
import NavigationBar from '../../components/NavigationBar';
import px2dp from '../../utils/px2dp';
import theme from '../../constants/theme';

export default class OrderContentPage extends BackPageComponent{
    constructor(props){
        super(props);
        this.names = ['Android','iOS','前端','拓展资源','休息视频'];
        this.items = [];
        this.order = [];
    }

    render(){
        return(
            <View style={styles.container}>
                <NavigationBar
                    title="首页内容展示顺序"
                    leftBtnIcon="arrow-back"
                    leftBtnPress={this._handleBack.bind(this)}
                />
                {this.names.map((item, i)=>{
                    this.order.push(item);
                    return (
                        <View
                            {...this._panResponder.panHandlers}
                            ref={(ref) => this.items[i] = ref}
                            key={i}
                            style={[styles.item, {top: (i+1)*49}]}>
                            <Icon name="ios-menu" size={px2dp(25)} color="#ccc"/>
                            <Text style={styles.itemTitle}>{item}</Text>
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

        if(pageY >= height && pageY < height*2)
            id = 0;
        else if(pageY >= height*2 && pageY < height*3)
            id = 1;
        else if(pageY >= height*3 && pageY < height*4)
            id = 2;
        else if(pageY >= height*4 && pageY < height*5)
            id = 3;
        else if(pageY >= height*5 && pageY < height*6)
            id = 4;

        return id;
    }

    _getTopValueYById(id){
        const height = px2dp(49);
        return (id + 1) * height;
    }

    _storeOrder(){

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    item: {
        flexDirection: 'row',
        height: px2dp(49),
        width: theme.screenWidth,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingLeft: px2dp(20),
        borderBottomColor: theme.segment.color,
        borderBottomWidth: theme.segment.width,
        position: 'absolute',
    },
    itemTitle: {
        fontSize: px2dp(15),
        color: '#000',
        marginLeft: px2dp(20)
    }
});