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

export function getStartAndEndDates(month, year) {
  // Validate input
  if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
    throw new Error('Invalid month or year');
  }

  // Set the day to 1 to get the first day of the month
  const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0));

  // Set the day to 0 to get the last day of the previous month
  // Then, set the day to the last day of the current month
  const endDate = new Date(Date.UTC(year, month, 0, 0, 0, 0, 0));

  return {
    start: startDate,
    end: endDate,
  };
}
  