/**
 * Created by wangdi on 23/11/16.
 * 福利数据页面
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, InteractionManager, View, Text, ScrollView, Image, ListView, ToastAndroid} from 'react-native';
import theme from '../../constants/theme';
import NavigationBar from '../../components/NavigationBar';
import BackPageComponent from '../../components/BackPageComponent';
import {connect} from 'react-redux';

class GirlsPage extends BackPageComponent{
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            dataBlob1: [],
            dataBlob2: [],
            imageHeight: 200,
        };
        this.flag = true;
    }

    render(){
        const {pageBackgroundColor} = this.props;
        return(
            <View style={[styles.container, {backgroundColor: pageBackgroundColor}]}>
                <View style={styles.toolbar}>
                    <NavigationBar
                        title="福利"
                        isBackBtnOnLeft={true}
                        leftBtnIcon="arrow-back"
                        leftBtnPress={this._handleBack.bind(this)}/>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <ListView
                        ref={(ref)=> this.listView1 = ref}
                        renderRow={this._renderRow.bind(this)}
                        enableEmptySections={true}
                        dataSource={this.state.dataSource.cloneWithRows(this.state.dataBlob1)}
                        onScroll={this._onScroll.bind(this)}
                        //scrollEventThrottle={200}
                        onScrollBeginDrag={() => this.flag = true}
                        showsVerticalScrollIndicator={false}
                        onEndReached={()=>ToastAndroid.show('end', ToastAndroid.SHORT)}
                        onEndReachedThreshold={5}
                    />
                    <ListView
                        ref={(ref)=> this.listView2 = ref}
                        renderRow={this._renderRow.bind(this)}
                        enableEmptySections={true}
                        dataSource={this.state.dataSource.cloneWithRows(this.state.dataBlob2)}
                        onScroll={this._onScroll.bind(this)}
                        scrollEventThrottle={200}
                        onScrollBeginDrag={() => this.flag = false}
                        onEndReached={()=>ToastAndroid.show('end', ToastAndroid.SHORT)}
                        onEndReachedThreshold={5}
                    />
                </View>
            </View>
        );
    }

    _onScroll(event){
        var offsetY = event.nativeEvent.contentOffset.y;
        if(this.flag)
            this.listView2.scrollTo({y: offsetY, animated: false});
        else
            this.listView1.scrollTo({y: offsetY, animated: false});
    }

    _renderRow(rowData) {
        return (
            <View>
                <Image style={{width: theme.screenWidth/2, height: this._randomHeight()}}
                       source={{uri: this._handleImageToSmallSize(rowData.url)}}/>
            </View>
        );
    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(()=>{
            fetch('http://gank.io/api/data/%E7%A6%8F%E5%88%A9/20/1').then(response => response.json())
                .then(json => {
                    this.setState({
                        dataBlob1: json.results.slice(0,10),
                        dataBlob2: json.results.slice(10)
                    });
                });
        });
    }

    _randomHeight(){
        return Math.floor((Math.random() * 100) + 150);
    }

    _handleImageToSmallSize(url){
        return url.replace('large','small');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: theme.toolbar.paddingTop
    },
    toolbar: {
        position: 'absolute',
        width: theme.screenWidth,
        zIndex: 1
    },
    img1: {
        width: theme.screenWidth/2,
        height: 200
    },
    img2: {
        width: theme.screenWidth/2,
        height: 170
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

export default connect(mapStateToProps)(GirlsPage);