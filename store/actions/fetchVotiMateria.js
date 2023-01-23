import {fetchJson} from './fetchJSON';
import Voto from '../../models/Voto';

export const FETCH_VOTI = 'FETCH_VOTI';

export const fetchVotiMateria = () => {
    return async dispatch => {
        const myPosts = await fetchJson();
        const loadedPosts = [];

        //id, voto, materia, giudizio, data, tipo
        for (key in myPosts.voto) {
            loadedPosts.push(
                new Voto(
                    key,
                    cambiaVoto(myPosts.voto[key]),
                    myPosts.denominazione[key],
                    myPosts.giudizio[key],
                    myPosts.date[key],
                    cambiaTipoVoto(myPosts.tipo[key]),
                )
            )
        }
        dispatch({type: FETCH_VOTI, voti: loadedPosts})
    }
}

export const finePrimoPeriodo = async () => {
    const myPosts = await fetchJson();
    return myPosts.fineprimo;
}

const cambiaTipoVoto = (tipo) => {
    switch (tipo){
        case "O":
            return "ORALE";
        case "P":
            return "PRATICO";
        case "S":
            return "SCRITTO";
        default:
            return tipo;
    }
}

const cambiaVoto = (voto) => {
    var lista = voto.split(".");

    var intero = lista[0];
    var decimale = lista[1];

    switch (decimale) {
        case "75":
            intero ++;
            return intero + "-";
        case "25":
            return intero + "+";
        case "00":
            return Math.trunc(voto);
        
        default:
            return parseFloat(voto).toFixed(1);
    }
}
