import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity, Image } from "react-native";
import {   
  Text,
  Form,
  Label,
  Item,
  Input, 
  View,
} from "native-base";
// import CustomButton from "./customButton";
import { CheckBox } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { resetPass } from "../redux/actions/actions.js";
import styles from "../Styles/forgotPassStyles.js";
import MenuOperation from './MenuOperation';


export default ForgotPass = () => {

  const [check, setCheck] = useState(false);
  const { responseReset } = useSelector((state) => state.users);

  const dispatch = useDispatch();  

  const {
    values,    
    setFieldValue,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    } = useFormik({
    initialValues: {
      email: "",      
    },

    onSubmit: (values) => {
      //Send values to database
      dispatch(resetPass( values.email ));
      console.log('responseReset', responseReset);
    },

    validate: (values) => {
      const errors = {};
      if (
        !values.email.trim() ||
        !/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(values.email)
      ) errors.email = "Must be a valid email";      
      
      return errors;
    },
  });

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={styles.firstContainer}>
          <Form style={styles.container}>
            <Text style={styles.titulo}>Reset Password</Text>  
            <Image
            source={require("../assets/henryLogo.jpg")}
            style={styles.logoImg}
          />
            <Item style={styles.cBox} error={errors.email ? true : false}>
              <Icon
              name={"envelope"}
              size={15}
              color="grey"
            />
              <Input
                style={styles.form}
                name='email'
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder='Enter email'
                />
            </Item>
            <Text style={styles.errorMessage}>
                {touched.email && errors.email}
            </Text>

            <CheckBox
              center
              title="I am not a robot"
              checked={check}
              onPress={() => setCheck(!check)}
            />

            <TouchableOpacity
              disabled={!check}
              onPress={handleSubmit}
              style={check ? styles.buttonEnabled : styles.buttonDisabled}
            >
                <Text style={styles.buttonText}>RESET PASSWORD</Text>
            </TouchableOpacity>

            {/* <CustomButton style={styles.button}>
              <Text>RESET PASSWORD</Text>
            </CustomButton> */}

          </Form>
      <View style={styles.menuOp}>
        <MenuOperation />
      </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}