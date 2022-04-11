//import liraries
import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Image, StyleSheet } from "react-native";
import firebase from "@react-native-firebase/app";
// import Video from "react-native-video";
import VideoPlayer from "react-native-video-controls";
import { Button } from "react-native-elements";
import Modal from "react-native-modal";
//import firebase  from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage'

// create a component
const List = () => {
  // const [imageTab, setImageTab] = useState([]);





  const [videoTab, setvideoTab] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  // useEffect(() => {



    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };



  useEffect(() => {
    firebase
      .storage()
      .ref("uploadVideos/")
      .listAll()
      .then(function (result) {
        result.items.forEach(function (videoRef) {
          videoRef
            .getDownloadURL()
            .then(function (url) {
              videoTab.push(url);
              setvideoTab(videoTab);
              console.log("videourl", JSON.stringify(videoTab));
            })
            .catch(function (error) {
              // Handle any errors
            });
        });
      })
      .catch((e) => console.log("Errors while downloading => ", e));
  }, []);

  //   const items =()=>{
  //     {imageTab.map(i => (<Image style={{height: 100, width: 100}} source={{uri: i}} />))}
  //   }

  return (
  

    <View style={styles.container}>


      <FlatList
        data={videoTab}
        listKey={(item, index) => "D" + index.toString()}
        // keyExtractor={(item) => item}
        keyExtractor={(item, index) => String(index)}
        renderItem={(item, index) => {
          console.log("newdata", item.item);
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
              <VideoPlayer
              paused={true}
                
                //controls={true}
                source={{ uri: item.item }}
                style={styles.backgroundVideo}
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
    // justifyContent: 'center',
    // alignItems: 'center',
    //backgroundColor: '#2c3e50',
  },
  heading: {
    fontSize: 15,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dcdfe3",
  },
  imagebtn: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 30,
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height:150,
    width:300
  },
});

//make this component available to the app
export default List;
