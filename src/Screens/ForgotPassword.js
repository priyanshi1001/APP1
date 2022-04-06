//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { Input, Icon } from 'react-native-elements';
;
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';




let itemsRef = database().ref('/Users');

const ForgotPass = () => {

  const [password, setPassword] = useState()
  const [userData, setUserData] = useState();
  const [confirm, setConfirm] = useState()



  let addItem = () => {
    database().ref('Users/' + userData.id).update({
      password: password
    });
  };

  useEffect(() => {
    const getData = async () => {
      let data = await AsyncStorage.getItem('userData')
      let val = JSON.parse(data)
      setUserData(val)

    }

    getData()


  }, [])






  return (
    <View style={styles.container}>


      <Input
        placeholder='Enter New Password'
        secureTextEntry={true}
        onChangeText={setPassword}

      />
      <Input
        placeholder='Confirm New Password'
        secureTextEntry={true}

        onChangeText={setConfirm}
      />

      <Button
        title="Submit"
        loading={false}

        onPress={() => {
          password === confirm ?
            // ForgotPass()
            addItem() : alert("Password Doesn't match");



        }
        }
        loadingProps={{ size: 'small', color: 'white' }}
        buttonStyle={{
          backgroundColor: "#27612d",
          borderRadius: 5,
        }} />


      {/* alert('You have Successfully Updated your Password') */}


    </View>
  );
}


// define your styles
const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    backgroundColor: "#dff7c6",
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
  inputStyle: {

    borderWidth: 1,
    borderRadius: 30,
    paddingLeft: 15,
    paddingRight: 15,

  },

});

//make this component available to the app
export default ForgotPass;














