'use client';

import { useState, useTransition } from 'react';
import { DepositStatus } from '@prisma/client';
import { updateDepositStatus } from './actions';

interface AdminDepositActionsProps {
  depositId: string;
  currentStatus: DepositStatus;
}

export function AdminDepositActions({
  depositId,
  currentStatus,
}: AdminDepositActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleStatusChange = (newStatus: DepositStatus) => {
    setErrorMsg(null);
    startTransition(async () => {
      const res = await updateDepositStatus(depositId, newStatus);
      if (!res.success) {
        setErrorMsg(res.error || 'Failed to update');
      }
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        {currentStatus !== DepositStatus.APPROVED && (
          <button
            onClick={() => handleStatusChange(DepositStatus.APPROVED)}
            disabled={isPending}
            className="rounded bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-500 disabled:opacity-50 cursor-pointer dark:bg-emerald-500 dark:hover:bg-emerald-400"
          >
            {isPending ? '...' : 'Approve'}
          </button>
        )}

        {currentStatus !== DepositStatus.REJECTED && (
          <button
            onClick={() => handleStatusChange(DepositStatus.REJECTED)}
            disabled={isPending}
            className="rounded bg-rose-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-rose-500 disabled:opacity-50 cursor-pointer dark:bg-rose-500 dark:hover:bg-rose-400"
          >
            {isPending ? '...' : 'Reject'}
          </button>
        )}
      </div>
      {errorMsg && (
        <span className="text-[10px] text-rose-500 font-medium">{errorMsg}</span>
      )}
    </div>
  );
}