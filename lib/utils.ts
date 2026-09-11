import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: 'GBP' | 'NGN' | 'USD' = 'GBP'): string {
  if (currency === 'GBP') {
    return `£${amount.toLocaleString('en-GB')}`;
  }
  if (currency === 'NGN') {
    return `₦${amount.toLocaleString('en-NG')}`;
  }
  return `$${amount.toLocaleString('en-US')}`;
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateString;
  }
}

export function getStatusBadgeClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'paid':
    case 'published':
    case 'issued':
    case 'graded':
    case 'completed':
    case 'active':
    case 'graduated':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'pending':
    case 'pending_review':
    case 'awaiting_approval':
    case 'upcoming':
    case 'draft':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'failed':
    case 'rejected':
    case 'cancelled':
    case 'revoked':
    case 'dropped':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    case 'live':
      return 'bg-brand-crimson-light text-brand-crimson border-brand-crimson-border animate-pulse';
    default:
      return 'bg-stone-100 text-stone-700 border-stone-200';
  }
}
