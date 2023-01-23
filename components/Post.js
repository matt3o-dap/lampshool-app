import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../strumenti/helper'
import { LinearGradient } from 'expo-linear-gradient';


const Post = props => {

    return(
        <LinearGradient
            start={{ x: 0, y: 1 }}
            end={{x: 1, y: 0 }}
            colors={['#ffa12d', '#ff661a']}
            style={styles.container}
        >
            <TouchableOpacity onPress={props.onPressImage}>
                <View style={styles.containerVoto}>
                    <View style={styles.settoreSx}>
                        <Text style={styles.materia} >{props.materia}</Text>
                        <Text style={styles.data} >{props.data}</Text>
                    </View>
                    <View style={styles.settoreDx}>
                        <Text style={styles.voto} >{props.voto}</Text>
                        
                        <Text style={styles.tipo} >{props.tipo}</Text>  
                    </View>
                </View>
            </TouchableOpacity>    
        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH - 30,
        height: SCREEN_HEIGHT / 9,
        marginVertical: 10,
        elevation: 2,    //ad android
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 3,
        borderRadius: 20,
    },
    containerVoto: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
    },
    settoreSx: {
        width: SCREEN_WIDTH/2,
        alignItems: 'flex-start',
        paddingLeft: 25,

    },
    settoreDx: {
        width: SCREEN_WIDTH/3,
        alignItems: 'center',
    },
    voto: {
        fontSize: 40,
        fontWeight: '800',
        color: 'white'
    },
    materia: {
        fontSize: SCREEN_WIDTH - 389,
        fontWeight: '700',
        color: 'white'
    },
    data: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white'
    },
    tipo: {
        fontSize: 15,
        fontWeight: '500',
        color: 'white'
    }
})

export default Post;