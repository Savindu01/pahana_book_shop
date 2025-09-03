import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  Minus,
  Printer,
  User,
  ShoppingCart,
  X,
  Edit3,
  AlertCircle,
  Loader,
} from "lucide-react";

function AdminBillingSystem() {
  // State management
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [availableItems] = useState([
    {
      id: 1,
      name: "Premium Service Package",
      price: 299.99,
      category: "Services",
    },
    {
      id: 2,
      name: "Monthly Subscription",
      price: 29.99,
      category: "Subscriptions",
    },
    { id: 3, name: "Setup Fee", price: 99.0, category: "Fees" },
    { id: 4, name: "Consultation Hour", price: 150.0, category: "Services" },
    { id: 5, name: "Additional License", price: 49.99, category: "Licenses" },
    { id: 6, name: "Priority Support", price: 199.99, category: "Services" },
    { id: 7, name: "Data Storage (1TB)", price: 19.99, category: "Storage" },
    { id: 8, name: "Custom Integration", price: 499.99, category: "Services" },
  ]);

  const [currentStep, setCurrentStep] = useState(1);
  const [customerSearch, setCustomerSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [itemSearch, setItemSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [billNotes, setBillNotes] = useState("");
  const printRef = useRef();

  // Fetch customers from API
  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/customer/get-all-customers"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      setError(`Failed to fetch customers: ${err.message}`);
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Filter customers based on search
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.customerName
        .toLowerCase()
        .includes(customerSearch.toLowerCase()) ||
      customer.customerId.toString().includes(customerSearch) ||
      customer.accountNumber
        .toLowerCase()
        .includes(customerSearch.toLowerCase()) ||
      customer.customerEmail
        .toLowerCase()
        .includes(customerSearch.toLowerCase())
  );

  // Filter items based on search
  const filteredItems = availableItems.filter(
    (item) =>
      item.name.toLowerCase().includes(itemSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(itemSearch.toLowerCase())
  );

  // Add item to bill
  const addItemToBill = (item) => {
    const existingItem = selectedItems.find((si) => si.id === item.id);
    if (existingItem) {
      setSelectedItems(
        selectedItems.map((si) =>
          si.id === item.id ? { ...si, quantity: si.quantity + 1 } : si
        )
      );
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  // Update item quantity
  const updateQuantity = (id, change) => {
    setSelectedItems(
      selectedItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Remove item from bill
  const removeItem = (id) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };

  // Calculate totals
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Print bill
  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  // Reset form
  const resetForm = () => {
    setCurrentStep(1);
    setSelectedCustomer(null);
    setCustomerSearch("");
    setItemSearch("");
    setSelectedItems([]);
    setBillNotes("");
  };

  // Generate customer initials
  const getCustomerInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Billing System
          </h1>
          <p className="text-gray-400 mt-2">Create and manage customer bills</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-slate-800 rounded-2xl shadow-lg p-6 border border-gray-700/50 backdrop-blur-sm transition-all hover:shadow-xl">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
                <User className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-white">{customers.length}</h2>
                <p className="text-gray-400">Total Customers</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-slate-800 rounded-2xl shadow-lg p-6 border border-gray-700/50 backdrop-blur-sm transition-all hover:shadow-xl">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-white">{selectedItems.length}</h2>
                <p className="text-gray-400">Items in Bill</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800 to-slate-800 rounded-2xl shadow-lg p-6 border border-gray-700/50 backdrop-blur-sm transition-all hover:shadow-xl">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-pink-500/20 text-pink-400">
                <Printer className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-white">{formatCurrency(total)}</h2>
                <p className="text-gray-400">Current Total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-br from-gray-800 to-slate-800 rounded-2xl shadow-lg overflow-hidden border border-gray-700/50 backdrop-blur-sm">
          {/* Progress Steps */}
          <div className="px-8 py-6 border-b border-gray-700">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              <div
                className={`flex items-center ${
                  currentStep >= 1 ? "text-blue-400" : "text-gray-500"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= 1 ? "bg-blue-500 text-white" : "bg-gray-700"
                  }`}
                >
                  <User className="w-4 h-4" />
                </div>
                <span className="ml-2 font-medium">Select Customer</span>
              </div>
              <div
                className={`flex-1 h-1 mx-4 ${
                  currentStep >= 2 ? "bg-blue-500" : "bg-gray-700"
                }`}
              ></div>
              <div
                className={`flex items-center ${
                  currentStep >= 2 ? "text-blue-400" : "text-gray-500"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= 2 ? "bg-blue-500 text-white" : "bg-gray-700"
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <span className="ml-2 font-medium">Add Items</span>
              </div>
              <div
                className={`flex-1 h-1 mx-4 ${
                  currentStep >= 3 ? "bg-blue-500" : "bg-gray-700"
                }`}
              ></div>
              <div
                className={`flex items-center ${
                  currentStep >= 3 ? "text-blue-400" : "text-gray-500"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= 3 ? "bg-blue-500 text-white" : "bg-gray-700"
                  }`}
                >
                  <Printer className="w-4 h-4" />
                </div>
                <span className="ml-2 font-medium">Generate Bill</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Step 1: Customer Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    Select Customer
                  </h2>
                  <button
                    onClick={fetchCustomers}
                    disabled={loading}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:bg-gray-700 transition duration-200 flex items-center space-x-2 border border-blue-500/30"
                  >
                    {loading ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                    <span>{loading ? "Loading..." : "Refresh"}</span>
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <div>
                      <p className="text-red-300 font-medium">
                        Error loading customers
                      </p>
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, ID, account number, or email..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-700 bg-gray-800/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder:text-gray-500"
                  />
                </div>

                {/* Loading State */}
                {loading && (
                  <div className="flex justify-center py-12">
                    <Loader className="w-8 h-8 animate-spin text-blue-500" />
                  </div>
                )}

                {/* Customer List */}
                {!loading && !error && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCustomers.map((customer) => (
                      <div
                        key={customer.customerId}
                        onClick={() => setSelectedCustomer(customer)}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedCustomer?.customerId === customer.customerId
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-gray-700 hover:border-blue-400 hover:bg-gray-700/50"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-semibold text-sm">
                              {getCustomerInitials(customer.customerName)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white truncate">
                              {customer.customerName}
                            </h3>
                            <p className="text-sm text-gray-400">
                              ID: {customer.customerId}
                            </p>
                            <p className="text-sm text-gray-400">
                              Acc: {customer.accountNumber}
                            </p>
                            <p className="text-sm text-gray-400 truncate">
                              {customer.customerEmail}
                            </p>
                            <p className="text-sm text-gray-400">
                              {customer.contactNumber}
                            </p>
                            <p className="text-sm text-gray-500 text-xs mt-1 truncate">
                              {customer.customerAddress}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {!loading && !error && filteredCustomers.length === 0 && (
                  <div className="text-center py-12">
                    <User className="h-16 w-16 mx-auto text-gray-500" />
                    <h3 className="mt-4 text-lg font-medium text-white">
                      No customers found
                    </h3>
                    <p className="mt-1 text-gray-400">
                      {customerSearch
                        ? "Try adjusting your search criteria."
                        : "No customers available. Please check your API connection."}
                    </p>
                  </div>
                )}

                {selectedCustomer && (
                  <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20">
                    <h4 className="font-semibold text-blue-300 mb-2">
                      Selected Customer:
                    </h4>
                    <div className="text-blue-300">
                      <p className="font-medium">
                        {selectedCustomer.customerName}
                      </p>
                      <p className="text-sm">
                        ID: {selectedCustomer.customerId} | Account:{" "}
                        {selectedCustomer.accountNumber}
                      </p>
                      <p className="text-sm">
                        {selectedCustomer.customerEmail}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={() => selectedCustomer && setCurrentStep(2)}
                    disabled={!selectedCustomer}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl disabled:bg-gray-700 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition duration-200 border border-blue-500/30"
                  >
                    Continue to Items
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Item Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    Add Items to Bill
                  </h2>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-gray-400 hover:text-white flex items-center"
                  >
                    ← Back to Customer
                  </button>
                </div>

                {selectedCustomer && (
                  <div className="bg-gray-700/50 p-4 rounded-xl">
                    <p className="text-sm text-gray-300">
                      Billing for:{" "}
                      <span className="font-semibold text-white">
                        {selectedCustomer.customerName}
                      </span>
                      <span className="text-gray-400 ml-2">
                        (Acc: {selectedCustomer.accountNumber})
                      </span>
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Available Items */}
                  <div className="lg:col-span-2">
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search items..."
                        value={itemSearch}
                        onChange={(e) => setItemSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-700 bg-gray-800/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder:text-gray-500"
                      />
                    </div>

                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {filteredItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 border border-gray-700 rounded-xl hover:bg-gray-700/50 transition-colors"
                        >
                          <div>
                            <h4 className="font-semibold text-white">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-400">
                              {item.category}
                            </p>
                            <p className="font-bold text-blue-400">
                              {formatCurrency(item.price)}
                            </p>
                          </div>
                          <button
                            onClick={() => addItemToBill(item)}
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition duration-200 border border-blue-500/30"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selected Items */}
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <h3 className="font-semibold text-white mb-4">
                      Bill Items ({selectedItems.length})
                    </h3>

                    {selectedItems.length === 0 ? (
                      <p className="text-gray-400 text-center py-8">
                        No items selected
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {selectedItems.map((item) => (
                          <div
                            key={item.id}
                            className="bg-gray-700/30 p-3 rounded-xl border border-gray-700"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-white text-sm">
                                {item.name}
                              </h5>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center hover:bg-gray-500"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-8 text-center text-sm text-white">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center hover:bg-gray-500"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <p className="text-sm font-semibold text-blue-400">
                                {formatCurrency(item.price * item.quantity)}
                              </p>
                            </div>
                          </div>
                        ))}

                        <div className="border-t border-gray-700 pt-3 mt-4">
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between text-gray-300">
                              <span>Subtotal:</span>
                              <span>{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-gray-300">
                              <span>Tax (10%):</span>
                              <span>{formatCurrency(tax)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t border-gray-700 pt-1 text-white">
                              <span>Total:</span>
                              <span>{formatCurrency(total)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:bg-gray-700/50 transition duration-200"
                  >
                    Back
                  </button>
                  <button
                    onClick={() =>
                      selectedItems.length > 0 && setCurrentStep(3)
                    }
                    disabled={selectedItems.length === 0}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl disabled:bg-gray-700 disabled:cursor-not-allowed hover:from-blue-700 hover:to-purple-700 transition duration-200 border border-blue-500/30"
                  >
                    Generate Bill
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Bill Generation */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    Generate Bill
                  </h2>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-gray-400 hover:text-white flex items-center"
                  >
                    ← Back to Items
                  </button>
                </div>

                {/* Bill Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={billNotes}
                    onChange={(e) => setBillNotes(e.target.value)}
                    className="w-full p-3 border border-gray-700 bg-gray-800/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    rows="3"
                    placeholder="Add any additional notes for this bill..."
                  />
                </div>

                {/* Bill Preview */}
                <div className="border border-gray-700 rounded-xl overflow-hidden">
                  <div ref={printRef} className="bg-gray-800 p-8 text-white">
                    {/* Bill Header */}
                    <div className="border-b-2 border-gray-700 pb-6 mb-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                            INVOICE
                          </h1>
                          <p className="text-gray-400 mt-2">
                            Your Company Name
                          </p>
                          <p className="text-sm text-gray-500">
                            123 Business Street, City, State 12345
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">
                            Invoice Date: {new Date().toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-400">
                            Invoice #: INV-{Date.now()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-white mb-2">
                        Bill To:
                      </h3>
                      <p className="font-medium text-blue-300">
                        {selectedCustomer.customerName}
                      </p>
                      <p className="text-sm text-gray-400">
                        Account: {selectedCustomer.accountNumber}
                      </p>
                      <p className="text-sm text-gray-400">
                        {selectedCustomer.customerEmail}
                      </p>
                      <p className="text-sm text-gray-400">
                        {selectedCustomer.contactNumber}
                      </p>
                      <p className="text-sm text-gray-400">
                        {selectedCustomer.customerAddress}
                      </p>
                    </div>

                    {/* Items Table */}
                    <table className="w-full mb-6">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-2 font-semibold text-gray-300">
                            Description
                          </th>
                          <th className="text-center py-2 font-semibold text-gray-300">
                            Qty
                          </th>
                          <th className="text-right py-2 font-semibold text-gray-300">
                            Rate
                          </th>
                          <th className="text-right py-2 font-semibold text-gray-300">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedItems.map((item) => (
                          <tr
                            key={item.id}
                            className="border-b border-gray-700"
                          >
                            <td className="py-3">
                              <p className="font-medium text-white">{item.name}</p>
                              <p className="text-sm text-gray-400">
                                {item.category}
                              </p>
                            </td>
                            <td className="text-center py-3 text-white">
                              {item.quantity}
                            </td>
                            <td className="text-right py-3 text-blue-400">
                              {formatCurrency(item.price)}
                            </td>
                            <td className="text-right py-3 text-blue-400">
                              {formatCurrency(item.price * item.quantity)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Totals */}
                    <div className="flex justify-end mb-6">
                      <div className="w-64">
                        <div className="flex justify-between py-1 text-gray-300">
                          <span>Subtotal:</span>
                          <span>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between py-1 text-gray-300">
                          <span>Tax (10%):</span>
                          <span>{formatCurrency(tax)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-t border-gray-700 font-bold text-lg text-white">
                          <span>Total:</span>
                          <span>{formatCurrency(total)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    {billNotes && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-white mb-2">
                          Notes:
                        </h4>
                        <p className="text-gray-400 text-sm">{billNotes}</p>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="text-center text-sm text-gray-500 border-t border-gray-700 pt-4">
                      <p>Thank you for your business!</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between">
                  <button
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-700 text-gray-300 font-semibold rounded-xl hover:bg-gray-700/50 transition duration-200"
                  >
                    New Bill
                  </button>
                  <button
                    onClick={handlePrint}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-teal-700 transition duration-200 flex items-center space-x-2 border border-green-500/30"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Bill</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBillingSystem;