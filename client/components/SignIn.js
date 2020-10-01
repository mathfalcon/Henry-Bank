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
} from "react-native";

function SignIn() {
  return (
    <View style={style.container}>
      <View>
        <Text style={style.titulo}>Alta de Cliente</Text>
      </View>

      <View>

      <RNPickerSelect
          style={style.select}
          onValueChange={(value) => console.log(value)}
          placeholder={{
            label: "Elige un tipo de documento",
          }}
          items={[{ label: "DNI", value: "DNI" }, { label: "Pasaporte", value: "Pasaporte" }, ]}
        />



        <TextInput placeholder="Documento" style={style.form}></TextInput>
        <TextInput placeholder="Nombre" style={style.form}></TextInput>
        <TextInput placeholder="Apellido" style={style.form}></TextInput>
        <TextInput
          placeholder="Fecha de nacimiento"
          style={style.form}
        ></TextInput>
        <Button
          title="Registrate"
          onPress={() => Alert.alert("Probando mi botón")}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    height: 900,
    backgroundColor: "#eef0f2",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    height: 45,
    width: 300,
    borderRadius: 5,
    backgroundColor: "white",
    marginBottom: 20,
    paddingLeft: 20,
    fontSize: 20
  },
  titulo: {
    color: "black", //de momento negro. Hace falta un fondo tipo henry
    fontSize: 40,
    margin: 30,
  },
  select: {
    width: 100,
    backgroundColor:"red"
  },
});

export default SignIn;
