import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddonFormData {
  name: string;
  price: string;
  maxQuantity: number;
}

export default function AddAddOnInItemDialog() {
  const [addonName, setAddonName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [maxQuantity, setMaxQuantity] = useState<number>(1);

  const handleSubmit = (): void => {
    const formData: AddonFormData = {
      name: addonName,
      price,
      maxQuantity
    };
    console.log(formData);
    // Handle form submission
  };

  return (
    <div className="space-y-6">
      {/* Addon Name */}
      <div className="space-y-2">
        <Label htmlFor="addon-name">
          Add-on Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="addon-name"
          placeholder="e.g., Extra Cheese, Mushrooms, Olives"
          value={addonName}
          onChange={(e) => setAddonName(e.target.value)}
        />
      </div>

      {/* Price */}
      <div className="space-y-2">
        <Label htmlFor="addon-price">
          Price <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
          <Input
            id="addon-price"
            type="number"
            placeholder="0.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="pl-7"
          />
        </div>
      </div>

      {/* Max Quantity */}
      <div className="space-y-2">
        <Label htmlFor="max-quantity">
          Max Quantity
        </Label>
        <Input
          id="max-quantity"
          type="number"
          min="1"
          placeholder="1"
          value={maxQuantity}
          onChange={(e) => setMaxQuantity(parseInt(e.target.value) || 1)}
        />
        <p className="text-xs text-gray-500">
          Maximum number of times this add-on can be added
        </p>
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
          disabled={!addonName.trim() || !price}
        >
          Add Add-on
        </Button>
      </div>
    </div>
  );
}