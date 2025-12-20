import { useState, useMemo, useRef, useEffect } from "react";
import { Search, User, Phone, Mail, X, UserPlus } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useHotelGuest } from "@/api_service/queries/HospitalityQueries/Hotel";
import { useDialogModal } from "@/context/DialogModalContext";
import { CreateCustomerForm } from "./CreateCustomerForm";

// Sample customer data
const customers = [
  {
    id: 1,
    name: "John Doe",
    mobile: "+1234567890",
    email: "john@example.com",
    address: "123 Main St",
  },
  {
    id: 2,
    name: "Jane Smith",
    mobile: "+1234567891",
    email: "jane@example.com",
    address: "456 Oak Ave",
  },
  {
    id: 3,
    name: "Robert Johnson",
    mobile: "+1234567892",
    email: "robert@example.com",
    address: "789 Pine Rd",
  },
  {
    id: 4,
    name: "Emily Davis",
    mobile: "+1234567893",
    email: "emily@example.com",
    address: "321 Elm St",
  },
  {
    id: 5,
    name: "Michael Wilson",
    mobile: "+1234567894",
    email: "michael@example.com",
    address: "654 Maple Dr",
  },
  {
    id: 6,
    name: "Sarah Brown",
    mobile: "+1234567895",
    email: "sarah@example.com",
    address: "987 Cedar Ln",
  },
];

export default function CustomerSearch({setguestId}:any) {
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {openModal, closeModal} = useDialogModal()

  const debouncedSearch = useDebounce(searchQuery, 300);
  
  const { data: guests, isFetching } = useHotelGuest(debouncedSearch);
  console.log(guests?.data)


  const dropdownRef = useRef<any>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current?.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter customers based on search query
  const filteredCustomers = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query) ||
        customer.mobile.includes(query) ||
        customer.email.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(true);
    setSelectedCustomer(null);
  };

  const handleCustomerSelect = (customer: any) => {
    setSelectedCustomer(customer);
    setguestId(customer.id)
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  const handleClearSelection = () => {
    setSelectedCustomer(null);
    setSearchQuery("");
  };

  const handleCreateGuest = () => {
    openModal(<CreateCustomerForm closeModal ={closeModal}/>)
    setIsDropdownOpen(false);
  };

  return (
    <div className=" p-2">
      <div className="">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Customer Search</h1>
          <p className="">Search by name, mobile number, or email</p>
        </div>

        {/* Search Input */}
        <div className="relative mb-6" ref={dropdownRef}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder="Search customer by name or mobile..."
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>

          {/* Dropdown Results */}
          {isDropdownOpen && guests?.data?.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
              {guests?.data?.map((customer:any) => (
                <div
                  key={customer.id}
                  onClick={() => handleCustomerSelect(customer)}
                  className="p-4 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 mb-1">
                        {customer.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                        <Phone className="h-3.5 w-3.5" />
                        <span>{customer.mobile}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="h-3.5 w-3.5" />
                        <span className="truncate">{customer.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {isDropdownOpen && searchQuery && guests?.data?.length === 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg p-6">
              <div className="text-center mb-4">
                <p className="text-slate-500 mb-4">
                  No customers found matching "{searchQuery}"
                </p>
                <button
                  onClick={handleCreateGuest}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <UserPlus className="h-4 w-4" />
                  Create New Guest
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Selected Customer Card */}
        {selectedCustomer && (
          <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                Selected Customer
              </h2>
              <button
                onClick={handleClearSelection}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {selectedCustomer.name}
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-slate-700">
                    <Phone className="h-4 w-4 text-slate-400" />
                    <span>{selectedCustomer.mobile}</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-700">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span>{selectedCustomer.email}</span>
                  </div>

                  <div className="flex items-start gap-3 text-slate-700 mt-3 pt-3 border-t border-slate-100">
                    <div className="text-sm">
                      <span className="font-medium text-slate-500">
                        Address:
                      </span>
                      <p className="mt-1">{selectedCustomer.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sample Data Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-800">
            <strong>Try searching:</strong> John, Jane, +123456, or any email
          </p>
        </div>
      </div>
    </div>
  );
}
