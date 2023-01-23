import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH, isIos} from '../strumenti/helper';



const Avviso = props => {
    return(
        <View style={styles.avviso}>
            <Image source={require('../assets/icone/info.png')} style={{height: 25, width: 25, marginLeft: 10, tintColor: '#265CDE' }}  />
            <Text style={{width: '70%', color: '#265CDE', fontWeight: '300'}}>{props.data} - {props.testo}</Text>
            <TouchableOpacity onPress={props.onPressAvviso}>
                <Image source={require('../assets/icone/look.png')} style={{height: 25, width: 25, tintColor: '#688ee3' }}  />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    avviso: {
        width: SCREEN_WIDTH - 50,
        minHeight: 60,
        maxHeight: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        borderRadius: 30,
        borderColor: 'rgba(0, 60, 255, 0.3)',
        borderWidth: 1,
        backgroundColor: 'rgba(38, 93, 222, 0.2)',
      }
})

export default Avviso;