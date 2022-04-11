import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import firebase from "@react-native-firebase/firestore";
import database from "@react-native-firebase/database";
export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloadurl, setDownloadurl] = useState();
  const [curr, setCurr] = useState("");
  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }
  const userSignup = async () => {
    setLoading(true);
    if (!email || !password || !image || !name) {
      alert("please add all the field");
      return;
    }
    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      firestore().collection("users").doc(result.user.uid).set({
        uid: result.user.uid,
        pic: image,
        status: "online",
      });
      setLoading(false);
    } catch (err) {
      alert("something went wrong");
    }
  };
  const pickImageAndUpload = () => {
    launchImageLibrary({ quality: 0.5 }, (fileobj) => {
      //  console.log(fileobj.assets[0])

      //  let file={
      //    uri:fileobj.assets[0].uri,
      //    authid:'xyzznjhxdcxwdhbxjcxowejduifewygdh'
      //  }

      const uploadTask = storage()
        .ref()
        .child(`/uploadimages/${Date.now()}`)
        .putFile(fileobj.assets[0].uri);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(snapshot);
          if (progress == 100) alert("Image uploaded successfully");
        },
        (error) => {
          alert("error uploading image", error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setDownloadurl(downloadURL);
          });
        }
      );
    });
  };

  const videoUpload = () => {
    launchImageLibrary({ mediaType: "video" }, (fileobj) => {
      //  console.log(fileobj.assets[0].uri)
      const uploadTask = storage()
        .ref()
        .child(`/uploadVideos/${Date.now()}`)
        .putFile(fileobj.assets[0].uri);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress == 100) alert("Video uploaded successfully");
        },
        (error) => {
          alert("error uploading video", error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setDownloadurl(downloadURL);
          });
        }
      );
    });
  };

  let itemsRef = database().ref('/Users/-MzdpwOtNrjk6VcXeVlW');
  const createUser = () => {
    itemsRef.update({
      video:downloadurl
    }
    )
    // const newReference = itemsRef.push();

    // //Pass all input field as an object to .set() for creating user
    // const ids = newReference.key;
    // const userData = {
    //   video: downloadurl,
    // };
    // //Creating refernce in rnFirebase
    // newReference.set(userData).then(() => console.log("Data created."));
    // // .then(()=> navigation.navigate('HomeScreen'))
  };

  // const [curr , setCurr] = useState('');
  //   const getDate = () => {
  //     const a = firebase.firestore
  //         .Timestamp.now().toDate().toString();
  //     setCurr(a);
  // }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <View style={styles.box2}>
          {/* {<View style={styles.Button}>
              </View> } */}

          {showNext ? (
            <>
              <Button
                color="#27612d"
                mode="contained"
                onPress={() => pickImageAndUpload()}
              >
                select Images
              </Button>
            </>
          ) : (
            <Button
              color="#27612d"
              mode="contained"
              onPress={() => setShowNext(true)}
            >
              Gallery
            </Button>
          )}

          <Image
            style={{ height: "50%", width: "50%", borderWidth: 2 }}
            source={{ uri: downloadurl }}
          />
        </View>

        <Button
          color="#27612d"
          style={styles.uploadbtn}
          mode="contained"
          onPress={() => {
            createUser(),videoUpload();
          }}
        >
          Upload Video
        </Button>

        <Button
          mode="contained"
          color="#27612d"
          style={styles.uploadbtn}
          onPress={() => navigation.navigate("List")}
        >
          Video List
        </Button>

        <Button
          mode="contained"
          color="#27612d"
          style={styles.uploadbtn}
          onPress={() => navigation.navigate("Images")}
        >
          Images List
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dff7c6",
  },
  text: {
    fontSize: 22,
    color: "black",
  },
  uploadbtn: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    marginHorizontal: 30,
  },

  box2: {
    paddingHorizontal: 40,
    justifyContent: "space-evenly",
    backgroundColor: "#dff7c6",
    // backgroundColor:"black"
  },
});
