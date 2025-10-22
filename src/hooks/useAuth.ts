// import {
//   createContext,
//   useContext,
//   useState,
//   type ReactNode,
// } from "react";

// interface UserData {
//   id: string;
//   name: string;
//   role?: string;
// }

// interface AuthContextType {
//   user: UserData | null;
//   loading: boolean;
//   isAuthecticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
//   return ctx;
// };

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState(true);
// };
