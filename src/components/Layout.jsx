import React from 'react'
import NavBar from './NavBar'
import SideBar from './SideBar'

function Layout({ children }) {
  return (
    <div className="flex h-screen bg-amber-50">
      {/* Sidebar */}
      <SideBar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <NavBar />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto ">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout