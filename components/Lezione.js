import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from '../strumenti/helper'
import responsiveFontSize  from "../strumenti/responsiveFontSize";


const Lezione = props => {
    var caretStatus = props.caret;
    const caretUpDownSource = caretStatus ? require('../assets/images/caret-arrow-up.png') : require('../assets/images/caret-arrow-down.png');
    const caretColor = caretStatus ? 'green' : 'red';

    return(
        <View style={styles.container}>
            <Text style={{fontSize: responsiveFontSize(13), fontWeight: '500', color: '#265CDE'}}>{props.materia} - {props.data}</Text>
            <Text style={{fontSize: responsiveFontSize(13), fontWeight: '300', color: '#265CDE'}}>{props.testo}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH - 40,
        minHeight: 60,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 6,
        marginTop: 6
      }
})

export default Lezione;