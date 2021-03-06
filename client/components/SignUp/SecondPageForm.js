import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { getLocation } from "../../redux/actions/actions.js";
import styles from "../../Styles/signInStyles.js";
import {
  Text,
  Label,
  Form,
  Item,
  Icon,
  Input,
  Button,
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Image, View } from "react-native";

export default SecondPageForm = ({ route, navigation }) => {
  const [initialState, setInitialState] = useState(true);
  const { responseLocation } = useSelector((state) => state.users);
  const personalInfo = route.params;

  const dispatch = useDispatch();

  const {
    values,
    isSubmitting,
    setFieldValue,
    handleSubmit,
    errors,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      country: "",
      state: "",
      locality: "",
      street: "",
      streetNumber: "",
    },

    onSubmit: async (values) => {
      //Send values to database
      navigation.navigate("third", { personalInfo, values });
      // try {
      //   dispatch(getLocation( values.country, values.state, values.locality, values.street, values.streetNumber ));
      //   let locationInfo = responseLocation.data[0].display_name.split(',');
      //   console.log(locationInfo);

      //   if ( responseLocation.status === 200 ) {
      //     Alert.alert(
      //       "Confirm Location",
      //       `Address: ${locationInfo[1]} ${locationInfo[0]}\nCity: ${locationInfo[4]}\nState: ${locationInfo[7]}\nCountry: ${locationInfo[9]}`,
      //       [
      //         {
      //           text: "Enter Again",
      //           // onPress: () => console.log("Cancel Pressed"),
      //           style: "cancel"
      //         },
      //         { text: "That's Ok", onPress: () => navigation.navigate("third", {personalInfo, locationInfo}) }
      //       ],
      //       { cancelable: false }
      //     );
      //   }
      // } catch (err){ console.log(err)}
    },
    validate: (values) => {
      setInitialState(false);
      const errors = {};
      if (!values.country) errors.country = "Must be a valid country.";
      if (!values.state) errors.state = "Must be a valid state.";
      if (!values.locality) errors.locality = "Must be a valid locality.";
      if (!values.street) errors.street = "Must be a valid street.";
      if (!values.streetNumber)
        errors.streetNumber = "Must be a valid street number.";
      return errors;
    },
  });

  const confirmCancel = () => {
    Alert.alert(
      "Cancel Registration",
      "Really want to cancel?",
      [
        {
          text: "Yes, I'll do it later",
          onPress: () => navigation.navigate("home"),
          style: "cancel",
        },
        { text: "No, I want to continue", onPress: () => console.log("") },
      ],
      { cancelable: false }
    );
  };

  return (
    <Container style={styles.container}>
      <SafeAreaView>
        <KeyboardAwareScrollView>
          <Header transparent style={styles.header}>
            <Left>
              <Button transparent onPress={() => navigation.goBack()}>
                <Icon style={{ color: "black" }} name="arrow-back" />
              </Button>
            </Left>
            <Body>              
              <Title style={styles.headerTitle}>STEP 2/4</Title>
            </Body>
            <Right>
              <Button transparent onPress={confirmCancel}>
                <Text style={styles.headerText}>Cancel</Text>
              </Button>
            </Right>
          </Header>

          <Form style={styles.form}>
            <View style={styles.logoView}>
              <Image
                source={require("../../assets/henryLogoBlack.jpg")}
                style={styles.logoImg}
              />
              <Text style={styles.logoViewText}>Location Information</Text>
            </View>
            <Item
              style={styles.formItem}
              floatingLabel
              error={touched.country && errors.country ? true : false}
            >
              <Label>Country</Label>
              <Input
                // placeholder="Country"
                onBlur={handleBlur("country")}
                name="country"
                onChangeText={(text) => setFieldValue("country", text)}
                value={values.country}
                style={{ textTransform: "capitalize" }}
              />

              {touched.country && !errors.country ? (
                <Icon style={{ color: "green" }} name="checkmark-circle" />
              ) : touched.country && errors.country ? (
                <Icon style={{ color: "red" }} name="close-circle" />
              ) : null}
            </Item>
            <Text
              style={{
                marginBottom: -20,
                alignSelf: "center",
                color: "#e06d6d",
              }}
            >
              {touched.country && errors.country}
            </Text>

            <Item
              style={styles.formItem}
              floatingLabel
              error={touched.state && errors.state ? true : false}
            >
              <Label>State</Label>
              <Input
                // placeholder="State"
                onBlur={handleBlur("state")}
                name="state"
                onChangeText={(text) => setFieldValue("state", text)}
                value={values.state}
                style={{ textTransform: "capitalize" }}
              />

              {touched.state && !errors.state ? (
                <Icon style={{ color: "green" }} name="checkmark-circle" />
              ) : touched.state && errors.state ? (
                <Icon style={{ color: "red" }} name="close-circle" />
              ) : null}
            </Item>
            <Text
              style={{
                marginBottom: -20,
                alignSelf: "center",
                color: "#e06d6d",
              }}
            >
              {touched.state && errors.state}
            </Text>

            <Item
              style={styles.formItem}
              floatingLabel
              error={touched.locality && errors.locality ? true : false}
            >
              <Label>Locality</Label>
              <Input
                // placeholder="Locality"
                onBlur={handleBlur("locality")}
                name="locality"
                onChangeText={(text) => setFieldValue("locality", text)}
                value={values.locality}
                style={{ textTransform: "capitalize" }}
              />

              {touched.locality && !errors.locality ? (
                <Icon style={{ color: "green" }} name="checkmark-circle" />
              ) : touched.locality && errors.locality ? (
                <Icon style={{ color: "red" }} name="close-circle" />
              ) : null}
            </Item>
            <Text
              style={{
                marginBottom: -20,
                alignSelf: "center",
                color: "#e06d6d",
              }}
            >
              {touched.locality && errors.locality}
            </Text>

            <Item
              style={styles.formItem}
              floatingLabel
              error={touched.street && errors.street ? true : false}
            >
              <Label>Street</Label>
              <Input
                // placeholder="Street"
                onBlur={handleBlur("street")}
                name="street"
                onChangeText={(text) => setFieldValue("street", text)}
                value={values.street}
                style={{ textTransform: "capitalize" }}
              />

              {touched.street && !errors.street ? (
                <Icon style={{ color: "green" }} name="checkmark-circle" />
              ) : touched.street && errors.street ? (
                <Icon style={{ color: "red" }} name="close-circle" />
              ) : null}
            </Item>
            <Text
              style={{
                marginBottom: -20,
                alignSelf: "center",
                color: "#e06d6d",
              }}
            >
              {touched.street && errors.street}
            </Text>

            <Item
              style={styles.formItem}
              floatingLabel
              error={touched.streetNumber && errors.streetNumber ? true : false}
            >
              <Label>Street Number</Label>
              <Input
                // placeholder="Street Number"
                onBlur={handleBlur("streetNumber")}
                name="streetNumber"
                onChangeText={(text) => setFieldValue("streetNumber", text)}
                value={values.streetNumber}
                keyboardType="numeric"
              />

              {touched.streetNumber && !errors.streetNumber ? (
                <Icon style={{ color: "green" }} name="checkmark-circle" />
              ) : touched.streetNumber && errors.streetNumber ? (
                <Icon style={{ color: "red" }} name="close-circle" />
              ) : null}
            </Item>
            <Text
              style={{ marginBottom: 0, alignSelf: "center", color: "#e06d6d" }}
            >
              {touched.streetNumber && errors.streetNumber}
            </Text>

            <Button
              dark
              onPress={handleSubmit}
              disabled={
                initialState || !Object.values(errors).length === 0
                  ? true
                  : false
              }
              block
              style={
                initialState
                  ? styles.buttonDisabled
                  : Object.values(errors).length === 0
                  ? styles.buttonEnabled
                  : styles.buttonDisabled
              }
            >
              <Text>CONTINUAR</Text>
            </Button>
          </Form>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Container>
  );
};
