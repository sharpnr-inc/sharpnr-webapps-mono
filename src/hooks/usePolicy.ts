import { createContext, useContext, useMemo } from "react";

const PolicyContext = createContext(null)

// export const PolicyProvider = ({ policies, children }) => {
//   const value = useMemo(() => ({ policies }), [policies]);
//   return <PolicyContext.Provider value={value}>{children}</PolicyContext.Provider>;
// };


export const usePolicy =() =>{
    
}