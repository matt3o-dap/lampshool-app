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
    label: '2020 Istituto Tecnico Luigi Di Maggio',
    value: 'https://2020.registro.itdimaggio.edu.it/login/login.php?suffisso=it'
  },
  {
    label: 'TESTING',
    value: 'http://botcompiti.altervista.org/lampschool_custom/login/login.php?suffisso='
  }
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
        <ImageBackground style={styles.immagineBackground} source={require('../assets/images/login_screen.png')}>
          <View style={styles.overlay} />
          <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <Image source={require('../assets/images/logo_lamp.png')} style={{height:'12%', resizeMode: "contain", marginBottom: 15}}  />
              
              <View style={styles.bottom}>
                  <Text style={{fontSize: responsiveFontSize(23), fontWeight: '800', color: '#265CDE'}}>Benvenuto</Text>
                  <Text style={{fontSize: responsiveFontSize(12), fontWeight: '200', color: '#265CDE', marginBottom: 20}}>Inserisci le tue credenziali per accedere al <Text style={{fontWeight: '800', color: '#265CDE'}}>Registro Elettronico</Text></Text>

        
                      <TextInput autoCapitalize = 'none' style={styles.input} placeholder="Username" placeholderTextColor= '#265CDE' value={username} onChangeText={value => setUsername(value)} />
                      <TextInput autoCapitalize = 'none' secureTextEntry={true} style={styles.input} placeholder="Password" placeholderTextColor= '#265CDE' value={password} onChangeText={value => setPassword(value)} />
                      
                      <View style={styles.switchArgomenti}>
                          <View style={(isSwitch == 1) ? styles.tab : styles.tab_no}>
                              <TouchableOpacity onPress={() => onPressSwitch(1)}>
                                  <Text style={{fontSize: responsiveFontSize(13), fontWeight: '700', color: '#265CDE'}}>Automatico</Text>
                              </TouchableOpacity>
                          </View>
                          <View style={(isSwitch == 2) ? styles.tab : styles.tab_no}>
                              <TouchableOpacity onPress={() => onPressSwitch(2)}>
                                  <Text style={{fontSize: responsiveFontSize(13), fontWeight: '700', color: '#265CDE'}}>Manuale</Text>
                              </TouchableOpacity>
                          </View>
                      </View>

                      {(isSwitch != 1) ? 
                        <View style={styles.inlineInputContainer}>
                          <TextInput autoCapitalize = 'none' style={[styles.inlineInput, {width: "60%"}]} placeholder="Link" placeholderTextColor= '#265CDE' value={link} onChangeText={value => setLink(value)} />
                          <TextInput autoCapitalize = 'none' style={[styles.inlineInput, {width: "30%"}]} placeholder="Suffisso" placeholderTextColor= '#265CDE' value={suffisso} onChangeText={value => setSuffisso(value)} />
                        </View>
                        :
                        <RNPickerSelect
                          onValueChange={(value) => onChangeIstituto(value)}
                          placeholder={{label: 'Seleziona una istituto...', value: null}}
                          items={istituti}

                          style={{...pickerSelectStyles}}
                          useNativeAndroidPickerStyle={false}
                          textInputProps={{ underlineColor: 'yellow' }}
                        />
                      }

                      


                  <View style={{alignItems: "center"}}>
                    <TouchableOpacity onPress={onPressLogin} style={styles.appButtonContainer}>
                      <Text style={styles.appButtonText}>Accedi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressList}>
                      <Text style={{fontSize:responsiveFontSize(13), fontWeight: '500', color: "#265CDE", marginTop: 20}}>Lista Account</Text>
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
    backgroundColor: '#F3F4F3',
    padding: 30
  },
  input: {
    width: '100%',
    borderColor: '#265CDE',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    color: '#265CDE',
    marginBottom: 10,
  },
  inlineInputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inlineInput: {
    borderColor: '#265CDE',
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
    color: '#265CDE',
  },
  appButtonContainer: {
    marginTop: 30,
    elevation: 8,
    borderRadius: 20,
    padding: 10,
    width: SCREEN_WIDTH/2.5,
    backgroundColor: '#265CDE',
    
    //Its for IOS
    shadowColor: '#265CDE',
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(38, 92, 222,0.5)',
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
    borderColor: '#265CDE',
    borderRadius: 14,
    color: '#265CDE',
    fontWeight: '700',
    paddingRight: 30,
    marginTop: 25
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#265CDE',
    borderRadius: 14,
    color: '#265CDE',
    paddingRight: 30, 
    marginTop: 25
  },
});
