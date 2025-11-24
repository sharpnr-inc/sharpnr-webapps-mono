import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutateCreateSubCategory } from "@/api_service/mutations/Hospitality/Menu";

interface SubCategoryFormData {
  name: string;
  description: string;
  categoryName: string;
  displayOrder: number;
}

export default function AddSubCategoryInMenuForm({
  cat_name,
  menuGroupId,
}: {
  cat_name: string;
  menuGroupId: string;
}) {
  const [subCategoryName, setSubCategoryName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [displayOrder, setDisplayOrder] = useState<number>(1);

  const { mutate, isPending } = useMutateCreateSubCategory(menuGroupId);

  const handleSubmit = (): void => {
    const payload = {
      category_id: cat_name,
      sub_category_name: subCategoryName,
      sub_category_description: description,
    };
   
    mutate(payload, {
      onSuccess: () => {
        console.log("Sub-category Created Successfully!");
      },
      onError: (err: any) => {
        console.error("Error creating sub-category:", err);
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Category Info */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
        <p className="text-sm text-gray-600">
          Adding sub-category to:{" "}
          <span className="font-semibold text-gray-800">{cat_name}</span>
        </p>
      </div>

      {/* Sub-Category Name */}
      <div className="space-y-2">
        <Label htmlFor="subcategory-name">
          Sub-Category Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="subcategory-name"
          placeholder="e.g., Veg Starters, Non-Veg Starters, Thin Crust"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="subcategory-description">
          Description <span className="text-gray-400">(Optional)</span>
        </Label>
        <Textarea
          id="subcategory-description"
          placeholder="Brief description of this sub-category..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => {
            // Handle cancel
          }}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="flex-1 "
          onClick={handleSubmit}
          disabled={!subCategoryName.trim()}
        >
          Create Sub-Category
        </Button>
      </div>
    </div>
  );
}
