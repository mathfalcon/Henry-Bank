import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
// import * as FaceDetector from 'expo-face-detector';
import styles from "../Styles/takePhotoStyles.js";

export default function App({ navigation }) {

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);  
  const [type, setType] = useState(Camera.Constants.Type.front);

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
        return <Text>No fue posible acceder a la camara</Text>;
    }

    const takePhoto = async() => {
        if(cameraRef){
          let photo = await cameraRef.takePictureAsync();          
          navigation.navigate('photo',{'photo':photo});
        }
    }

    const changeCamera = () => {
        setType(
          type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        );
    }

    // const handleFacesDetected = ({ faces }) => {
    //     if(faces.length >= 0){
    //         takePhoto();
    //     }
    // };

    // const handleFacesDetected = async imageUri => {
    //     const options = { mode: FaceDetector.Constants.Mode.fast };
    //     return await FaceDetector.detectFacesAsync(imageUri, options);
    // };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={ref => { setCameraRef(ref) }}

        // onFacesDetected={handleFacesDetected}

        // faceDetectorSettings={{
        //   mode: FaceDetector.Constants.Mode.fast,
        //   detectLandmarks: FaceDetector.Constants.Landmarks.none,
        //   runClassifications: FaceDetector.Constants.Classifications.none,
        //   minDetectionInterval: 100,
        //   tracking: true,
        // }}
      >
        <View
          style={styles.camera}>

          <TouchableOpacity
            style={styles.buttonFlip}
            onPress={changeCamera}
            >
                <Text
                    style={styles.textFlip}
                > Flip
                </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={takePhoto}
          >
            <View style={styles.buttonTake} />            
          </TouchableOpacity>
        </View>
      </Camera>       
    </View>
  );
}