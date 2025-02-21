import React from 'react'
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  Settings, 
  LogOut,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  UserCheck,
  ChevronDown,
  Search,
  Filter,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';


const AdminDashboard = () => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', date: '2024-03-10', status: 'Delivered', amount: 299.99 },
    { id: '#ORD-002', customer: 'Jane Smith', date: '2024-03-09', status: 'Processing', amount: 199.50 },
    { id: '#ORD-003', customer: 'Mike Johnson', date: '2024-03-09', status: 'Pending', amount: 599.99 },
    { id: '#ORD-004', customer: 'Sarah Wilson', date: '2024-03-08', status: 'Delivered', amount: 149.99 },
  ];
  return (

<>
{/* Stats Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
        <h3 className="text-2xl font-bold text-gray-900">$24,780</h3>
        <p className="text-sm text-green-600 mt-1">+12.5% from last month</p>
      </div>
      <div className="bg-indigo-100 p-3 rounded-lg">
        <DollarSign className="h-6 w-6 text-indigo-600" />
      </div>
    </div>
  </div>

  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">Total Orders</p>
        <h3 className="text-2xl font-bold text-gray-900">156</h3>
        <p className="text-sm text-green-600 mt-1">+8.2% from last month</p>
      </div>
      <div className="bg-green-100 p-3 rounded-lg">
        <ShoppingBag className="h-6 w-6 text-green-600" />
      </div>
    </div>
  </div>

  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">Total Customers</p>
        <h3 className="text-2xl font-bold text-gray-900">2,459</h3>
        <p className="text-sm text-green-600 mt-1">+15.3% from last month</p>
      </div>
      <div className="bg-blue-100 p-3 rounded-lg">
        <UserCheck className="h-6 w-6 text-blue-600" />
      </div>
    </div>
  </div>

  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">Conversion Rate</p>
        <h3 className="text-2xl font-bold text-gray-900">3.2%</h3>
        <p className="text-sm text-red-600 mt-1">-2.1% from last month</p>
      </div>
      <div className="bg-purple-100 p-3 rounded-lg">
        <TrendingUp className="h-6 w-6 text-purple-600" />
      </div>
    </div>
  </div>
</div>

{/* Recent Orders */}
<div className="bg-white rounded-lg shadow mb-6">
  <div className="p-6 border-b">
    <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
  </div>
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="bg-gray-50">
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Order ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Customer
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Amount
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {recentOrders.map((order) => (
          <tr key={order.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {order.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {order.customer}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {order.date}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${order.amount}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
</>
  )
}

export default AdminDashboard

