import Materia from '../../models/Materia';
import {fetchJson} from './fetchJSON';
export const FETCH_MATERIE = 'FETCH_MATERIE';


export const fetchMaterie = () => {
    return async dispatch => {
        const myPosts = await fetchJson();

        const loadMaterie = [];

        const materie = myPosts.materie;  
        const listaColori = ColorStep([253, 118, 255, 1], [0, 128, 255, 1], myPosts.materie.length)
        
        for (const i in materie) {
            var somma = 0;
            var num_voti = 0;
            var voti_mat = [];
            
            for (key in myPosts.denominazione) {
                if (myPosts.denominazione[key] === materie[i]) {
                    if(parseFloat(myPosts.voto[key]) != 99){
                        voti_mat.push(myPosts.voto[key])
                        somma = somma + parseFloat(myPosts.voto[key]);
                        num_voti++;
                    }
                }
            }
            const media = (somma / num_voti).toFixed(2);  
            const checkMedia = (isNaN(media)) ?  '-' : media


            const maxVoto = (isNaN(Math.max(...voti_mat))) ? '-' : Math.max(...voti_mat)
            const minVoto = (isNaN(Math.min(...voti_mat))) ? '-' : Math.min(...voti_mat)
            const caret = (media < 6) ? false : true;
            const colore = listaColori[i];
            //const colore = "#000000"
            

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
                    if(myPosts.voto[key] != 99)
                        scritto.push(myPosts.voto[key])
                    break
                case 'O':
                    if(myPosts.voto[key] != 99)
                        orale.push(myPosts.voto[key])
                    break
                case 'P':
                    if(myPosts.voto[key] != 99)
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

/**
 * Get color steps (gradient) between two colors.
 * @author Arjan Haverkamp (arjan-at-avoid-dot-org)
 * @param {string} colorStart Any color. F.e.: 'red', '#f0f', '#ff00ff', 'rgb(x,y,x)', 'rgba(r,g,b,a)', 'hsl(180, 50%, 50%)'
 * @param {string} colorEnd Any color
 * @param {int} steps Number of color steps to return
 * @returns {array} Array of 'rgb(r,g,b)' or 'rgba(r,g,b,a)' arrays
 */
const ColorStep = (start, end, steps) => {
    opacityStep = (end[3] * 100 - start[3] * 100) / steps,
    colors = [];

    let alpha = 0, opacity = start[3] * 100;

    console.log(start, end, steps);

    for (let i = 0; i < steps; i++) {
        alpha += 1.0 / steps;
        opacity += opacityStep;

        let c = [
            Math.round(end[0] * alpha + (1 - alpha) * start[0]),
            Math.round(end[1] * alpha + (1 - alpha) * start[1]),
            Math.round(end[2] * alpha + (1 - alpha) * start[2])
        ];

        colors.push(
            opacity == 100 ? `rgb(${c[0]},${c[1]},${c[2]})` : `rgba(${c[0]},${c[1]},${c[2]},${opacity / 100})`
        );
    }

    return colors;
}