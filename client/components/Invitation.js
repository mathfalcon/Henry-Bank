import {
  View,
  Text,
  Input,
  Item,
  Label,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
} from "native-base";
import { useSelector} from "react-redux";
import { Alert, Image } from "react-native";
import React, { useState, useEffect } from "react";
import CountryPicker, { DARK_THEME } from "react-native-country-picker-modal";
import axios from 'axios';
import {api, ip} from './Constants/constants'

export default Invitation = ({ navigation }) => {
  const [country, setCountry] = useState({
    callingCode: ["54"],
    cca2: "AR",
    currency: ["ARS"],
    flag: "flag-ar",
    name: "Argentina",
    region: "Americas",
    subregion: "South America",
  });
  
  const [number, setNumber] = useState("");
  const [error, setError] = useState(undefined);
  const userLogged = useSelector((state) => state.auth.user);
  const handleSubmit = () => {
    axios.post(`${api}/contacts/whatsapp/invitation`,{
      userName: `${userLogged.name} ${userLogged.surname}`,
      phone: `${country.callingCode[0]}${number}`,
      api: ip
    })
    .then(response => Alert.alert('Success', response.data.message))
    .catch(err => Alert.alert('Failure', 'Something went wrong, please try again later.'))
  };
  const checkErrors = (text) => {
    if (text.length < 8)
      setError(
        "Must be a valid phone number, select a country code pressing above"
      );
    else setError(undefined);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#151515",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ width: "80%" }}>
        <Image
          source={require("../assets/henryLogo.jpg")}
          style={{
            height: 60,
            width: 60,
            alignSelf: "center",
            borderRadius: 10,
          }}
        />
        <Text
          style={{
            color: "whitesmoke",
            opacity: 0.8,
            textAlign: "center",
            margin: 15,
          }}
        >
          Introduce your contact's phone number to proceed.
        </Text>
        <View style={{ flexDirection: "column", marginVertical: 10 }}>
          <CountryPicker
            countryCode={country.cca2 || "AR"}
            withFilter
            withFlag
            withCountryNameButton
            withCallingCodeButton
            withAlphaFilter
            withCallingCode
            withEmoji
            onSelect={(country) => setCountry(country)}
            theme={DARK_THEME}
          />
          <Item
            floatingLabel
            style={{ marginTop: 5 }}
            error={error ? true : false}
          >
            <Label style={{ color: "white", opacity: 0.5 }}>Phone number</Label>
            <Input
              name="email"
              keyboardType="phone-pad"
              value={number}
              onChangeText={(text) => {
                setNumber(text);
                checkErrors(text);
              }}
              style={{ color: "white", opacity: 0.7 }}
            />
          </Item>
          <Text
            style={{
              paddingVertical: 5,
              alignSelf: "center",
              color: "#e06d6d",
            }}
          >
            {error}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button
            transparent
            style={{
              justifyContent: "center",
              flexDirection: "row",
              alignSelf: "flex-end",
            }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: "whitesmoke" }}>CANCEL</Text>
          </Button>
          <Button
            transparent
            style={{
              justifyContent: "center",
              flexDirection: "row",
              alignSelf: "flex-end",
            }}
            onPress={() => handleSubmit()}
          >
            <Text style={{ color: "#ffff8b" }}>PROCEED</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};
