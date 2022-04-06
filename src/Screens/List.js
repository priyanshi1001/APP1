//import liraries
import React, {useEffect,useState} from 'react';
import { View,Text,Image, StyleSheet,ScrollView } from 'react-native';
import storage from '@react-native-firebase/storage'
import firebase from '@react-native-firebase/app';

// create a component
const List = () => {

  const [itemsArray, setItemsArray] = React.useState([]);
  React.useEffect(() => {
    itemsRef.on('value', snapshot => {
      let data = snapshot.val();
      const items = Object.values(data);
      setItemsArray(items);
    });
  }, []);



  const imageDisplay = async ()=>{
          if(itemsArray.reference){
            itemsArray.map(item=>{
              AsyncStorage.setItem("image", JSON.stringify(item));
            })
          }
  }






    function listFilesAndDirectories(reference, pageToken) {
      return reference.list({ pageToken }).then(result => {
        // Loop over each item
        result.items.forEach(ref => {
          console.log(ref.fullPath);
        });
    
        if (result.nextPageToken) {
          return listFilesAndDirectories(reference, result.nextPageToken);
        }
    
        return Promise.resolve();
      });
    }
    
    const reference = storage().ref('uploadimages');
    
    listFilesAndDirectories(reference).then(() => {
      console.log('Finished listing');
    });






    


    return (

<ScrollView>
<View>
  
</View>
</ScrollView>
        
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        //backgroundColor: '#2c3e50',
    },
    heading:{
        fontSize:15,
      marginTop:10,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#dcdfe3'
    }
});

//make this component available to the app
export default List;
