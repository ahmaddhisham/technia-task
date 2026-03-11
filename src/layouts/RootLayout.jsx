import React, { useState } from 'react';
import { Link, Outlet, useLocation } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { FaChartBar, FaChevronDown, FaChevronUp, FaUser } from 'react-icons/fa';
import { Modal } from '../components/Modal';
import { mockApi } from '../api/mockApi';

export function RootLayout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLeadsOpen, setIsLeadsOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isEmployeesOpen, setIsEmployeesOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const { data: sidebarLeads = [] } = useQuery({
    queryKey: ['leads', 'sidebar'],
    queryFn: mockApi.leads.getAll,
  });

  const { data: sidebarEmployees = [] } = useQuery({
    queryKey: ['employees', 'sidebar'],
    queryFn: mockApi.employees.getAll,
  });

  const navigation = [
    { 
      name: 'Leads', 
      path: '/', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      name: 'Actions', 
      path: '/actions', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    { 
      name: 'Employees', 
      path: '/employees', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      name: 'Salaries', 
      path: '/employees-salaries', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 transform 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition duration-200 ease-in-out
        w-64 bg-white shadow-xl z-30 lg:z-0
      `}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <FaChartBar className="text-2xl text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 px-3 space-y-1">
          {/* Leads with dropdown */}
          {(() => {
            const leadsItem = navigation[0];
            const isActive = currentPath === '/';
            return (
              <div>
                <Link
                  to={leadsItem.path}
                  onClick={() => {
                    setIsSidebarOpen(false);
                  }}
                  className={`
                    relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                    transition-all duration-200 group
                    ${isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                  `}
                >
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-blue-600"></span>
                  )}
                  <span
                    className={`transition-colors ${
                      isActive
                        ? 'text-blue-600'
                        : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  >
                    {leadsItem.icon}
                  </span>
                  <span className="flex-1">Leads</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsLeadsOpen((prev) => !prev);
                    }}
                    className="ml-2 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  >
                    {isLeadsOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                  </button>
                </Link>

                {isLeadsOpen && sidebarLeads.length > 0 && (
                  <div className="mt-1 space-y-1 pl-6">
                    {sidebarLeads.map((lead) => (
                      <button
                        key={lead.id}
                        type="button"
                        onClick={() => {
                          setSelectedLead(lead);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      >
                        <FaUser className="text-gray-400" size={12} />
                        <span className="truncate">{lead.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Other navigation items */}
          {navigation.slice(1).map((item) => {
            const isActive =
              currentPath === item.path || currentPath.startsWith(item.path + '/');

            // Special rendering for Employees with dropdown
            if (item.path === '/employees') {
              return (
                <div key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => {
                      setIsSidebarOpen(false);
                    }}
                    className={`
                      relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                      transition-all duration-200 group
                      ${isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                    `}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-blue-600"></span>
                    )}

                    <span
                      className={`transition-colors ${
                        isActive
                          ? 'text-blue-600'
                          : 'text-gray-400 group-hover:text-gray-600'
                      }`}
                    >
                      {item.icon}
                    </span>

                    <span className="flex-1">Employees</span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsEmployeesOpen((prev) => !prev);
                      }}
                      className="ml-2 p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    >
                      {isEmployeesOpen ? (
                        <FaChevronUp size={12} />
                      ) : (
                        <FaChevronDown size={12} />
                      )}
                    </button>
                  </Link>

                  {isEmployeesOpen && sidebarEmployees.length > 0 && (
                    <div className="mt-1 space-y-1 pl-6">
                      {sidebarEmployees.map((emp) => (
                        <button
                          key={emp.id}
                          type="button"
                          onClick={() => {
                            setSelectedEmployee(emp);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        >
                          <FaUser className="text-gray-400" size={12} />
                          <span className="truncate">{emp.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // Default rendering for other items (Actions, Salaries)
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`
                  relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200 group
                  ${isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                `}
              >
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-blue-600"></span>
                )}

                <span
                  className={`transition-colors ${
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                >
                  {item.icon}
                </span>

                <span className="flex-1">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg shadow-md">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@example.com</p>
            </div>
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:border-l">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Mobile menu button */}
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Open sidebar</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Breadcrumb */}
              <div className="flex-1 flex items-center ml-4 lg:ml-0">
                <nav className="flex items-center text-sm text-gray-500">
                  <Link to="/" className="hover:text-gray-700 transition-colors">
                    Dashboard
                  </Link>
                  {currentPath !== '/' && (
                    <>
                      <svg className="h-4 w-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-900 font-medium">
                        {navigation.find(n => n.path === currentPath)?.name || 'Page'}
                      </span>
                    </>
                  )}
                </nav>
              </div>

              {/* Right side actions */}
              <div className="flex items-center space-x-3">
                <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <span className="sr-only">View notifications</span>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                
                {/* User menu (desktop) */}
                <div className="hidden lg:flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">Admin User</span>
                  <div className="h-8 w-8 rounded-full bg-linear-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-sm">
                    A
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Dashboard. All rights reserved.
          </p>
        </footer>

        {/* Lead details modal */}
        <Modal
          isOpen={!!selectedLead}
          onClose={() => setSelectedLead(null)}
          title={selectedLead ? selectedLead.name : 'Lead Details'}
        >
          {selectedLead && (
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{selectedLead.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Company</p>
                <p className="font-medium text-gray-900">{selectedLead.company}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                  {selectedLead.status}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Created At</p>
                <p className="font-medium text-gray-900">
                  {selectedLead.created_at
                    ? new Date(selectedLead.created_at).toLocaleString()
                    : 'N/A'}
                </p>
              </div>
            </div>
          )}
        </Modal>

        {/* Employee details modal */}
        <Modal
          isOpen={!!selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          title={selectedEmployee ? selectedEmployee.name : 'Employee Details'}
        >
          {selectedEmployee && (
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium text-gray-900">{selectedEmployee.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Department</p>
                <p className="font-medium text-gray-900">
                  {selectedEmployee.department || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Position</p>
                <p className="font-medium text-gray-900">
                  {selectedEmployee.position || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Hire Date</p>
                <p className="font-medium text-gray-900">
                  {selectedEmployee.hire_date
                    ? new Date(selectedEmployee.hire_date).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}