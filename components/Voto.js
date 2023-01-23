import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../strumenti/helper'
import responsiveFontSize  from "../strumenti/responsiveFontSize";


const Voto = props => {
    
    return(
        <View style={styles.container}>
            <View style={styles.containerVoto}>
                <View style={styles.settoreSx}>
                    <Text style={styles.voto} >{props.voto}</Text>
                    <Text style={styles.tipo} >{props.tipo}</Text>  
                </View>
                <View style={styles.settoreDx}>
                    <Text style={styles.giudizio} >{props.giudizio}</Text>
                    <Text style={styles.data} >{props.data}</Text>
                </View>
            </View>
        </View>    
    )
}


const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH - 75,
        height: SCREEN_HEIGHT / 11,
        marginVertical: 10,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0, 0.1)',
    },
    containerVoto: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%'
    },
    settoreSx: {
        width: '30%',
        alignItems: 'center',
    },
    settoreDx: {
        flex: 1,
        alignItems: 'flex-start',
    },
    voto: {
        fontSize: responsiveFontSize(25),
        fontWeight: '800',
        color: '#466dcc'
    },
    giudizio: {
        fontSize: responsiveFontSize(15),
        fontWeight: '300',
        color: 'black'
    },
    data: {
        fontSize: responsiveFontSize(12),
        fontWeight: '500',
        color: 'black'
    },
    tipo: {
        fontSize: responsiveFontSize(12),
        fontWeight: '500',
        color: '#466dcc',
    }
})

export default Voto;