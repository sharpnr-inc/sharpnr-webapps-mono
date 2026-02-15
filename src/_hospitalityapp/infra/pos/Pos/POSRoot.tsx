import { cn } from "@/lib/utils";
import { POSContext } from "./POSContext";

interface POSRootProps {
  children: React.ReactNode;
  className?: string;
}
const POSRoot: React.FC<POSRootProps> = ({ children, className }) => {
  return (
    <POSContext.Provider value={{}}>
      <div className={cn(className, "relative") }>
      {children}
      </div>
    </POSContext.Provider>
  );
};

export default POSRoot;
