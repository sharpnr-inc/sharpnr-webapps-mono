// import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// import { useMenuTerminalStore } from "@/store/Hospitality/restaurant/menuTerminal/menuTerminal.store";
// import { Skeleton } from "@/components/ui/skeleton";



/**
 * MenuTerminal — Root wrapper component for the Menu Terminal system.
 *
 * This component is designed as the top-level layout container in the
 * Menu Terminal compound component architecture. It simply arranges its
 * children in a vertical stack and does not manage any state itself.
 *
 * @component
 * @example
 * return (
 *   <MenuTerminal>
 *     <MenuTerminal.Header />
 *     <MenuTerminal.Body>
 *       <MenuTerminal.Categories />
 *       <MenuTerminal.Items />
 *     </MenuTerminal.Body>
 *     <MenuTerminal.Footer />
 *   </MenuTerminal>
 * );
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components within the terminal layout.
 *
 * @returns {JSX.Element} The rendered MenuTerminal layout wrapper.
 */
export function MenuTerminal({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}





// HEADER --------------------------------------------------------------------
MenuTerminal.Header = function Header() {
  return (
    <div className="p-2 flex items-center justify-between border-b">
      <h2 className="font-semibold">Menu Terminal</h2>
    </div>
  );
};

// BODY WRAPPER ---------------------------------------------------------------

MenuTerminal.Body = function Body({ children }: { children: React.ReactNode }) {
  return <div className="w-full flex gap-2 max-h-[85vh]">{children}</div>;
};



// Categories Section
MenuTerminal.Categories = function Categories() {
  return (
    <Card className="w-[250px] p-4 border">
      <h3 className="font-medium mb-2">Categories</h3>

      <div className="flex flex-col gap-2"></div>
    </Card>
  );
};



MenuTerminal.Items = function Items() {
  return <div>This is Context</div>;
};



// FOOTER ---------------------------------------------------------------------
MenuTerminal.Footer = function Footer() {
  return (
    <div className="p-2 border-t text-sm text-muted-foreground">
      © Terminal System
    </div>
  );
};



// This is the Section where they Create Order Ticket
MenuTerminal.OrderTicket = function OrderTicket(){
  return(
    <div>This is Order Ticket Sections</div>
  )
}
