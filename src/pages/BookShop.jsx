import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Star,
  Menu,
  X,
  BookOpen,
  Filter,
  Home,
  Phone,
  Mail,
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  Edit,
  Settings,
  Download,
  Printer,
  Calendar,
  CreditCard,
  FileText,
  Camera,
} from "lucide-react";

function BookShop() {
  // Sample book data with enhanced properties
  const booksData = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: 12.99,
      originalPrice: 16.99,
      category: "Classic",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description:
        "A story of wealth, love, and the American Dream in the Jazz Age.",
      rating: 4.5,
      reviews: 2847,
      bestseller: true,
      discount: 24,
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: 14.5,
      originalPrice: 18.5,
      category: "Fiction",
      image:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description:
        "A powerful story of racial injustice and the loss of innocence.",
      rating: 4.8,
      reviews: 3921,
      bestseller: false,
      discount: 22,
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      price: 10.75,
      originalPrice: 13.99,
      category: "Dystopian",
      image:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description:
        "A dystopian social science fiction novel that examines the consequences of totalitarianism.",
      rating: 4.7,
      reviews: 5234,
      bestseller: true,
      discount: 23,
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      price: 9.99,
      originalPrice: 12.99,
      category: "Romance",
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description:
        "A romantic novel of manners that depicts the emotional development of the protagonist.",
      rating: 4.6,
      reviews: 1876,
      bestseller: false,
      discount: 23,
    },
    {
      id: 5,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      price: 16.25,
      originalPrice: 21.99,
      category: "Fantasy",
      image:
        "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description:
        "A fantasy novel about the adventures of hobbit Bilbo Baggins.",
      rating: 4.9,
      reviews: 4567,
      bestseller: true,
      discount: 26,
    },
    {
      id: 6,
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      price: 18.99,
      originalPrice: 24.99,
      category: "Fantasy",
      image:
        "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description:
        "The first novel in the Harry Potter series about a young wizard.",
      rating: 4.8,
      reviews: 8932,
      bestseller: true,
      discount: 24,
    },
  ];

  // State management
  const [books, setBooks] = useState(booksData);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showReceipt, setShowReceipt] = useState(false);
  const [currentPage, setCurrentPage] = useState("home"); // 'home', 'cart', 'wishlist', 'profile', 'orders'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  // Customer Profile State
  const [customerProfile, setCustomerProfile] = useState({
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+94 71 234 5678",
    address: {
      street: "123 Main Street",
      city: "Tangalle",
      province: "Southern Province",
      postalCode: "82200",
      country: "Sri Lanka",
    },
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80",
    memberSince: "2024-01-15",
    preferences: {
      favoriteGenres: ["Fantasy", "Classic", "Fiction"],
      notifications: {
        email: true,
        sms: false,
        newReleases: true,
        promotions: true,
      },
    },
  });

  // Filter and sort books
  useEffect(() => {
    let filteredBooks = booksData;

    if (searchTerm) {
      filteredBooks = filteredBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filteredBooks = filteredBooks.filter(
        (book) => book.category === selectedCategory
      );
    }

    // Sort books
    switch (sortBy) {
      case "price-low":
        filteredBooks.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filteredBooks.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filteredBooks.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Featured/default order
        filteredBooks.sort((a, b) => b.bestseller - a.bestseller);
    }

    setBooks(filteredBooks);
  }, [searchTerm, selectedCategory, sortBy]);

  // Get unique categories
  const categories = [
    "All",
    ...new Set(booksData.map((book) => book.category)),
  ];

  // Add to cart function
  const addToCart = (book) => {
    const existingItem = cart.find((item) => item.id === book.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
  };

  // Toggle wishlist
  const toggleWishlist = (book) => {
    const existingItem = wishlist.find((item) => item.id === book.id);

    if (existingItem) {
      setWishlist(wishlist.filter((item) => item.id !== book.id));
    } else {
      setWishlist([...wishlist, book]);
    }
  };

  // Remove from cart function
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Update quantity function
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Calculate total functions
  const calculateSubtotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const calculateTax = () => {
    return (parseFloat(calculateSubtotal()) * 0.08).toFixed(2);
  };

  const calculateShipping = () => {
    const subtotal = parseFloat(calculateSubtotal());
    return subtotal > 50 ? 0 : 5.99;
  };

  const calculateFinalTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const tax = parseFloat(calculateTax());
    const shipping = calculateShipping();
    return (subtotal + tax + shipping).toFixed(2);
  };

  // Generate order ID
  const generateOrderId = () => {
    return `ORD${Date.now().toString().slice(-8)}`;
  };

  // Complete order and add to history
  const completeOrder = () => {
    const order = {
      id: generateOrderId(),
      date: new Date().toISOString(),
      items: [...cart],
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      shipping: calculateShipping(),
      total: calculateFinalTotal(),
      status: "Completed",
      shippingAddress: customerProfile.address,
      customerInfo: {
        name: `${customerProfile.firstName} ${customerProfile.lastName}`,
        email: customerProfile.email,
        phone: customerProfile.phone,
      },
    };

    setOrderHistory([order, ...orderHistory]);
    setCurrentOrder(order);
    setCart([]);
    setShowReceipt(false);
    setCurrentPage("orders");
  };

  // Print receipt
  const printReceipt = (
    order = currentOrder || {
      id: generateOrderId(),
      date: new Date().toISOString(),
      items: cart,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      shipping: calculateShipping(),
      total: calculateFinalTotal(),
      customerInfo: {
        name: `${customerProfile.firstName} ${customerProfile.lastName}`,
        email: customerProfile.email,
        phone: customerProfile.phone,
      },
      shippingAddress: customerProfile.address,
    }
  ) => {
    const printContent = generateReceiptHTML(order);
    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  // Download receipt
  const downloadReceipt = (order = null) => {
    const orderData = order || {
      id: generateOrderId(),
      date: new Date().toISOString(),
      items: cart,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      shipping: calculateShipping(),
      total: calculateFinalTotal(),
      customerInfo: {
        name: `${customerProfile.firstName} ${customerProfile.lastName}`,
        email: customerProfile.email,
        phone: customerProfile.phone,
      },
      shippingAddress: customerProfile.address,
    };

    const receiptData = generateReceiptText(orderData);
    const blob = new Blob([receiptData], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Receipt_${orderData.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Generate receipt HTML for printing
  const generateReceiptHTML = (order) => {
    return `
      <html>
        <head>
          <title>Receipt - ${order.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .company-name { font-size: 24px; font-weight: bold; color: #4f46e5; }
            .order-info { margin: 20px 0; }
            .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .items-table th, .items-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            .items-table th { background-color: #f8f9fa; }
            .totals { margin-top: 20px; }
            .total-row { display: flex; justify-content: space-between; margin: 5px 0; }
            .final-total { font-weight: bold; font-size: 18px; border-top: 2px solid #4f46e5; padding-top: 10px; }
            .footer { margin-top: 40px; text-align: center; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-name">Pahana Bookshop</div>
            <p>Your trusted partner in discovering amazing books</p>
            <p>Tangalle, Southern Province, Sri Lanka</p>
          </div>
          
          <div class="order-info">
            <h3>Order Receipt</h3>
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Date:</strong> ${new Date(
              order.date
            ).toLocaleDateString()}</p>
            <p><strong>Customer:</strong> ${order.customerInfo.name}</p>
            <p><strong>Email:</strong> ${order.customerInfo.email}</p>
            <p><strong>Phone:</strong> ${order.customerInfo.phone}</p>
          </div>

          <table class="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Author</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items
                .map(
                  (item) => `
                <tr>
                  <td>${item.title}</td>
                  <td>${item.author}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.price.toFixed(2)}</td>
                  <td>$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>

          <div class="totals">
            <div class="total-row">
              <span>Subtotal:</span>
              <span>$${order.subtotal}</span>
            </div>
            <div class="total-row">
              <span>Tax (8%):</span>
              <span>$${order.tax}</span>
            </div>
            <div class="total-row">
              <span>Shipping:</span>
              <span>${
                order.shipping === 0 ? "Free" : "$" + order.shipping.toFixed(2)
              }</span>
            </div>
            <div class="total-row final-total">
              <span>Total:</span>
              <span>$${order.total}</span>
            </div>
          </div>

          <div class="footer">
            <p>Thank you for shopping with Pahana Bookshop!</p>
            <p>Visit us at www.pahanabookshop.com</p>
          </div>
        </body>
      </html>
    `;
  };

  // Generate receipt text for download
  const generateReceiptText = (order) => {
    return `
PAHANA BOOKSHOP
Your trusted partner in discovering amazing books
Tangalle, Southern Province, Sri Lanka

======================================
            ORDER RECEIPT
======================================

Order ID: ${order.id}
Date: ${new Date(order.date).toLocaleDateString()}
Customer: ${order.customerInfo.name}
Email: ${order.customerInfo.email}
Phone: ${order.customerInfo.phone}

--------------------------------------
ITEMS ORDERED:
--------------------------------------
${order.items
  .map(
    (item) =>
      `${item.title}
  Author: ${item.author}
  Quantity: ${item.quantity} x $${item.price.toFixed(2)} = $${(
        item.price * item.quantity
      ).toFixed(2)}
`
  )
  .join("\n")}

--------------------------------------
ORDER SUMMARY:
--------------------------------------
Subtotal: $${order.subtotal}
Tax (8%): $${order.tax}
Shipping: ${order.shipping === 0 ? "Free" : "$" + order.shipping.toFixed(2)}
--------------------------------------
TOTAL: $${order.total}
--------------------------------------

Thank you for shopping with Pahana Bookshop!
Visit us at www.pahanabookshop.com
    `;
  };

  // Navigation function
  const navigateTo = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  // Update profile
  const updateProfile = (updatedProfile) => {
    setCustomerProfile(updatedProfile);
    setShowProfileEdit(false);
  };

  // Navbar component
  const Navbar = () => (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <button
              onClick={() => navigateTo("home")}
              className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              Pahana Bookshop
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigateTo("home")}
              className={`flex items-center space-x-1 transition-colors ${
                currentPage === "home"
                  ? "text-indigo-600"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              <Home className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo("orders")}
              className={`flex items-center space-x-1 transition-colors ${
                currentPage === "orders"
                  ? "text-indigo-600"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Orders</span>
            </button>

            <a
              href="#"
              className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Contact</span>
            </a>
          </div>

          {/* Search Bar */}
          {currentPage === "home" && (
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search books, authors, genres..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button
              className={`p-2 rounded-full transition-colors ${
                currentPage === "profile"
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
              }`}
              onClick={() => navigateTo("profile")}
            >
              <User className="w-5 h-5" />
            </button>

            <button
              className={`relative p-2 rounded-full transition-colors ${
                currentPage === "wishlist"
                  ? "text-red-600 bg-red-50"
                  : "text-gray-600 hover:text-red-500 hover:bg-red-50"
              }`}
              onClick={() => navigateTo("wishlist")}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              className={`relative p-2 rounded-full transition-colors ${
                currentPage === "cart"
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
              }`}
              onClick={() => navigateTo("cart")}
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-indigo-600 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {currentPage === "home" && (
          <div className="lg:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search books, authors..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <button
              onClick={() => navigateTo("home")}
              className="block py-2 text-gray-700 hover:text-indigo-600 transition-colors w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => navigateTo("orders")}
              className="block py-2 text-gray-700 hover:text-indigo-600 transition-colors w-full text-left"
            >
              My Orders
            </button>
            <button
              onClick={() => navigateTo("profile")}
              className="block py-2 text-gray-700 hover:text-indigo-600 transition-colors w-full text-left"
            >
              Profile
            </button>
            <a
              href="#"
              className="block py-2 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );

  // Profile Page Component
  const ProfilePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateTo("home")}
              className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          </div>
          <button
            onClick={() => setShowProfileEdit(true)}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={customerProfile.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mt-4">
                  {customerProfile.firstName} {customerProfile.lastName}
                </h2>
                <p className="text-indigo-600 font-medium">
                  {customerProfile.email}
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  Member since{" "}
                  {new Date(customerProfile.memberSince).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{customerProfile.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">{customerProfile.email}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Home className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="text-gray-700">
                    <p>{customerProfile.address.street}</p>
                    <p>
                      {customerProfile.address.city},{" "}
                      {customerProfile.address.province}
                    </p>
                    <p>
                      {customerProfile.address.postalCode},{" "}
                      {customerProfile.address.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      {orderHistory.length}
                    </p>
                  </div>
                  <FileText className="w-8 h-8 text-indigo-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Wishlist Items</p>
                    <p className="text-2xl font-bold text-red-600">
                      {wishlist.length}
                    </p>
                  </div>
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Cart Items</p>
                    <p className="text-2xl font-bold text-green-600">
                      {cart.reduce((total, item) => total + item.quantity, 0)}
                    </p>
                  </div>
                  <ShoppingCart className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>

            {/* Favorite Genres */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Favorite Genres
              </h3>
              <div className="flex flex-wrap gap-2">
                {customerProfile.preferences.favoriteGenres.map((genre) => (
                  <span
                    key={genre}
                    className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Notification Preferences
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Email Notifications</span>
                  <div
                    className={`w-12 h-6 rounded-full ${
                      customerProfile.preferences.notifications.email
                        ? "bg-indigo-600"
                        : "bg-gray-300"
                    } relative transition-colors`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        customerProfile.preferences.notifications.email
                          ? "translate-x-6"
                          : "translate-x-0.5"
                      }`}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">SMS Notifications</span>
                  <div
                    className={`w-12 h-6 rounded-full ${
                      customerProfile.preferences.notifications.sms
                        ? "bg-indigo-600"
                        : "bg-gray-300"
                    } relative transition-colors`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        customerProfile.preferences.notifications.sms
                          ? "translate-x-6"
                          : "translate-x-0.5"
                      }`}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">New Releases</span>
                  <div
                    className={`w-12 h-6 rounded-full ${
                      customerProfile.preferences.notifications.newReleases
                        ? "bg-indigo-600"
                        : "bg-gray-300"
                    } relative transition-colors`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        customerProfile.preferences.notifications.newReleases
                          ? "translate-x-6"
                          : "translate-x-0.5"
                      }`}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Promotions</span>
                  <div
                    className={`w-12 h-6 rounded-full ${
                      customerProfile.preferences.notifications.promotions
                        ? "bg-indigo-600"
                        : "bg-gray-300"
                    } relative transition-colors`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                        customerProfile.preferences.notifications.promotions
                          ? "translate-x-6"
                          : "translate-x-0.5"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Profile Edit Modal
  const ProfileEditModal = () => {
    const [editedProfile, setEditedProfile] = useState({ ...customerProfile });

    const handleSave = () => {
      updateProfile(editedProfile);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
            <button
              onClick={() => setShowProfileEdit(false)}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={editedProfile.firstName}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={editedProfile.lastName}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={editedProfile.email}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={editedProfile.phone}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Address
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={editedProfile.address.street}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        address: {
                          ...editedProfile.address,
                          street: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={editedProfile.address.city}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          address: {
                            ...editedProfile.address,
                            city: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Province
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={editedProfile.address.province}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          address: {
                            ...editedProfile.address,
                            province: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={editedProfile.address.postalCode}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          address: {
                            ...editedProfile.address,
                            postalCode: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={editedProfile.address.country}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          address: {
                            ...editedProfile.address,
                            country: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Notification Preferences
              </h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={editedProfile.preferences.notifications.email}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        preferences: {
                          ...editedProfile.preferences,
                          notifications: {
                            ...editedProfile.preferences.notifications,
                            email: e.target.checked,
                          },
                        },
                      })
                    }
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Email Notifications
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={editedProfile.preferences.notifications.sms}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        preferences: {
                          ...editedProfile.preferences,
                          notifications: {
                            ...editedProfile.preferences.notifications,
                            sms: e.target.checked,
                          },
                        },
                      })
                    }
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    SMS Notifications
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={
                      editedProfile.preferences.notifications.newReleases
                    }
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        preferences: {
                          ...editedProfile.preferences,
                          notifications: {
                            ...editedProfile.preferences.notifications,
                            newReleases: e.target.checked,
                          },
                        },
                      })
                    }
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    New Releases
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={editedProfile.preferences.notifications.promotions}
                    onChange={(e) =>
                      setEditedProfile({
                        ...editedProfile,
                        preferences: {
                          ...editedProfile.preferences,
                          notifications: {
                            ...editedProfile.preferences.notifications,
                            promotions: e.target.checked,
                          },
                        },
                      })
                    }
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Promotions & Offers
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              onClick={() => setShowProfileEdit(false)}
            >
              Cancel
            </button>
            <button
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Orders Page Component
  const OrdersPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateTo("home")}
              className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
              {orderHistory.length} orders
            </span>
          </div>
        </div>

        {orderHistory.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <FileText className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No orders yet
            </h2>
            <p className="text-gray-600 mb-8">
              Start shopping to see your order history
            </p>
            <button
              onClick={() => navigateTo("home")}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orderHistory.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div className="mb-4 lg:mb-0">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        Order #{order.id}
                      </h3>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(order.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CreditCard className="w-4 h-4" />
                        <span>${order.total}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => printReceipt(order)}
                      className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print</span>
                    </button>
                    <button
                      onClick={() => downloadReceipt(order)}
                      className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>

                {/* Order Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-600">{item.author}</p>
                        <p className="text-sm font-semibold text-indigo-600">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Subtotal</p>
                      <p className="font-semibold">${order.subtotal}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Tax</p>
                      <p className="font-semibold">${order.tax}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Shipping</p>
                      <p className="font-semibold">
                        {order.shipping === 0
                          ? "Free"
                          : `${order.shipping.toFixed(2)}`}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total</p>
                      <p className="text-lg font-bold text-indigo-600">
                        ${order.total}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Cart Page Component
  const CartPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateTo("home")}
              className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
              {cart.reduce((total, item) => total + item.quantity, 0)} items
            </span>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingCart className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">Add some books to get started</p>
            <button
              onClick={() => navigateTo("home")}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {item.title}
                          </h3>
                          <p className="text-indigo-600 font-medium mb-1">
                            {item.author}
                          </p>
                          <p className="text-sm text-gray-600 mb-3">
                            {item.description}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-indigo-600">
                            ${item.price.toFixed(2)}
                          </span>
                          {item.originalPrice > item.price && (
                            <span className="text-lg text-gray-500 line-through">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-white rounded transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-bold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-white rounded transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-gray-600">Total</p>
                          <p className="text-xl font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      ${calculateSubtotal()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">${calculateTax()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      {calculateShipping() === 0
                        ? "Free"
                        : `${calculateShipping().toFixed(2)}`}
                    </span>
                  </div>
                  {parseFloat(calculateSubtotal()) < 50 && (
                    <p className="text-sm text-indigo-600">
                      Add ${(50 - parseFloat(calculateSubtotal())).toFixed(2)}{" "}
                      more for free shipping!
                    </p>
                  )}
                  <hr className="border-gray-200" />
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-indigo-600">
                      ${calculateFinalTotal()}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setShowReceipt(true)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg transform hover:scale-105"
                  >
                    Proceed to Checkout
                  </button>

                  <button
                    onClick={() => printReceipt()}
                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Receipt</span>
                  </button>

                  <button
                    onClick={() => downloadReceipt()}
                    className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Receipt</span>
                  </button>

                  <button
                    onClick={() => navigateTo("home")}
                    className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Wishlist Page Component
  const WishlistPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateTo("home")}
              className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              {wishlist.length} items
            </span>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-8">Save books you love for later</p>
            <button
              onClick={() => navigateTo("home")}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Explore Books
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlist.map((book) => (
              <div
                key={book.id}
                className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Book Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Remove from Wishlist Button */}
                  <button
                    className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    onClick={() => toggleWishlist(book)}
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {book.bestseller && (
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        BESTSELLER
                      </span>
                    )}
                    {book.discount > 0 && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {book.discount}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* Book Details */}
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(book.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">
                      {book.rating} ({book.reviews})
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-indigo-600 font-medium mb-2">
                    {book.author}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-indigo-600">
                      ${book.price.toFixed(2)}
                    </span>
                    {book.originalPrice > book.price && (
                      <span className="text-lg text-gray-500 line-through">
                        ${book.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    onClick={() => addToCart(book)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Home Page Component
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Your Next
            <span className="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              Great Read
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Explore thousands of books from classics to bestsellers
          </p>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
            Shop Now
          </button>
        </div>
      </section>

      {/* Filters and Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 shadow-sm"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Book Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {book.bestseller && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      BESTSELLER
                    </span>
                  )}
                  {book.discount > 0 && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {book.discount}% OFF
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  className={`absolute top-4 right-4 p-2 rounded-full transition-all ${
                    wishlist.find((item) => item.id === book.id)
                      ? "bg-red-500 text-white"
                      : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
                  }`}
                  onClick={() => toggleWishlist(book)}
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              {/* Book Details */}
              <div className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(book.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    {book.rating} ({book.reviews})
                  </span>
                </div>

                <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-indigo-600 font-medium mb-2">
                  {book.author}
                </p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {book.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-indigo-600">
                    ${book.price.toFixed(2)}
                  </span>
                  {book.originalPrice > book.price && (
                    <span className="text-lg text-gray-500 line-through">
                      ${book.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={() => addToCart(book)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Cart Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-30">
          <div className="bg-white rounded-2xl shadow-2xl p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-full">
                <ShoppingCart className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {cart.reduce((total, item) => total + item.quantity, 0)} items
                </p>
                <p className="text-sm text-gray-600">${calculateSubtotal()}</p>
              </div>
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                onClick={() => navigateTo("cart")}
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">Pahana Bookshop</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner in discovering amazing books and expanding
                your literary horizons.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-700 transition-colors">
                  <span className="text-xs">f</span>
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                  <span className="text-xs">t</span>
                </div>
                <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-700 transition-colors">
                  <span className="text-xs">i</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    New Releases
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Bestsellers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Author Events
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Book Clubs
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Fiction
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Non-Fiction
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mystery
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Romance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sci-Fi & Fantasy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>info@pahanabookshop.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+94 123 456 789</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Home className="w-4 h-4 mt-1" />
                  <span>
                    123 Book Street
                    <br />
                    Tangalle, Southern Province
                    <br />
                    Sri Lanka
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 Pahana Bookshop. All rights reserved. Made with love
              for book lovers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );

  // Receipt Modal
  const ReceiptModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-indigo-800 mb-2">
            Purchase Receipt
          </h2>
          <p className="text-gray-600">Thank you for your order!</p>
        </div>

        <div className="space-y-4 mb-8">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-2 border-b"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <span className="font-bold text-indigo-600">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>${calculateSubtotal()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax:</span>
              <span>${calculateTax()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping:</span>
              <span>
                {calculateShipping() === 0
                  ? "Free"
                  : `${calculateShipping().toFixed(2)}`}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-800">
              Total Amount:
            </span>
            <span className="text-2xl font-bold text-indigo-600">
              ${calculateFinalTotal()}
            </span>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <button
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
            onClick={() => printReceipt()}
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
          <button
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
            onClick={() => downloadReceipt()}
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>

        <div className="flex gap-3">
          <button
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            onClick={() => setShowReceipt(false)}
          >
            Back to Cart
          </button>
          <button
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            onClick={completeOrder}
          >
            Complete Order
          </button>
        </div>
      </div>
    </div>
  );

  // Main render based on current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "cart":
        return <CartPage />;
      case "wishlist":
        return <WishlistPage />;
      case "profile":
        return <ProfilePage />;
      case "orders":
        return <OrdersPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <>
      {renderCurrentPage()}
      {showReceipt && <ReceiptModal />}
      {showProfileEdit && <ProfileEditModal />}
    </>
  );
}

export default BookShop;
