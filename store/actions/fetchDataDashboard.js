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
            media: (!isNaN(media(voti))) ? media(voti) : "-",
            medieSOP: medieSOP(myPosts),
            nome: nome,
            classe: myPosts.classe,
            ultimo_voto: {
                voto: (myPosts.voto[0] != 99) ? myPosts.voto[0] : "-",
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
        var counterVoti = 0; //conto i numeri pari a 99 e li sottraggo a nums.length per calcolare la media senza i voti pari a 99

        for (key in nums) {
            if(nums[key] != 99){
                counterVoti++;
                s += parseFloat(nums[key]);
            }
        }
        const media = (s / counterVoti).toFixed(2); 
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

    medieDict = {
        scritto: media(scritto),
        orale: media(orale),
        pratico: media(pratico),
    }
    return medieDict
}