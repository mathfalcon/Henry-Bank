import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Overlay, Image } from 'react-native-elements';
import styles from "../../Styles/takePhotoStyles.js";
// import * as FaceDetector from 'expo-face-detector';

export default function TakePhoto({ navigation }) {

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);  
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [visible, setVisible] = useState(false);
  const [photo, setPhoto] = useState(null);

useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>Permission to access camera roll is required!</Text>;
    }

    const takePhoto = async() => {
        if(cameraRef){
          let photo = await cameraRef.takePictureAsync({base64: true});          
          // navigation.navigate('photo',{'photo':photo});
          setPhoto(photo);
          setVisible(!visible);
        }
    }

    const changeCamera = () => {
        setType(
          type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        );
    }

    //  const handleFacesDetected = ({ faces }) => {
    //       if(faces.length >= 0){
    //           takePhoto();
    //       }
    //   };

    // const handleFacesDetected = async imageUri => {
    //     const options = { mode: FaceDetector.Constants.Mode.fast };
    //     return await FaceDetector.detectFacesAsync(imageUri, options);
    // };

  return (
    <View style={styles.mainView}>

      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={ref => { setCameraRef(ref) }}

        // onFacesDetected={handleFacesDetected}
        // faceDetectorSettings={{
        //   mode: FaceDetector.Constants.Mode.accurate,
        //   detectLandmarks: FaceDetector.Constants.Landmarks.none,
        //   runClassifications: FaceDetector.Constants.Classifications.none,
        //   minDetectionInterval: 300,
        //   tracking: true,
        // }}        
      >

        <View style={styles.camera}>

          <TouchableOpacity
            style={styles.buttonFlip}
            onPress={changeCamera}
            >
                <Text
                    style={styles.textFlip}
                > Flip Camera
                </Text>
          </TouchableOpacity>

            <View style={[styles.outerButtonTake,{alignSelf: 'center'}]}>
              <TouchableOpacity onPress={takePhoto}>
                <View style={[styles.middleButtonTake,{alignSelf: 'center'}]}>
                  <View style={[styles.innerButtonTake,{alignSelf: 'center'}]} />                  
                </View>
              </TouchableOpacity>
            </View>
        </View>
      </Camera>
      
      <Overlay
        isVisible={visible}               
        onBackdropPress={() => setVisible(!visible)}  
        overlayStyle={styles.overlay}         
      >     
        <>   
          { photo &&
            <Image
              source={{ uri: photo.uri }}
              style={styles.image}             
            />
          } 
          <View style={styles.buttons}>
              <TouchableOpacity        
                  style={styles.buttonOtra}
                  onPress={() => setVisible(!visible)}
              >
                  <Text
                      style={styles.textOtra}
                  > Try Again
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={styles.buttonCargar}        
                  onPress={() => navigation.navigate('third',{ photo })}
              >
                  <Text
                      style={styles.textCargar}
                  > That's Right
                  </Text>
              </TouchableOpacity>
          </View>
        </>
      </Overlay>      
    </View>
  );
}