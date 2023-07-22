import React, { createContext, useContext } from 'react';
import { IReports } from '../interfaces/IReports';

interface ReportsContextType {
  reports: IReports;
  setReports: React.Dispatch<React.SetStateAction<IReports>>;
}

export const ReportsContext = createContext<ReportsContextType>(
  {} as ReportsContextType
);

export const useReportsContext = () => useContext(ReportsContext);

export const ReportsStorage = ({ children }: { children: any }) => {
  const [reports, setReports] = React.useState({}  as IReports);

  return (
    <ReportsContext.Provider value={{ reports, setReports }}>
      {children}
    </ReportsContext.Provider>
  );
};
