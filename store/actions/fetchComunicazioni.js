import {fetchJson} from './fetchJSON';
import  moment from 'moment'

export const FETCH_COMUNICAZIONI= 'FETCH_COMUNICAZIONI';


export const fetchComunicazioni = () => {
    return async dispatch => {
        const myPosts = await fetchJson();
        const loadedComunicazioni = [];        

        for (key in myPosts.oggcom) {

            var today = moment().subtract(1, 'day').format('DD-MM-YYYY') //per eliminare comunicazioni antecedenti il giorno attuale
            var data_comunicazione = moment(myPosts.datecom[key], 'DD-MM-YYYY').format('DD-MM-YYYY')

            loadedComunicazioni.push(
                {  
                    id: key,
                    ogg: myPosts.oggcom[key],
                    data: myPosts.datecom[key],
                    testo: myPosts.testicom[key],
                    data: myPosts.datecom[key]
                }
            )
            
        }  
        
        dispatch({type: FETCH_COMUNICAZIONI, dati: loadedComunicazioni})
    }
}
