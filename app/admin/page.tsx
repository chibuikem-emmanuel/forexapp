import { prisma } from '@/lib/prisma';
import { DepositStatus } from '@prisma/client';
import { AdminDepositActions } from './AdminDepositActions';

export const revalidate = 0;

function StatusBadge({ status }: { status: DepositStatus }) {
  const styles: Record<DepositStatus, string> = {
    [DepositStatus.APPROVED]:
      'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    [DepositStatus.PENDING]:
      'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    [DepositStatus.REJECTED]:
      'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default async function AdminDashboardPage() {
  const [users, deposits] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: { deposits: true },
    }),
    prisma.deposit.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    }),
  ]);

  const totalApprovedVolume = deposits
    .filter((d) => d.status === DepositStatus.APPROVED)
    .reduce((sum, curr) => sum + Number(curr.amountUsd), 0);

  const pendingCount = deposits.filter((d) => d.status === DepositStatus.PENDING).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-900 dark:text-slate-100 sm:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Manage accounts, monitor transaction feeds, and track platform metrics.
            </p>
          </div>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Approved Volume
            </p>
            <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
              ${totalApprovedVolume.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Pending Deposits
            </p>
            <p className="mt-2 text-2xl font-extrabold text-amber-600 dark:text-amber-400">
              {pendingCount}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Registered Users
            </p>
            <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
              {users.length}
            </p>
          </div>
        </div>

        {/* Deposits Table */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Deposits</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3">Reference</th>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Asset & Network</th>
                  <th className="px-6 py-3">Amount (USD)</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
                {deposits.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
                      No deposits found.
                    </td>
                  </tr>
                ) : (
                  deposits.map((deposit) => (
                    <tr key={deposit.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20">
                      <td className="px-6 py-4 font-mono font-medium text-slate-900 dark:text-slate-200">
                        {deposit.reference}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900 dark:text-slate-200">
                          {deposit.user?.fullName ?? 'N/A'}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {deposit.user?.email ?? 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
                        {deposit.coin} <span className="text-xs text-slate-400">({deposit.network})</span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">
                        ${Number(deposit.amountUsd).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={deposit.status} />
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">
                        {new Date(deposit.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <AdminDepositActions depositId={deposit.id} currentStatus={deposit.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Users Table */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Registered Users</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3">User Code</th>
                  <th className="px-6 py-3">Full Name</th>
                  <th className="px-6 py-3">Contact</th>
                  <th className="px-6 py-3">Service</th>
                  <th className="px-6 py-3">Deposits</th>
                  <th className="px-6 py-3">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20">
                    <td className="px-6 py-4 font-mono font-medium text-slate-900 dark:text-slate-200">
                      {user.userCode}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">
                      {user.fullName}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900 dark:text-slate-200">{user.email}</div>
                      {user.telegram && (
                        <div className="text-xs text-sky-600 dark:text-sky-400">{user.telegram}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {user.service}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {user.deposits.length}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}