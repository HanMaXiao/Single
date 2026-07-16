import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * shadcn/ui 标准 className 合并工具
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 格式化金额 (元 → 分 转 元,保留 2 位小数)
 */
export function formatYuan(cents: number): string {
  return (cents / 100).toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * 格式化日期
 */
export function formatDate(date: string | Date, withTime = false): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const datePart = d.toLocaleDateString('zh-CN');
  if (!withTime) return datePart;
  const timePart = d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  return `${datePart} ${timePart}`;
}
