import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import {fetchVotiMateria, finePrimoPeriodo} from '../store/actions/fetchVotiMateria';
import {SCREEN_HEIGHT,SCREEN_WIDTH} from '../strumenti/helper';
import {useSelector, useDispatch} from 'react-redux';
import Voto from '../components/Voto';
import responsiveFontSize  from "../strumenti/responsiveFontSize";
import  moment from 'moment'


export default function DettagliMateria(props) {
  const {materia, sigla, colore, max, min, medie} = props.route.params;

  let newSigla = truncate(sigla, 17);

  const [isLoading, setIsLoading] = useState(false);
  const [isSwitch, setIsSwitch] = useState(1);
  const [primoPeriodo, setPrimoPeriodo] = useState();
  

  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchVotiMateria()).then(() => {
      setIsLoading(false)
    });
  }, [dispatch])

  const onPressSwitch = (num) => {
    setIsSwitch(num);
    
  }

  finePrimoPeriodo().then((value) => {setPrimoPeriodo(value)})
  const datiMateria = useSelector(state => state).votiReducer.voti.filter(voti => voti.materia === materia);  
  
  
  const allVoti = (isSwitch == 1) ? datiMateria.map(data =>(
    (moment(primoPeriodo, 'YYYY-MM-DD') > moment(data.data, 'DD-MM-YYYY')) ?
    <Voto 
      key={data.id}
      voto={data.voto} 
      giudizio={data.giudizio}
      data={data.data}
      tipo={data.tipo}
    /> : null
  )) : datiMateria.map(data =>(
    (moment(primoPeriodo, 'YYYY-MM-DD') < moment(data.data, 'DD-MM-YYYY')) ?
    <Voto 
      key={data.id}
      voto={data.voto} 
      giudizio={data.giudizio}
      data={data.data}
      tipo={data.tipo}
    /> : null
  ));

  const loading = () => {
    return (
      <View>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }

  return (
    <ScrollView 
      showsVerticalScrollIndicator ={false}
    >
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={[styles.containerMedia, {backgroundColor: colore}]}>
            <View style={styles.settoreSx}>
                <Text style={{fontSize: responsiveFontSize(18), fontWeight: '700', color: 'white', marginTop: 15 }} >{newSigla}</Text>
            </View>
            <View style={styles.settoreDx}>
                <Text style={{fontSize: responsiveFontSize(22), fontWeight: '800', color: 'white', marginTop: 15 }} >{medie.media_totale}</Text>
            </View>
          </View>

          <View style={styles.cardRiepilogo}>
            <Text style={{fontSize: responsiveFontSize(21), fontWeight: '500', marginBottom: 10 }}>Informazioni</Text>
            <View style={{flexDirection: 'column'}} >
              <View style={styles.datiCard}>
                <Text style={{fontSize: responsiveFontSize(17), fontWeight: '300', marginBottom: 10 }}>Voto più alto</Text>
                <Text style={{fontSize: responsiveFontSize(17), fontWeight: '600', marginBottom: 10 }}>{(!isFinite(max)) ? '-' : max}</Text>
              </View>
              <View style={styles.datiCard}>
                <Text style={{fontSize: responsiveFontSize(17), fontWeight: '300', marginBottom: 10 }}>Voto più basso</Text>
                <Text style={{fontSize: responsiveFontSize(17), fontWeight: '600', marginBottom: 10 }}>{(!isFinite(min)) ? '-' : min}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 25}}>
              <View style={{flexDirection: 'row', borderRightWidth: 1, justifyContent: 'space-between', paddingRight: 10, flex: 1,alignItems: 'center'}}>
                <Text style={{fontSize: responsiveFontSize(12)}}>Orale</Text>
                <Text style={{fontWeight: '600', fontSize: responsiveFontSize(12)}}>{medie.orale}</Text>
              </View>
              <View style={{flexDirection: 'row', borderRightWidth: 1, justifyContent: 'space-between', paddingRight: 10, paddingLeft: 10, flex: 1, alignItems: 'center'}}>
                <Text style={{fontSize: responsiveFontSize(12)}}>Scritto</Text>
                <Text style={{fontWeight: '600', fontSize: responsiveFontSize(12)}}>{medie.scritto}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10,flex: 1,alignItems: 'center'}}>
                <Text style={{fontSize: responsiveFontSize(12)}}>Pratico</Text>
                <Text style={{fontWeight: '600', fontSize: responsiveFontSize(12)}}>{medie.pratico}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.bottomContainer, {backgroundColor: colore}]}>

          <View style={styles.switchArgomenti}>
              <View style={(isSwitch == 1) ? styles.tab : styles.tab_no}>
                  <TouchableOpacity onPress={() => onPressSwitch(1)}>
                      <Text style={{fontSize: responsiveFontSize(15), fontWeight: '700', color: '#fff'}}>1˚ Periodo</Text>
                  </TouchableOpacity>
              </View>
              <View style={(isSwitch == 2) ? styles.tab : styles.tab_no}>
                  <TouchableOpacity onPress={() => onPressSwitch(2)}>
                      <Text style={{fontSize: responsiveFontSize(15), fontWeight: '700', color: '#fff'}}>2˚ Periodo</Text>
                  </TouchableOpacity>
              </View>
          </View>
          <Text style={{fontSize: responsiveFontSize(22), fontWeight: '300', color: 'white', marginBottom: 15, marginLeft: 25}}>Voti</Text>
          <View style={styles.dataBottomContainer}>
            <ScrollView>{isLoading ? loading() : allVoti}</ScrollView> 
          </View>
        </View>  
      </View>  
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: 'center',
    height: '100%'
  },
  containerHeader: {
    height: SCREEN_HEIGHT / responsiveFontSize(2),
    alignItems: 'center',
  },
  containerMedia: {
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    justifyContent: 'flex-start',
    height: '55%',
    paddingTop: 40,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20
  },
  settoreSx: {
    alignItems: 'flex-start',
    paddingLeft: 25,
    width: '65%',
  },
  settoreDx: {
    alignItems: 'flex-start',
    paddingLeft: 25,
  },
  cardRiepilogo: {
    width: SCREEN_WIDTH - 50,
    height: '60%',
    backgroundColor: 'white',
    position: 'absolute',
    top: '25%',
    borderRadius: 20,
    padding: 20,
    marginTop: 15,

    //Its for IOS
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.12,
    shadowRadius: 10,
    
    // its for Android
    elevation: 15,
  },
  datiCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 25,
    color: 'white'
  },
  bottomContainer: {
    width: SCREEN_WIDTH,
    paddingTop: 20,
    paddingBottom: 40,
  },
  dataBottomContainer: {
    width: SCREEN_WIDTH - 40,
    height: responsiveFontSize(300),
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  switchArgomenti: {
    marginBottom: 25,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    alignItems: 'center'
  },
  tab: {
    width: '50%',
    padding: 5,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: 'rgba(255, 255, 255, 1)'
  },
  tab_no: {
    width: '50%',
    padding: 5,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0)'
  }
});

const truncate = ( str, n, useWordBoundary ) => {
  if (str.length <= n) { return str; }
  const subString = str.slice(0, n-1); // the original check
  return (useWordBoundary 
    ? subString.slice(0, subString.lastIndexOf(" ")) 
    : subString) + "...";
};