import CreateCategory from "./CreateCategory"
import CreateSubCategory from "./CreateSubCategory"
import CreateMenuRoot from "./CreateMenuRoot"
import CreateItem from "./CreateItem"
import CreateVariantsAndAddons from "./CreateVariantsandAddons"

const CreateMenu = Object.assign(CreateMenuRoot, {
  CreateCategory,
  CreateSubCategory,
  CreateItem,
  CreateVariantsAndAddons
})

export default CreateMenu
