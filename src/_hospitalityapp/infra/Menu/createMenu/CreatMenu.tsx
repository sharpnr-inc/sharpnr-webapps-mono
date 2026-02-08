import CreateCategory from "./CreateCategory"
import CreateSubCategory from "./CreateSubCategory"
import CreateMenuRoot from "./CreateMenuRoot"

const CreateMenu = Object.assign(CreateMenuRoot, {
  CreateCategory,
  CreateSubCategory,
})

export default CreateMenu
