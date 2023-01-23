import DATA from '../../data/offline-data';
import {FETCH_MATERIE} from "../actions/fetchMaterie";

allMaterie = {
    materie: DATA
} 

const materieReducer = (state = allMaterie, action) => {
    switch(action.type) {
        case FETCH_MATERIE:
            return {
                materie: action.materie
            }
        default:
            return state;
    }
}

export default materieReducer;
