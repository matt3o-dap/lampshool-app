import {FETCH_COMUNICAZIONI} from "../actions/fetchComunicazioni";
import DATA from '../../data/offline-data';

initialStateComunicazioni = {
    posts: [{
        data: '',
        voto: 1
    }]
} 

const comunicazioniReducer = (state = initialStateComunicazioni, action) => {
    switch(action.type) {
        case FETCH_COMUNICAZIONI:
            return {
                posts: action.dati //restituiamo uno state aggiornato
            }
        default:
            return state;
    }
}

export default comunicazioniReducer;
