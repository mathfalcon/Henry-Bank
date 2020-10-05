import React from "react";
import RNPickerSelect from "react-native-picker-select";
import {View, Text, Image, TextInput, Button, Alert} from "react-native";
import { Avatar } from "react-native-elements";
import styles from "../Styles/logInStyles.js";
import Icon from 'react-native-vector-icons/FontAwesome5';

function LogIn({ navigation }) {

  const [showPass, setShowPass] = useState(false);

  const handleShowPass = () => {
    setShowPass(!showPass);
  }

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
        <View style={styles.containerPass}>
          <TextInput          
            secureTextEntry={!showPass}
            placeholder="Contraseña"
            style={styles.form}          
          />        
          <Icon
            name={showPass ? 'eye' : 'eye-slash'}
            size={15}
            color="grey"
            style={styles.eyeIcon}
            onPress={handleShowPass}
          />
        </View>
        
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
          style={{ marginLeft: 44 }}
          color="black"
          title="Registrarse"
          onPress={() => Alert.alert("Registrarse")}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: 10,
    height: 1100,
    backgroundColor: "#eef0f2",
    flexDirection: "column",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  containerForm: {
    marginTop: -20,
  },
  form: {
    height: 45,
    width: 300,
    borderRadius: 5,
    backgroundColor: "white",
    marginBottom: 20,
    paddingLeft: 20,
    fontSize: 20,
  },
  titulo: {
    color: "white", //de momento negro. Hace falta un fondo tipo henry
    fontSize: 35,
    marginLeft: 80,
    marginTop: 30,
    bottom: 220,
  },
  select: {
    width: 100,
    backgroundColor: "red",
  },
  imagen: {
    width: 411,
    height: 250,
  },
});

export default LogIn;