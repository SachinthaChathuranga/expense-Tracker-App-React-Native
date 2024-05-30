import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "./Button";
import { GlobalStyles } from "../../constants/styles";

const ErrorOverlays = ({message, onConfirm}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An Error Occurred!</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
};

export default ErrorOverlays;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 8,
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',

  },
 
});
