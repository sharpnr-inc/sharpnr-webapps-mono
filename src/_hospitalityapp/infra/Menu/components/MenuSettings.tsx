import { Card, CardContent } from "@/components/ui/card";
import CreateMenu from "../createMenu/CreatMenu";

interface MenuSettingsProps {
  moduleID: string;
  propertyID?: string;
}

const MenuSettings: React.FC<MenuSettingsProps> = ({
  moduleID,
  propertyID,

}) => {

  console.log(propertyID)
  return (
    <div className="space-y-2 w-full">
      <CardContent>
        <CreateMenu
          ownersID={moduleID}
          propertyID={propertyID}
          ownersType="RESTAURANT"
        >
          <CreateMenu.CreateCategory />
          <CreateMenu.CreateSubCategory />
          <CreateMenu.CreateItem />
          <CreateMenu.CreateVariantsAndAddons />
        </CreateMenu>
      </CardContent>
    </div>
  );
};

export default MenuSettings;
