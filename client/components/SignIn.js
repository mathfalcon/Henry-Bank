import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  View,
  Text,
  Image, 
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import styles from "../Styles/signInStyles.js";

//NOTA: imagino que debo agregar un campo para el email(email-address)

function SignIn({ navigation }) {
  // --STATES-- \\
  const [dniOrPassport, setDniOrPassport] = useState(""); //Aun no logro que acepte la validación en este punto
  const [document, setDocument] = useState([]);
  const [firstName, setfirstName] = useState([]);
  const [lastName, setLastName] = useState([]);

  const [birthday, setBirthday] = useState([]);

  const [numberPhone, setNumberPhone] = useState([]);
  const [address, setAddress] = useState([]);
  const [number, setNumber] = useState([]);
  const [location, setLocation] = useState([]);
  const [province, setProvince] = useState([]);
  const [country, setCountry] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
      dniOrPassport.trim() || //Aun no logro que acepte la validación en este punto
      document.length < 1 ||
      firstName.length < 1 ||
      lastName.length < 1 ||
      birthday.length < 1 ||
      numberPhone.length < 1 ||
      address.length < 1 ||
      number.length < 1 ||
      location.length < 1 ||
      province.length < 1 ||
      country.length < 1
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
      <View style={styles.container}>
        <View>
          <Image
            style={styles.imagen}
            source={require("../image/headerRegistro.png")}
          />
          <Text style={styles.titulo}>Alta de Cliente</Text>
        </View>

        <View style={styles.containerForm}>
        <Button title="Toma una foto" onPress={() => navigation.navigate('takePhoto')} />
          <RNPickerSelect
            onValueChange={(value) => setDniOrPassport(value)}
            items={[
              { label: "DNI", value: "DNI" },
              { label: "Pasaporte", value: "Pasaporte" },
            ]}
          />
          <TextInput
            onChangeText={(text) => setDocument(text)}
            placeholderTextColor="#aeaeae"
            placeholder="Documento"
            style={styles.form}
            keyboardType="numeric"
          ></TextInput>

          <TextInput
            onChangeText={(text) => setfirstName(text)}
            placeholder="Nombre"
            style={styles.form}
          ></TextInput>

          <Text style={styles.label}>Fecha Nacimiento</Text>
          <Text>{birthday}</Text>
          <View style={styles.buttonDate}>
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
            onChangeText={(text) => setNumberPhone(text)}
            placeholder="Teléfono celular"
            style={styles.form}
            keyboardType="numeric"
          ></TextInput>

          <TextInput
            onChangeText={(text) => setAddress(text)}
            placeholder="Domicilio Calle"
            style={styles.form}
          ></TextInput>

          <TextInput
            onChangeText={(text) => setNumber(text)}
            placeholder="Número"
            style={styles.form}
            keyboardType="numeric"
          ></TextInput>

          <TextInput
            onChangeText={(text) => setLocation(text)}
            placeholder="Localidad"
            style={styles.form}
          ></TextInput>

          <TextInput
            onChangeText={(text) => setProvince(text)}
            placeholder="Provincia"
            style={styles.form}
          ></TextInput>

          <TextInput
            onChangeText={(text) => setCountry(text)}
            placeholder="Pais"
            style={styles.form}
          ></TextInput>

          <Button title="Registrate" onPress={() => submitInfo()} />
        </View>
      </View>
    </ScrollView>
  );
}

export default SignIn;
