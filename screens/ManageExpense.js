import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";
import { useExpenses } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpenses/ExpenseForm";

function ManageExpense({ route, navigation }) {
  const { addExpense, deleteExpense, updateExpense } = useExpenses();
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    deleteExpense(expenseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = () => {
    if (isEditing) {
      updateExpense(expenseId, {
        description: "Test!!!",
        amount: 89.89,
        date: new Date("2024-12-11"),
      });
    } else {
      addExpense({
        description: "Test",
        amount: 19.99,
        date: new Date("2024-11-11"),
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.buttons}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="trash"
            size={28}
            color={"black"}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary400,
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
