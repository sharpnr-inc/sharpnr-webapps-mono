import CreateCategory from "./CreateCategory"
import CreateSubCategory from "./CreateSubCategory"
import CreateMenuRoot from "./CreateMenuRoot"
import CreateItem from "./CreateItem"

const CreateMenu = Object.assign(CreateMenuRoot, {
  CreateCategory,
  CreateSubCategory,
  CreateItem
})

export default CreateMenu
