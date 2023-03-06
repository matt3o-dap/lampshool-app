import React from 'react';
import Navigation from './Navigation';
import {Provider} from 'react-redux'; //connette lo store di redux ai nostri components
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './store/reducers/index'; //va a prendere l'index dato che non serve scriverlo
import ReduxThunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}> 
      <Navigation />
    </Provider>
  );
}

