import {fetchJson} from './fetchJSON';
/*
*
* Fetch per lezioni svolte
* 
* Campi JSON:
* matelez - datelez - argoles - attilez
*/

export const fetchLezioni = async (data) => {

    const myJson = await fetchJson();

    console.log("STRINGA DATA ----------> ", data)

    var loadLezioni = []
    for (key in myJson.matelez) {
        if (myJson.datelez[key] == data) {
            var lezione = {
                id: key,
                data_lezione: myJson.datelez[key],
                materia: myJson.matelez[key],
                argomento_lezione: myJson.argolez[key],
                attivita_lezione: myJson.attilez[key]
            }
            loadLezioni.push(lezione)
            console.log(lezione)
        }
    }

    return loadLezioni; 
}

export const fetchLezioniByMateria = async (materia) => {

    const myJson = await fetchJson();

    var loadLezioni = []
    var i = myJson.matelez.length-1;
    for (key in myJson.matelez) {
        if (myJson.matelez[i] == materia) {
            var lezione = {
                id: i,
                data_lezione: myJson.datelez[i],
                materia: myJson.matelez[i],
                argomento_lezione: myJson.argolez[i],
                attivita_lezione: myJson.attilez[i]
            }
            loadLezioni.push(lezione)
        }
        i--;
    }

    return loadLezioni; 
}
