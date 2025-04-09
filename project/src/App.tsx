import React, { useState } from 'react';
import { Wallet, Users, ClipboardList, Bell, IndianRupee, ArrowUpRight, ArrowDownRight, UserPlus, Activity, UserX, Settings, CheckCircle, XCircle, CreditCard, History, Send, Banana as BankTransfer, Package, MapPin, Calendar, Filter, Download, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { Menu } from '@headlessui/react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  
  // Mock data - replace with real data from your backend
  const stats = {
    totalBalance: 50000,
    activePartners: 12,
    totalOrders: 156,
    pendingOrders: 23,
    completedOrders: 133
  };

  const partners = [
    { 
      id: 1, 
      name: 'John Doe', 
      phone: '+91 98765 43210',
      email: 'john@example.com',
      role: 'Senior Pickup Partner',
      status: 'active',
      commission: 10,
      totalOrders: 45,
      completedOrders: 42,
      rating: 4.8,
      wallet: {
        balance: 15000,
        pendingPayouts: 2500,
        totalEarned: 45000
      },
      currentLocation: 'Andheri West, Mumbai',
      availability: true
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      phone: '+91 98765 43211',
      email: 'jane@example.com',
      role: 'Pickup Partner',
      status: 'active',
      commission: 8,
      totalOrders: 32,
      completedOrders: 30,
      rating: 4.6,
      wallet: {
        balance: 8000,
        pendingPayouts: 1200,
        totalEarned: 25000
      },
      currentLocation: 'Bandra East, Mumbai',
      availability: true
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      phone: '+91 98765 43212',
      email: 'mike@example.com',
      role: 'Pickup Partner',
      status: 'inactive',
      commission: 8,
      totalOrders: 15,
      completedOrders: 12,
      rating: 4.2,
      wallet: {
        balance: 3000,
        pendingPayouts: 800,
        totalEarned: 12000
      },
      currentLocation: 'Juhu, Mumbai',
      availability: false
    }
  ];

  const orders = [
    {
      id: 'ORD001',
      customerName: 'Alice Johnson',
      pickupLocation: '123 Main St, Mumbai',
      dropLocation: '456 Park Ave, Mumbai',
      status: 'pending',
      assignedPartner: null,
      createdAt: '2024-03-10T10:30:00Z',
      amount: 250,
      priority: 'high',
      estimatedTime: '30 mins'
    },
    {
      id: 'ORD002',
      customerName: 'Bob Smith',
      pickupLocation: '789 Market Rd, Mumbai',
      dropLocation: '321 Lake View, Mumbai',
      status: 'in_progress',
      assignedPartner: partners[0],
      createdAt: '2024-03-10T09:15:00Z',
      amount: 180,
      priority: 'medium',
      estimatedTime: '45 mins'
    },
    {
      id: 'ORD003',
      customerName: 'Charlie Brown',
      pickupLocation: '567 Beach Rd, Mumbai',
      dropLocation: '890 Hill St, Mumbai',
      status: 'completed',
      assignedPartner: partners[1],
      createdAt: '2024-03-10T08:00:00Z',
      amount: 300,
      priority: 'normal',
      completedAt: '2024-03-10T08:45:00Z'
    }
  ];

  const recentTransactions = [
    { 
      id: 1, 
      type: 'credit', 
      amount: 5000, 
      partner: 'Self Deposit', 
      date: '2024-03-10',
      method: 'UPI',
      status: 'completed',
      description: 'Wallet topup'
    },
    { 
      id: 2, 
      type: 'debit', 
      amount: 1200, 
      partner: 'John Doe', 
      date: '2024-03-09',
      method: 'Wallet Transfer',
      status: 'completed',
      description: 'Commission payout'
    },
    { 
      id: 3, 
      type: 'credit', 
      amount: 3000, 
      partner: 'Self Deposit', 
      date: '2024-03-08',
      method: 'Bank Transfer',
      status: 'completed',
      description: 'Wallet topup'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderOrders = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Export Report
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
            <Package className="h-5 w-5 mr-2" />
            New Order
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4">
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">Search orders</label>
          <input
            type="text"
            id="search"
            placeholder="Search orders..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <Menu as="div" className="relative">
          <Menu.Button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Status
            <ChevronDown className="h-4 w-4 ml-2" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 focus:outline-none">
            <div className="py-1">
              {['all', 'pending', 'in_progress', 'completed'].map((status) => (
                <Menu.Item key={status}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                      onClick={() => setSelectedStatus(status)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Menu>
        <Menu as="div" className="relative">
          <Menu.Button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Date Range
            <ChevronDown className="h-4 w-4 ml-2" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 focus:outline-none">
            <div className="py-1">
              {['Today', 'Last 7 days', 'Last 30 days', 'Custom'].map((range) => (
                <Menu.Item key={range}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                    >
                      {range}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Menu>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Locations</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders
                .filter(order => selectedStatus === 'all' || order.status === selectedStatus)
                .map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{order.id}</span>
                      <span className="text-sm text-gray-500">{order.customerName}</span>
                      <span className="text-xs text-gray-500">
                        {format(new Date(order.createdAt), 'MMM d, yyyy HH:mm')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                        Pickup: {order.pickupLocation}
                      </div>
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                        Drop: {order.dropLocation}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                    {order.status === 'in_progress' && (
                      <div className="text-xs text-gray-500 mt-1">
                        Est. {order.estimatedTime}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.assignedPartner ? (
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-700 font-medium">
                              {order.assignedPartner.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {order.assignedPartner.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {order.assignedPartner.currentLocation}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                        Assign Partner
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderWallet = () => (
    <div className="space-y-6">
      {/* MCP Wallet Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">MCP Wallet</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-indigo-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-600 font-medium">Available Balance</p>
                <p className="text-2xl font-bold text-indigo-900">₹{stats.totalBalance}</p>
              </div>
              <Wallet className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Total Distributed</p>
                <p className="text-2xl font-bold text-green-900">₹125,000</p>
              </div>
              <Send className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Pending Distributions</p>
                <p className="text-2xl font-bold text-purple-900">₹15,000</p>
              </div>
              <History className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex space-x-4">
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <CreditCard className="h-5 w-5 mr-2" />
            Add Funds
          </button>
          <button className="flex items-center px-4 py-2 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50">
            <BankTransfer className="h-5 w-5 mr-2" />
            Withdraw
          </button>
        </div>
      </div>

      {/* Partner Wallets */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Partner Wallets</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wallet Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending Payouts</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Earned</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {partners.map((partner) => (
                <tr key={partner.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-indigo-700 font-medium">
                            {partner.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                        <div className="text-sm text-gray-500">{partner.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">₹{partner.wallet.balance}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-orange-600">₹{partner.wallet.pendingPayouts}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{partner.wallet.totalEarned}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm hover:bg-green-200">
                        Add Funds
                      </button>
                      <button className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm hover:bg-red-200">
                        Deduct
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Transaction History</h2>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {transaction.type === 'credit' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.partner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Wallet className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Balance</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">₹{stats.totalBalance}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Partners</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stats.activePartners}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClipboardList className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stats.totalOrders}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Activity className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Orders</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stats.pendingOrders}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <button 
          className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          onClick={() => setActiveTab('partners')}
        >
          <UserPlus className="h-8 w-8 text-indigo-600" />
          <span className="ml-3 text-lg font-medium text-gray-900">Add Partner</span>
        </button>

        <button 
          className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          onClick={() => setActiveTab('wallet')}
        >
          <IndianRupee className="h-8 w-8 text-indigo-600" />
          <span className="ml-3 text-lg font-medium text-gray-900">Manage Wallet</span>
        </button>

        <button 
          className="flex items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          onClick={() => setActiveTab('orders')}
        >
          <ClipboardList className="h-8 w-8 text-indigo-600" />
          <span className="ml-3 text-lg font-medium text-gray-900">Manage Orders</span>
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
          <button 
            className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
            onClick={() => setActiveTab('wallet')}
          >
            View All
          </button>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {recentTransactions.slice(0, 3).map((transaction) => (
              <li key={transaction.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {transaction.type === 'credit' ? (
                      <ArrowUpRight className="h-5 w-5 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-red-500" />
                    )}
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{transaction.partner}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 
                    'credit' ? '+' : '-'}₹{transaction.amount}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );

  const renderPartners = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Pickup Partners</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
          <UserPlus className="h-5 w-5 mr-2" />
          Add New Partner
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {partners.map((partner) => (
                <tr key={partner.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-indigo-700 font-medium">{partner.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                        <div className="text-sm text-gray-500">{partner.email}</div>
                        <div className="text-sm text-gray-500">{partner.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{partner.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      partner.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {partner.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {partner.commission}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {partner.completedOrders}/{partner.totalOrders} orders
                    </div>
                    <div className="text-sm text-gray-500">
                      {partner.rating} rating
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-3">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Settings className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <UserX className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">MCP Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="p-1 rounded-full hover:bg-gray-100">
                <Bell className="h-6 w-6 text-gray-500" />
              </button>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                  <span className="text-white font-medium">MC</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="mt-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'dashboard'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('partners')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'partners'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Partners
              </button>
              <button
                onClick={() => setActiveTab('wallet')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'wallet'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Wallet
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'orders'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Orders
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'partners' && renderPartners()}
        {activeTab === 'wallet' && renderWallet()}
        {activeTab === 'orders' && renderOrders()}
      </main>
    </div>
  );
}

export default App;