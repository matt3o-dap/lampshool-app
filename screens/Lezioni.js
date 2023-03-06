import React, {useState, useEffect} from 'react';
import {SCREEN_HEIGHT,SCREEN_WIDTH} from '../strumenti/helper';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment'
import RNPickerSelect from 'react-native-picker-select';
import responsiveFontSize  from "../strumenti/responsiveFontSize";
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import {fetchLezioni, fetchLezioniByMateria} from "../store/actions/fetchLezioni2"
import {fetchMaterie, listaMaterie} from '../store/actions/fetchMaterie';
import Lezione from "../components/Lezione";

export default function Lezioni(props) {
  /*
  * Settaggi Calendario
  */
  LocaleConfig.locales['it'] = {
    monthNames: ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
    monthNamesShort: ['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'],
    dayNames: ['Domenica','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato'],
    dayNamesShort: ['Dom','Lun','Mar','Mer','Gio','Ven','Sab'],
    today: 'Oggi\'Oggi'
  };
  LocaleConfig.defaultLocale = 'it';

  /*
  * State
  */
  const [isSwitch, setIsSwitch] = useState(1);
  const [selected, setSelected] = useState('');
  const [lezioni, setLezioni] = useState([])
  const [lista_materie, setListaMaterie] = useState([])
  const today = new Date();
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMaterie());
    listaMaterie().then((value) => {setListaMaterie(value)});
  }, [dispatch])

  const onDayPress = day => {
    setSelected(day.dateString);
    var data = moment(day.dateString, "YYYY-MM-DD").format("DD/MM/YYYY")
    fetchLezioni(data).then((value) => {
      setLezioni(value);
    })
  };

  const onPressSwitch = (num) => {
    setIsSwitch(num);
  }
  
  /*
  * Card Attiva
  */
  const [active, setActive] = useState(0);
  const onChangeCard = ({ nativeEvent }) => {
    const active = Math.floor(
      (nativeEvent.contentOffset.x + 100) / nativeEvent.layoutMeasurement.width
    );
    setActive( active );
  };

  const onChangeMateria = (materia) => {
    fetchLezioniByMateria(materia).then((value) => {
      setLezioni(value);
    })
  }

  //const AllMaterie = useSelector(state => state).materieReducer.materie;




  const LezioniJson = lezioni.map(data => (
    <Lezione 
      key = {data.id}
      materia = {data.materia}
      testo = {(isSwitch == 1) ? data.argomento_lezione : data.attivita_lezione} 
      data = {data.data_lezione}
    />
  ))


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: responsiveFontSize(26), fontWeight: '700', color: '#5c6cba'}}>Lezioni</Text>
      </View>
      <ScrollView 
        showsVerticalScrollIndicator ={false}
        horizontal={false}
      >
        
          <CalendarList style={styles.calendario}
            //minDate={'2022-09-10'}
            //maxDate={'2023-06-20'}
            onDayPress={onDayPress}
            onDayLongPress={(day) => {console.log('selected day', day)}}
            markedDates={{
                [selected]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedColor: '#5c6cba',
                    selectedTextColor: 'white',
                }
                }}
            horizontal={true}
            pagingEnabled={true}
            enableSwipeMonths={true}
            hideExtraDays={true}
            firstDay={1}
            calendarWidth={SCREEN_WIDTH - 40}
            theme={{
              todayTextColor: '#C69BFF'
            }}
          />
        
        <View style={{alignItems: 'center'}}>
          <View style={styles.cardMateria}>
            <Text style={{fontSize: responsiveFontSize(15), fontWeight: '700', color: '#5c6cba', marginBottom: 10}}>Seleziona Materia</Text>

            <RNPickerSelect
            onValueChange={(value) => onChangeMateria(value)}
            placeholder={{label: 'Seleziona una materia...', value: null}}
            items={lista_materie}
            
            style={{...pickerSelectStyles}}
            useNativeAndroidPickerStyle={false}
            textInputProps={{ underlineColor: 'yellow' }}
            // InputAccessoryView={() => null}
          /> 
          </View>
        </View>

        <View style={styles.switchArgomenti}>
            <View style={(isSwitch == 1) ? styles.tab : styles.tab_no}>
                <TouchableOpacity onPress={() => onPressSwitch(1)}>
                    <Text style={{fontSize: responsiveFontSize(15), fontWeight: '700', color: '#5c6cba'}}>Attività</Text>
                </TouchableOpacity>
            </View>
            <View style={(isSwitch == 2) ? styles.tab : styles.tab_no}>
                <TouchableOpacity onPress={() => onPressSwitch(2)}>
                    <Text style={{fontSize: responsiveFontSize(15), fontWeight: '700', color: '#5c6cba'}}>Compiti</Text>
                </TouchableOpacity>
            </View>
        </View>
        {(lezioni.length != 0) ? 
        <View style={{alignItems: 'center'}}>
          {LezioniJson}
        </View>
        : 
          <View style={styles.no_lezione}>
            <Image source={require('../assets/icone/error.png')} style={{height: responsiveFontSize(75), width: responsiveFontSize(75),resizeMode: 'contain', marginRight: 5 }}  />
            <Text style={{fontSize: responsiveFontSize(20), fontWeight: '200', color: '#5c6cba', marginTop: 10}}>Nessuna lezione presente!</Text>
          </View>
        }
      </ScrollView>
    </View>
  );
}

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F3",
    paddingTop: SCREEN_HEIGHT / 11,
    alignItems: 'center'
  },
  header: {
    width: SCREEN_WIDTH - 40,
  },
  horizontalCard: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
  cardMateria: {
    width: SCREEN_WIDTH - 40,
    borderRadius: 25,
    marginTop: 20,
    padding: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendario: {
    width: SCREEN_WIDTH - 40,
    borderRadius: 25,
    marginTop: 35,
    marginLeft: 20,
    backgroundColor: 'white',
  },
  switchArgomenti: {
    marginTop: 30,
    width: SCREEN_WIDTH,
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
  nomeMese: {
    fontSize: 20,
    fontWeight: '800',
    color: '#5c6cba',
    paddingBottom: 10
  },
  no_lezione: {
    height: 200,
    flex: 1,
    alignItems: 'center',
    marginTop: 30
  },
  paginationWrapper: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#5c6cba',
    marginLeft: 10,
  },
  pickerMateria: {
    backgroundColor: 'red',
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
  },
});