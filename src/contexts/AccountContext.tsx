import React, { createContext, useContext } from 'react';
import { IAccount } from '../interfaces/IAccount';

interface AccountContextType {
  accounts: IAccount[];
  setAccounts: React.Dispatch<React.SetStateAction<IAccount[]>>;
  currentBalance: number;
  setCurrentBalance: React.Dispatch<React.SetStateAction<number>>;
}

export const AccountContext = createContext<AccountContextType>(
  {} as AccountContextType
);

export const useAccountContext = () => useContext(AccountContext);

export const AccountStorage = ({ children }: { children: any }) => {
  const [accounts, setAccounts] = React.useState([] as IAccount[]);
  const [currentBalance, setCurrentBalance] = React.useState(0);

  return (
    <AccountContext.Provider value={{ accounts, setAccounts, currentBalance, setCurrentBalance }}>
      {children}
    </AccountContext.Provider>
  );
};
