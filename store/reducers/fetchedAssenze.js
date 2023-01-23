import DATA from '../../data/offline-data';
import {FETCH_POST_ASS, FETCH_POST_RIT} from "../actions/fetchAssenze";

//Creiamo lo state INIZIALE altrimenti lo state da cambiare risulterà vuoto
allAssenze = {
    assenze: [{
        key: 1,
        data: "-",
        giustifica: "-"
    }]
} 

//REDUCER   (se state è null -> gli passa initialState (DATA))
const assenzeReducer = (state = allAssenze, action) => {
    switch(action.type) {
        case FETCH_POST_ASS:
            return {
                assenze: action.assenze //restituiamo uno state aggiornato
            }
        default:
            return state;
    }
}

export default assenzeReducer;
