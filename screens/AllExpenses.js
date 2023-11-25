import React from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useExpenses } from "../store/expenses-context";

function AllExpenses() {
  const { expenses } = useExpenses();

  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod={"Total"}
      fallbackText={"No expenses found"}
    />
  );
}

export default AllExpenses;
