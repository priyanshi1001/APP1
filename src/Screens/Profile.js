

// import React, {useEffect,useRef, useContext, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ImageBackground,
//   TextInput,
//   StyleSheet,
//   Alert,
//   Button,
//   Image,

// } from 'react-native';
// import  AsyncStorage  from '@react-native-async-storage/async-storage';
// import { SafeAreaView } from 'react-native-safe-area-context';



// const Profile =({navigation}) =>{



//  const ref= useRef()
//  const [data,setData]=useState();

//    useEffect(()=>{
//      const getData=async ()=>{
//       try{  
//         let user = await AsyncStorage.getItem('dataValue');  
//         setData(JSON.parse(user));  
//       }  
//       catch(error){  
//         alert(error)  
//       }  
//      }

//      getData()
//    }, [])


// if(data){
//   console.log('Values',data[0])
//   return(
// <View style={styles.container}>

//   <View>
//   <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>

//   </View>


//   <Text style={styles.text}>Email: {data.email}</Text>
//   <Text style={styles.text1}>User Id: {data.uid}</Text>


//   <Text style={styles.text2}>Name:NULL {data.displayName}</Text>
//   <Text style={styles.text3}>Contact Number:NULL {data.phoneNumber}</Text>



//               {/* <Text onPress={()=>navigation.navigate('Anuur')} style={styles.buttonContainer}> */}

//               {/* </Text> */}

//               <TouchableOpacity style={styles.buttonContainer}>
//                 <Text style={styles.update}  onPress={()=>navigation.navigate('EditProfile')}>Update Profile</Text>

//                 {/*  */}
//               </TouchableOpacity>

// </View>




//   )
// }
// else{
//   return null;
// }
// }

//  export default Profile;


//  const styles=StyleSheet.create({
//    container:{
//      //justifyContent:'center',
//      alignItems:'center',
//      backgroundColor:"#dff7c6",

//    },
//    text:{
//      fontWeight:'bold',
//      textAlign:'left',
//      padding:40,
//      marginTop:150,
//      fontSize:15,
//      fontWeight:'900',
//      paddingLeft:10


//    },

//    text1:{
//     fontWeight:'bold',
//     textAlign:'center',
//     fontSize:15,
//     fontWeight:'900',
//    },
//    text2:{
//     fontWeight:'bold',
//     //textAlign:'left',
//     fontSize:15,
//     borderRadius:2,
//     fontWeight:'900',
//     marginTop:30,
//     paddingRight:230


//    },
//    update:{
//      color:"#ffff"
//    },
//    text3:{
//     fontWeight:'bold',
//     textAlign:'left',
//     fontSize:15,
//     fontWeight:'900',
//     marginBottom:10,
//     marginTop:30,
//     paddingRight:160

//    },
//    buttonContainer: {
//     marginTop:180,
//     height:45,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom:20,
//     width:140,


//     borderRadius:30,
//     backgroundColor:"#27612d",

//   },
//    avatar: {
//     width: 130,
//     height: 130,
//     borderRadius: 63,
//     borderWidth: 2,
//     borderColor: "black",
//     marginBottom:50,
//     paddingHorizontal:40,
//     alignSelf:'center',
//     position: 'absolute',
//     marginTop:30,
//     //paddingBottom:30
//   },
//  })



import { firebase } from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Button, style, TouchableOpacity, ImageBackground } from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';
import database from "@react-native-firebase/database";

export default function App({ navigation, props }) {

  const [itemArray, setItemArray] = useState([])
  const [userData, setUserData] = useState();

  const LogOut = () => {

    firebase.auth().signOut()
    console.log('User signed out!');
    navigation.replace('LoginScreen');

  }

  //  const readUserData = async () => {
  //      firebase.database()
  //     .ref('/Users/' + firebase.auth().currentUsers.uid)
  //     .once('value', snapshot => {
  //     setItemArray( console.log(snapshot.val()) )

  //     // .once('value')
  //     // .then(snapshot => {
  //     //   console.log(snapshot.val()) 
  //     });
  //   }

  useEffect(() => {
    const getData = async () => {
      let data = await AsyncStorage.getItem('userData')
      let val = JSON.parse(data)
      setUserData(val)

    }

    getData()


  }, [])

  console.log('data', userData)



  //  const readUserData = async () => {
  //   database().ref('/Users/')
  //   .on('value', snapshot => {
  //    setItemArray(Object.values(snapshot.val()))

  //  });
  if (userData) {
    return (
      <>

        <View style={styles.container} >
          <View >
             <Image style={styles.avatar} 
            
            source={{ uri:userData.image }} />


            <Text style={styles.text}>User Id:{userData.id}</Text>
            <Text style={styles.text}>Name:{userData.name}</Text>
            <Text style={styles.text}>Email Id:{userData.email}</Text>
            <Text style={styles.text}>Phone: {userData.phone}</Text>
            {/* <Image style={styles.avatar}>{userData.image}</Image> */}
            
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.update} onPress={() => navigation.navigate('EditProfile')}>Update Profile</Text>

          
          </TouchableOpacity>

          </View>
          {/* <ImageBackground style={styles.avatar}>{userData.image}</ImageBackground> */}


        </View>

      </>


    );
  }
  else {
    return null;
  }



}


const styles = StyleSheet.create({
  container: {
     flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#dff7c6",

  },
  text: {
    fontWeight: 'bold',
    textAlign: 'left',
    padding: 10,
    marginTop: 15,
    fontSize: 15,
    fontWeight: '700',
    paddingLeft: 7,
    color: "black"


  },

  
  update: {
    color: "#ffff"
  },
  text3: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 20,
    paddingLeft: 8,
    color: "black"

    // paddingRight: 150

  },
  buttonContainer: {
    // marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 10,
    width: 140,
    marginLeft: 60,
    marginTop:50,
   
    // paddingLeft:30,


    borderRadius: 30,
    backgroundColor:"#27612d",

  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 10,
    paddingHorizontal: 40,
    alignSelf: 'center',
    // position: 'absolute',
    marginTop: 10,
    //paddingBottom:30
  },
})

