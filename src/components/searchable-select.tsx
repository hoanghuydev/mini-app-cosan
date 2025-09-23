import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "./vectors";

export interface SearchableSelectProps<T> {
  items: T[];
  value?: T;
  placeholder: string;
  renderItemLabel: (item: T) => string;
  renderItemKey: (item: T) => string;
  onChange: (selectedItem?: T) => void;
  disabled?: boolean;
}

export default function SearchableSelect<T>({
  items,
  value,
  placeholder,
  renderItemLabel,
  renderItemKey,
  onChange,
  disabled = false,
}: SearchableSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<T[]>(items);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter items based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) =>
        renderItemLabel(item)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm, items, renderItemLabel]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm("");
    }
  };

  const handleItemSelect = (item: T) => {
    onChange(item);
    setIsOpen(false);
    setSearchTerm("");
  };

  const displayValue = value ? renderItemLabel(value) : placeholder;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Select Button */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`
          w-full px-3 py-2 border border-gray-300 rounded-lg text-left
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
          flex items-center justify-between
          ${disabled ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white hover:border-gray-400 cursor-pointer'}
          ${isOpen ? 'ring-2 ring-primary border-transparent' : ''}
        `}
      >
        <span className={`truncate ${!value ? 'text-gray-500' : 'text-gray-900'}`}>
          {displayValue}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200">
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm..."
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Items List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredItems.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500 text-center">
                Không tìm thấy kết quả
              </div>
            ) : (
              filteredItems.map((item) => {
                const isSelected = value && renderItemKey(value) === renderItemKey(item);
                return (
                  <button
                    key={renderItemKey(item)}
                    type="button"
                    onClick={() => handleItemSelect(item)}
                    className={`
                      w-full px-3 py-2 text-left text-sm hover:bg-gray-100
                      ${isSelected ? 'bg-primary text-white hover:bg-primary' : 'text-gray-900'}
                    `}
                  >
                    {renderItemLabel(item)}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
