import React from 'react';
import Navigation from './Navigation';
import {Provider} from 'react-redux'; //connette lo store di redux ai nostri components
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './store/reducers/index'; //va a prendere l'index dato che non serve scriverlo
import ReduxThunk from 'redux-thunk';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  // useEffect(() => {
  //   Permissions.getAsync(Permissions.NOTIFICATIONS).then(status => {
  //     if(status.status !== 'granted') {
  //       return Permissions.askAsync(Permissions.NOTIFICATIONS)
  //     }
  //     return status;
  //   }).then(status => {
  //     if(status.status !== 'granted') {
  //       throw new Error('Nessun Permesso')
  //     }
  //   }).then(() => {
  //     return Notifications.getExpoPushTokenAsync();
  //   }).then(data => {
  //     console.log("from App.js ",data)
  //   }).catch(error => {
  //     return null;
  //   })
  // }, [])
  return (
    <Provider store={store}> 
      <Navigation />
    </Provider>
  );
}

