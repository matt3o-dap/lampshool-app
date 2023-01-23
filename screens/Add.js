import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {SCREEN_HEIGHT,SCREEN_WIDTH, isIos} from '../strumenti/helper';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { Picker } from "@react-native-community/picker";
import { LinearGradient } from 'expo-linear-gradient';
import {buttonAggiungiProfilo, aggiungiProfilo } from '../store/actions/authUser';
import responsiveFontSize  from "../strumenti/responsiveFontSize";



export default function AddAccount(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [link, setLink] = useState('');
    const [suffisso, setSuffisso] = useState('');

    const dispatch = useDispatch();

    const onPressLogin = () => {
      if (username && password && link && suffisso) {
        dispatch(aggiungiProfilo(username, password, link, suffisso));
      } else {
        Alert.alert("Campi vuoti","Compila tutti i campi richiesti!");
      }
    }

    const onPressList = () => {
      dispatch(buttonAggiungiProfilo(2))
    }
    
  return (
    <KeyboardAvoidingView behavior={isIos ? "padding" : null } keyboardVerticalOffset={5} style={{felx:1}} >
      <ScrollView contentContainerStyle={styles.container}> 
            <View style={styles.header}>
                <Image source={require('../assets/images/logo_lamp.png')} style={{height: '20%', resizeMode: 'contain'}}  />
            </View>
            <View style={styles.bottom}>
                <Image source={require('../assets/images/logo_lamp.png')} style={{height: '20%', resizeMode: 'contain'}}  />
            </View>

            
            <TextInput autoCapitalize = 'none' style={styles.input} placeholder="Username" placeholderTextColor= 'white' value={username} onChangeText={value => setUsername(value)} />
            <TextInput autoCapitalize = 'none' secureTextEntry={true} style={styles.input} placeholder="Password" placeholderTextColor= 'white' value={password} onChangeText={value => setPassword(value)} />
            <TextInput autoCapitalize = 'none' style={styles.input} placeholder="Link" placeholderTextColor= 'white' value={link} onChangeText={value => setLink(value)} />
            <TextInput autoCapitalize = 'none' style={styles.input} placeholder="Suffisso" placeholderTextColor= 'white' value={suffisso} onChangeText={value => setSuffisso(value)} />

            <TouchableOpacity onPress={onPressLogin} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Accedi</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressList} style={styles.listaAccountButtonContainer}>
                <Text style={{fontSize: 10, fontWeight: '500', color: "#fafafa"}}>Lista Account</Text>
            </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    height: SCREEN_HEIGHT / 2,
    backgroundColor: "rgba(38, 92, 222, 0.5)"
  },
  bottom: {
    height: SCREEN_HEIGHT,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: 'white'
  },
  input: {
    width: SCREEN_WIDTH - 80,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 15,
    borderRadius: 15,
    color: 'white',
    marginBottom: 15
  },
  input_error: {
    width: SCREEN_WIDTH - 80,
    borderColor: 'red',
    borderWidth: 1,
    padding: 15,
    borderRadius: 15,
  },
  appButtonContainer: {
    marginTop: 30,
    elevation: 8,
    borderRadius: 20,
    padding: 10,
    width: 100,
    backgroundColor: 'white'
  },
  appButtonText: {
    fontSize: responsiveFontSize(17),
    color: "#61c8e7",
    fontWeight: "bold",
    alignSelf: "center",
  },
  titolo: {
    fontSize: responsiveFontSize(20),
    fontWeight: '300',
    marginTop: 20,
    marginBottom: 20,
    color: 'white',
  },
  listaAccountButtonContainer: {
    marginTop: 20,
    marginBottom: 50,
    elevation: 8,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "rgba(255,255,255, 0.2)"
  }
});
