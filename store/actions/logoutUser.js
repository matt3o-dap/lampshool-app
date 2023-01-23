import AsyncStorage from '@react-native-async-storage/async-storage';


export const logout = async () => {
    console.log("---------------------------------------------------------------")
    test();
    AsyncStorage.clear();
    console.log("---------------------------------------------------------------")
    test();
}

function test() {

    AsyncStorage.getAllKeys((err, keys) => {
        console.log(keys)
      AsyncStorage.multiGet(keys, (error, stores) => {
        console.log(stores)

        stores.map((result, i, store) => {
          console.log('AsyncStorageItem -----------> ',{ [store[i][0]]: store[i][1] });
          return true;
        });
      });
    });
  }