import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import {View, Text, Image, TextInput, Button, Alert, TouchableOpacity} from "react-native";
import { CheckBox } from 'react-native-elements'
import styles from "../Styles/forgotPassStyles.js";

function ForgotPass() {

  const [email, setEmail] = useState('');
  const [check, setCheck] = useState(false);
  const [error, setError] = useState(false);

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
        onChangeText={ value => setEmail( value )}
        placeholder="Ingrese su Email"
        style={styles.form}
        >
        </TextInput>
        { error && <Text style={styles.error}>Ingrese un email valido</Text> }

        <CheckBox          
          center
          title='No soy un robot'          
          checked={check}
          onPress={() => setCheck(!check)}          
        />

       </View>
       <TouchableOpacity
        disabled={!check}        
        onPress={handleSubmit}
        style={check ? styles.buttonEnabled : styles.buttonDisabled}        
        >
        <Text style={styles.buttonText}>Resetear Contraseña</Text>
       </TouchableOpacity>
    </View>   
  );
}

export default ForgotPass;