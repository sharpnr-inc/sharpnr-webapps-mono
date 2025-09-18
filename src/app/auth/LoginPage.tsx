import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RootOrgLoginCard from "@/components/logincomp/RootOrgLoginCard";
import EmployeeLoginCard from "@/components/logincomp/EmployeeLoginCard";
import type React from "react";
import { useEffect } from "react";

export default function LoginPage(): React.JSX.Element {

 useEffect(() => {
    const generateFingerprint = (): string => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let randomPart = "";
      for (let i = 0; i < 24; i++) {
        randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      // Add datetime in YYYYMMDDHHMMSS format
      const now = new Date();
      const datetime = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}${String(now.getSeconds()).padStart(2,'0')}`;

      // Combine random part + datetime to get 32 characters
      return randomPart + datetime.substring(0, 8); // 24 + 8 = 32 chars
    };

    const key = "sharpnr_reg_fingerprint";

    if (localStorage.getItem(key)) {
      const fingerprint = generateFingerprint();
      localStorage.setItem(key, fingerprint);
      console.log("Fingerprint generated:", fingerprint);
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <Tabs defaultValue="root" className="w-full max-w-sm">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="root">Root Login</TabsTrigger>
          <TabsTrigger value="employee">Employee Login</TabsTrigger>
        </TabsList>
        <TabsContent value="root">
          <RootOrgLoginCard />
        </TabsContent>
        <TabsContent value="employee">
          <EmployeeLoginCard />
        </TabsContent>
      </Tabs>
      
    </div>
  );
}
