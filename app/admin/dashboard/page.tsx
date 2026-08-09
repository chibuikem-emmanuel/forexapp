'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface OverviewStats {
  total_users: number;
  pending_deposits_count: number;
  total_deposited_amount: number;
  total_user_balance: number;
}

interface UserItem {
  id: number;
  full_name: string;
  email: string;
  telegram_username: string;
  country: string;
  service: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  balance: string;
  role: string;
  date_joined: string;
}

interface DepositItem {
  id: number;
  reference: string;
  user_email: string;
  user_name: string;
  coin: string;
  amount: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'deposits' | 'users'>('overview');
  
  // Data States
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [deposits, setDeposits] = useState<DepositItem[]>([]);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Balance Modal State
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [newBalance, setNewBalance] = useState('');
  const [newStatus, setNewStatus] = useState<string>('APPROVED');
  const [updatingUser, setUpdatingUser] = useState(false);

  // User Deletion State
  const [userToDelete, setUserToDelete] = useState<UserItem | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
  const [deleteUserError, setDeleteUserError] = useState<string | null>(null);

  // Deposit Deletion State
  const [depositToDelete, setDepositToDelete] = useState<DepositItem | null>(null);
  const [deletingDepositId, setDeletingDepositId] = useState<number | null>(null);
  const [deleteDepositError, setDeleteDepositError] = useState<string | null>(null);

