import {FETCH_DATA_CHART} from "../actions/fetchDataChart";

initialStateChart = {
    voti: [{
        data: '',
        voto: 1
    }]
} 

const votiChartReducer = (state = initialStateChart, action) => {
    switch(action.type) {
        case FETCH_DATA_CHART:
            return {
                voti: action.voti //restituiamo uno state aggiornato
            }
        default:
            return state;
    }
}

export default votiChartReducer;
