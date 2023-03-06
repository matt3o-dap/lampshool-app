import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../strumenti/helper'
import responsiveFontSize  from "../strumenti/responsiveFontSize";


const Materia = props => {
    var caretStatus = props.caret;
    const caretUpDownSource = caretStatus ? require('../assets/images/caret-arrow-up.png') : require('../assets/images/caret-arrow-down.png');
    const caretColor = caretStatus ? '#5c6cba' : '#FF0000';

    return(
        <TouchableOpacity onPress={props.onPressLabel}>
            <View style={styles(props).container}>
                <View style={styles(props).containerVoto}>
                    <View style={styles(props).SquareShapeView} />
                    <Text style={styles(props).materia} >{props.sigla}</Text>
                    <Image source={caretUpDownSource} style={{width: 25,height: 25, tintColor: caretColor}}  />
                    <Text style={styles(props).number} >{props.media}</Text>
                </View>
            </View>
        </TouchableOpacity> 
    )
}


const styles = (props) => StyleSheet.create({
    container: {
        width: SCREEN_WIDTH - 30,
        height: SCREEN_HEIGHT / 11,
        marginVertical: 5,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    containerVoto: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
    },
    SquareShapeView: {
        backgroundColor: props.colore,
        height: '80%',
        width: 8,
        borderRadius: 10,
        marginLeft: 25
    },
    materia: {
        width: '55%',
        fontWeight: '400',
        fontSize: responsiveFontSize(16),
        color: '#5c6cba',
        marginLeft: 10,
    },
    number: {
        fontSize: responsiveFontSize(15), 
        fontWeight: '800', 
        color: "#5c6cba",
        marginLeft: 20,
    }

})

export default Materia;