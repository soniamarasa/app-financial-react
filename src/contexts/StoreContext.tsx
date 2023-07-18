import React, { createContext, useContext } from 'react';
import { IStore } from '../interfaces/IStore';

interface StoreContextType {
    stores: IStore[];
    setStores: React.Dispatch<React.SetStateAction<IStore[]>>;
}

export const StoreContext = createContext<StoreContextType>({} as StoreContextType)

export const useStoreContext = () => useContext(StoreContext);


export const StoreStorage = ({ children }: { children: any }) => {
  const [stores, setStores] = React.useState([] as IStore[]);

  return (
    <StoreContext.Provider value={{ stores, setStores }}>
      {children}
    </StoreContext.Provider>
  );
};
