/**
 * Created by wangdi on 27/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, PanResponder} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BackPageComponent from '../BackPageComponent';
import NavigationBar from '../../components/NavigationBar';
import px2dp from '../../utils/px2dp';
import theme from '../../constants/theme';

export default class OrderContentPage extends BackPageComponent{
    constructor(props){
        super(props);
        this.names = ['Android','iOS','前端','拓展资源','休息视频'];
    }

    render(){
        return(
            <View style={styles.container}>
                <NavigationBar
                    title="首页内容展示顺序"
                    isBackBtnOnLeft={true}
                    leftBtnIcon="arrow-back"
                    leftBtnPress={this._handleBack.bind(this)}/>
                {this.names.map((item, i)=>{
                    return (
                        <Item key={i} id={i} name={item} top={(i+1)*49}/>
                    );
                })}
            </View>
        );
    }
}

class Item extends Component{
    static propTypes = {
        name: PropTypes.string.isRequired,
        top: PropTypes.number.isRequired
    };

    constructor(props){
        super(props);
        this.item = [];
        this.state = {
            top: this.props.top
        };
    }

    render(){
        return(
            <View
                {...this._panResponder.panHandlers}
                ref={(ref) => this.item[this.props.id] = (ref)}
                style={[styles.item, {top: this.state.top}]}>
                <Icon name="ios-menu" size={px2dp(25)} color="#ccc"/>
                <Text style={styles.itemTitle}>{this.props.name}</Text>
            </View>
        );
    }

    componentWillMount(){
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                const {pageY} = evt.nativeEvent;
                this.index = this._computeId(pageY);
                //get the taped item and highlight it
                if(this.index != -1) {
                    let item = this.item[this.index];
                    item.setNativeProps({
                        style: {
                            shadowColor: "#000",
                            shadowOpacity: 0.3,
                            shadowRadius: 5,
                            shadowOffset: {height: 0, width: 2},
                            elevation: 5
                        }
                    });
                }
            },
            onPanResponderMove: (evt, gestureState) => {
                var top = gestureState.dy;
                if(this.index != -1) {
                    let item = this.item[this.index];
                    item.setNativeProps({
                        style: {top: top}
                    });
                }
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                const shadowStyle = {
                    shadowColor: "#000",
                    shadowOpacity: 0,
                    shadowRadius: 0,
                    shadowOffset: {height: 0, width: 0,},
                    elevation: 0
                };
                if(this.index != -1) {
                    let item = this.item[this.index];
                    item.setNativeProps({
                        style: {...shadowStyle}
                    });
                }
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
            }
        });
    }

    _computeId(pageY){
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