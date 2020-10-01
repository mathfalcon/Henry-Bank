import React from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ScrollView
} from "react-native";

function SignIn() {
  return (
    <ScrollView>
      <View style={style.container}>
      <View>
        <Image
          style={style.imagen}
          source={require("../image/headerRegistro.png")}
        />
        <Text style={style.titulo}>Alta de Cliente</Text>
      </View>

      <View style={style.containerForm}>
        <RNPickerSelect
          style={style.select}
          onValueChange={(value) => console.log(value)}
          placeholder={{
            label: "Elige un tipo de documento",
          }}
          items={[
            { label: "DNI", value: "DNI" },
            { label: "Pasaporte", value: "Pasaporte" },
          ]}
        />

        <TextInput placeholder="Documento" style={style.form}></TextInput>
        <TextInput placeholder="Nombre" style={style.form}></TextInput>
        <TextInput placeholder="Apellido" style={style.form}></TextInput>
        <TextInput placeholder="Fecha de nacimiento" style={style.form}></TextInput>
        <TextInput placeholder="Teléfono celular" style={style.form}></TextInput>
        <TextInput placeholder="Domicilio Calle" style={style.form}></TextInput>
        <TextInput placeholder="Número" style={style.form}></TextInput>
        <TextInput placeholder="Localidad" style={style.form}></TextInput>
        <TextInput placeholder="Provincia" style={style.form}></TextInput>
        <TextInput placeholder="Pais" style={style.form}></TextInput>
        
        <Button
          title="Registrate"
          onPress={() => Alert.alert("Probando mi botón")}
        />
      </View>

    </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    height: 1100,
    backgroundColor: "#eef0f2",
    flexDirection: "column",
    alignItems: "center",
  },
  containerForm: {
    bottom: 70
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
    bottom: 220
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

export default SignIn;
