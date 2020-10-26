import React, { useState } from "react";// 
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
// import axios from "axios";
// import { api } from "../Constants/constants";
import styles from "../../Styles/signInStyles.js";

// import { useSelector, useDispatch } from "react-redux";
// import Icon from 'react-native-vector-icons/FontAwesome5';

import {
  Text,  
  Form,
  Icon,
  Button,
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
} from "native-base";

export default ThirdPageForm = ({ route, navigation }) => {

  const [selectedImage, setSelectedImage] = useState(null);
  const personalInfo = route.params.personalInfo;
  const locationInfo = route.params.values;
  const photo = route.params.photo;


  const handleSubmit = () => {
    navigation.navigate("fourth", { personalInfo, locationInfo, selectedImage, photo });

  };


  const confirmCancel = () => {
    Alert.alert(
      "Cancel Registration",
      "Really want to cancel?",
      [
        {
          text: "Yes, I'll do it later",
          onPress: () => navigation.navigate("home"),
          style: "cancel",
        },
        { text: "No, I want to continue", onPress: () => console.log("") },
      ],
      { cancelable: false }
    );
  };

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({base64: true});

    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ picture: pickerResult});
  }

  return (
    <Container style={styles.container}>
      <SafeAreaView>
        <KeyboardAwareScrollView>
          <Header transparent style={styles.header}>
            <Left>
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon style={{ color: "black" }} name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title style={styles.headerText}>STEP 3/4</Title>
            </Body>
            <Right>
              <Button transparent onPress={confirmCancel}>
                <Text style={styles.headerText}>Cancel</Text>
              </Button>
            </Right>
          </Header>

          <Form style={[styles.form, {marginTop:-15}]}>
            <View style={styles.logoView}>
              <Image
                source={require("../../assets/henryLogoBlack.jpg")}
                style={[styles.logoImg, {marginBottom: 10}] }
              />
              <Text style={{ textAlign:'center', marginBottom:5}}>We need a front side photo of your identification and one of your face</Text>
            </View>

            {/* <Item regular style={styles.inputImage}>
              <Input
                disabled
                placeholder="Select an Image"                
                name="selectedImage"                
                value={selectedImage}                
                />
            </Item> */}
            <View style={styles.body}>
                {
                  selectedImage !== null
                  ?              
                    <View style={styles.container}> 
                      <Image                       
                        // source={{ uri: `data:image/jpeg;base64,${selectedImage.picture.base64}`}}
                        source={{ uri: selectedImage.picture.uri }}
                        style={styles.thumbnail}
                      />
                    </View>
                  :
                    null              
                }

                <Button
                  dark
                  onPress={openImagePickerAsync}        
                  block
                  style={styles.buttonEnabled}
                >
                  <Icon name='file' type="FontAwesome5" />
                  <Text>UPLOAD DOCUMENTATION</Text>
                </Button>

                {
                  photo
                  ?              
                    <View style={styles.container}> 
                      <Image
                        source={{ uri: photo.uri }}
                        style={styles.thumbnail}
                      />
                    </View>
                  :
                    null              
                }

                <Button
                  dark
                  onPress={() => navigation.navigate("takePhoto")}
                  block
                  style={styles.buttonEnabled}
                >
                  <Icon name='camera' type="FontAwesome5" />
                  <Text>TAKE A PHOTO</Text>
                </Button>
            </View>

            <Button
              disabled={
                selectedImage && photo
                  ? false
                  : true
              }

              style={
                selectedImage && photo
                  ? [styles.buttonEnabled, {marginTop: 35}]
                  : [styles.buttonDisabled, {marginTop: 35}]
              }              
              dark
              block
              onPress={handleSubmit}              
            >
              <Text>LAST STEP</Text>
            </Button>
          </Form>

        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Container>
  );
};
