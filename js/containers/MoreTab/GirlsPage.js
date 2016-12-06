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
            dataBlob: [],
            imageHeight: 20,
            imageWidth: 20,
            load: false
        };
        this.url = 'http://ww4.sinaimg.cn/large/610dc034gw1fa0ppsw0a7j20u00u0thp.jpg';
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

                {this.state.load ?
                    <ListView
                        enableEmptySections={true}
                        dataSource={this.state.dataSource.cloneWithRows(this.state.dataBlob)}
                        renderRow={this._renderRow.bind(this)}
                    />
                    :
                    null
                }
            </View>
        );
    }

    _renderRow(rowData) {
        return (
            <View style={styles.rowItem}>
                <Image style={{width: rowData.leftWidth, height: theme.screenWidth/2, marginRight: 3}}
                       source={{uri: rowData.leftUrl}}/>
                <Image style={{width: rowData.rightWidth, height: theme.screenWidth/2, marginLeft: 3}}
                       source={{uri: rowData.rightUrl}}/>
            </View>
        );
    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(()=>{
            fetch('http://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/1').then(response => response.json())
                .then(json => {
                    var results = json.results;
                    var dataBlob = [];

                    for(let i=0; i<results.length; i=i+2) {
                        const leftWidth = this._randomWidth();
                        let rowData = {
                            leftUrl: this._handleImageToSmallSize(results[i].url),
                            rightUrl: this._handleImageToSmallSize(results[i+1].url),
                            leftWidth: leftWidth-3-6,
                            rightWidth: theme.screenWidth - leftWidth - 3 -6
                        }
                        dataBlob.push(rowData);
                    }

                    this.setState({
                        dataBlob: dataBlob,
                        load: true
                    });
                });

        });
    }

    _randomWidth(){
        return Math.floor((Math.random() * theme.screenWidth/5) + theme.screenWidth/5*2);
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
        // position: 'absolute',
        // width: theme.screenWidth,
        // zIndex: 1
    },
    rowItem: {
        flexDirection: 'row',
        width: theme.screenWidth,
        height: theme.screenWidth/2+6,
        paddingLeft: 6,
        paddingRight: 6,
        paddingBottom: 6
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