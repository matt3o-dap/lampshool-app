import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../strumenti/helper'
import { LinearGradient } from 'expo-linear-gradient';
import responsiveFontSize  from "../strumenti/responsiveFontSize";


const PostAssenza = props => {


    const stato_giustifica_b = (props.stato == 1) ? 'rgba(180, 220, 28, 0.2)' : 'rgba(245, 66, 66, 0.2)';
    const stato_giustifica_t = (props.stato == 1) ? '#8ECE1E' : '#F54242';

    const tipologia_text = (props.tipologia == 'r' ? '#f2be00' : '#f7710a');
    const tipologia_bd = (props.tipologia == 'r' ? '#f2da00' : '#f7710a');
    const tipologia_bg = (props.tipologia == 'r' ? 'rgba(242, 218, 0, 0.2)' : 'rgba(247, 113, 10, 0.2)');

    return(
        <View style={[styles.container, {backgroundColor: (props.tipologia == 'a') ? stato_giustifica_b : tipologia_bg, borderColor: (props.tipologia == 'r') ? tipologia_bd : stato_giustifica_t}]}>
            <View style={styles.settore}>
                <Text style={[styles.data, {color: (props.tipologia == 'a') ? stato_giustifica_t : tipologia_text}]} >{(props.tipologia == 'a' ? "ASSENZA" : (props.tipologia == 'r') ? "RITARDO" : "USCITA ANT.")}</Text>
                <Text style={[styles.data, {color: (props.tipologia == 'a') ? stato_giustifica_t : tipologia_text}]} >{props.data}</Text>
                {(props.orario) ? <Text style={[styles.sottotitolo, {color: (props.tipologia == 'a') ? stato_giustifica_t : tipologia_text}]}> {(props.tipologia == 'r') ? 'Entrata ore:' : (props.tipologia == 'u' ? 'Uscita ore:' : null)} {props.orario}</Text> : null}
            </View>
            <View style={styles.settore}>
                <Text style={[styles.giustifica, {color: (props.tipologia == 'a') ? stato_giustifica_t : tipologia_text}]}>{props.giustifica}</Text>
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