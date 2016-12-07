/**
 * Created by wangdi on 7/12/16.
 */
import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, Image, ListView, Platform, ActivityIndicator, TouchableNativeFeedback, TouchableHighlight, ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import theme from '../constants/theme';
import px2dp from '../utils/px2dp';

class ListViewForGirls extends Component{
    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    static propTypes = {
        dataSource: PropTypes.array,
        isRenderFooter: PropTypes.bool,
        onEndReached: PropTypes.func,
        isFullData: PropTypes.bool
    };

    render(){
        return(
            <ListView
                dataSource={this.ds.cloneWithRows(this.props.dataSource)}
                renderRow={this._renderRow.bind(this)}
                renderFooter={this._renderFooter.bind(this)}
                renderSeparator={this._renderSeparator.bind(this)}
                initialListSize={10}
                pageSize={10}
                onEndReached={this.props.onEndReached}
                onEndReachedThreshold={5}
            />
        );
    }

    _renderFooter(){
        if(this.props.isRenderFooter) {
            if (this.props.isFullData)
                return (
                    <View style={styles.footer}>
                        <Text style={{color: this.props.tabIconColor}}>已加载全部</Text>
                    </View>
                );
            else
                return (
                    <View style={styles.footer}>
                        <ActivityIndicator
                            color={this.props.tabIconColor}
                        />
                        <Text style={{marginLeft: 10, color: this.props.tabIconColor}}>拼命获取中...</Text>
                    </View>
                );
        }
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return(
            <View key={rowID} style={{height: px2dp(6), backgroundColor: this.props.pageBackgroundColor}}/>
        );
    }

    _renderRow(rowData, sectionID, rowID, highlightRow){
        return(
            <TouchableHighlight
                overflow="hidden"
                key={rowID}
                onPress={this._itemOnPress.bind(this, rowData)}
                underlayColor={theme.touchableHighlightUnderlayColor}>
                {this._renderRowContent(rowData)}
            </TouchableHighlight>
        );
    }

    _renderRowContent(rowData) {
        return (
            <View style={styles.rowItem}>
                <Image style={{width: theme.screenWidth/2-px2dp(9), height: theme.screenWidth/2, marginRight: 3}}
                       source={{uri: rowData.leftUrl}}/>
                <Image style={{width: theme.screenWidth/2-px2dp(9), height: theme.screenWidth/2, marginLeft: 3}}
                       source={{uri: rowData.rightUrl}}/>
            </View>
        );
    }

    _itemOnPress(rowData){
        // this.props.navigator.push({
        //     component: WebViewPage,
        //     args: {rowData: rowData}
        // });
    }
}

const styles = StyleSheet.create({
    rowItem: {
        flexDirection: 'row',
        width: theme.screenWidth,
        height: theme.screenWidth/2,
        paddingLeft: px2dp(6),
        paddingRight: px2dp(6)
    },
    footer: {
        flexDirection: 'row',
        width: theme.screenWidth,
        height: px2dp(60),
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const mapStateToProps = (state) => {
    return {
        tabIconColor: state.settingState.colorScheme.tabIconColor,
        pageBackgroundColor: state.settingState.colorScheme.pageBackgroundColor,
    };
};

export default connect(mapStateToProps)(ListViewForGirls);