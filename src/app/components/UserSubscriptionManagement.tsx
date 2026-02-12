import { useState } from 'react';
import { 
  Phone, CreditCard, Calendar, AlertTriangle, CheckCircle, 
  Download, Trash2, Archive, Bell, DollarSign, Clock,
  Users, Search, Filter, Eye, ChevronLeft, XCircle, Package,
  Link
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface UserSubscriptionManagementProps {
  onNavigate: (page: string) => void;
}

export function UserSubscriptionManagement() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showExportDialog, setShowExportDialog] = useState(false);

  // Mock users with subscription data
  const users = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      email: 'sarah.mitchell@email.com',
      phone: '+1 (555) 123-4567',
      avatar: '👩‍💼',
      subscriptionPlan: 'Premium',
      subscriptionStatus: 'active',
      subscriptionStart: '2024-10-15',
      subscriptionExpiry: '2026-03-15',
      daysUntilExpiry: 62,
      credits: 150,
      lastActive: '2026-01-12',
      totalSpent: 89.97,
      autoRenewal: true,
    },
    {
      id: 2,
      name: 'Ahmed Khan',
      email: 'ahmed.khan@email.com',
      phone: '+966 50 123 4567',
      avatar: '👨‍💻',
      subscriptionPlan: 'Enterprise',
      subscriptionStatus: 'active',
      subscriptionStart: '2024-09-20',
      subscriptionExpiry: '2026-09-20',
      daysUntilExpiry: 252,
      credits: 500,
      lastActive: '2026-01-12',
      totalSpent: 599.88,
      autoRenewal: true,
    },
    {
      id: 3,
      name: 'Emma Wilson',
      email: 'emma.w@email.com',
      phone: '+44 20 7123 4567',
      avatar: '👩‍🎓',
      subscriptionPlan: 'Basic',
      subscriptionStatus: 'expiring-soon',
      subscriptionStart: '2024-11-10',
      subscriptionExpiry: '2026-02-10',
      daysUntilExpiry: 29,
      credits: 25,
      lastActive: '2026-01-12',
      totalSpent: 14.97,
      autoRenewal: false,
    },
    {
      id: 4,
      name: 'Carlos Rodriguez',
      email: 'carlos.r@email.com',
      phone: '+34 91 123 4567',
      avatar: '👨‍🔬',
      subscriptionPlan: 'Free',
      subscriptionStatus: 'expired',
      subscriptionStart: '2024-12-05',
      subscriptionExpiry: '2025-11-12',
      daysUntilExpiry: -61,
      credits: 0,
      lastActive: '2026-01-10',
      totalSpent: 0,
      autoRenewal: false,
    },
    {
      id: 5,
      name: 'Yuki Tanaka',
      email: 'yuki.t@email.com',
      phone: '+81 3 1234 5678',
      avatar: '👩‍🏫',
      subscriptionPlan: 'Premium',
      subscriptionStatus: 'active',
      subscriptionStart: '2024-10-01',
      subscriptionExpiry: '2026-04-01',
      daysUntilExpiry: 79,
      credits: 200,
      lastActive: '2026-01-12',
      totalSpent: 89.97,
      autoRenewal: true,
    },
    {
      id: 6,
      name: 'Michael Chen',
      email: 'michael.c@email.com',
      phone: '+1 (555) 987-6543',
      avatar: '👨‍💼',
      subscriptionPlan: 'Premium',
      subscriptionStatus: 'expiring-soon',
      subscriptionStart: '2024-08-15',
      subscriptionExpiry: '2026-01-25',
      daysUntilExpiry: 13,
      credits: 45,
      lastActive: '2026-01-11',
      totalSpent: 149.95,
      autoRenewal: false,
    },
    {
      id: 7,
      name: 'Sofia Martinez',
      email: 'sofia.m@email.com',
      phone: '+52 55 1234 5678',
      avatar: '👩‍⚕️',
      subscriptionPlan: 'Basic',
      subscriptionStatus: 'expired',
      subscriptionStart: '2024-06-20',
      subscriptionExpiry: '2024-10-20',
      daysUntilExpiry: -84,
      credits: 0,
      lastActive: '2024-11-05',
      totalSpent: 19.96,
      autoRenewal: false,
    },
  ];

  // Users expired for 2+ months (ready for export/deletion)
  const usersToArchive = users.filter(user => 
    user.subscriptionStatus === 'expired' && user.daysUntilExpiry <= -60
  );

  // Get subscription status badge
  const getStatusBadge = (status: string, daysUntilExpiry: number) => {
    if (status === 'active' && daysUntilExpiry > 30) {
      return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
    } else if (status === 'active' && daysUntilExpiry <= 30) {
      return <Badge className="bg-yellow-100 text-yellow-700"><AlertTriangle className="h-3 w-3 mr-1" />Expiring in {daysUntilExpiry}d</Badge>;
    } else if (status === 'expiring-soon') {
      return <Badge className="bg-orange-100 text-orange-700"><Bell className="h-3 w-3 mr-1" />Expires in {daysUntilExpiry}d</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-700"><XCircle className="h-3 w-3 mr-1" />Expired {Math.abs(daysUntilExpiry)}d ago</Badge>;
    }
  };

  // Get plan badge color
  const getPlanBadge = (plan: string) => {
    const colors = {
      'Free': 'bg-gray-100 text-gray-700',
      'Basic': 'bg-blue-100 text-blue-700',
      'Premium': 'bg-purple-100 text-purple-700',
      'Enterprise': 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700'
    };
    return colors[plan as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.phone.includes(searchQuery);
    const matchesStatus = filterStatus === 'all' || user.subscriptionStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Auto-export function
  const handleAutoExport = () => {
    setShowExportDialog(true);
    // Simulate export
    setTimeout(() => {
      console.log('Exporting users:', usersToArchive);
      alert(`${usersToArchive.length} users exported and deleted from active database`);
      setShowExportDialog(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Subscription Management</h1>
              <p className="text-sm sm:text-base text-blue-100">Monitor subscriptions, credits, and auto-archive expired accounts</p>
            </div>
                          <Link to={"/user-progress"}>

            <Button 
              variant="outline" 
              // onClick={() => onNavigate('user-progress')}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-xs sm:text-sm"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Users
            </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-xs text-gray-600 font-semibold">Active</span>
            </div>
            <p className="text-2xl font-bold">{users.filter(u => u.subscriptionStatus === 'active').length}</p>
            <p className="text-xs text-gray-500">subscriptions</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span className="text-xs text-gray-600 font-semibold">Expiring Soon</span>
            </div>
            <p className="text-2xl font-bold">{users.filter(u => u.subscriptionStatus === 'expiring-soon').length}</p>
            <p className="text-xs text-gray-500">within 30 days</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <span className="text-xs text-gray-600 font-semibold">Expired</span>
            </div>
            <p className="text-2xl font-bold">{users.filter(u => u.subscriptionStatus === 'expired').length}</p>
            <p className="text-xs text-gray-500">accounts</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Archive className="h-5 w-5 text-purple-500" />
              <span className="text-xs text-gray-600 font-semibold">Ready to Archive</span>
            </div>
            <p className="text-2xl font-bold text-red-600">{usersToArchive.length}</p>
            <p className="text-xs text-gray-500">expired 2+ months</p>
          </div>
        </div>

        {/* Auto-Archive Alert */}
        {usersToArchive.length > 0 && (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-red-900 mb-1">Auto-Archive Alert</h3>
                  <p className="text-sm text-red-700 mb-2">
                    {usersToArchive.length} user{usersToArchive.length > 1 ? 's have' : ' has'} been expired for 2+ months and {usersToArchive.length > 1 ? 'are' : 'is'} ready for export and deletion.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {usersToArchive.map(user => (
                      <Badge key={user.id} className="bg-red-100 text-red-700 text-xs">
                        {user.name} ({Math.abs(user.daysUntilExpiry)}d ago)
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Button 
                onClick={handleAutoExport}
                className="bg-red-600 hover:bg-red-700 text-white flex-shrink-0"
                size="sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Export & Delete
              </Button>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expiring-soon">Expiring Soon</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="text-left py-4 px-4 text-xs sm:text-sm font-semibold text-gray-700">User</th>
                  <th className="text-left py-4 px-4 text-xs sm:text-sm font-semibold text-gray-700">Phone</th>
                  <th className="text-center py-4 px-4 text-xs sm:text-sm font-semibold text-gray-700">Plan</th>
                  <th className="text-center py-4 px-4 text-xs sm:text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-center py-4 px-4 text-xs sm:text-sm font-semibold text-gray-700">Expiry Date</th>
                  <th className="text-center py-4 px-4 text-xs sm:text-sm font-semibold text-gray-700">Credits</th>
                  <th className="text-center py-4 px-4 text-xs sm:text-sm font-semibold text-gray-700">Auto-Renew</th>
                  <th className="text-right py-4 px-4 text-xs sm:text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const isExpiringSoon = user.daysUntilExpiry <= 30 && user.daysUntilExpiry > 0;
                  const isExpired = user.daysUntilExpiry < 0;
                  const isArchiveReady = isExpired && user.daysUntilExpiry <= -60;
                  
                  return (
                    <tr 
                      key={user.id} 
                      className={`border-b hover:bg-gray-50 transition-colors ${
                        isArchiveReady ? 'bg-red-50' :
                        isExpired ? 'bg-orange-50' :
                        isExpiringSoon ? 'bg-yellow-50' :
                        ''
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl">
                            {user.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-xs text-gray-700">{user.phone}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge className={getPlanBadge(user.subscriptionPlan)}>
                          {user.subscriptionPlan}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {getStatusBadge(user.subscriptionStatus, user.daysUntilExpiry)}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex flex-col items-center">
                          <div className="flex items-center gap-1 text-xs text-gray-700">
                            <Calendar className="h-3 w-3" />
                            <span>{user.subscriptionExpiry}</span>
                          </div>
                          {isExpiringSoon && (
                            <Badge className="bg-yellow-100 text-yellow-700 text-xs mt-1">
                              <Bell className="h-3 w-3 mr-1" />
                              {user.daysUntilExpiry} days left
                            </Badge>
                          )}
                          {isExpired && (
                            <Badge className="bg-red-100 text-red-700 text-xs mt-1">
                              {Math.abs(user.daysUntilExpiry)} days ago
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <div className={`flex items-center gap-1 ${
                            user.credits === 0 ? 'text-red-600' :
                            user.credits < 50 ? 'text-orange-600' :
                            'text-green-600'
                          }`}>
                            <Package className="h-4 w-4" />
                            <span className="font-bold text-sm">{user.credits}</span>
                          </div>
                          {user.credits < 50 && user.credits > 0 && (
                            <Badge className="bg-orange-100 text-orange-700 text-xs">
                              Low Credits
                            </Badge>
                          )}
                          {user.credits === 0 && (
                            <Badge className="bg-red-100 text-red-700 text-xs">
                              No Credits
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {user.autoRenewal ? (
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Enabled
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-700 text-xs">
                            <XCircle className="h-3 w-3 mr-1" />
                            Disabled
                          </Badge>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-end gap-2">
                                        <Link to={"/user-progress"}>

                          <Button 
                            variant="ghost" 
                            size="sm"
                            // onClick={() => onNavigate('user-progress')}
                            className="h-8 px-2 text-xs"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          </Link>
                          {isArchiveReady && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Archive className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Automated System Info */}
        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-blue-900 mb-1">Automated Export & Deletion System</h3>
              <p className="text-sm text-blue-700 mb-2">
                Users who have been expired for <strong>2 months (60 days)</strong> are automatically flagged for export and deletion.
              </p>
              <ul className="text-xs text-blue-600 space-y-1 ml-4 list-disc">
                <li>User data is exported to CSV before deletion</li>
                <li>Exported files are stored in secure archive for 7 years (compliance)</li>
                <li>Users receive email notification 7 days before deletion</li>
                <li>Deleted users can be restored from archive within 30 days</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Subscription Warnings */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {/* Expiring Soon */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
            <h3 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Subscriptions Expiring Soon (Next 30 Days)
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {users.filter(u => u.daysUntilExpiry <= 30 && u.daysUntilExpiry > 0).map(user => (
                <div key={user.id} className="flex items-center justify-between p-2 bg-white rounded">
                  <div>
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.subscriptionPlan} Plan</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700 text-xs">
                    {user.daysUntilExpiry} days
                  </Badge>
                </div>
              ))}
              {users.filter(u => u.daysUntilExpiry <= 30 && u.daysUntilExpiry > 0).length === 0 && (
                <p className="text-sm text-yellow-700 text-center py-4">No subscriptions expiring soon</p>
              )}
            </div>
          </div>

          {/* Low Credits */}
          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
            <h3 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
              <Package className="h-5 w-5" />
              Low Credits Alert (Below 50)
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {users.filter(u => u.credits < 50 && u.credits > 0).map(user => (
                <div key={user.id} className="flex items-center justify-between p-2 bg-white rounded">
                  <div>
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.subscriptionPlan} Plan</p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 text-xs">
                    {user.credits} credits
                  </Badge>
                </div>
              ))}
              {users.filter(u => u.credits < 50 && u.credits > 0).length === 0 && (
                <p className="text-sm text-orange-700 text-center py-4">All users have sufficient credits</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Export Dialog */}
      {showExportDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="text-center">
              <Download className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-bounce" />
              <h3 className="text-lg font-bold mb-2">Exporting User Data</h3>
              <p className="text-sm text-gray-600 mb-4">
                Exporting {usersToArchive.length} user{usersToArchive.length > 1 ? 's' : ''} and removing from active database...
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
