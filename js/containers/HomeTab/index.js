/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../../actions/requestHomeData';
import {StyleSheet, View, Text, ScrollView, Animated, Image, RefreshControl, ListView, TouchableOpacity} from 'react-native';
import theme from '../../constants/theme';
import px2dp from '../../utils/px2dp';
import NavigationBar from '../../components/NavigationBar';
import {getCurrentDate} from '../../utils/getDate';
import * as Info from '../../utils/handleHomeDataSource';
import ListViewForHome from '../../components/ListViewForHome';
import colors from '../../constants/colors';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter';

class HomeFragment extends Component{
    constructor(props){
        super(props);
        this.state = {
            opacity: new Animated.Value(0),
        };
        this.imageHeight = px2dp(400);
    }

    render(){
        const {dataSource, mainThemeColor, pageBackgroundColor, rowItemBackgroundColor, segmentColor} = this.props;
        return(
            <View style={[styles.container, {backgroundColor: pageBackgroundColor}]}>
                <Animated.View style={[styles.toolbar, {opacity: this.state.opacity}]}>
                    <NavigationBar title="最新干货"/>
                </Animated.View>
                <ScrollView
                    scrollEnabled={this.state.scrollEnabled}
                    onScroll={this._onScroll.bind(this)}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.loading}
                            onRefresh={this._onPress.bind(this, 0)}
                            tintColor={mainThemeColor}
                            colors={[mainThemeColor]}
                            title="拼命加载中..."
                        />}
                    >
                    {(this.props.error && !this.props.hasData) ?
                        <View style={styles.indicator}>
                            <Text style={{color: this.props.tabIconColor}}>Ooops, 获取数据失败</Text>
                        </View>
                        :
                        ((this.props.hasData && Info.getCategoryList(dataSource).length > 0) ?
                                <View>
                                    <View style={{height: this.imageHeight, width: theme.screenWidth}}>
                                        <ImageView
                                            imgUrl={Info.getFuLiUrl(dataSource)}
                                            labelTime={this.props.dataTime}/>
                                    </View>
                                    <View style={styles.scrollContents}>
                                        {this.props.displayOrder.map((item, i) => {
                                            if (item !== '福利' && Info.getTargetList(dataSource, item) != null)
                                                return (
                                                    <ListViewForHome
                                                        key={i}
                                                        navigator={this.props.navigator}
                                                        dataSource={Info.getTargetList(dataSource, item)}
                                                        headerTitle={item}/>
                                                );
                                        })}
                                        {/*<View style={[styles.footer, {*/}
                                            {/*backgroundColor: rowItemBackgroundColor,*/}
                                            {/*borderTopColor: segmentColor*/}
                                        {/*}]}>*/}
                                            {/*<TouchableOpacity*/}
                                                {/*onPress={this._onPress.bind(this, 1)}*/}
                                                {/*activeOpacity={theme.touchableOpacityActiveOpacity}>*/}
                                                {/*<View style={styles.bottomBtn}>*/}
                                                    {/*<Text style={styles.btnLabel}>没看够？试试往期干货吧</Text>*/}
                                                {/*</View>*/}
                                            {/*</TouchableOpacity>*/}
                                        {/*</View>*/}
                                    </View>
                                </View>
                                :
                                null
                        )
                    }
                </ScrollView>
            </View>
        );
    }

    _fetchData(){
        this.props.actions.fetchDataIfNeed(getCurrentDate());
    }

    /**
     * the speed of render is faster than that of getting setting value.
     * this is for when gets the setting value, home page decides whether to refresh the content.
     */
    componentDidMount(){
        RCTDeviceEventEmitter.addListener('fetch', this._handleEventEmitter.bind(this));
    }

    componentWillUnmount(){
        RCTDeviceEventEmitter.removeListener('fetch', this._handleEventEmitter.bind(this));
    }

    _handleEventEmitter(value){
        if(value)
            this._fetchData();
        else
            this.props.actions.onlyFetchLocalData(getCurrentDate());
    }

    _onPress(id) {
        if (id === 0)
            this._fetchData();
        else if (id === 1)
            ;
    }


    _onScroll(event){
        var offsetY = event.nativeEvent.contentOffset.y;
        if(offsetY <= this.imageHeight - theme.toolbar.height){
            var opacity = offsetY / (this.imageHeight - theme.toolbar.height);
            this.setState({opacity: opacity});
        }else{
            this.setState({opacity: 1});
        }
    }

}

class ImageView extends Component{
    static propTypes = {
        imgUrl: PropTypes.string,
        labelTime: PropTypes.string
    }

    render(){
        return(
            <View style={styles.container}>
                <Image source={{uri: this.props.imgUrl}} style={styles.img}/>
                <View style={styles.dateLabel}>
                    <Text style={styles.label}>{this.props.labelTime}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toolbar: {
        position: 'absolute',
        width: theme.screenWidth,
        zIndex: 1
    },
    scrollContents: {
        //height: theme.screenHeight+theme.toolbar.height,
    },
    img: {
        width: theme.screenWidth,
        height: px2dp(400),
        resizeMode: 'cover'
    },
    dateLabel: {
        backgroundColor: 'rgba(0,0,0,.5)',
        position: 'relative',
        width: theme.screenWidth,
        height: px2dp(50),
        bottom: px2dp(50),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    label: {
        color: '#fff',
        fontSize: px2dp(20),
        marginRight: px2dp(20),
        fontWeight: 'bold'
    },
    footer: {
        width: theme.screenWidth,
        height: px2dp(70),
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: theme.segment.width
    },
    bottomBtn: {
        backgroundColor: colors.lightBlue,
        width: theme.screenWidth*0.9,
        height: px2dp(40),
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 30,
    },
    btnLabel: {
        color: '#fff',
        fontSize: px2dp(16)
    },
    indicator: {
        flexDirection: 'row',
        width: theme.screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: px2dp(20)
    }
});

const mapStateToProps = (state) => {
    return {
        loading: state.homeDataState.loading,
        hasData: state.homeDataState.hasData,
        dataSource: state.homeDataState.dataSource,
        dataTime: state.homeDataState.dataTime,
        error: state.homeDataState.error,
        mainThemeColor: state.settingState.colorScheme.mainThemeColor,
        pageBackgroundColor: state.settingState.colorScheme.pageBackgroundColor,
        rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor,
        segmentColor: state.settingState.colorScheme.segmentColor,
        displayOrder: state.settingState.displayOrder
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFragment);