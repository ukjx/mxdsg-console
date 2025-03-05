export function getTimeDifference(time: string): string {
  const startTime = new Date(time.replace(/-/g, '/'));
  const diff = new Date().getTime() - startTime.getTime();

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
  if (seconds >= 0) {
    timeDiff += `${seconds}秒`;
  }

  return timeDiff.trim();
}

export function formatTime(time: string): string {
  const date = new Date(time.replace(/-/g, '/').replace('T', ' ').substring(0, 19));
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '');
  const day = String(date.getDate()).padStart(2, '');
  const hours = String(date.getHours()).padStart(2, '');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

