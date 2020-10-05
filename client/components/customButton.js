import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function CustomButton(props) {
  const {
    color,
    backgroundColor,
    borderWidth,
    borderColor,
    padding,
    margin,
    letterSpacing,
  } = props.style;
  const style = StyleSheet.create({
    container: {
      backgroundColor: backgroundColor || null,
      borderWidth: borderWidth || null,
      borderColor: borderColor || null,
      padding: padding || 10,
      margin: margin || null,
      width: "100%",
    },
    text: {
      color: color || "black",
      elevation: 15,
      fontSize: 22,
      alignSelf: "center",
      letterSpacing: letterSpacing || 1,
    },
  });

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={props.onPress} style={style.test}>
        <Text style={style.text}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CustomButton;