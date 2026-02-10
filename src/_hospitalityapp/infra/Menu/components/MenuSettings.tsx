import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateMenu from "../createMenu/CreatMenu";

interface MenuSettingsProps {
  moduleID: string;
  propertyID?: string;
}

const MenuSettings: React.FC<MenuSettingsProps> = ({
  moduleID,
  propertyID,
}) => {
  return (
    <div className="space-y-2">
      <Card>
        <CardHeader>
          <CardTitle>Set Who serves the Menu</CardTitle>
          <CardDescription>
            Here you can set the Which Property's Accessible kitchen can serve
            your Whole Menu, you can even set the Each Menu Item can serve by
            different kitchens
          </CardDescription>
        </CardHeader>
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
      </Card>
    </div>
  );
};

export default MenuSettings;
