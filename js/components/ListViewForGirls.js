/**
 * Created by wangdi on 7/12/16.
 */
import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, Image, ListView, Platform, ActivityIndicator, TouchableOpacity, Modal} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../constants/theme';
import px2dp from '../utils/px2dp';
import Footer from './ListViewFooter';

class ListViewForGirls extends Component{
    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            modalVisible: false,
            imageWidth: 0,
            imageHeight: 0,
            imageUrl: '',
            loadedHD: false
        };
    }

    static propTypes = {
        dataSource: PropTypes.array,
        isRenderFooter: PropTypes.bool,
        onEndReached: PropTypes.func,
        isFullData: PropTypes.bool
    };

    render(){
        return(
            <View>
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
                <Modal
                    visible={this.state.modalVisible}
                    onRequestClose={this._triggerModal.bind(this)}
                    transparent={true}>
                    <View style={styles.modalBackground}>
                        {this.state.loadedHD ?
                            <View>
                                <Image style={{width: this.state.imageWidth, height: this.state.imageHeight}}
                                       source={{uri: this.state.imageUrl}}/>
                            </View>
                            :
                            <ActivityIndicator size="large" color={this.props.tabIconColor}/>
                        }
                        <View style={styles.closeBtn}>
                            <TouchableOpacity
                                onPress={this._triggerModal.bind(this)}
                                activeOpacity={theme.touchableOpacityActiveOpacity}>
                                <Icon name="ios-close-circle-outline" color="#fff" size={px2dp(30)}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

    _renderFooter(){
        const {isRenderFooter, tabIconColor, isFullData} = this.props;
        return(
            <Footer indicatorColor={tabIconColor} isFullData={isFullData} isRenderFooter={isRenderFooter}/>
        );
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return(
            <View key={rowID} style={{height: px2dp(6), backgroundColor: this.props.pageBackgroundColor}}/>
        );
    }

    _renderRow(rowData, sectionID, rowID, highlightRow){
        return(
            <View
                style={styles.rowItem}
                overflow="hidden"
                key={rowID}>
                {this._renderRowContent(rowData, true)}
                {this._renderRowContent(rowData, false)}
            </View>
        );
    }

    _renderRowContent(rowData, isLeft) {
        var url = '';
        if(isLeft) url = rowData.leftUrl;
        else url = rowData.rightUrl;
        return (
            <TouchableOpacity
                onPress={this._itemOnPress.bind(this, rowData, isLeft)}
                activeOpacity={theme.touchableOpacityActiveOpacity}>
                <Image style={{width: theme.screenWidth/2-px2dp(9), height: theme.screenWidth/2, marginLeft: px2dp(3), marginRight: px2dp(3)}}
                       source={{uri: url}}/>
            </TouchableOpacity>
        );
    }

    _itemOnPress(rowData, isLeft){
        this._triggerModal();
        this.setState({
            imageUrl: isLeft ? rowData.leftUrl : rowData.rightUrl
        });
        this._fetchHDImage(isLeft ? rowData.leftOriginalUrl : rowData.rightOriginalUrl);
    }

    _triggerModal(){
        this.setState({modalVisible: !this.state.modalVisible, loadedHD: false});
    }

    _fetchHDImage(url){
        var correctWidth = theme.screenWidth;
        var correctHeight = theme.screenWidth;
        Image.getSize(url, (width, height)=>{
            const ratioWidth = theme.screenWidth / width;
            const ratioHeight = theme.screenHeight / height;
            if(ratioWidth > ratioHeight){
                correctWidth = ratioHeight*width;
                correctHeight = theme.screenHeight;
            }else{
                correctWidth = theme.screenWidth;
                correctHeight = ratioWidth*height;
            }
            this.setState({imageUrl: url, imageWidth: correctWidth, imageHeight: correctHeight, loadedHD: true});
        }, (error)=>{
            this.setState({imageUrl: url, imageWidth: correctWidth, imageHeight: correctHeight, loadedHD: true});
        })
    }
}

const styles = StyleSheet.create({
    rowItem: {
        flexDirection: 'row',
        width: theme.screenWidth,
        height: theme.screenWidth/2,
        paddingLeft: px2dp(3),
        paddingRight: px2dp(3)
    },
    footer: {
        flexDirection: 'row',
        width: theme.screenWidth,
        height: px2dp(60),
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBackground: {
        width: theme.screenWidth,
        height: theme.screenHeight,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeBtn: {
        position: 'absolute',
        top: 0,
        width: theme.screenWidth,
        height: px2dp(50),
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        paddingTop: px2dp(20),
        paddingRight: px2dp(20),
        zIndex: 1
    }
});

const mapStateToProps = (state) => {
    return {
        tabIconColor: state.settingState.colorScheme.tabIconColor,
        pageBackgroundColor: state.settingState.colorScheme.pageBackgroundColor,
    };
};

export default connect(mapStateToProps)(ListViewForGirls);