import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../strumenti/helper'
import { LinearGradient } from 'expo-linear-gradient';
import responsiveFontSize from "../strumenti/responsiveFontSize";


const PostAssenza = props => {

    const stato_giustifica_b = (props.stato == 1) ? 'rgba(159, 171, 255, 0.2)' : 'rgba(253, 118, 255, 0.2)'; // light giust e non giust
    const stato_giustifica_t = (props.stato == 1) ? '#9FABFF' : '#FD76FF'; // accent giust e non giust

    const altro = (props.tipologia != 'a') ? "#5c6cba" : stato_giustifica_t;
    // territorio sconosciuto
    const tipologia_text = (props.tipologia == 'r' ? '#C69BFF' : '#5c6cba'); // testo uscita ant??
    // probabilmente i ritardi
    const tipologia_bd = (props.tipologia == 'r' ? '#C69BFF' : '#5c6cba');
    const tipologia_bg = (props.tipologia == 'r' ? 'rgba(198, 155, 255, 0.2)' : 'rgba(92, 108, 186, 0.2)'); // sfondo uscita anticipata?

    return (
        <View style={[styles.container, { backgroundColor: (props.tipologia == 'a') ? stato_giustifica_b : tipologia_bg, borderColor: (props.tipologia == 'r') ? tipologia_bd : altro }]}>
            <View style={styles.settore}>
                <Text style={[styles.data, { color: (props.tipologia == 'a') ? stato_giustifica_t : tipologia_text }]} >{(props.tipologia == 'a' ? "ASSENZA" : (props.tipologia == 'r') ? "RITARDO" : "USCITA ANT.")}</Text>
                <Text style={[styles.data, { color: (props.tipologia == 'a') ? stato_giustifica_t : tipologia_text }]} >{props.data}</Text>
                {(props.orario) ? <Text style={[styles.sottotitolo, { color: (props.tipologia == 'a') ? stato_giustifica_t : tipologia_text }]}> {(props.tipologia == 'r') ? 'Entrata ore:' : (props.tipologia == 'u' ? 'Uscita ore:' : null)} {props.orario}</Text> : null}
            </View>
            <View style={styles.settore}>
                <Text style={[styles.giustifica, { color: (props.tipologia == 'a') ? stato_giustifica_t : tipologia_text }]}>{props.giustifica}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH - 40,
        height: SCREEN_HEIGHT / 11,
        marginVertical: 10,
        borderRadius: 30,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    settore: {
        width: '45%',
        alignItems: 'flex-start',
        paddingLeft: 25,
    },
    giustifica: {
        fontSize: responsiveFontSize(12),
        fontWeight: '700',
    },
    data: {
        fontSize: responsiveFontSize(12),
        fontWeight: '700',
    },
    sottotitolo: {
        fontSize: responsiveFontSize(10),
        fontWeight: '300',
    }
})

export default PostAssenza;