import {combineReducers} from 'redux';
import votiReducer from './fetchedVotiMateria';
import assenzeReducer from './fetchedAssenze';
import dataDashboardReducer from './fetchedDataDashboard';
import materieReducer from './fetchedMaterie';
import authReducer from './authUserReducers';
import comunicazioniReducer from "./fetchedComunicazioni";
import votiChartReducer from './fetchedDataChart';

const rootReducer = combineReducers({
    authReducer,
    votiReducer,
    assenzeReducer,
    dataDashboardReducer,
    votiChartReducer,
    materieReducer,
    comunicazioniReducer,
})

export default rootReducer;