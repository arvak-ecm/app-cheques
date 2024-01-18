import { createContext, useState } from "react";

interface props {
  children: JSX.Element | JSX.Element[];
}
interface appDataProps {
  showSpinner: boolean;
  threshold: number;
}

interface AppContextType {
  appData: appDataProps;
  updateAppData: (newData: Partial<appDataProps>) => void;
}

export const AppContext = createContext<AppContextType>({
  appData: { showSpinner: false, threshold: 7 },
  updateAppData: () => {},
});

const INIT_CONTEXT: appDataProps = {
  showSpinner: false,
  threshold: 7,
};

export const AppProvider = ({ children }: props) => {
  const [appData, setAppData] = useState<appDataProps>(() => {
    const localData = localStorage.getItem("appData");
    let dataJson;
    if (localData) {
      dataJson = JSON.parse(localData);
      dataJson.showSpinner = false;
    }
    return localData ? dataJson : INIT_CONTEXT;
  });

  const updateAppData = (newData: Partial<appDataProps>) => {
    setAppData((prevData) => {
      const updatedData = { ...prevData, ...newData };
      localStorage.setItem("appData", JSON.stringify(updatedData));
      return updatedData;
    });
  };
  return (
    <AppContext.Provider value={{ appData, updateAppData }}>
      {children}
    </AppContext.Provider>
  );
};
