import React, {useEffect, useState, useCallback} from 'react';
import {SCREEN_HEIGHT,SCREEN_WIDTH} from '../strumenti/helper';
import {useSelector, useDispatch} from 'react-redux';
import {fetchDataDashboard} from '../store/actions/fetchDataDashboard';
import {fetchComunicazioni } from "../store/actions/fetchComunicazioni";
import Avviso from '../components/Avviso';
import ArcoMedie from '../components/ArcoMedie';

import responsiveFontSize  from "../strumenti/responsiveFontSize";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Button
} from 'react-native';
import { Overlay } from 'react-native-elements';
import Hyperlink from 'react-native-hyperlink';



const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function Dashboard(props) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  //State per rendere visivo il modal delle comunicazioni
  const [visible, setVisible] = useState(false);
  const [avvisoVisible, setAvvisoVisible] = useState('');

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    dispatch(fetchDataDashboard());
    dispatch(fetchComunicazioni());
    wait(1000).then(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchDataDashboard())
    dispatch(fetchComunicazioni()).then(() => {
      setIsLoading(false)
    });
  }, [dispatch])

  const dataDashboard = useSelector(state => state).dataDashboardReducer.dati; 
  const comunicazioniData = useSelector(state => state).comunicazioniReducer.posts; 

  //colore badge ultimo voto
  const coloreBadge = (dataDashboard.ultimo_voto.tipo == 'S') ? '#9FABFF' : (dataDashboard.ultimo_voto.tipo == 'O') ? '#C69BFF' : '#FD76FF'
  

  const comunicazioni = comunicazioniData.map((dati, index) =>(
    <Avviso 
      key = {index}
      testo = {dati.testoAlt}
      data = {dati.data}
      onPressAvviso = {() => {
        setVisible(!visible);
        setAvvisoVisible(dati.testo);
      }}
    />
  ));

  const goToAssenze = () => {
    props.navigation.navigate("Assenze")
  }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView 
            showsVerticalScrollIndicator = {false}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh}/>}
    >
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={{fontSize: responsiveFontSize(22), fontWeight: '200', color: '#5c6cba'}}>Benvenuto,</Text>
            <Text style={{fontSize: responsiveFontSize(18), fontWeight: '700', color: '#5c6cba'}}>{dataDashboard.nome}</Text>
            
        </View>
        <View style={styles.medie_ass}>
            <View style={styles.tab}>
                <Text style={{fontSize: responsiveFontSize(20), fontWeight: '200', color: '#5c6cba'}}>Media</Text>
                <Text style={{fontSize: responsiveFontSize(25), fontWeight: '700', color: '#5c6cba'}}>{dataDashboard.media}</Text>
            </View>
            <View style={styles.tab}>
              <TouchableOpacity onPress={goToAssenze}>
                  <View>
                      <Text style={{fontSize: responsiveFontSize(17), fontWeight: '200', color: '#5c6cba'}}>Assenze</Text>
                      <Text style={{fontSize: responsiveFontSize(17), fontWeight: '700', color: '#5c6cba'}}>{dataDashboard.num_ass}</Text>
                  </View>
                  <View style={{marginTop: 2, borderTopWidth: 1, borderColor: '#5c6cba', paddingTop: 5}}>
                      <Text style={{fontSize: responsiveFontSize(17), fontWeight: '200', color: '#5c6cba'}}>Ritardi</Text>
                      <Text style={{fontSize: responsiveFontSize(17), fontWeight: '700', color: '#5c6cba'}}>{dataDashboard.num_ritardi}</Text>
                  </View>
              </TouchableOpacity> 
            </View>
        </View>
        <View style={styles.medie}>
          <View style={styles.tab_media}>
            <ArcoMedie 
              media = {dataDashboard.medieSOP['scritto']}
              tipo = "scritto"
            />
          </View>
          <View style={styles.tab_media}>
            <ArcoMedie 
              media = {dataDashboard.medieSOP['orale']}
              tipo = "orale"
            />
          </View>
          <View style={styles.tab_media}>
            <ArcoMedie 
              media = {dataDashboard.medieSOP['pratico']}
              tipo = "pratico"
            />
          </View>
        </View>

        <View style={styles.ultimo_voto}>
          <Text style={{fontSize: responsiveFontSize(13), fontWeight: '800', color: '#5c6cba', marginBottom: 10}}>Ultimo voto</Text>

          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
            <Image source={require('../assets/icone/data.png')} style={{height: responsiveFontSize(12), width: responsiveFontSize(12),resizeMode: 'contain', marginRight: 5, tintColor: '#5f8aed' }}  />
            <Text style={{fontSize: responsiveFontSize(12), fontWeight: '300', color: '#5c6cba'}}>{dataDashboard.ultimo_voto.data}</Text>
          </View>
          
          <View style={styles.ultimo_voto_tab}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={require('../assets/icone/tipo_materia.png')} style={{height: responsiveFontSize(12), width: responsiveFontSize(12),resizeMode: 'contain', marginRight: 5, tintColor: '#5f8aed' }}  />
              <Text style={{fontSize: responsiveFontSize(13), fontWeight: '700', color: '#5c6cba'}}>{dataDashboard.ultimo_voto.materia}</Text>
            </View>

            <View style={{backgroundColor: coloreBadge, padding: 4, borderRadius: 6}}>
              <Text style={{fontSize: responsiveFontSize(13), fontWeight: '700', color: 'white'}}>{dataDashboard.ultimo_voto.tipo}</Text>
            </View>


            <Text style={{fontSize: responsiveFontSize(17), fontWeight: '800', color: '#9FABFF'}}>{dataDashboard.ultimo_voto.voto}</Text>
          </View>
          <Text style={{fontSize: responsiveFontSize(13), fontWeight: '200', color: '#5c6cba'}}>{dataDashboard.ultimo_voto.giudizio}</Text>

        </View>
        <View style={styles.comunicazioni}>
            <Text style={{fontSize: responsiveFontSize(20), fontWeight: '800', color: '#5c6cba', marginBottom: 10}}>Comunicazioni</Text>
            <ScrollView showsVerticalScrollIndicator ={false}>
                {comunicazioni}
            </ScrollView>
        </View>
    </View>
    </ScrollView>
      
      
      <Overlay isVisible={visible} onBackdropPress={() => {setVisible(!visible);}}>
        <View style={styles.avvisoOverlay}>
          <Hyperlink linkDefault={ true } linkStyle={ { color: '#5c6cba'} }>
            <Text>{avvisoVisible}</Text>
            {/* <HTML source={{ html: avvisoVisible }}/> */}
          </Hyperlink> 
        </View>       
      </Overlay>
    </SafeAreaView>
  );
}

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F3",
    paddingTop: 20,
    alignItems: 'center',
  },
  header: {
    width: SCREEN_WIDTH - 40,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  medie_ass: {
    width: SCREEN_WIDTH - 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40
  },
  tab: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 27,
    padding: 15,
  },
  grafico: {
    width: SCREEN_WIDTH - 40,
    borderRadius: 27,
    marginTop: 20
  },
  comunicazioni: {
    width: SCREEN_WIDTH - 40,
    height: 200,
    marginTop: 25
  },
  avvisoOverlay: {
    width: SCREEN_WIDTH - 40,
    borderRadius: 25,
    color: 'red'
  },
  tab_media: {
    width: '31%',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 7,
    paddingTop: 10
  },
  medie: {
    width: SCREEN_WIDTH - 40,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ultimo_voto: {
    width: SCREEN_WIDTH - 40,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 20,
    padding: 15,
  },
  ultimo_voto_tab: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

});
