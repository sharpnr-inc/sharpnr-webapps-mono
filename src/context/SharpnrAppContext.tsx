import { createContext, useContext, type ReactNode } from "react";

interface SharpnrAppContextType {
  //   ui_shaper: any;
  showLoader: () => void;
}

const SharpnrAppContext = createContext<SharpnrAppContextType | undefined>(
  undefined
);

export const useSharpnrApp = () => {
  const context = useContext(SharpnrAppContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};

interface SharpnrAppProviderProps {
  children: ReactNode;
}

export const SharpnrAppProvider: React.FC<SharpnrAppProviderProps> = ({
  children
}) => {

  const showLoader = () => console.log("logigi");

  return (
    <SharpnrAppContext.Provider value={{ showLoader }}>
      {children}
    </SharpnrAppContext.Provider>
  );
};
