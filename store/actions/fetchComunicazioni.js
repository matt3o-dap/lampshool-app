import {fetchJson} from './fetchJSON';
const { htmlToText } = require('html-to-text');
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
                    testo: htmlToText(
                        htmlToText(
                            myPosts.testicom[key], {wordwrap: 200}
                            ), {}
                        ),
                    testoAlt: htmlToText(
                            htmlToText(
                                myPosts.testicom[key], {wordwrap: 200}
                                ), {}
                            ).replace("\n", ""),
                    data: myPosts.datecom[key]
                }
            )
            
        }  
        
        dispatch({type: FETCH_COMUNICAZIONI, dati: loadedComunicazioni})
    }
}
