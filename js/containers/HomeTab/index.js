/**
 * Created by wangdi on 23/11/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Text, ScrollView, Image, ListView} from 'react-native';
import theme from '../../constants/theme';
import px2dp from '../../utils/px2dp';
import NavigationBar from '../../components/NavigationBar';

export default class HomeFragment extends Component{
    constructor(props){
        super(props);
        this.state = {
            opacity: 0,
        };
        this.imageHeight = px2dp(400);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={[styles.toolbar, {opacity: this.state.opacity}]}>
                    <NavigationBar title="今日干货"/>
                </View>
                <ScrollView
                    scrollEnabled={this.state.scrollEnabled}
                    onScroll={this._onScroll.bind(this)}>
                    <View style={{height: this.imageHeight, width: theme.screenWidth}}>
                        <ImageView
                            imgUrl="http://ww3.sinaimg.cn/large/610dc034jw1fa2vh33em9j20u00zmabz.jpg"
                            labelTime="2016/11/24"/>
                    </View>
                    <View style={styles.scrollContents}>

                    </View>
                </ScrollView>
            </View>
        );
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

class MyList extends Component{

    render(){
        // return(
        //     <ListView
        //
        //     />
        // );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    toolbar: {
        position: 'absolute',
        width: theme.screenWidth,
        zIndex: 1
    },
    scrollContents: {
        height: theme.screenHeight,
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
    }
});