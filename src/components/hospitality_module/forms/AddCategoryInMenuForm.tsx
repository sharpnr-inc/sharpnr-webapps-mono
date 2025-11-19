import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMutateCreateCategory } from "@/api_service/mutations/Hospitality/Menu";

interface CategoryFormData {
  menu_group_id: string;
  category_name: string;
  category_description: string;
}

export default function AddCategoryInMenuForm({
  menuGroupId,
}: {
  menuGroupId: string;
}) {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");


  const { mutate, isPending } = useMutateCreateCategory();

  const handleSubmit = () => {
    const formData: CategoryFormData = {
      menu_group_id: menuGroupId,
      category_name: categoryName,
      category_description: description,
    };

    mutate(formData, {
      onSuccess: () => {
        console.log("Category created successfully!");
        
      },
      onError: (err: any) => {
        console.error("Failed to create category:", err);
      },
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Category Name */}
      <div className="space-y-2">
        <Label htmlFor="category-name">
          Category Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="category-name"
          placeholder="e.g., Starters, Drinks, Main Course"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="category-description">
          Description <span className="text-gray-400">(Optional)</span>
        </Label>
        <Textarea
          id="category-description"
          placeholder="Brief description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          
        >
          Cancel
        </Button>

        <Button
          type="button"
          className="flex-1"
          onClick={handleSubmit}
          disabled={!categoryName.trim() || isPending}
        >
          {isPending ? "Creating..." : "Create Category"}
        </Button>
      </div>
    </div>
  );
}
