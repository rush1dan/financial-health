import * as path from 'path';

const FetchStatus = {
    none: -2,
    error: -1,
    pending: 0,
    success: 1
}

export { FetchStatus }

export function apiPath(path, withoutSlash = false) {
    return `${'/api'}${withoutSlash ? '' : '/'}${path}`
}

export function formatRelativeTime(dateTimeString) {
    const now = new Date();
    const pastDate = new Date(dateTimeString);
    const timeDifference = now.getTime() - pastDate.getTime();
    
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (seconds < 60) {
      return seconds + "s ago";
    } else if (minutes < 60) {
      return minutes + "m ago";
    } else if (hours < 24) {
      return hours + "h ago";
    } else {
      return days + "d ago";
    }
}
  
export function getFileNameWithExtension(filePath) {
  const parsedPath = path.parse(filePath);
  if (parsedPath.base) {
    return parsedPath.base;
  }
  return null;
}

export function getFormattedDate(date) {
  return date.toISOString().split('T')[0];
}
  