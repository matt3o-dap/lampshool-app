import {fetchJson} from './fetchJSON';
export const FETCH_DATA_DASH = 'FETCH_DATA_DASH';



export const fetchDataDashboard = () => {
    return async dispatch => {
        const myPosts = await fetchJson();

        var voti = [];
        for (key in myPosts.voto) {    
            voti.push(myPosts.voto[key]);
        }
        var nome = myPosts.cognome + " " + myPosts.nome;

        const datiDashboard = {
            num_ass: myPosts.numeroassenze,
            num_ritardi: ((myPosts.numeroritardi == null) ? 0 : myPosts.numeroritardi),
            num_uscite: ((myPosts.numerouscite == null) ? 0 : myPosts.numerouscite),
            media: media(voti),
            medieSOP: medieSOP(myPosts),
            nome: nome,
            classe: myPosts.classe,
            ultimo_voto: {
                voto: myPosts.voto[0],
                data: myPosts.date[0],
                tipo: myPosts.tipo[0],
                giudizio: myPosts.giudizio[0],
                materia: (myPosts.denominazione[0].length < 17) ? myPosts.denominazione[0] : getSiglaMateria(myPosts.denominazione[0], myPosts)
            }
        }        

        dispatch({type: FETCH_DATA_DASH, dati: datiDashboard})
    }
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

function getSiglaMateria(mat, myPosts) {
    for (key in myPosts.materie) {    
        if (myPosts.materie[key] == mat) {
            return myPosts.siglematerie[key]
        }
    }
}

const medieSOP = (myPosts) => {
    var medieDict = {}

    const orale = [];
    const pratico = [];
    const scritto = [];

    for (key in myPosts.denominazione) {
            
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

    medieDict = {
        scritto: media(scritto),
        orale: media(orale),
        pratico: media(pratico),
    }
    return medieDict
}