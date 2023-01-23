import DATA from '../../data/offline-data';
import {FETCH_VOTI} from "../actions/fetchVotiMateria";

votiMateria = {
    voti: DATA
} 

const votiReducer = (state = votiMateria, action) => {
    switch(action.type) {
        case FETCH_VOTI:
            return {
                voti: action.voti
            }
        default:
            return state;
    }
}

export default votiReducer;