import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import md5 from 'md5';
import * as Notifications from 'expo-notifications';
import {useState} from 'react';
import { Alert } from "react-native";

export const SET_ACCOUNT = 'SET_ACCOUNT';
export const LOGOUT = 'LOGOUT';
export const SET_LIST = 'SET_LIST';

export const logout = () => {
    try {
        return async dispatch =>{
            
            var keys = await AsyncStorage.getAllKeys();
            var result = await AsyncStorage.multiGet(keys);

            var username = ''
            for (let i = 0; i < result.length; i++) {
                if(result[i][0]) {
                    let user = JSON.parse(result[i][1])
                    if (user.isLogin) {
                        username = user.username
                    }
                }
            }
            
            if(username != ''){
                
                var jsonValue = JSON.parse(await AsyncStorage.getItem(username));
                jsonValue.isLogin = false;
                await AsyncStorage.setItem(username, JSON.stringify(jsonValue));

                dispatch({type: LOGOUT, username: false})
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const aggiungiProfilo =  (username, password, link, suffisso) => {
    return async dispatch =>{
        console.log("-----> ",username, password, link, suffisso)
        if (await checkConnessione2(username, password, link, suffisso)) {
            AsyncStorage.setItem(username,JSON.stringify({
                username: username,
                password: md5(password),
                link: link,
                suffisso: suffisso,
                isLogin: true
            }))

            dispatch({type: SET_LIST, lista: true})
        } else {
            return false
        }
    }
}

/*
* Azione per aggiungere o uscire dallo screen aggiungi Profilo
*/
export const buttonAggiungiProfilo = (stato) => {
    return async dispatch => {
        if (stato != 1) {
            dispatch({type: SET_LIST, lista: true})
        } else {
            dispatch({type: SET_LIST, lista: false})
        }
    }
}


export const checkAccount = () => {
    return async dispatch =>{
        var keys = await AsyncStorage.getAllKeys();
        if ( keys.length ) {

            console.log("Dispatch lista true")
            dispatch({type: SET_LIST, lista: true})
            return true
        } else {
            console.log("Dispatch lista false")
            dispatch({type: SET_LIST, lista: false})
            return false
        }
    }
}

export const checkAccountLogged = () => {
    return async dispatch =>{
        var keys = await AsyncStorage.getAllKeys();
        var result = await AsyncStorage.multiGet(keys);

        for (let i = 0; i < result.length; i++) {
            if(result[i][0]) {
                let user = JSON.parse(result[i][1])
                if (user.isLogin) {
                    dispatch({type: SET_ACCOUNT, username: true})
                    return true
                } else {
                    dispatch({type: SET_ACCOUNT, username: false})
                    return false
                }
            }
        }
    }
}

export const setAccountLogged =  (username) => {
    return async dispatch =>{
        AsyncStorage.getItem( username )
        .then( data => {
            data = JSON.parse( data );
            data.isLogin = true;
            AsyncStorage.setItem( username, JSON.stringify( data ) );
        }).catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                alert(error.message);
                throw error;
            });

        dispatch({type: SET_ACCOUNT, username: true})
    }  
}

export const fetchListAccounts = async () => {
    try {
        var keys = await AsyncStorage.getAllKeys();
        var result = await AsyncStorage.multiGet(keys);
        return result
    } catch (error) {
        console.error(error)
    }
}


export const checkConnessione2 = async (username, password, link, suffisso) => {
    const url = link+'/lsapp/jsonlogin.php?suffisso='+suffisso+'&utente='+username+'&password='+md5(password);
    console.log("====> ",url)
    
    try {
        const data = await axios.get(url);
        // = await Notifications.getExpoPushTokenAsync();
        console.log(data.data)


        if(data.data == "Alunno non trovato!") {
            Alert.alert("Account errato","Attenzione, l'username o la password non sono corrette!");
            return false
        } else {
            //abbinaTokenNotifica(username,token);
            return true;
        } 
        
        
    } catch (error) {
        console.log(error)
        Alert.alert("Errore di connessione","Attenzione, i dati inseriti sono errati!");
        return false;
    }
}

const abbinaTokenNotifica = async (username,token) => {
    //Eseguo abbinamento toke:username
    //Inserire controlli sull'esito 
    const urlAbbinamentoTokenUsername = 'http://botcompiti.altervista.org/lampschool/SDKnotify/abbinaToken.php?username='+username+'&token='+token.data;
    const eseguiAbbinamento =  await axios.get(urlAbbinamentoTokenUsername);
    console.log("Abbinamento token eseguito: ", eseguiAbbinamento);
}


//rimuovi account dallo storage
export const rimuoviAccount = async (username) => {
    try {
        await AsyncStorage.removeItem(username);
        return true;
    }
    catch(exception) {
        return false;
    }
}