import { POSContext } from "./POSContext";

interface POSRootProps {
  children: React.ReactNode;
  className?: string;
}
const POSRoot: React.FC<POSRootProps> = ({ children, className }) => {
  return (
    <POSContext.Provider value={{}}>
      <div className={className}>
      {children}
      </div>
    </POSContext.Provider>
  );
};

export default POSRoot;
