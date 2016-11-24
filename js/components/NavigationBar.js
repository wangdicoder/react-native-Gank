/**
 * Created by wangdi on 23/11/16.
 */
import React, {Component, PropTypes} from 'react';
import {StyleSheet, Platform, View, Text, TouchableNativeFeedback, TouchableHighlight} from 'react-native';
import theme from '../constants/theme';
import px2dp from '../utils/px2dp';
import Icon from 'react-native-vector-icons/Ionicons';

export default class NavigationBar extends Component{
    static propTypes = {
        title: PropTypes.string.isRequired,
        backPress: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    render(){
        const {title, backPress} = this.props;
        return (
            <View style={styles.toolbar}>
                <View style={styles.fixedCell}>
                    {backPress ?
                        <IconButton onPress={backPress}/>
                        :
                        null
                    }
                </View>
                <View style={styles.centerCell}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.fixedCell}>

                </View>
            </View>
        );
    }
}

class IconButton extends Component{
    static propTypes = {
        onPress: PropTypes.func
    };

    render(){
        if(Platform.OS === 'android'){
            return(
                <TouchableNativeFeedback
                    onPress={this.props.onPress}>
                    <View style={styles.backBtn}>
                        <Icon name="md-arrow-back" color="#fff" size={23}/>
                    </View>
                </TouchableNativeFeedback>
            );
        }else if(Platform.OS === 'ios'){
            return(
                <TouchableHighlight
                    onPress={this.props.onPress}>
                    <View style={styles.backBtn}>
                        <Icon name="ios-arrow-back" color="#fff" size={23}/>
                    </View>
                </TouchableHighlight>
            );
        }
    }
}

const styles = StyleSheet.create({
    toolbar: {
        height: theme.toolbar.height,
        backgroundColor: theme.toolbar.barColor,
        flexDirection: 'row',
        paddingTop: Platform.OS === 'android' ? 0 : px2dp(6),
        elevation: 8,
        shadowColor: 'rgb(0,0,0)',
        shadowOffset: {height: 5, width: 1},
        shadowOpacity: 0.25,
        shadowRadius: 3
    },
    fixedCell: {
        width: theme.toolbar.height,
        height: theme.toolbar.height,
    },
    centerCell: {
        flex: 1,
        height: theme.toolbar.height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: theme.toolbar.titleSize,
        color: theme.toolbar.titleColor
    },
    backBtn: {
        justifyContent:'center',
        alignItems:'center',
        flex: 1
    }
});