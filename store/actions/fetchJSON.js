import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import md5 from 'md5';
import {useDispatch} from 'react-redux';


export const fetchJson = async () => {

    const accountLogged = await loggedUser();
  
    const url = accountLogged.link+'/lsapp/jsonlogin.php?suffisso='+accountLogged.suffisso+'&utente='+accountLogged.username+'&password='+accountLogged.password;

    
    const data = await axios.get(url);
    const myPosts = data.data;

    return myPosts

  /*await axios.get(url).then(response => {
    if(response.status >= 200 && response.status < 300) {
      console.log(JSON.stringify(response.data.classe))
      return JSON.stringify(response.data);
    } else {
      alert("Error");
    }
  })
  .catch(err => {
    console.warn(err)
  });*/

}

const  loggedUser = async () => {
  var keys = await AsyncStorage.getAllKeys();
  var result = await AsyncStorage.multiGet(keys);

  for (let i = 0; i < result.length; i++) {
      if(result[i][0]) {
        let user = JSON.parse(result[i][1])
        if (user.isLogin) {
          return user
        }
      }
  }
}

export function test() {
  console.log(AsyncStorage.getAllKeys().then((value) => console.log(value)))
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (error, stores) => {
      stores.map((result, i, store) => {
        console.log('AsyncStorageItem -----------> ',{ [store[i][0]]: store[i][1] });
        return true;
      });
    });
  });
}