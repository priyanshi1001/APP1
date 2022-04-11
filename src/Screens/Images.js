//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text,Image,FlatList, StyleSheet } from 'react-native';
import firebase from "@react-native-firebase/app";

// create a component
const Images = () => {

    const [imageTab, setImageTab] = useState([]);

    useEffect(() => {
        firebase
          .storage()
          .ref("uploadimages/")
          .listAll()
          .then(function (result) {
            result.items.forEach(function (imageRef) {
              imageRef
                .getDownloadURL()
                .then(function (url) {
                  imageTab.push(url);
                  setImageTab(imageTab);
                  console.log("imageurl", JSON.stringify(imageTab));
                })
                .catch(function (error) {
                  // Handle any errors
                });
            });
          })
          .catch((e) => console.log("Errors while downloading => ", e));
      }, []);



















    return (
        <View style={styles.container}>
            

            <FlatList
          data={imageTab}
          //keyExtractor={(item,index) => index.toString()}
          keyExtractor={(item, index) => String(index)}
        // listKey={(item, index) => 'D' + index.toString()}
          listKey={(item) => item.tracking_code.toString()}
          renderItem={(item, index) => {
            console.log("newimagedata", item.item);
            return (
              // <Video source={{ uri: item }} style={styles.backgroundVideo} />
              <View
                style={{
                  height: 150,
                  width: 300,
                  backgroundColor: "grey",
                  margin: 20,
                }}
              >
                {/* <Text>{item.item}</Text> */}
                {/* <Video
                  source={{ uri: item.item }}
                  style={styles.backgroundVideo}
                /> */}



                <Image
                source={{uri: item.item}}
                style={{ width: 300, height: 150 }} 
                />
              </View>
            );
          }}
        />






        </View>
    );
};













// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
       
       // backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Images;
