import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({
  submitButtonLable,
  onCancel,
  onSubmit,
  defaultValues,
}) => {
  const [inputValue, setInputValue] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    // date: defaultValues ? getFormattedDate(defaultValues.date): '', but this can use you need to copy above statement into date.js/ and in the get... method
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValue((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValue.amount.value,
      date: new Date(inputValue.date.value),
      description: inputValue.description.value,
    };

    // Input validation
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date"; //new Date('hello').toString()   << "Invalid Date"
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //   Alert.alert("Invalid input", "Please check your input values");
      setInputValue((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputValue.amount.isValid ||
    !inputValue.date.isValid ||
    !inputValue.description.isValid;

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputValue.amount.isValid}
          textInputConfig={{
            placeholder: "59.99",
            keyboardType: "numeric",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValue.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputValue.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            keyboardType: "numeric",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValue.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputValue.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCorrect: false,
          autoCapitalize: "none",
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValue.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - Please check your entered data!{" "}
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLable}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  formContainer: { marginBottom: 10 },
  title: {
    fontSize: 23,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: -10,
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
