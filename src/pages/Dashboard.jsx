import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Dashboard() {
  // Sample data - in a real app this would come from your API or state management
  const stats = {
    customers: 1248,
    books: 5732,
    sold: 8924,
    revenue: '$86,432'
  };

  const recentSales = [
    { id: 1, title: 'The Silent Patient', customer: 'John Doe', amount: '$24.99', date: '2023-04-12' },
    { id: 2, title: 'Where the Crawdads Sing', customer: 'Jane Smith', amount: '$18.50', date: '2023-04-11' },
    { id: 3, title: 'Educated', customer: 'Robert Johnson', amount: '$21.99', date: '2023-04-10' },
    { id: 4, title: 'The Night Circus', customer: 'Sarah Williams', amount: '$16.95', date: '2023-04-09' },
    { id: 5, title: 'Atomic Habits', customer: 'Michael Brown', amount: '$14.99', date: '2023-04-08' }
  ];

  const booksSoldData = [
    { month: 'Jan', sold: 450 },
    { month: 'Feb', sold: 620 },
    { month: 'Mar', sold: 380 },
    { month: 'Apr', sold: 890 },
    { month: 'May', sold: 720 },
    { month: 'Jun', sold: 1050 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-gray-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-blue-400/5 rounded-full blur-lg"></div>
      </div>

      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 shadow-2xl relative">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Pahana Bookshop Dashboard
              </h1>
              <p className="text-gray-400 mt-1">Welcome back! Here's what's happening with your bookshop.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-500/30">
                <span className="text-sm text-gray-300">Today: </span>
                <span className="text-blue-400 font-medium">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Stats Section */}
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Customer Count Card */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group">
                <div className="px-6 py-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm p-3 rounded-xl border border-blue-500/30">
                      <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-400 truncate">Total Customers</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-bold text-white">{stats.customers}</div>
                          <div className="ml-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900/30 px-6 py-4 border-t border-gray-700/50">
                  <div className="text-sm">
                    <span className="text-green-400 font-medium">+12%</span>
                    <span className="text-gray-400 ml-2">from last month</span>
                  </div>
                </div>
              </div>

              {/* Book Count Card */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl hover:shadow-green-500/10 transition-all duration-300 group">
                <div className="px-6 py-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm p-3 rounded-xl border border-green-500/30">
                      <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-400 truncate">Books in Inventory</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-bold text-white">{stats.books}</div>
                          <div className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900/30 px-6 py-4 border-t border-gray-700/50">
                  <div className="text-sm">
                    <span className="text-green-400 font-medium">+8%</span>
                    <span className="text-gray-400 ml-2">new arrivals</span>
                  </div>
                </div>
              </div>

              {/* Books Sold Card */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 group">
                <div className="px-6 py-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-gradient-to-r from-yellow-500/20 to-orange-600/20 backdrop-blur-sm p-3 rounded-xl border border-yellow-500/30">
                      <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-400 truncate">Books Sold</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-bold text-white">{stats.sold}</div>
                          <div className="ml-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900/30 px-6 py-4 border-t border-gray-700/50">
                  <div className="text-sm">
                    <span className="text-green-400 font-medium">+24%</span>
                    <span className="text-gray-400 ml-2">from last month</span>
                  </div>
                </div>
              </div>

              {/* Revenue Card */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 group">
                <div className="px-6 py-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-gradient-to-r from-purple-500/20 to-pink-600/20 backdrop-blur-sm p-3 rounded-xl border border-purple-500/30">
                      <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-400 truncate">Total Revenue</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-bold text-white">{stats.revenue}</div>
                          <div className="ml-2 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900/30 px-6 py-4 border-t border-gray-700/50">
                  <div className="text-sm">
                    <span className="text-green-400 font-medium">+18%</span>
                    <span className="text-gray-400 ml-2">from last month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts and Recent Activity Section */}
          <div className="mt-8 px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Books Sold Bar Chart */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl">
                <div className="px-6 py-6 border-b border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Books Sold Overview</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-sm text-gray-400">Monthly Sales</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={booksSoldData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="month" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }}
                      />
                      <Bar 
                        dataKey="sold" 
                        fill="url(#colorGradient)"
                        radius={[4, 4, 0, 0]}
                      />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Sales */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl">
                <div className="px-6 py-6 border-b border-gray-700/50">
                  <h3 className="text-xl font-bold text-white">Recent Sales</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentSales.map((sale, index) => (
                      <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg border border-gray-700/30 hover:bg-gray-700/20 transition-all duration-200">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                              <span className="text-blue-400 font-bold text-sm">{index + 1}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{sale.title}</p>
                            <p className="text-gray-400 text-xs">{sale.customer}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-bold text-sm">{sale.amount}</p>
                          <p className="text-gray-500 text-xs">{sale.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-900/30 border-t border-gray-700/50 rounded-b-xl">
                  <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200">
                    View all sales →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 px-4 py-6 sm:px-0">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 group">
                  <div className="text-blue-400 group-hover:text-blue-300">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-sm font-medium text-white">Add New Book</span>
                  </div>
                </button>
                
                <button className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm border border-green-500/30 rounded-lg p-4 hover:from-green-600/30 hover:to-emerald-600/30 transition-all duration-300 group">
                  <div className="text-green-400 group-hover:text-green-300">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span className="text-sm font-medium text-white">Add Customer</span>
                  </div>
                </button>
                
                <button className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-4 hover:from-yellow-600/30 hover:to-orange-600/30 transition-all duration-300 group">
                  <div className="text-yellow-400 group-hover:text-yellow-300">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm font-medium text-white">Create Bill</span>
                  </div>
                </button>
                
                <button className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-300 group">
                  <div className="text-purple-400 group-hover:text-purple-300">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="text-sm font-medium text-white">View Reports</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;