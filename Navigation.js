import * as React from 'react';
import { Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Materie from './screens/Materie';
import DettagliMateria from './screens/DettagliMateria';
import Assenze from './screens/Assenze';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Lezioni from "./screens/Lezioni";
import Impostazioni from "./screens/Impostazioni";
import {useSelector, useDispatch} from 'react-redux';
import {checkAccount, checkAccountLogged} from './store/actions/authUser';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AccountLoggati  from "./screens/AccountLoggati";
import AddAccount from "./screens/AddAccount"

const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function StackMaterieNavigation() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Materia" component={Materie} options={{ headerShown: false }}/>
        <Stack.Screen options={({route}) => ({title: route.params.title})} name="Riepilogo Materia" component={DettagliMateria} options={{ headerShown: false }}/>
      </Stack.Navigator>
  );
}


function DrawerNavigation () {
    return (
        <Tab.Navigator 
          initialRouteName="Dashboard"
          activeColor="#265CDE"
          inactiveColor="#A0B6EA"
          barStyle={{ backgroundColor: '#F3F4F3', paddingBottom: 25 }}
          labeled={false}
        >
          <Tab.Screen 
            name="Materie" 
            component={StackMaterieNavigation}
            options={{
              tabBarLabel: 'Materie',
              tabBarIcon: ({ color }) => (
                <Image source={require('./assets/icone/materie.png')} style={{height: 25, width: 25,resizeMode: 'contain', marginRight: 5, tintColor: color }}  />
              ),
            }}
          />
          <Tab.Screen 
            name="Assenze" 
            component={Assenze} 
            options={{
              tabBarLabel: 'Assenze',
              tabBarIcon: ({ color }) => (
                <Image source={require('./assets/icone/assenze.png')} style={{height: 25, width: 25,resizeMode: 'contain', marginRight: 5, tintColor: color }}  />
              ),
            }}
          />
          <Tab.Screen 
          name='Dashboard' 
          component={Dashboard}
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({ color }) => (
              <Image source={require('./assets/icone/home.png')} style={{height: 35, width: 35,resizeMode: 'contain', marginRight: 5, tintColor: color }}  />
            ),
          }}
          />
          <Tab.Screen 
          name='Lezioni' 
          component={Lezioni} 
          options={{
            tabBarLabel: 'Lezioni',
            tabBarIcon: ({ color }) => (
              <Image source={require('./assets/icone/lezioni.png')} style={{height: 25, width: 25,resizeMode: 'contain', marginRight: 5, tintColor: color }}  />
            ),
          }}
          />
           <Tab.Screen 
          name='Impostazioni' 
          component={Impostazioni} 
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
              <Image source={require('./assets/icone/menu.png')} style={{height: 25, width: 25,resizeMode: 'contain', marginRight: 5, tintColor: color }}  />
              ),
          }}
          />
        </Tab.Navigator>
    ) 
}


function AuthNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Login" component={Login} />
    </Drawer.Navigator>
  )
}

function AddAccountScreen() {
  return (
    <Stack.Navigator>
      <Drawer.Screen name="Aggiungi Account" component={AddAccount} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}

function AccountListScreen() {
  return (
    <Stack.Navigator>
      <Drawer.Screen name="Lista Account" component={AccountLoggati} options={{ headerShown: false }}/>
    </Stack.Navigator>
  )
}


function MainNavigation() {  
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setIsLoading(true);
    dispatch(checkAccount());
    dispatch(checkAccountLogged()).then(() => {
      setIsLoading(false)
    });
  }, [dispatch])

  //Controllo lista account
  //const [thereIsList, setThereIsList] = React.useState(false);
  //checkAccount().then((value) => {setThereIsList(value)});  

  const isUserLogged = useSelector(state => state).authReducer.username; 
  const thereIsList = useSelector(state => state).authReducer.lista; 

  console.log("is user log: ", isUserLogged, " is list: ", thereIsList);

  /*return (
    <NavigationContainer>
      {userLogged ? (
        <DrawerNavigation />
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  )*/
  return (
    <NavigationContainer>
      {thereIsList ? ( 
        isUserLogged ? (<DrawerNavigation />) : (<AccountListScreen />)
      ) : (
        <AddAccountScreen />
      )}
    </NavigationContainer>
  )
}


export default MainNavigation;