import {FETCH_DATA_DASH} from "../actions/fetchDataDashboard";

dataDashboard = {
    dati: {
        num_ass: '-',
            num_ritardi: '-',
            num_uscite: '-',
            media: '-',
            medieSOP: {
                scritto: 0,
                orale: 0,
                pratico: 0
            },
            nome: '-',
            classe: '-',
            ultimo_voto: {
                voto: '-',
                data: '-',
                tipo: '-',
                giudizio: '-',
                materia: '-'
            }
    }
} 

const dataDashboardReducer = (state = dataDashboard, action) => {
    switch(action.type) {
        case FETCH_DATA_DASH:
            return {
                dati: action.dati
            }
        default:
            return state;
    }
}

export default dataDashboardReducer;
