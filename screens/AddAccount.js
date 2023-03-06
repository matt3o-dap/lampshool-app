import React, {useState, useEffect} from 'react';
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
  Alert,
  ImageBackground
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {buttonAggiungiProfilo, aggiungiProfilo } from '../store/actions/authUser';
import responsiveFontSize  from "../strumenti/responsiveFontSize";


const istituti = [
  {
    label: 'ITET Luigi Di Maggio',
    value: 'https://registro.itdimaggio.edu.it/login/login.php?suffisso=it'
  },
  {
    label: 'ITET Luigi Di Maggio - Corso Serale',
    value: 'https://registro.itdimaggio.edu.it/login/login.php?suffisso=ser'
  },
]




export default function AddAccount(props) {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [link, setLink] = useState('');
  const [suffisso, setSuffisso] = useState('');
  const [isSwitch, setIsSwitch] = useState(1);

  const dispatch = useDispatch();

  const onPressLogin = () => {
    if (username && password && link) {
      dispatch(aggiungiProfilo(username, password, link, suffisso));
    } else {
      Alert.alert("Campi vuoti","Compila tutti i campi richiesti!");
    }
  }

  const onPressList = () => {
    dispatch(buttonAggiungiProfilo(2))
  }

  const onPressSwitch = (num) => {
    setIsSwitch(num);
  }

  const onChangeIstituto = (value) => {
    onChange(value);
  }
  

  const onChange = (value) => {
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
      params = {},
      match;

    while (match = regex.exec(value)) {
      params[match[1]] = match[2];
    }
    
    var url_split = value.split( '/' );
    var link = url_split[0]+'//'+url_split[1]+url_split[2]+'/';

    setLink(link)
    setSuffisso(params['suffisso'])
  }


  return (
    <KeyboardAvoidingView behavior={isIos ? "padding" : null } keyboardVerticalOffset={5}  >
        {/* <View style={{flex:1}}> */}
        <ImageBackground style={styles.immagineBackground} source={require('../assets/splash-white.png')}>
          <View style={styles.overlay} />
          <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <Image source={require('../assets/icon.png')} style={{height:'12%', resizeMode: "contain", marginBottom: 15}}  />
              
              <View style={styles.bottom}>
                  <Text style={{fontSize: responsiveFontSize(23), fontWeight: '800', color: '#5c6cba'}}>Benvenuto</Text>
                  <Text style={{fontSize: responsiveFontSize(12), fontWeight: '200', color: '#5c6cba', marginBottom: 20}}>Inserisci le tue credenziali per accedere al <Text style={{fontWeight: '800', color: '#5c6cba'}}>Registro Elettronico</Text></Text>

        
                      <TextInput autoCapitalize = 'none' style={styles.input} placeholder="Username" placeholderTextColor= '#5c6cba' value={username} onChangeText={value => setUsername(value)} />
                      <TextInput autoCapitalize = 'none' secureTextEntry={true} style={styles.input} placeholder="Password" placeholderTextColor= '#5c6cba' value={password} onChangeText={value => setPassword(value)} />
                      
                      <View style={styles.switchArgomenti}>
                          <View style={(isSwitch == 1) ? styles.tab : styles.tab_no}>
                              <TouchableOpacity onPress={() => onPressSwitch(1)}>
                                  <Text style={{fontSize: responsiveFontSize(13), fontWeight: '700', color: '#5c6cba'}}>Automatico</Text>
                              </TouchableOpacity>
                          </View>
                          <View style={(isSwitch == 2) ? styles.tab : styles.tab_no}>
                              <TouchableOpacity onPress={() => onPressSwitch(2)}>
                                  <Text style={{fontSize: responsiveFontSize(13), fontWeight: '700', color: '#5c6cba'}}>Manuale</Text>
                              </TouchableOpacity>
                          </View>
                      </View>

                      {(isSwitch != 1) ? 
                        <View style={styles.inlineInputContainer}>
                          <TextInput autoCapitalize = 'none' style={[styles.inlineInput, {width: "60%"}]} placeholder="Link" placeholderTextColor= '#5c6cba' value={link} onChangeText={value => setLink(value)} />
                          <TextInput autoCapitalize = 'none' style={[styles.inlineInput, {width: "30%"}]} placeholder="Suffisso" placeholderTextColor= '#5c6cba' value={suffisso} onChangeText={value => setSuffisso(value)} />
                        </View>
                        :
                        <RNPickerSelect
                          onValueChange={(value) => onChangeIstituto(value)}
                          placeholder={{label: 'Seleziona una istituto...', value: null}}
                          items={istituti}

                          style={{...pickerSelectStyles}}
                          useNativeAndroidPickerStyle={false}
                          textInputProps={{ underlineColor: 'blue' }}
                        />
                      }

                  <View style={{alignItems: "center"}}>
                    <TouchableOpacity onPress={onPressLogin} style={styles.appButtonContainer}>
                      <Text style={styles.appButtonText}>Accedi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressList}>
                      <Text style={{fontSize:responsiveFontSize(13), fontWeight: '500', color: "#5c6cba", marginTop: 20}}>Lista Account</Text>
                    </TouchableOpacity>
                  </View>
              </View>
            </View>
        </ImageBackground>
        {/* </View> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  bottom: {
    width: SCREEN_WIDTH - 50,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    padding: 30
  },
  input: {
    width: '100%',
    borderColor: '#5c6cba',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#5c6cba',
    marginBottom: 10,
  },
  inlineInputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inlineInput: {
    borderColor: '#5c6cba',
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
    color: '#5c6cba',
  },
  appButtonContainer: {
    marginTop: 30,
    elevation: 8,
    borderRadius: 20,
    padding: 10,
    width: SCREEN_WIDTH/2.5,
    backgroundColor: '#5c6cba',
    
    //Its for IOS
    shadowColor: '#5c6cba',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 15,
    
    // its for Android
    elevation: 4,
  },
  appButtonText: {
    fontSize: responsiveFontSize(17),
    color: "#fff",
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
  switchArgomenti: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  tab: {
    width: '50%',
    padding: 5,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: 'rgba(38, 93, 222, 0.4)'
  },
  tab_no: {
    width: '50%',
    padding: 5,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: 'rgba(38, 93, 222, 0)'
  },
  immagineBackground:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#5c6cba',
    borderRadius: 14,
    color: '#5c6cba',
    fontWeight: '700',
    paddingRight: 30,
    marginTop: 25
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#5c6cba',
    borderRadius: 14,
    color: '#5c6cba',
    paddingRight: 30, 
    marginTop: 25
  },
});
