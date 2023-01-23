import {fetchJson} from './fetchJSON';
import  moment from 'moment'


export const FETCH_DATA_CHART = 'FETCH_DATA_CHART';

export const fetchDataChart = () => {
    return async dispatch => {
        const myPosts = await fetchJson();
        const loadVoti = [];

        var i = myPosts.voto.length-1;
        for (key in myPosts.voto) {
            loadVoti.push(
                {   
                    x: splitData(myPosts.date[i]),
                    y: parseFloat(myPosts.voto[i])
                }
            )
            i--;
        }

        dispatch({type: FETCH_DATA_CHART, voti: loadVoti})
    }
}

function splitData(data) {
    var data2 = moment(data, "DD-MM-YYYY").format("YYYY-MM-DD")

    var dayVoto = new Date(data2);
    console.log(dayVoto)

    return dayVoto;
}