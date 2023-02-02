import React, {useEffect, useState} from 'react';
import {SCREEN_HEIGHT,SCREEN_WIDTH} from '../strumenti/helper';
import {useSelector, useDispatch} from 'react-redux';
import responsiveFontSize  from "../strumenti/responsiveFontSize";
import {
  StyleSheet,
  View,
  Switch,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Button
} from 'react-native';
import { logout, buttonAggiungiProfilo, rimuoviAccount } from "../store/actions/authUser";
import {fetchDataDashboard} from '../store/actions/fetchDataDashboard';




export default function Impostazioni(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataDashboard())
  }, [dispatch])
  const dataUser = useSelector(state => state).dataDashboardReducer.dati; 

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const onPressExit = () => {
    dispatch(logout());
  }

  /* const onPressClean = () => {
    dispatch(logout());
    dispatch(buttonAggiungiProfilo(1));
    rimuoviAccount('gen1295');
  } */

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontSize: responsiveFontSize(26), fontWeight: '700', color: '#265CDE'}}>Impostazioni</Text>
        </View>
        <View style={styles.tabUtente}>
          <View style={styles.inlineTabProfile}>
            <View style={styles.profileImage}>
              <Image source={require('../assets/profilo/user.png')} style={{height: '100%', width: '100%', resizeMode: 'cover'}}  />
            </View>
          </View>
          <View style={styles.inlineTabInfo}>
            <Text style={{fontSize: responsiveFontSize(17), fontWeight: '700', color: '#265CDE'}}>{dataUser.nome}</Text>
            <Text style={{fontSize: responsiveFontSize(13), fontWeight: '700', color: '#5d8bf5'}}>{dataUser.classe}</Text>
          </View>
        </View>

        
        <View style={styles.tabImpostazioni}>
          {/* <View style={styles.rowImpostazioni}>
            <Text style={{fontSize: responsiveFontSize(13), fontWeight: '700', color: '#5d8bf5'}}>Notifiche nuovi voti</Text>
            <Switch trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={isEnabled ? "#265CDE" : "#f4f3f4"} ios_backgroundColor="#575757" onValueChange={toggleSwitch} value={isEnabled}/>
          </View>
          <View style={styles.rowImpostazioni}>
            <Text style={{fontSize: responsiveFontSize(13), fontWeight: '700', color: '#5d8bf5'}}>Notifiche comunicazioni</Text>
            <Switch trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={isEnabled ? "#265CDE" : "#f4f3f4"} ios_backgroundColor="#575757" onValueChange={toggleSwitch} value={isEnabled}/>
          </View>
          <View style={styles.rowImpostazioni}>
            <Text style={{fontSize: responsiveFontSize(13), fontWeight: '700', color: '#5d8bf5'}}>Notifica assenza</Text>
            <Switch trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={isEnabled ? "#265CDE" : "#f4f3f4"} ios_backgroundColor="#575757" onValueChange={toggleSwitch} value={isEnabled}/>
          </View> */}

          <TouchableOpacity onPress={onPressExit} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Esci</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={onPressClean} >
                <Text style={{fontSize: responsiveFontSize(17),color: "#f75767",fontWeight: "bold",alignSelf: "center",}}>Rimuovi account</Text>
          </TouchableOpacity> */}

        </View>
        
        

        <Text style={{fontSize: responsiveFontSize(7),color: "#cfcfcf",fontWeight: "bold",alignSelf: "center",marginTop: 20, marginBottom: 10}}>Made with ❤️ by D'Apolito Matteo</Text>
        <Text style={{fontSize: responsiveFontSize(7),color: "#ababab",fontWeight: "bold",alignSelf: "center"}}>LampSchool App- v 1.0.0</Text>
    </View>
  );
}

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F3",
    paddingTop: SCREEN_HEIGHT / 11,
    alignItems: 'center', 
  },
  header: {
    width: SCREEN_WIDTH - 50,
  },
  tabUtente: {
    marginTop: 40,
    width: SCREEN_WIDTH - 50,
    height: SCREEN_HEIGHT / 8,
    borderRadius: 25,
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inlineTabProfile: {
    width: '35%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inlineTabInfo: {
    width: '55%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
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
  },
  tabImpostazioni: {
    marginTop: 80,
    width: SCREEN_WIDTH - 50,
    //height: 300,
    paddingBottom: 30,
    backgroundColor: 'white',
    borderRadius: 25,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.05,
    shadowRadius: 25,
    alignItems: 'center'
  },
  rowImpostazioni: {
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'blue',
    alignItems: 'center'
  },
  appButtonContainer: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 20,
    padding: 10,
    width: 100,
    backgroundColor: 'white'
  },
  appButtonText: {
    fontSize: 20,
    color: "#f7adad",
    fontWeight: "bold",
    alignSelf: "center",
  },
});

