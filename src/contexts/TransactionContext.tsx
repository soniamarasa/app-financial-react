import React from 'react';
import { ITransaction } from '../interfaces/ITransaction';
import { IChart } from '../interfaces/IChart';

export const TransactionContext = React.createContext({
  setTransactions: (() => {}) as React.Dispatch<
    React.SetStateAction<ITransaction[]>
  >,
  setCategoryChart: (() => {}) as React.Dispatch<
    React.SetStateAction<IChart[]>
  >,
  setBalanceChart: (() => {}) as React.Dispatch<React.SetStateAction<IChart[]>>,
  transactions: [] as ITransaction[],
  categoryChart: [] as IChart[],
  balanceChart: [] as IChart[],
});

export const TransactionStorage = ({ children }: {children: any}) => {
  const [transactions, setTransactions] = React.useState([] as ITransaction[]);
  const [categoryChart, setCategoryChart] = React.useState([] as IChart[]);
  const [balanceChart, setBalanceChart] = React.useState([] as IChart[]);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        balanceChart,
        categoryChart,
        setTransactions,
        setBalanceChart,
        setCategoryChart,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
