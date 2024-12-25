import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTimeDifference(startTime: Date, endTime: Date): string {
  const diff = endTime.getTime() - startTime.getTime();

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  let timeDiff = '';
  if (hours > 0) {
    timeDiff += `${hours}小时`;
  }
  if (minutes > 0) {
    timeDiff += `${minutes}分`;
  }
  if (seconds > 0) {
    timeDiff += `${seconds}秒`;
  }

  return timeDiff.trim();
}
