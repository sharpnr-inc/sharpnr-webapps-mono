import { POSContext } from "./POSContext";

interface POSRootProps {
  children: React.ReactNode;
}
const POSRoot: React.FC<POSRootProps> = ({ children }) => {
  return (
    <POSContext.Provider value={{}}>
      {children}
    </POSContext.Provider>
  );
};

export default POSRoot;
