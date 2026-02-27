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
    <div className="space-y-2 w-full">
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
    </div>
  );
};

export default MenuSettings;
