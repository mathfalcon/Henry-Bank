import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";

function SignIn() {
  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */
  const [input, setInput] = useState({
    dniOrPassport: "",
    document: "",
    firstName: "",
    lastName: "",
    number: "",
    address: "",
    numberAddress: "",
    location: "",
    province: "",
    country: "",
  });
  const [birthday, setBirthday] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                               Handler Function                             */
  /* -------------------------------------------------------------------------- */

  const handleChange = (name, value) => {
    setInput({
      ...input,
      [name]: value,
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                             DateTimePickerModal                            */
  /* -------------------------------------------------------------------------- */

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handlerConfirm = (date) => {
    const options = { year: "numeric", month: "long", day: "2-digit" };
    setBirthday(date.toLocaleDateString("es-ES", options));
    hideDatePicker();
  };

  //SUBMIT
  const submitInfo = () => {
    //Validacion...
    if (
      //Aun no logro que acepte la validación en este punto
      input.document.length < 1 ||
      input.firstName.length < 1 ||
      input.lastName.length < 1 ||
      birthday.length < 1 ||
      input.number.length < 1 ||
      input.address.length < 1 ||
      input.numberAddress.length < 1 ||
      input.location.length < 1 ||
      input.province.length < 1 ||
      input.country.length < 1
    ) {
      errorAlert();
      return;
    }
  };

  //Funcion alerta de error
  const errorAlert = () => {
    Alert.alert("Error", "Hay campos que no se han llenado", [
      {
        text: "OK",
      },
    ]);
  };

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

        <View style={style.container}>
          <View style={style.containerForm}>
            <RNPickerSelect
              onValueChange={(value) => handleChange("dniOrPassport", value)}
              items={[
                { label: "DNI", value: "DNI" },
                { label: "Pasaporte", value: "Pasaporte" },
              ]}
            />

            <TextInput
              onChangeText={(text) => handleChange("document", text)}
              placeholderTextColor="#aeaeae"
              placeholder="Documento"
              style={style.form}
              keyboardType="numeric"
            ></TextInput>

            <TextInput
              onChangeText={(text) => handleChange("firstName", text)}
              placeholder="Nombre"
              style={style.form}
            ></TextInput>

            <TextInput
              onChangeText={(text) => handleChange("lastName", text)}
              placeholder="Apellido"
              style={style.form}
            ></TextInput>

            <Text style={style.label}>Fecha Nacimiento</Text>
            <Text>{birthday}</Text>
            <View style={style.buttonDate}>
              <Button title="Elige tu fecha" onPress={showDatePicker} />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handlerConfirm}
                onCancel={hideDatePicker}
                // IOS
                headerTextIOS="Fecha de nacimiento"
                cancelTextIOS="Cancelar"
                confirmTextIOS="Confirmar"
              />
            </View>

            <TextInput
              onChangeText={(text) => handleChange("number", text)}
              placeholder="Teléfono celular"
              style={style.form}
              keyboardType="numeric"
            ></TextInput>

            <TextInput
              onChangeText={(text) => handleChange("adddress", text)}
              placeholder="Domicilio Calle"
              style={style.form}
            ></TextInput>

            <TextInput
              onChangeText={(text) => handleChange("numberAddress", text)}
              placeholder="Número"
              style={style.form}
              keyboardType="numeric"
            ></TextInput>

            <TextInput
              onChangeText={(text) => handleChange("location", text)}
              placeholder="Localidad"
              style={style.form}
            ></TextInput>

            <TextInput
              onChangeText={(text) => handleChange("province", text)}
              placeholder="Provincia"
              style={style.form}
            ></TextInput>

            <TextInput
              onChangeText={(text) => handleChange("country", text)}
              placeholder="Pais"
              style={style.form}
            ></TextInput>

            <Button title="Registrate" onPress={() => submitInfo()} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef0f2",
    flexDirection: "column",
    alignItems: "center",
  },
  containerForm: {
    bottom: 70,
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
  imagen: {
    width: 411,
    height: 250,
  },
  label: {
    color: "#9EA0A4",
    fontSize: 20,
  },
  buttonDate: {
    width: 300,
    marginBottom: 20,
    color: "white",
  },
});

export default SignIn;
