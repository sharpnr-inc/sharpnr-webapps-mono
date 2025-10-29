import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface Size {
  name: string;
  price: string;
}

interface VariantFormData {
  variantName: string;
  sizes: Size[];
}

export default function AddVariantInItemDialog() {
  const [variantName, setVariantName] = useState<string>('');
  const [sizes, setSizes] = useState<Size[]>([
    { name: 'Small', price: '' },
    { name: 'Medium', price: '' },
    { name: 'Large', price: '' }
  ]);

  const addSize = (): void => {
    setSizes([...sizes, { name: '', price: '' }]);
  };

  const removeSize = (index: number): void => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const updateSize = (index: number, field: keyof Size, value: string): void => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  const handleSubmit = (): void => {
    const formData: VariantFormData = {
      variantName,
      sizes
    };
    console.log(formData);
    // Handle form submission
  };

  return (
    <div className="space-y-6">
      {/* Variant Name */}
      <div className="space-y-2">
        <Label htmlFor="variant-name">
          Variant Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="variant-name"
          placeholder="e.g., Thin Crust, Stuffed Crust, Whole Wheat"
          value={variantName}
          onChange={(e) => setVariantName(e.target.value)}
        />
      </div>

      {/* Sizes Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>
            Sizes & Pricing <span className="text-red-500">*</span>
          </Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addSize}
            className="h-8 "
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Size
          </Button>
        </div>

        <div className="space-y-3">
          {sizes.map((size, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Size name (e.g., Small, Regular)"
                  value={size.name}
                  onChange={(e) => updateSize(index, 'name', e.target.value)}
                />
              </div>
              <div className="w-32">
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                  <Input
                    type="number"
                    placeholder="Price"
                    value={size.price}
                    onChange={(e) => updateSize(index, 'price', e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>
              {sizes.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSize(index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
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
          disabled={!variantName.trim() || sizes.some(s => !s.name || !s.price)}
        >
          Add Variant
        </Button>
      </div>
    </div>
  );
}