  const getHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    'Content-Type': 'application/json',
  });

  async function loadAdminData() {
    try {
      const authRes = await fetch('https://cryp-backend.onrender.com/api/user/me/', { headers: getHeaders() });
      if (!authRes.ok) throw new Error('Unauthorized');
      const authData = await authRes.json();
      
      if (!authData.is_staff && authData.role?.toUpperCase() !== 'ADMIN') {
        router.push('/dashboard');
        return;
      }
      setCurrentUserEmail(authData.email);

      const [statsRes, depositsRes, usersRes] = await Promise.all([
        fetch('https://cryp-backend.onrender.com/api/admin/overview/', { headers: getHeaders() }),
        fetch('https://cryp-backend.onrender.com/api/admin/deposits/', { headers: getHeaders() }),
        fetch('https://cryp-backend.onrender.com/api/admin/users/', { headers: getHeaders() })
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (depositsRes.ok) setDeposits(await depositsRes.json());
      if (usersRes.ok) setUsers(await usersRes.json());
    } catch (err) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAdminData();
  }, []);

  async function handleDepositAction(id: number, action: 'APPROVE' | 'REJECT') {
    try {
      const res = await fetch(`https://cryp-backend.onrender.com/api/admin/deposits/${id}/action/`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ action })
      });
      if (res.ok) {
        loadAdminData();
      }
    } catch (err) {
      alert('Failed to update deposit status');
    }
  }

  async function handleUserUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedUser) return;
    setUpdatingUser(true);

    try {
      const res = await fetch(`https://cryp-backend.onrender.com/api/admin/users/${selectedUser.id}/`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({
          balance: parseFloat(newBalance),
          status: newStatus
        })
      });

      if (res.ok) {
        setSelectedUser(null);
        loadAdminData();
      }
    } catch (err) {
      alert('Failed to update user profile');
    } finally {
      setUpdatingUser(false);
    }
  }

  // Confirm User Delete
  async function confirmDeleteUser() {
    if (!userToDelete) return;
    setDeletingUserId(userToDelete.id);
    setDeleteUserError(null);

    try {
      const res = await fetch(`https://cryp-backend.onrender.com/api/admin/users/${userToDelete.id}/`, {
        method: 'DELETE',
        headers: getHeaders(),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
        setStats(prev => prev ? { ...prev, total_users: Math.max(0, prev.total_users - 1) } : null);
        if (selectedUser?.id === userToDelete.id) setSelectedUser(null);
        setUserToDelete(null);
      } else {
        const errorMessage = data.error || data.detail || data.message || 'Failed to delete user account.';
        setDeleteUserError(errorMessage);
      }
    } catch (err) {
      setDeleteUserError('Network error while deleting user.');
    } finally {
      setDeletingUserId(null);
    }
  }

  // Confirm Deposit Delete
  async function confirmDeleteDeposit() {
    if (!depositToDelete) return;
    setDeletingDepositId(depositToDelete.id);
    setDeleteDepositError(null);

    try {
      const res = await fetch(`https://cryp-backend.onrender.com/api/admin/deposits/${depositToDelete.id}/`, {
        method: 'DELETE',
        headers: getHeaders(),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setDeposits(prev => prev.filter(d => d.id !== depositToDelete.id));
        setDepositToDelete(null);
      } else {
        const errorMessage = data.error || data.detail || data.message || 'Failed to delete deposit record.';
        setDeleteDepositError(errorMessage);
      }
    } catch (err) {
      setDeleteDepositError('Network error while deleting deposit.');
    } finally {
      setDeletingDepositId(null);
    }
  }

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (u.telegram_username && u.telegram_username.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">Loading Control Center...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div>
            <h1 className="text-2xl font-bold">Admin Management Console</h1>
            <p className="text-xs text-zinc-400 mt-1">Approve deposits, monitor liquid balance, and adjust user limits.</p>
          </div>
          <div className="flex items-center gap-2 bg-black p-1.5 rounded-xl border border-zinc-800">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`px-4 py-2 text-xs font-bold rounded-lg transition ${activeTab === 'overview' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('deposits')} 
              className={`px-4 py-2 text-xs font-bold rounded-lg transition ${activeTab === 'deposits' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Deposits ({deposits.filter(d => d.status === 'PENDING').length})
            </button>
            <button 
              onClick={() => setActiveTab('users')} 
              className={`px-4 py-2 text-xs font-bold rounded-lg transition ${activeTab === 'users' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Users ({users.length})
            </button>
          </div>
        </div>

        {/* STATS CARDS */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
              <span className="text-xs text-zinc-500 font-semibold uppercase">Total Users</span>
              <p className="text-3xl font-extrabold text-white mt-2">{stats.total_users}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
              <span className="text-xs text-zinc-500 font-semibold uppercase">Pending Deposits</span>
              <p className="text-3xl font-extrabold text-amber-400 mt-2">{stats.pending_deposits_count}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
              <span className="text-xs text-zinc-500 font-semibold uppercase">Total Deposited</span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-2">${stats.total_deposited_amount.toLocaleString()}</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
              <span className="text-xs text-zinc-500 font-semibold uppercase">System Balance</span>
              <p className="text-3xl font-extrabold text-emerald-400 mt-2">${stats.total_user_balance.toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* TAB 1: OVERVIEW & PENDING APPROVALS */}
        {(activeTab === 'overview' || activeTab === 'deposits') && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white">Deposit Requests & Approvals</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-400">
                <thead className="border-b border-zinc-800 text-zinc-500 uppercase text-[10px]">
                  <tr>
                    <th className="pb-3">Ref Code</th>
                    <th className="pb-3">User</th>
                    <th className="pb-3">Coin</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {deposits.map(dep => (
                    <tr key={dep.id}>
                      <td className="py-3 font-mono text-zinc-200">{dep.reference}</td>
                      <td className="py-3">
                        <span className="text-white font-medium block">{dep.user_name}</span>
                        <span className="text-[10px] text-zinc-500">{dep.user_email}</span>
                      </td>
                      <td className="py-3 text-white font-medium">{dep.coin}</td>
                      <td className="py-3 font-bold text-white">${parseFloat(dep.amount).toFixed(2)}</td>
                      <td className="py-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          dep.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          dep.status === 'PENDING' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          {dep.status}
                        </span>
                      </td>
                      <td className="py-3 text-zinc-500">{new Date(dep.created_at).toLocaleDateString()}</td>
                      <td className="py-3 text-right space-x-2">
                        {dep.status === 'PENDING' && (
                          <>
                            <button 
                              onClick={() => handleDepositAction(dep.id, 'APPROVE')} 
                              className="bg-emerald-500 hover:bg-emerald-400 text-black px-3 py-1 rounded-lg font-bold transition"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => handleDepositAction(dep.id, 'REJECT')} 
                              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 px-3 py-1 rounded-lg font-bold transition"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        <button 
                          disabled={deletingDepositId === dep.id}
                          onClick={() => {
                            setDeleteDepositError(null);
                            setDepositToDelete(dep);
                          }}
                          className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-1 rounded-lg font-bold transition disabled:opacity-50"
                        >
                          {deletingDepositId === dep.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: USER DIRECTORY & BALANCE EDITING */}
        {(activeTab === 'overview' || activeTab === 'users') && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-base font-bold text-white">Registered Users Directory</h2>
              <input 
                type="text" 
                placeholder="Search users..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-600"
              />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-400">
                <thead className="border-b border-zinc-800 text-zinc-500 uppercase text-[10px]">
                  <tr>
                    <th className="pb-3">User</th>
                    <th className="pb-3">Telegram</th>
                    <th className="pb-3">Country / Service</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Current Balance</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {filteredUsers.map(u => (
                    <tr key={u.id}>
                      <td className="py-3">
                        <span className="text-white font-medium block">{u.full_name}</span>
                        <span className="text-[10px] text-zinc-500">{u.email}</span>
                      </td>
                      <td className="py-3 text-zinc-300">{u.telegram_username ? `@${u.telegram_username}` : '-'}</td>
                      <td className="py-3 text-zinc-400">{u.country || 'N/A'} • {u.service || 'N/A'}</td>
                      <td className="py-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          u.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          u.status === 'PENDING' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3 font-bold text-emerald-400">${parseFloat(u.balance).toFixed(2)}</td>
                      <td className="py-3 text-right space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedUser(u);
                            setNewBalance(u.balance);
                            setNewStatus(u.status);
                          }}
                          className="bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1 rounded-lg text-xs font-semibold transition"
                        >
                          Edit Profile & Balance
                        </button>
                        <button 
                          disabled={deletingUserId === u.id || u.email === currentUserEmail}
                          onClick={() => {
                            setDeleteUserError(null);
                            setUserToDelete(u);
                          }}
                          className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-1 rounded-lg text-xs font-semibold transition disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          {deletingUserId === u.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* BALANCE & STATUS EDIT MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Update {selectedUser.full_name}</h3>
            <p className="text-xs text-zinc-400">{selectedUser.email}</p>

            <form onSubmit={handleUserUpdate} className="space-y-4">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Account Status</label>
                <select 
                  value={newStatus} 
                  onChange={e => setNewStatus(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Trading Balance ($ USD)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={newBalance}
                  onChange={e => setNewBalance(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setSelectedUser(null)}
                  className="bg-zinc-800 text-zinc-300 px-4 py-2 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={updatingUser}
                  className="bg-emerald-500 text-black px-4 py-2 rounded-xl text-xs font-bold"
                >
                  {updatingUser ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE USER CONFIRMATION MODAL */}
      {userToDelete && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-sm w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto text-xl font-bold">
              !
            </div>
            
            <div>
              <h3 className="text-base font-bold text-white">Delete User Account</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Are you sure you want to delete <span className="text-white font-semibold">{userToDelete.email}</span>?
              </p>
            </div>

            {deleteUserError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl">
                {deleteUserError}
              </div>
            )}

            <div className="flex justify-center gap-3 pt-2">
              <button 
                type="button" 
                disabled={deletingUserId !== null}
                onClick={() => {
                  setUserToDelete(null);
                  setDeleteUserError(null);
                }}
                className="w-full bg-zinc-800 text-zinc-300 px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-zinc-700 transition"
              >
                Cancel
              </button>
              <button 
                type="button" 
                disabled={deletingUserId !== null}
                onClick={confirmDeleteUser}
                className="w-full bg-red-500 hover:bg-red-400 text-black px-4 py-2.5 rounded-xl text-xs font-bold transition disabled:opacity-50"
              >
                {deletingUserId !== null ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE DEPOSIT CONFIRMATION MODAL */}
      {depositToDelete && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-sm w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto text-xl font-bold">
              !
            </div>
            
            <div>
              <h3 className="text-base font-bold text-white">Delete Deposit Record</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Are you sure you want to delete deposit reference <span className="text-white font-semibold">{depositToDelete.reference}</span>?
              </p>
            </div>

            {deleteDepositError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl">
                {deleteDepositError}
              </div>
            )}

            <div className="flex justify-center gap-3 pt-2">
              <button 
                type="button" 
                disabled={deletingDepositId !== null}
                onClick={() => {
                  setDepositToDelete(null);
                  setDeleteDepositError(null);
                }}
                className="w-full bg-zinc-800 text-zinc-300 px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-zinc-700 transition"
              >
                Cancel
              </button>
              <button 
                type="button" 
                disabled={deletingDepositId !== null}
                onClick={confirmDeleteDeposit}
                className="w-full bg-red-500 hover:bg-red-400 text-black px-4 py-2.5 rounded-xl text-xs font-bold transition disabled:opacity-50"
              >
                {deletingDepositId !== null ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}