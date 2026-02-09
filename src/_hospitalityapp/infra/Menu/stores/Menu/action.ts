import { useMenuStore } from "./menu_store";

export const menuActions = {
  /**
   * Initializes the store with fetched data and sets defaults
   */
  addMenuInStore: (data: any[]) => {
    if (!data || data.length === 0) return;

    const firstGroup = data[0];
    const firstCat = firstGroup?.Categories?.[0];
    const firstSub = firstCat?.SubCategories?.[0];

    useMenuStore.setState({
      menuGroups: data,
      activeMenuGroupID: firstGroup?.ID || null,
      activeCategoryID: firstCat?.ID || null,
      activeSubCategoryID: firstSub?.ID || null,
    });
  },

  /**
   * Sets the active category and automatically selects its first sub-category
   */
  setCategory: (catID: string) => {
    const state = useMenuStore.getState();

    // Find the group and category to get the first sub-category
    const group = state.menuGroups.find(
      (g) => g.ID === state.activeMenuGroupID,
    );
    const category = group?.Categories.find((c: any) => c.ID === catID);

    useMenuStore.setState({
      activeCategoryID: catID,
      activeSubCategoryID: category?.SubCategories?.[0]?.ID || null,
    });
  },

  /**
   * Simple setter for SubCategory
   */
  setSubCategory: (subID: string) => {
    useMenuStore.setState({ activeSubCategoryID: subID });
  },

  /**
   * Updates global search string
   */
  setSearch: (query: string) => {
    useMenuStore.setState({ searchQuery: query });
  },

  /**
   * Reset store (useful for module switching)
   */
  resetMenuStore: () => {
    useMenuStore.setState({
      activeMenuGroupID: null,
      activeCategoryID: null,
      activeSubCategoryID: null,
      searchQuery: "",
    });
  },

  /**
   * Opens the bottom slider with the selected item's details
   */
  // openItemEditor: (item: any) => {
  //   useMenuStore.setState({
  //     activeItemForSlider: item,
  //     isSliderOpen: true,
  //   });
  // },

  /**
   * Closes the slider and clears the active item
   */
  // closeItemEditor: () => {
  //   useMenuStore.setState({
  //     activeItemForSlider: null,
  //     isSliderOpen: false,
  //   });
  // },

  // UI Toggles
  openItemEditor: (item: any) => useMenuStore.setState({ activeItemForSlider: item, isItemSheetOpen: true }),
  closeItemEditor: () => useMenuStore.setState({ activeItemForSlider: null, isItemSheetOpen: false }),
  
  toggleCart: (isOpen: boolean) => useMenuStore.setState({ isCartSheetOpen: isOpen }),
};
