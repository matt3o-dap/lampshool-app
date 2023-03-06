import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {SCREEN_HEIGHT} from '../strumenti/helper';
import { LinearGradient } from 'expo-linear-gradient';
import AccountLoggato from "../components/AccountLoggato";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import {fetchListAccounts, buttonAggiungiProfilo} from "../store/actions/authUser"

export default function AccountLoggati(props) {
    const dispatch = useDispatch();
    const [listAccounts, setListAccounts] = useState([])
    
    fetchListAccounts().then((value) => {
      var loadAcc = []
      for (let i = 0; i < value.length; i++) {
        if(value[i][0] != "accLogged") {
          loadAcc.push(JSON.parse(value[i][1]))
        }
      }
      setListAccounts(loadAcc)
    })
    
    const accounts = listAccounts.map(data => (
      <AccountLoggato
        key = {data.username}
        nome={data.username} 
        image={true}
      />
    ))

    const goToAddAccount= () => {
      dispatch(buttonAggiungiProfilo(1))
    }
    
  return (
    <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{x: 1, y: 1 }}
            colors={['#0080FF', '#FD76FF']}
            style={styles.container}
    >
        <View contentContainerStyle={styles.header}> 
          <Image source={require('../assets/icon-white.png')} style={{height: 100, resizeMode: 'contain'}}  />
        </View>
        <Text style={{color: 'white',fontSize: 20, fontWeight: '200', marginTop: 10}}>Seleziona un account!</Text>
        <ScrollView horizontal={true} style={{paddingLeft: 20, marginTop: 40}} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} showsHorizontalScrollIndicator ={false}>
            {accounts}
            <TouchableOpacity style={{alignItems: 'center', marginRight: 25}} onPress={goToAddAccount}>
                <View style={styles.addAccountButton}>  
                  <Text style={{fontSize: 50, color: `rgba(255, 255, 255, .7)`, fontWeight: '900'}}>+</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: SCREEN_HEIGHT / 6,
  },
  addAccountButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(135, 135, 135, 0.2)',
    overflow: 'hidden',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
}
});
