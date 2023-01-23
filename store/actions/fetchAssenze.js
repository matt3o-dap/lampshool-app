import PostAssenza from '../../models/PostAssenza';
import {fetchJson} from './fetchJSON';


export const FETCH_POST_ASS = 'FETCH_POST_ASS';
export const FETCH_POST_RIT = 'FETCH_POST_RIT';


export const fetchPostAssenze = () => {
    return async dispatch => {

        const myPosts = await fetchJson();

        const loadedPosts = [];
        for (key in myPosts.dateass) {
            loadedPosts.push(
                new PostAssenza(
                    key,
                    myPosts.dateass[key],
                    cambiaAssenza(myPosts.giustass[key]),
                    myPosts.giustass[key],
                    "a",
                    null
                )
            )
        }

        
        for (key in myPosts.daterit) {
            loadedPosts.push(
                new PostAssenza(
                    key,
                    myPosts.daterit[key],
                    cambiaAssenza(myPosts.giustr[key]),
                    myPosts.giustr[key],
                    "r",
                    myPosts.oraent[key]
                )
            )
        }

        
        for (key in myPosts.dateusc) {
            loadedPosts.push(
                new PostAssenza(
                    key,
                    myPosts.dateusc[key],
                    null,
                    null,
                    "u",
                    myPosts.oraus[key]
                )
            )
        }
        
        

        dispatch({type: FETCH_POST_ASS, assenze: loadedPosts})
    }
}


const cambiaAssenza = (ass) => {    
    if (ass == 0) {
        return "NON GIUSTIFICATA";
    } else {
        return "GIUSTIFICATA";
    }
}