import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';

interface Option {
  label: string;
  value: string;
  icon?: string | React.ReactNode;
}

interface SearchableSelectProps {
  options: Option[] | string[];
  value: string | null;
  onChange: ((value: string | null) => void) | ((value: string) => void) | ((updater: any) => void);
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  label,
  disabled = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter options based on search term
  const filteredOptions = options.filter(option => {
    const optionLabel = typeof option === 'string' ? option : option.label;
    return optionLabel.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Get display value for selected option
  const getDisplayValue = (): Option | string | null => {
    if (!value) return null;
    const selectedOption = options.find(opt => 
      typeof opt === 'string' ? opt === value : opt.value === value
    );
    return selectedOption || null;
  };

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(0);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Reset highlighted index when filtered options change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchTerm]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredOptions[highlightedIndex]) {
          const option = filteredOptions[highlightedIndex];
          const optionValue = typeof option === 'string' ? option : option.value;
          // @ts-ignore - Allow flexible onChange signatures
          onChange(optionValue);
          setIsOpen(false);
          setSearchTerm('');
          setHighlightedIndex(0);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(0);
        break;
      default:
        break;
    }
  };

  const handleOptionClick = (option: Option | string) => {
    // Always returns the value property (which is the country name in your case)
    const optionValue = typeof option === 'string' ? option : option.value;
    // @ts-ignore - Allow flexible onChange signatures
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
    setHighlightedIndex(0);
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    // @ts-ignore - Allow flexible onChange signatures
    onChange(''); // Use empty string instead of null for better form compatibility
    setSearchTerm('');
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div 
        className={`
          relative w-full cursor-pointer
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className={`
          w-full px-3 py-2 text-left border rounded-lg shadow-sm
          flex items-center justify-between
          ${isOpen ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100' : 'hover:border-gray-400'}
        `}>
          <span className={`flex items-center gap-2 truncate ${!value ? 'text-gray-400' : 'text-stone-50'}`}>
            {value ? (
              <>
                {(() => {
                  const selected = getDisplayValue();
                  if (selected && typeof selected === 'object') {
                    return (
                      <>
                        {selected.icon && <span>{selected.icon}</span>}
                        <span>{selected.label}</span>
                      </>
                    );
                  }
                  return selected;
                })()}
              </>
            ) : (
              placeholder
            )}
          </span>
          <div className="flex items-center gap-1">
            {value && !disabled && (
              <X
                className="w-4 h-4 text-gray-400 hover:text-gray-600"
                onClick={clearSelection}
              />
            )}
            <ChevronDown 
              className={`w-4 h-4 text-gray-400 transition-transform duration-200
                ${isOpen ? 'transform rotate-180' : ''}
              `}
            />
          </div>
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-card border border-gray-300 rounded-lg shadow-lg">
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          <div 
            ref={dropdownRef}
            className="max-h-60 overflow-auto"
          >
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500 text-center">
                No options found
              </div>
            ) : (
              filteredOptions.map((option, index) => {
                const optionValue = typeof option === 'string' ? option : option.value;
                const optionLabel = typeof option === 'string' ? option : option.label;
                const optionIcon = typeof option === 'object' ? option.icon : null;
                const isSelected = optionValue === value;
                const isHighlighted = index === highlightedIndex;

                return (
                  <div
                    key={optionValue}
                    className={`
                      px-3 py-2 text-sm cursor-pointer flex items-center justify-between
                      ${isHighlighted ? 'bg-blue-50' : ''}
                      ${isSelected ? 'bg-blue-100 text-stone-700' : 'hover:bg-gray-500'}
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionClick(option);
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    <span className="flex items-center gap-2 truncate">
                      {optionIcon && <span>{optionIcon}</span>}
                      <span>{optionLabel}</span>
                    </span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};


export default SearchableSelect;