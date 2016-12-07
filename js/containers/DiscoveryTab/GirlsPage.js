/**
 * Created by wangdi on 23/11/16.
 * 福利数据页面
 */
'use strict';

import React, {Component} from 'react';
import {StyleSheet, InteractionManager, View, Button, Text, ScrollView, Image, ListView, ActivityIndicator} from 'react-native';
import theme from '../../constants/theme';
import NavigationBar from '../../components/NavigationBar';
import BackPageComponent from '../../components/BackPageComponent';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/requestCategoryData';
import ListViewForGirls from '../../components/ListViewForGirls';
import px2dp from '../../utils/px2dp';

class GirlsPage extends BackPageComponent{
    constructor(props){
        super(props);
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

                <View style={styles.contentContainer}>
                    {this.props.error ?
                        <View style={styles.indicator}>
                            <Text style={{color: this.props.tabIconColor}}>Ooops, 获取数据失败~ </Text>
                            <Button onPress={this._fethchData.bind(this)} title="重新获取" color={this.props.tabIconColor}/>
                        </View>
                        :
                        (this.props.loading ?
                            <View style={styles.indicator}>
                                <ActivityIndicator
                                    color={this.props.tabIconColor}
                                />
                                <Text style={{marginLeft: 10, color: this.props.tabIconColor}}>获取中...</Text>
                            </View>
                            :
                            <ListViewForGirls
                                enableEmptySections={true}
                                dataSource={this._handleDataSource(this.props.dataSource)}
                                navigator={this.props.navigator}
                                isRenderFooter={this.props.isRenderFooter}
                                onEndReached={this._listViewOnEndReached.bind(this)}
                                isFullData={this.props.isFullData}
                            />
                        )
                    }
                </View>
            </View>
        );
    }

    componentDidMount(){
        super.componentDidMount();
        this._fethchData();
    }

    _handleDataSource(dataSource){
        var dataBlob = [];

        for(let i=0; i<dataSource.length; i=i+2) {
            let rowData = {
                leftOriginalUrl: dataSource[i].url,
                rightOriginalUrl: dataSource[i+1].url,
                leftUrl: this._handleImageToSmallSize(dataSource[i].url),
                rightUrl: this._handleImageToSmallSize(dataSource[i+1].url)
            }
            dataBlob.push(rowData);
        }

        return dataBlob;
    }

    _fethchData(){
        this.props.actions.fetchData('福利/20/1');
    }

    _listViewOnEndReached(){
        if(!this.props.isRenderFooter) {
            this.props.actions.fetchMoreData('福利/20/'+this.props.pageNumber);
        }
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
    contentContainer: {
        marginTop: theme.toolbar.height,
        flex: 1,
        zIndex: 0
    },
    toolbar: {
        position: 'absolute',
        width: theme.screenWidth,
        zIndex: 1
    },
    indicator: {
        flexDirection: 'row',
        width: theme.screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
});

const mapStateToProps = (state) => {
    return {
        loading: state.categoryDataState.loading,
        dataSource: state.categoryDataState.dataSource,
        isRenderFooter: state.categoryDataState.isRenderFooter,
        pageNumber: state.categoryDataState.pageNumber,
        isFullData: state.categoryDataState.isFullData,
        error: state.categoryDataState.error,
        displayOrder: state.settingState.displayOrder,
        pageBackgroundColor: state.settingState.colorScheme.pageBackgroundColor,
        segmentColor: state.settingState.colorScheme.segmentColor,
        titleColor: state.settingState.colorScheme.titleColor,
        rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor,
        tabIconColor: state.settingState.colorScheme.tabIconColor
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GirlsPage);