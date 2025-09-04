import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  User,
  Users,
  Book,
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  RefreshCw,
  LogIn,
  UserPlus,
  ShoppingCart,
  Calculator,
} from "lucide-react";

const Help = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const Section = ({ id, title, icon: Icon, children }) => (
    <div className="bg-slate-800 rounded-lg border border-slate-700 mb-4">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-700 transition-colors rounded-lg"
      >
        <div className="flex items-center space-x-3">
          <Icon className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        {openSections[id] ? (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronRight className="w-5 h-5 text-slate-400" />
        )}
      </button>
      {openSections[id] && (
        <div className="px-4 pb-4 text-slate-300 space-y-3">{children}</div>
      )}
    </div>
  );

  const Step = ({ number, title, children }) => (
    <div className="flex space-x-3 mb-4">
      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
        {number}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-blue-300 mb-2">{title}</h4>
        <div className="text-slate-300">{children}</div>
      </div>
    </div>
  );

  const Feature = ({ icon: Icon, title, description }) => (
    <div className="flex items-start space-x-3 p-3 bg-slate-700 rounded-lg">
      <Icon className="w-5 h-5 text-blue-400 mt-0.5" />
      <div>
        <h4 className="font-medium text-white mb-1">{title}</h4>
        <p className="text-sm text-slate-300">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-4 rounded-full">
              <Book className="w-12 h-12 text-white" />
            </div>
          </div>
          {/* <h1 className="text-3xl font-bold text-white mb-2">
            <span className="text-blue-400">PAHANA</span> <span className="text-slate-300">BOOKSHOP</span>
          </h1> */}
          <p className="text-xl text-slate-400 mb-4">Help & User Guide</p>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Learn how to use the Pahana Bookshop billing system effectively.
            This comprehensive guide covers user registration, customer
            management, inventory control, and bill generation.
          </p>
        </div>

        {/* Getting Started */}
        <Section id="getting-started" title="Getting Started" icon={LogIn}>
          <h4 className="font-medium text-blue-300 mb-3">System Access</h4>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Feature
              icon={User}
              title="Admin Login"
              description="Administrators can access the full system with credentials to manage customers, books, and bills."
            />
            <Feature
              icon={UserPlus}
              title="User Registration"
              description="New users can register accounts to access basic features and manage their profiles."
            />
          </div>
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
            <h5 className="font-medium text-blue-300 mb-2">
              Demo Credentials:
            </h5>
            <p className="text-sm text-slate-300">
              Admin: admin@pahana.com / admin123
              <br />
              User: user@pahana.com / user123
            </p>
          </div>
        </Section>

        {/* Customer Management */}
        <Section
          id="customer-management"
          title="Customer Management"
          icon={Users}
        >
          <p className="mb-4">
            Manage your bookstore customers with comprehensive tools for adding,
            editing, and tracking customer information.
          </p>

          <h4 className="font-medium text-blue-300 mb-3">
            Customer Operations:
          </h4>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Feature
              icon={Plus}
              title="Add New Customer"
              description="Click 'Add New Customer' button to create customer profiles with contact details and account numbers."
            />
            <Feature
              icon={Search}
              title="Search Customers"
              description="Search by name, account number, or email using the search bar for quick customer lookup."
            />
            <Feature
              icon={Edit}
              title="Edit Customer Info"
              description="Update customer details, contact information, and account status as needed."
            />
            <Feature
              icon={Trash2}
              title="Delete Customers"
              description="Remove inactive or duplicate customer records with confirmation prompts."
            />
          </div>

          <h4 className="font-medium text-blue-300 mb-3">
            Customer Information Displayed:
          </h4>
          <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
            <li>
              <strong>Account Number:</strong> Unique identifier (e.g., PAH0006)
            </li>
            <li>
              <strong>Name:</strong> Customer full name
            </li>
            <li>
              <strong>Contact:</strong> Phone number and email address
            </li>
            <li>
              <strong>Address:</strong> Customer location details
            </li>
          </ul>
        </Section>

        {/* Book/Inventory Management */}
        <Section
          id="book-management"
          title="Book & Inventory Management"
          icon={Book}
        >
          <p className="mb-4">
            Maintain your bookstore inventory with detailed book information,
            pricing, and stock levels.
          </p>

          <h4 className="font-medium text-blue-300 mb-3">Book Operations:</h4>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Feature
              icon={Plus}
              title="Add New Book"
              description="Add books with details like title, code, description, price, and quantity."
            />
            <Feature
              icon={Search}
              title="Search Books"
              description="Search by book name, code, or description to quickly find inventory items."
            />
            <Feature
              icon={Eye}
              title="View Book Details"
              description="View comprehensive book information including stock levels and pricing."
            />
            <Feature
              icon={Edit}
              title="Edit Book Info"
              description="Update book details, adjust pricing, and modify stock quantities."
            />
          </div>

          <h4 className="font-medium text-blue-300 mb-3">
            Book Information Tracked:
          </h4>
          <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
            <li>
              <strong>Book Details:</strong> Title and unique book ID
            </li>
            <li>
              <strong>Code:</strong> Book identification code for easy reference
            </li>
            <li>
              <strong>Description:</strong> Book details and categories
            </li>
            <li>
              <strong>Price:</strong> Current selling price per unit
            </li>
            <li>
              <strong>Quantity:</strong> Available stock count
            </li>
          </ul>
        </Section>

        {/* Bill Generation Process */}
        <Section
          id="bill-generation"
          title="Bill Generation Process"
          icon={FileText}
        >
          <p className="mb-4">
            Generate bills efficiently with our step-by-step process for
            selecting customers and items.
          </p>

          <div className="bg-slate-700 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-blue-300 mb-3">
              Step-by-Step Bill Generation:
            </h4>

            <Step number="1" title="Select Customer">
              <p className="mb-2">
                Navigate to the Bills section and start the billing process:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                <li>Click on "Select Customer" in the billing interface</li>
                <li>Search for the customer by name, ID, or account number</li>
                <li>
                  Customer cards display: Name, ID, Account Number, Email, and
                  Contact
                </li>
                <li>Click on the desired customer card to select them</li>
              </ul>
            </Step>

            <Step number="2" title="Add Items">
              <p className="mb-2">
                After selecting a customer, add books to the bill:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                <li>Click "Add Items" to browse available books</li>
                <li>Search books by name, code, or description</li>
                <li>Select books from your inventory</li>
                <li>Specify quantities for each book</li>
                <li>Review item prices and availability</li>
              </ul>
            </Step>

            <Step number="3" title="Generate Bill">
              <p className="mb-2">Complete the billing process:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                <li>Review selected customer and items</li>
                <li>Verify quantities and pricing</li>
                <li>Click "Generate Bill" to create the invoice</li>
                <li>Bill total is calculated automatically</li>
                <li>Print or save the generated bill</li>
              </ul>
            </Step>
          </div>

          <h4 className="font-medium text-blue-300 mb-3">Bill Features:</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <Feature
              icon={Calculator}
              title="Automatic Calculations"
              description="System automatically calculates totals, taxes, and final amounts."
            />
            <Feature
              icon={RefreshCw}
              title="Real-time Updates"
              description="Bills update in real-time as you add or remove items and modify quantities."
            />
          </div>
        </Section>

        {/* Dashboard Overview */}
        <Section id="dashboard" title="Dashboard Overview" icon={ShoppingCart}>
          <p className="mb-4">
            The dashboard provides a comprehensive overview of your bookstore
            operations.
          </p>

          <h4 className="font-medium text-blue-300 mb-3">
            Dashboard Statistics:
          </h4>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="font-medium text-white">Customer Stats</span>
              </div>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Total customers registered</li>
                <li>• Filtered search results</li>
                <li>• New customers this month</li>
              </ul>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Book className="w-5 h-5 text-blue-400" />
                <span className="font-medium text-white">Inventory Stats</span>
              </div>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Total books in stock</li>
                <li>• Total quantity available</li>
                <li>• Filtered inventory results</li>
              </ul>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <span className="font-medium text-white">Billing Stats</span>
              </div>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Items currently in bill</li>
                <li>• Current bill total amount</li>
                <li>• Recent billing activity</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Tips & Best Practices */}
        <Section id="tips" title="Tips & Best Practices" icon={RefreshCw}>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-blue-300 mb-2">
                Customer Management Tips:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
                <li>Always verify customer details before generating bills</li>
                <li>
                  Use the search function to quickly find existing customers
                </li>
                <li>Keep customer contact information up to date</li>
                <li>Assign unique account numbers for easy identification</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-blue-300 mb-2">
                Inventory Management Tips:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
                <li>
                  Regularly update book quantities to reflect current stock
                </li>
                <li>Use descriptive book codes for easy identification</li>
                <li>Monitor stock levels to prevent overselling</li>
                <li>Keep pricing information current and accurate</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-blue-300 mb-2">
                Billing Best Practices:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-slate-300 ml-4">
                <li>Double-check customer selection before adding items</li>
                <li>
                  Verify item quantities and prices before generating bills
                </li>
                <li>Review the bill total before finalizing</li>
                <li>Save or print bills immediately after generation</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Contact & Support */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">
            Need Additional Help?
          </h3>
          <p className="text-slate-300 mb-4">
            If you need further assistance with the Pahana Bookshop system,
            please contact our support team.
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <span className="text-blue-400">📧 support@pahana.com</span>
            <span className="text-blue-400">📞 +1 (555) 123-4567</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
