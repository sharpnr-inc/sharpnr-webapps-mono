import CreateMenu from "../../shared/createMenu/CreatMenu";

interface MenuSettingsProps {
  moduleID: string;
  propertyID?: string;
  owners_legal_entityID: string | null | undefined;
}

const MenuSettings: React.FC<MenuSettingsProps> = ({
  moduleID,
  propertyID,
  owners_legal_entityID,
}) => {
  return (
    <div className="space-y-2 w-full">
      <CreateMenu
        owners_legal_entity_ID={owners_legal_entityID}
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
