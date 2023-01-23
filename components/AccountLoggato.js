import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';

import { setAccountLogged, test } from "../store/actions/authUser";

const AccountLoggato = props => {
    const dispatch = useDispatch();
    var id_username = props.nome;
    var inizialeNome = (props.nome).split("");

    const onPressAccount = () => {
        dispatch(setAccountLogged(id_username))
    }; 


    return(
        <TouchableOpacity style={{alignItems: 'center', marginRight: 25}} onPress={onPressAccount}>
            <View style={styles.profileImage}>  
                {!props.image ? 
                    <Text style={{fontSize: 50, color: `rgba(255, 255, 255, .7)`, fontWeight: '900', marginTop: 10}}>{inizialeNome[0]}</Text>
                    :
                    <Image source={require('../assets/profilo/user.png')} style={{height: '100%', width: '100%', resizeMode: 'cover'}}  />}
            </View>
            <Text style={{color: 'white', fontWeight: '300', marginTop: 10}}>{props.nome}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#265CDE',
        overflow: 'hidden',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }

})

export default AccountLoggato;