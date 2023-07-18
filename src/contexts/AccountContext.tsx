import React, { createContext, useContext } from 'react';
import { IAccount } from '../interfaces/IAccount';

interface AccountContextType {
  accounts: IAccount[];
  setAccounts: React.Dispatch<React.SetStateAction<IAccount[]>>;
}

export const AccountContext = createContext<AccountContextType>(
  {} as AccountContextType
);

export const useAccountContext = () => useContext(AccountContext);

export const AccountStorage = ({ children }: { children: any }) => {
  const [accounts, setAccounts] = React.useState([] as IAccount[]);

  return (
    <AccountContext.Provider value={{ accounts, setAccounts }}>
      {children}
    </AccountContext.Provider>
  );
};
