import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Check, PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useDialogModal } from "@/context/DialogModalContext";
import AddSubCategoryInMenuForm from "./AddSubCategoryInMenuForm";
import AddCategoryInMenuForm from "./AddCategoryInMenuForm";
import AddItemInMenuStepTwo from "./AddItemInMenuStepTwo";
import { cn } from "@/lib/utils";
import AddItemInMenuStepThree from "./AddItemInMenuFormStepThree";
import AddItemInMenuStepFour from "./AddItemInMenuStepFour";
import AddItemInMenuStepFive from "./AddItemInMenuStepFive";
// import { useVariantOfMenuItem } from "@/api_service/queries/HospitalityQueries/Menu";

export default function AddItemInMenuForm({
  group,
  categories,
}: {
  group: any;
  categories: any[];
}) {
  console.log(group);
  console.log(categories);
  const [stepIndex, setStepIndex] = useState(0);

  // Shared state across all steps
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [menuitemId, setMenuItemId] = useState("");
  // const [itemDetails, setItemDetails] = useState({});
  // const [variants, setVariants] = useState([]);
  // const [addons, setAddons] = useState([]);
  // const { data } = useVariantOfMenuItem("f86f0358-17a3-4c98-b3e6-80e11d40ad9e");

  const { openModal } = useDialogModal();
  console.log(menuitemId);
  const next = () => setStepIndex((i) => i + 1);
  const back = () => setStepIndex((i) => Math.max(i - 1, 0));

  // Get selected category object
  const selectedCatObj = categories.find((cat) => cat.id === selectedCategory);

  const selectedCategoryId = selectedCatObj?.id ?? "";
  const selectedSubcategoryObj = selectedCatObj?.sub_categories?.find(
    (sub: any) => sub.name === selectedSubCategory
  );
  const selectedSubcategoryId = selectedSubcategoryObj?.id ?? "";

  console.log(selectedCatObj);

  const handleAddSubCate = () => {
    openModal(
      <AddSubCategoryInMenuForm
        cat_name={selectedCategory}
        menuGroupId={group.Id}
      />,
      "Add Sub-category",
      `Add Subcategory in ${selectedCategory}`
    );
  };

  const handleAddCategory = () => {
    openModal(
      <AddCategoryInMenuForm menuGroupId={group.Id} />,
      "Add New Category",
      "Add New Category in Bar Menu"
    );
  };

  // Step labels for header UI
  const steps = ["Category", "Item Details", "Variants", "Add-ons", "Preview "];

  return (
    <div className="flex flex-col w-full max-w-6xl p-2 gap-4 place-items-center">
      <div className="w-full">
        <div className=" items-center justify-between md:flex relative hidden">
          {steps.map((label, index) => (
            <div
              key={index}
              className="flex flex-col items-center relative z-10 flex-1"
            >
              {/* Step Circle */}
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 font-semibold transition-all ",
                  stepIndex === index
                    ? "border-primary text-primary"
                    : stepIndex > index
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-gray-300 text-gray-400"
                )}
              >
                {stepIndex > index ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <span className="text-sm sm:text-base">{index + 1}</span>
                )}
              </div>

              {/* Step Label - Hidden on mobile, shown on larger screens */}
              <p
                className={cn(
                  "mt-2 text-xs sm:text-sm font-medium transition-all hidden sm:block text-center max-w-[100px]",
                  stepIndex === index
                    ? "text-primary"
                    : stepIndex > index
                      ? "text-green-600"
                      : "text-gray-500"
                )}
              >
                {label}
              </p>

              {/* Mobile Label - Only current step */}
              {stepIndex === index && (
                <p className="mt-2 text-xs font-medium text-primary sm:hidden text-center">
                  {label}
                </p>
              )}

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="absolute top-4 sm:top-5 left-[50%] w-full h-[2px] -z-10">
                  <div
                    className={cn(
                      "h-full transition-all",
                      stepIndex > index ? "bg-green-500" : "bg-gray-300"
                    )}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: Show all steps below on small screens */}
        <div className="mt-6 grid grid-cols-2 gap-2 sm:hidden">
          {steps.map((label, index) => (
            <div
              key={index}
              className={cn(
                "text-xs text-center p-2 rounded-lg border transition-all",
                stepIndex === index
                  ? "border-primary bg-primary/5 text-primary font-medium"
                  : stepIndex > index
                    ? "border-green-500 bg-green-50 text-green-600"
                    : "border-gray-200 bg-gray-50 text-gray-500"
              )}
            >
              <span className="font-semibold">{index + 1}.</span> {label}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Category + Subcategory */}

      {stepIndex === 0 && (
        <div className="w-full flex flex-col gap-4 place-items-center">
          {/* CATEGORY SELECT */}
          <Select
            onValueChange={(value) => {
              setSelectedCategory(value);
              setSelectedSubCategory("");
            }}
          >
            <SelectTrigger className="w-full max-w-xl">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>

            <SelectContent>
              {categories.map((cat: any) => (
                <SelectItem key={cat.Id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}

              <Separator className="my-2" />

              <Button
                onClick={handleAddCategory}
                variant="outline"
                className="w-full"
              >
                <PlusIcon className="mr-1 h-3 w-3" /> Add Category
              </Button>
            </SelectContent>
          </Select>

          {/* SUBCATEGORY SELECT */}
          <Select
            disabled={!selectedCategory}
            onValueChange={setSelectedSubCategory}
          >
            <SelectTrigger className="w-full max-w-xl">
              <SelectValue
                placeholder={
                  selectedCategory
                    ? "Select Subcategory"
                    : "Select Category First"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {selectedCatObj?.sub_categories?.length ? (
                selectedCatObj.sub_categories.map((sub: any) => (
                  <SelectItem key={sub.id} value={sub.name}>
                    {sub.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="h" disabled>
                  No Subcategories
                </SelectItem>
              )}

              <Button
                className="w-full mt-2"
                onClick={handleAddSubCate}
                variant="outline"
                disabled={!selectedCategory}
              >
                <PlusIcon className="mr-1 h-3 w-3" />
                Add Sub-Category
              </Button>
            </SelectContent>
          </Select>

          <Button
            onClick={next}
            disabled={!selectedSubCategory}
            className="w-full max-w-xl"
          >
            Next
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Step 2: Item Details */}
      {stepIndex === 1 && (
        <AddItemInMenuStepTwo
          onNext={next}
          onBack={back}
          categoryId={selectedCategoryId}
          subCategoryId={selectedSubcategoryId}
          setMenuId={setMenuItemId}
        />
      )}

      {/* Step 3: Variants */}
      {stepIndex === 2 && (
        <AddItemInMenuStepThree
          onNext={next}
          onBack={back}
          menuItemId={menuitemId}
          // pass setter
          // variants={variants}
          // setVariants={setVariants}
        />
      )}

      {/* Step 4: Add-ons */}
      {stepIndex === 3 && (
        <AddItemInMenuStepFour
          onNext={next}
          onBack={back}
          menuItemId={menuitemId}
        />
      )}

      {/* Step 5: Preview & Confirm */}
      {stepIndex === 4 && (
        <AddItemInMenuStepFive
          onBack={back}
          // data={{
          //   category: selectedCategory,
          //   subCategory: selectedSubCategory,
          //   itemDetails,
          //   variants,
          //   addons,
          // }}
        />
      )}
    </div>
  );
}
