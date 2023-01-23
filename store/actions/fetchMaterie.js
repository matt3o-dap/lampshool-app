import Materia from '../../models/Materia';
import {fetchJson} from './fetchJSON';

export const FETCH_MATERIE = 'FETCH_MATERIE';


export const fetchMaterie = () => {
    return async dispatch => {
        const myPosts = await fetchJson();

        const loadMaterie = [];

        const materie = myPosts.materie;  
        
        for (const i in materie) {
            const somma = 0;
            const num_voti = 0;
            const voti_mat = [];
            
            for (key in myPosts.denominazione) {
                if (myPosts.denominazione[key] === materie[i]) {
                    somma = somma + parseFloat(myPosts.voto[key]);
                    num_voti++;
                    voti_mat.push(myPosts.voto[key])
                }
            }
            const media = (somma / num_voti).toFixed(2);  
            const checkMedia = (isNaN(media)) ?  '-' : media


            const maxVoto = (isNaN(Math.max(...voti_mat))) ? '-' : Math.max(...voti_mat)
            const minVoto = (isNaN(Math.min(...voti_mat))) ? '-' : Math.min(...voti_mat)
            const caret = (media < 6) ? false : true;
            const colore = getRandomColor();
            

            loadMaterie.push(
                new Materia(
                    i,
                    (materie[i].length < 30) ? materie[i] : myPosts.siglematerie[i],
                    materie[i],
                    checkMedia,
                    maxVoto,
                    minVoto,
                    mediaSOP(myPosts, materie[i]),
                    caret,
                    colore,
                )
            )
        }


        dispatch({type: FETCH_MATERIE, materie: loadMaterie})
    }
}

const mediaSOP = (myPosts, materia) => {
    var medieDict = {}

    const orale = [];
    const pratico = [];
    const scritto = [];

    for (key in myPosts.denominazione) {
        if (myPosts.denominazione[key] === materia) {
            
            switch (myPosts.tipo[key]) {
                case 'S':
                    scritto.push(myPosts.voto[key])
                    break
                case 'O':
                    orale.push(myPosts.voto[key])
                    break
                case 'P':
                    pratico.push(myPosts.voto[key])
                    break
            }
        }
    }
    
    const media_totale = media(scritto.concat(orale,pratico));

    medieDict = {
        mat: materia,
        scritto: media(scritto),
        orale: media(orale),
        pratico: media(pratico),
        media_totale: media_totale
    }
    return medieDict
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function media(nums) {
    if (nums.length > 0){
        var s = 0;
        for (key in nums) {
            s += parseFloat(nums[key]);
        }
        const media = (s / nums.length).toFixed(2); 
        return media;
    } else {return '-'}
}

export const listaMaterie = async () => {

    const myJson = await fetchJson();
    var materie = []
    for (key in myJson.materie) {
        materie.push({
            label: myJson.materie[key],
            value: myJson.materie[key]
        })
    }
    return materie; 
}