import MenuCartContext from "./MenuCart.Context";

interface MenuRootProps {
  children: React.ReactNode;
}
const MenuCartRoot: React.FC<MenuRootProps> = ({ children }) => {
  return (
    <MenuCartContext.Provider value={{}}>{children}</MenuCartContext.Provider>
  );
};

export default MenuCartRoot;
