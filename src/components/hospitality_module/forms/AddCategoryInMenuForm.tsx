import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CategoryFormData {
  name: string;
  description: string;
  displayOrder: number;
}

export default function AddCategoryInMenuForm() {
  const [categoryName, setCategoryName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [displayOrder, setDisplayOrder] = useState<number>(1);

  const handleSubmit = (): void => {
    const formData: CategoryFormData = {
      name: categoryName,
      description,
      displayOrder
    };
    console.log(formData);
    // Handle form submission
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
          placeholder="e.g., Pizza, Pasta, Burgers, Beverages"
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
          placeholder="Brief description of this category..."
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
          className="flex-1"
          onClick={handleSubmit}
          disabled={!categoryName.trim()}
        >
          Create Category
        </Button>
      </div>
    </div>
  );
}