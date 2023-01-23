import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchPostAssenze} from '../store/actions/fetchAssenze'; //va dentro le {} perchè non è un export di default
import {fetchDataDashboard} from '../store/actions/fetchDataDashboard';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  RefreshControl
} from 'react-native';
import PostAssenza from '../components/PostAssenza';
import {SCREEN_HEIGHT,SCREEN_WIDTH} from '../strumenti/helper';
import responsiveFontSize  from "../strumenti/responsiveFontSize";

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function Assenze(props) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    dispatch(fetchPostAssenze());
    dispatch(fetchDataDashboard());
    wait(1000).then(() => setIsLoading(false));
  }, [dispatch]);
  
  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchPostAssenze());
    dispatch(fetchDataDashboard()).then(() => {
      setIsLoading(false)
    });
  }, [dispatch])

  const assenze = useSelector(state => state).assenzeReducer.assenze; 
  const userAssenze = useSelector(state => state).dataDashboardReducer.dati;

  const post_assenze = assenze.map((data, index) =>(
    <PostAssenza 
      key = {index}
      data = {data.data}
      giustifica = {data.giustifica}
      stato = {data.stato}
      tipologia = {data.tipologia}
      orario = {data.orario}
    />
  ));

  return (

    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={{fontSize: responsiveFontSize(26), fontWeight: '700', color: '#265CDE'}}>Assenze</Text>
      </View>
      <View style={styles.headerDati}>
        <View style={styles.headerRow}>
          <View style={styles.settoreSx}>
            <Text style={{fontSize: responsiveFontSize(13), fontWeight: '600', color:"#265CDE"}} >Assenze giornaliere</Text>
          </View>
          <View style={styles.settoreDx}>
            <Text style={{fontSize: responsiveFontSize(16), fontWeight: '800', color:"rgba(38, 92, 222, 0.5)"}} >{userAssenze.num_ass}</Text>
          </View>
        </View>

        <View style={styles.headerRow}>
          <View style={styles.settoreSx}>
            <Text style={{fontSize: responsiveFontSize(13), fontWeight: '600', color:"#265CDE"}} >Ritardi</Text>
          </View>
          <View style={styles.settoreDx}>
            <Text style={{fontSize: responsiveFontSize(16), fontWeight: '800', color:"rgba(38, 92, 222, 0.5)"}} >{userAssenze.num_ritardi}</Text>
          </View>
        </View>

        <View style={styles.headerRowLast}>
          <View style={styles.settoreSx}>
            <Text style={{fontSize: responsiveFontSize(13), fontWeight: '600', color:"#265CDE"}} >Uscite anticipate</Text>
          </View>
          <View style={styles.settoreDx}>
            <Text style={{fontSize: responsiveFontSize(16), fontWeight: '800', color:"rgba(38, 92, 222, 0.5)"}} >{userAssenze.num_uscite}</Text>
          </View>
        </View>

      </View>
      <ScrollView
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh}/>}
      >
        {post_assenze}
      </ScrollView> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F3",
    paddingTop: SCREEN_HEIGHT / 11,
    alignItems: 'center', 
  },
  header: {
    width: SCREEN_WIDTH - 50,
  },
  headerDati: {
    marginVertical: 25,
    width: SCREEN_WIDTH - 40,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(38, 93, 222, 0.2)'
  },
  headerRow: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(38, 93, 222, 0.2)'
  },
  headerRowLast: {
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
