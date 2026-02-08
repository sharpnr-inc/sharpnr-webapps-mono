import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmptyMenu from "./EmptyMenu";
import CreateMenu from "../createMenu/CreatMenu";
import { dummyMenuData } from "@/lib/create_menu";

interface MenuSettingsProps {
  moduleID: string;
  propertyID?: string;
}

const MenuSettings: React.FC<MenuSettingsProps> = ({ moduleID }) => {
  return (
    <div>
      {/* <Card>
        <CardHeader>
          <CardTitle>Set Who serves the Menu</CardTitle>
          <CardDescription>
            Here you can set the Which Property's Accessible kitchen can serve
            your Whole Menu, you can even set the Each Menu Item can serve by
            different kitchens
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <EmptyMenu /> */}
      <CreateMenu DummyData={dummyMenuData}>
        <CreateMenu.CreateCategory />
        <CreateMenu.CreateSubCategory />
        <CreateMenu.CreateItem />
      </CreateMenu>
    </div>
  );
};

export default MenuSettings;
