import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { View, Text, Image, StyleSheet, TextInput, Alert, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function LogIn() {
  return (
    <View style={style.container}>
      <View>
        <Image
          style={style.imagen}
          source={require("../image/headerRegistro.png")}
        />
        <Text style={style.titulo}>Iniciar Sesión</Text>
      </View>
      <View style={style.containerForm}>
        <TextInput placeholder="Usuario" style={style.form}></TextInput>
        <TextInput placeholder="Contraseña" style={style.form}></TextInput>
      </View>
      <View style={style.buttons}>
        <Button
          color="black"
          style={style.logIn}
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
