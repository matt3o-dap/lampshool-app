import React, {useEffect, useState} from 'react';
import Materia from '../components/Materia';
import {useSelector, useDispatch} from 'react-redux';
import {fetchMaterie} from '../store/actions/fetchMaterie';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../strumenti/helper';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  RefreshControl,
} from 'react-native';
import responsiveFontSize  from "../strumenti/responsiveFontSize";

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function Materie(props) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onRefresh = React.useCallback(() => {
    setIsLoading(true);
    dispatch(fetchMaterie());
    wait(1000).then(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchMaterie()).then(() => {
      setIsLoading(false)
    });
  }, [dispatch])

  const loading = () => {
    return (
      <View>
        <Text style={{fontSize: 20, fontWeight: '800', color: '#265CDE', marginBottom: 10}}>Aggiornamento...</Text>
      </View>
    )
  }

  const AllMaterie = useSelector(state => state).materieReducer.materie;

  const Materies = AllMaterie.map(data =>(
    <Materia 
      key={data.id}
      nome_materia={data.nome} 
      sigla = {data.sigla}
      media={data.media} 
      caret={data.caret}
      colore={data.colore}

      onPressLabel={() => props.navigation.navigate('Riepilogo Materia', {
        sigla: data.sigla,
        materia: data.nome,
        colore: data.colore,
        max: data.max,
        min: data.min,
        medie: data.medieSOP
      })}
    />
  ));


  return (

    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={{fontSize: responsiveFontSize(26), fontWeight: '700', color: '#265CDE'}}>Materie</Text>
      </View>
      <ScrollView 
        showsVerticalScrollIndicator ={false}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh}/>}
      >
        {isLoading ? loading() : Materies}
      </ScrollView> 
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
    marginBottom: 30
  },
  headerRow: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  settoreSx: {
      width: SCREEN_WIDTH/2,
      alignItems: 'flex-start',
      paddingLeft: 25,

  },
  settoreDx: {
      width: SCREEN_WIDTH/2,
      alignItems: 'center',
  }
});
