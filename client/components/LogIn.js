import React from "react";
import RNPickerSelect from "react-native-picker-select";
import {View, Text, Image, TextInput, Button,Alert} from "react-native";
import { Avatar } from "react-native-elements";
import styles from "../Styles/logInStyles.js";

function LogIn({ navigation }) {
  return (  
      <View style={styles.container}>
      <View>
        <Image
          style={styles.imagen}
          source={require("../image/headerRegistro.png")}
        />
        <Text style={styles.titulo}>Iniciar Sesión</Text>
      </View>
      <View style={styles.containerForm}>
        <Avatar
          size="large"
          rounded
          icon={{name: 'user', type: 'font-awesome'}}
          // onPress={() => console.log("Works!")}
          activeOpacity={0.7}          
          containerStyle={{backgroundColor:"gray", alignSelf: "center", marginBottom: 50, marginTop:-50, }}
        />   
        <TextInput placeholder="Usuario" style={styles.form}></TextInput>
        <TextInput placeholder="Contraseña" style={styles.form}></TextInput>
        
        <Text
          style={styles.forgotPass}
          onPress={() => navigation.navigate('forgotPass')}
          >Olvide mi Contraseña
        </Text>
       
       </View>
       <View style={styles.buttons}>
       <Button     
        color= "yellow"  
          title="Iniciar sesión"
          onPress={() => Alert.alert("iniciar sesion")}
        />
         <Button
         syle={{marginLeft:44}}
         color="black"         
          title="Registrarse"
          onPress={() => Alert.alert("Registrarse")}
        />
       </View>

    </View>
   
  );
}

export default LogIn;