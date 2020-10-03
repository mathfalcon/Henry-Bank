import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import {View, Text, Image, TextInput, Button, Alert, TouchableOpacity} from "react-native";
import styles from "../Styles/forgotPassStyles.js";

function ForgotPass() {

  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const handleChange = value => {    
    setEmail(value);
  }
    
  const handleSubmit = () => {  

  const regex_email = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if ( !email.trim() || !regex_email.test(email) ) return setError(true)

    setError(false);

    if ( !error ){      
      Alert.alert("Se le envio la nueva contraseña a su correo");
      setEmail('');
    }    
  }

  return (  
      <View style={styles.container}>
      <View>
        <Image
          style={styles.imagen}
          source={require("../image/headerRegistro.png")}
        />
        <Text style={styles.titulo}>Resetear Contraseña</Text>
      </View>
      <View style={styles.containerForm}>
        <TextInput
        name='email'
        value={email}
        onChangeText={handleChange}
        placeholder="Ingrese su Email"
        style={styles.form}
        >
        </TextInput>
        { error && <Text style={styles.error}>Ingrese un email valido</Text> }
       </View>
       <TouchableOpacity
        onPress={handleSubmit}
        style={styles.button}
        >
        <Text style={styles.buttonText}>Resetear Contraseña</Text>
       </TouchableOpacity>
    </View>   
  );
}

export default ForgotPass;