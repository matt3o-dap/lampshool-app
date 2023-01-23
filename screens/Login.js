import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SCREEN_HEIGHT,SCREEN_WIDTH, isIos} from '../strumenti/helper';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {signup, retrieveData, checkConnessione, checkAccount} from '../store/actions/authUser';


export default function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checkUtente, setCheckUtente] = useState('true');
    const dispatch = useDispatch();
  
    const onPressLogin = async () => {
      setCheckUtente(await dispatch(signup(username, password)));
    }
    
  return (
    <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{x: 1, y: 1 }}
            colors={['#608ff7', '#61c8e7']}
            style={styles.container}
        >
    <KeyboardAvoidingView behavior={isIos ? "padding" : null } keyboardVerticalOffset={5} style={{felx:1}} >
      <ScrollView contentContainerStyle={styles.container}> 
          <Image source={require('../assets/images/logo_lamp.png')} style={{height: '20%', resizeMode: 'contain'}}  />

          <Text style={styles.titolo}>Entra nel Registro!</Text>
          <TextInput autoCapitalize = 'none' style={styles.input} placeholder="Username" placeholderTextColor= 'white' value={username} onChangeText={value => setUsername(value)} />
      
          <TextInput autoCapitalize = 'none' secureTextEntry={true} style={[styles.input, {marginTop: 30}]} placeholder="Password" placeholderTextColor= 'white' value={password} onChangeText={value => setPassword(value)} />
          
          <TouchableOpacity onPress={onPressLogin} style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>Accedi</Text>
          </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: SCREEN_WIDTH - 80,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 15,
    borderRadius: 15,
    color: 'white'
  },
  input_error: {
    width: SCREEN_WIDTH - 80,
    borderColor: 'red',
    borderWidth: 1,
    padding: 15,
    borderRadius: 15,
  },
  appButtonContainer: {
    marginTop: 40,
    elevation: 8,
    borderRadius: 20,
    padding: 10,
    width: 100,
    backgroundColor: 'white'
  },
  appButtonText: {
    fontSize: 20,
    color: "#61c8e7",
    fontWeight: "bold",
    alignSelf: "center",
  },
  titolo: {
      fontSize: 30,
      fontWeight: '300',
      marginTop: 20,
      marginBottom: 20,
      color: 'white',
  }
});
