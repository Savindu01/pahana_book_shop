import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function Books() {
  // State management
  const [books, setBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Form state - matching your API structure
  const [formData, setFormData] = useState({
    itemCode: "",
    itemName: "",
    description: "",
    itemPrice: "",
    quantity: "",
  });

  // API base URL
  const API_BASE_URL = "http://localhost:8080/api/v1/item";

  // SweetAlert2 configuration
  const swalConfig = {
    background: "#1f2937",
    color: "#f9fafb",
    confirmButtonColor: "#3b82f6",
    cancelButtonColor: "#ef4444",
    customClass: {
      popup: "rounded-2xl border border-gray-700",
      title: "text-white",
      content: "text-gray-300",
      confirmButton: "rounded-xl px-6 py-2 font-medium",
      cancelButton: "rounded-xl px-6 py-2 font-medium",
    },
  };

  // Fetch all books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch all books from API
  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/get-all-items`);
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      Swal.fire({
        ...swalConfig,
        icon: "error",
        title: "Error!",
        text: "Failed to load books. Please try again.",
        confirmButtonText: "OK",
      });
      console.error("Error fetching books:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Open modal for adding a new book
  const openAddModal = () => {
    setCurrentBook(null);
    setFormData({
      itemCode: "",
      itemName: "",
      description: "",
      itemPrice: "",
      quantity: "",
    });
    setIsModalOpen(true);
  };

  // Open modal for editing a book
  const openEditModal = (book) => {
    setCurrentBook(book);
    setFormData({
      itemCode: book.itemCode,
      itemName: book.itemName,
      description: book.description,
      itemPrice: book.itemPrice,
      quantity: book.quantity,
    });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      itemCode: "",
      itemName: "",
      description: "",
      itemPrice: "",
      quantity: "",
    });
  };

  // Save book (both add and edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show loading
    Swal.fire({
      ...swalConfig,
      title: currentBook ? "Updating Book..." : "Adding Book...",
      text: "Please wait while we process your request.",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const bookData = {
        itemCode: formData.itemCode,
        itemName: formData.itemName,
        description: formData.description,
        itemPrice: parseFloat(formData.itemPrice),
        quantity: parseInt(formData.quantity),
      };

      let response;
      if (currentBook) {
        // Update existing book
        bookData.itemId = currentBook.itemId;
        response = await fetch(`${API_BASE_URL}/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        });
      } else {
        // Add new book
        response = await fetch(`${API_BASE_URL}/save`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        });
      }

      if (!response.ok) {
        throw new Error(`Failed to ${currentBook ? "update" : "save"} book`);
      }

      // Success notification
      Swal.fire({
        ...swalConfig,
        icon: "success",
        title: "Success!",
        text: `Book ${currentBook ? "updated" : "added"} successfully!`,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      closeModal();
      fetchBooks(); // Refresh the books list
    } catch (err) {
      Swal.fire({
        ...swalConfig,
        icon: "error",
        title: "Error!",
        text: `Failed to ${
          currentBook ? "update" : "save"
        } book. Please try again.`,
        confirmButtonText: "OK",
      });
      console.error("Error saving book:", err);
    }
  };

  // Confirm delete with SweetAlert2
  const confirmDelete = (book) => {
    Swal.fire({
      ...swalConfig,
      title: "Are you sure?",
      html: `You want to delete "<strong>${book.itemName}</strong>" (Code: <strong>${book.itemCode}</strong>)?<br><br>This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBook(book);
      }
    });
  };

  // Delete book
  const deleteBook = async (book) => {
    // Show loading
    Swal.fire({
      ...swalConfig,
      title: "Deleting Book...",
      text: "Please wait while we delete the book.",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(
        `${API_BASE_URL}/delete-item/${book.itemId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      // Success notification
      Swal.fire({
        ...swalConfig,
        icon: "success",
        title: "Deleted!",
        text: "Book has been deleted successfully.",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      fetchBooks(); // Refresh the books list
    } catch (err) {
      Swal.fire({
        ...swalConfig,
        icon: "error",
        title: "Error!",
        text: "Failed to delete book. Please try again.",
        confirmButtonText: "OK",
      });
      console.error("Error deleting book:", err);
    }
  };

  // Show book details in a modal
  const showBookDetails = (book) => {
    Swal.fire({
      ...swalConfig,
      title: book.itemName,
      html: `
        <div class="text-left space-y-3">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="text-gray-400 text-sm">Item Code:</span>
              <div class="text-blue-400 font-semibold">${book.itemCode}</div>
            </div>
            <div>
              <span class="text-gray-400 text-sm">Item ID:</span>
              <div class="text-white font-semibold">${book.itemId}</div>
            </div>
          </div>
          <div>
            <span class="text-gray-400 text-sm">Description:</span>
            <div class="text-white">${book.description}</div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="text-gray-400 text-sm">Price:</span>
              <div class="text-green-400 font-semibold text-lg">$${book.itemPrice}</div>
            </div>
            <div>
              <span class="text-gray-400 text-sm">Quantity:</span>
              <div class="text-white font-semibold text-lg">${book.quantity}</div>
            </div>
          </div>
        </div>
      `,
      width: "500px",
      showCancelButton: true,
      confirmButtonText: "Edit Book",
      cancelButtonText: "Close",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        openEditModal(book);
      }
    });
  };

  // Bulk operations confirmation
  const confirmBulkDelete = () => {
    if (books.length === 0) {
      Swal.fire({
        ...swalConfig,
        icon: "info",
        title: "No Books",
        text: "There are no books to delete.",
        confirmButtonText: "OK",
      });
      return;
    }

    Swal.fire({
      ...swalConfig,
      title: "Delete All Books?",
      html: `Are you sure you want to delete <strong>all ${books.length} books</strong>?<br><br>This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete all!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // This would be implemented based on your API
        Swal.fire({
          ...swalConfig,
          icon: "info",
          title: "Feature Not Implemented",
          text: "Bulk delete feature would be implemented here.",
          confirmButtonText: "OK",
        });
      }
    });
  };

  // Filter books based on search term
  const filteredBooks = books.filter(
    (book) =>
      book.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Books Management
          </h1>
          <p className="text-gray-400 mt-2">
            Manage your bookstore inventory with ease
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-slate-800 rounded-2xl shadow-lg p-6 border border-gray-700/50 backdrop-blur-sm transition-all hover:shadow-xl">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  ></path>
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-white">
                  {books.length}
                </h2>
                <p className="text-gray-400">Total Books</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-slate-800 rounded-2xl shadow-lg p-6 border border-gray-700/50 backdrop-blur-sm transition-all hover:shadow-xl">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-white">
                  {filteredBooks.length}
                </h2>
                <p className="text-gray-400">Filtered Results</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-slate-800 rounded-2xl shadow-lg p-6 border border-gray-700/50 backdrop-blur-sm transition-all hover:shadow-xl">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-pink-500/20 text-pink-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  ></path>
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-white">
                  {books.reduce((sum, book) => sum + book.quantity, 0)}
                </h2>
                <p className="text-gray-400">Total Quantity</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-gradient-to-br from-gray-800 to-slate-800 rounded-2xl shadow-lg p-6 mb-8 flex flex-col sm:flex-row justify-between items-center border border-gray-700/50 backdrop-blur-sm">
          <div className="relative w-full sm:w-96 mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="Search by name, code, or description..."
              className="pl-12 pr-4 py-3 w-full border border-gray-700/50 bg-gray-800/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={openAddModal}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl flex items-center shadow-md hover:shadow-lg transition-all border border-blue-500/30"
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add New Book
            </button>
            {/* <button
              onClick={confirmBulkDelete}
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium py-3 px-6 rounded-xl flex items-center shadow-md hover:shadow-lg transition-all border border-red-500/30"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete All
            </button> */}
          </div>
        </div>

        {/* Books Table */}
        <div className="bg-gradient-to-br from-gray-800 to-slate-800 rounded-2xl shadow-lg overflow-hidden border border-gray-700/50 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800/70">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Item Details
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Code
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/30 divide-y divide-gray-700">
                {isLoading ? (
                  // Skeleton loading state
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-700 rounded w-32"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-700 rounded w-28"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-700 rounded w-20"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-700 rounded w-16"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-700 rounded w-16"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="h-8 bg-gray-700 rounded w-16 inline-block mr-2"></div>
                        <div className="h-8 bg-gray-700 rounded w-16 inline-block mr-2"></div>
                        <div className="h-8 bg-gray-700 rounded w-16 inline-block"></div>
                      </td>
                    </tr>
                  ))
                ) : filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <tr
                      key={book.itemId}
                      className="hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className="h-10 w-10 flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => showBookDetails(book)}
                            title="Click to view details"
                          >
                            {book.itemName.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div
                              className="text-sm font-medium text-white cursor-pointer hover:text-blue-400 transition-colors"
                              onClick={() => showBookDetails(book)}
                              title="Click to view details"
                            >
                              {book.itemName}
                            </div>
                            <div className="text-sm text-gray-400">
                              ID: {book.itemId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md inline-block">
                          {book.itemCode}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className="text-sm text-gray-300 max-w-xs truncate"
                          title={book.description}
                        >
                          {book.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-green-400">
                          ${book.itemPrice}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {book.quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => showBookDetails(book)}
                          className="text-green-400 hover:text-green-300 mr-2 bg-green-500/10 hover:bg-green-500/20 px-3 py-1 rounded-lg transition-colors border border-green-500/20"
                          title="View Details"
                        >
                          View
                        </button>
                        <button
                          onClick={() => openEditModal(book)}
                          className="text-blue-400 hover:text-blue-300 mr-2 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1 rounded-lg transition-colors border border-blue-500/20"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => confirmDelete(book)}
                          className="text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-1 rounded-lg transition-colors border border-red-500/20"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <h3 className="mt-2 text-lg font-medium text-white">
                        No items found
                      </h3>
                      <p className="mt-1 text-sm text-gray-400">
                        {searchTerm
                          ? "Try a different search term."
                          : "Get started by adding a new book."}
                      </p>
                      <div className="mt-6">
                        <button
                          onClick={openAddModal}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 border border-blue-500/30"
                        >
                          <svg
                            className="-ml-1 mr-2 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          Add Item
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Books Count */}
        <div className="mt-4 text-sm text-gray-400 flex justify-between items-center">
          <span>
            Showing {filteredBooks.length} of {books.length} books
          </span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-blue-400 hover:text-blue-300 flex items-center"
            >
              Clear search
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit Book */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center p-4 z-50">
          <div className="relative bg-gradient-to-br from-gray-800 to-slate-800 rounded-2xl shadow-xl max-w-md w-full mx-auto p-6 animate-scale-in border border-gray-700/50">
            <div className="flex justify-between items-center pb-4 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">
                {currentBook ? "Edit Book" : "Add New Book"}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-300 rounded-full hover:bg-gray-700/50 p-1 transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label
                  htmlFor="itemCode"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Item Code
                </label>
                <input
                  type="text"
                  id="itemCode"
                  name="itemCode"
                  value={formData.itemCode}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-700 bg-gray-800/50 text-white rounded-xl shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="itemName"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Item Name
                </label>
                <input
                  type="text"
                  id="itemName"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-700 bg-gray-800/50 text-white rounded-xl shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 block w-full border border-gray-700 bg-gray-800/50 text-white rounded-xl shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors resize-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="itemPrice"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Price (Rs)
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="itemPrice"
                  name="itemPrice"
                  value={formData.itemPrice}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-700 bg-gray-800/50 text-white rounded-xl shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-700 bg-gray-800/50 text-white rounded-xl shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-700 shadow-sm text-sm font-medium rounded-xl text-gray-300 bg-gray-800/50 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all border border-blue-500/30"
                >
                  {currentBook ? "Update Book" : "Add Book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }

        /* SweetAlert2 custom styles */
        :global(.swal2-popup) {
          font-family: inherit !important;
        }

        :global(.swal2-title) {
          color: #f9fafb !important;
        }

        :global(.swal2-html-container) {
          color: #d1d5db !important;
        }

        :global(.swal2-confirm) {
          background: linear-gradient(to right, #3b82f6, #8b5cf6) !important;
          border: 1px solid rgba(59, 130, 246, 0.3) !important;
        }

        :global(.swal2-cancel) {
          background: linear-gradient(to right, #ef4444, #f59e0b) !important;
          border: 1px solid rgba(239, 68, 68, 0.3) !important;
        }

        :global(.swal2-progress-steps) {
          background: #1f2937 !important;
        }

        :global(.swal2-timer-progress-bar) {
          background: linear-gradient(to right, #3b82f6, #8b5cf6) !important;
        }
      `}</style>
    </div>
  );
}

export default Books;
