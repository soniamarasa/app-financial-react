import React, { createContext, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';

const ToastContext = createContext({} as any);

export const ToastContextProvider = ({ children }: any) => {
  const toastRef = useRef<Toast>(null);

  const showToast = (severity: any, message: string) => {
    if (!toastRef.current) return;
    toastRef.current.show({
      severity: severity,
      summary: message,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} />
      <div>{children}</div>
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      'useToastContext have to be used within ToastContextProvider'
    );
  }

  return context;
};
