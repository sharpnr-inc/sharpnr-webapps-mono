// This is going to Create the Menu
// *1 we need to setup the tanstack form and then
// *2 we will pass down the Form to the Component

import { createContext, useContext } from "react";

const CreateMenuContext = createContext<any>(null);

const useCreateMenuData = () => useContext(CreateMenuContext);

