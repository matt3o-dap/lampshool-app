import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground
} from 'react-native';
import Data from '../data/fake-data';
import {SCREEN_WIDTH,SCREEN_HEIGHT} from '../strumenti/helper';


export default function Profile(props) {
  const {userId} = props.route.params;
  const userPosts = Data.filter(post => post.userId === userId);
  const postImages = userPosts.map(post => (
    <Image key={post.id} source={{uri: post.image}} style={styles.image} />
  ))  
  
  const userImage = userPosts[0].userImage; //prendo l'immagine dell'utente per il profilo
  const userName = userPosts[0].userName;   //prendo l'username 

  return (
    <View style={styles.container}> 
      <View> 
        <ImageBackground source={{uri: userImage}} blurRadius={5} style={styles.imageBackground}>
         <Image source={{uri: userImage}} style={styles.userImage} /> 
        </ImageBackground>
      </View>
      <Text style={{marginTop: 60, fontSize: 20, fontWeight:'600', alignSelf: 'center'}}>{userName}</Text>
      <View style={styles.postContainer}>
       {postImages}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  postContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 80,
  },
  image: {
    width: SCREEN_WIDTH / 3,
    height: SCREEN_WIDTH / 3,
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    position: 'absolute',
    top: 75,
  },
  imageBackground: {
    width: SCREEN_WIDTH,
    height: 100,
    alignItems: 'center',
  }
});
