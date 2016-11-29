/**
 * Created by wangdi on 4/11/16.
 */
import React, {Component, PropTypes} from "react";
import {StyleSheet, View, Image, Text} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

export default class Avatar extends Component {
    static propTypes = {
        icon: PropTypes.string,
        width: PropTypes.number,
        backgroundColor: PropTypes.string,
        text: PropTypes.string,
        textSize: PropTypes.number,
    };

    static defaultProps = {
        width: 40,
        backgroundColor: 'skyblue',
        textSize: 15
    };

    render() {
        const {icon, width, backgroundColor, text, textSize} = this.props;
        if (icon) {
            return(
                <View style={[{width: width, height: width, borderRadius: width/2, backgroundColor: backgroundColor}, styles.cell]}>
                    <Icon name={icon} color="#fff" size={width/2}/>
                </View>
            )
        }else if (text) {
            return (
                <View style={[{width: width, height: width, borderRadius: width/2, backgroundColor: backgroundColor}, styles.cell]}>
                    <Text style={{ color: '#fff', fontSize: textSize }}>{text}</Text>
                </View>
            );
        }

        return null;
    }
}

const styles = StyleSheet.create({
    cell: {
        alignItems:'center',
        justifyContent: 'center'
    }
});