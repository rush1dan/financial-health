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

export function getStartAndEndDatesForMonth(month, year) {
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

export function getStartAndEndDatesForYear(year) {
  // Validate input
  if (isNaN(year)) {
    throw new Error('Invalid year');
  }

  const startDate = new Date(Date.UTC(year, 0, 1, 0, 0, 0, 0));

  const endDate = new Date(Date.UTC(year, 11, 31, 0, 0, 0, 0));

  return {
    start: startDate,
    end: endDate,
  };
}


export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function getMonthFromNumber(monthNum) {
  const monthIndex = monthNum - 1;
  return months[monthIndex];
}

export function getMonthNumFromMonth(month) {
  return months.indexOf(month) + 1;
}

const years = [];

export function getYears(count = 0) {
  if (years.length > 0) {
    return years;
  }

  const max = new Date().getUTCFullYear()
  const min = max - count

  for (let i = max; i >= min; i--) {
    years.push(i)
  }
  return years
}

export function getFinancialScore(income, expense, asset, debt) {
  income = Number(income);
  expense = Number(expense);
  asset = Number(asset);
  debt = Number(debt);

  const netIncomeFactor = (income + expense) !== 0 ? (income - expense) / (income + expense) : -1;

  const netAssetFactor = (asset + debt) !== 0 ? (asset - debt) / (asset + debt) : -1;

  const incomePos = inverseLerp(-1, 1, netIncomeFactor);
  const incomeScore = lerp(0, 100, incomePos);

  const assetPos = inverseLerp(-1, 1, netAssetFactor);
  const assetScore = lerp(0, 100, assetPos);

  const finalScore = (incomeScore + assetScore) / 2;

  return finalScore.toFixed(0);
}

function inverseLerp(a, b, value) {
  if (a === b) {
    return 0; // Avoid division by zero
  }

  return (value - a) / (b - a);
}

function lerp(a, b, t) {
  // Ensure t is within the range [0, 1]
  t = Math.max(0, Math.min(1, t));

  return a + (b - a) * t;
}

export function getTotalAmounts(transactions) {
  let income = 0, expense = 0, asset = 0, debt = 0;

  for (let index = 0; index < transactions.length; index++) {
    const transaction = transactions[index];
    switch (transaction.type) {
      case 'Income':
        income += transaction.amount;
        break;
      case 'Expense':
        expense += transaction.amount;
        break;
      case 'Asset':
        asset += transaction.amount;
        break;
      case 'Debt':
        debt += transaction.amount;
        break;
      default:
        break;
    }
  }
  income = income.toFixed(2);
  expense = expense.toFixed(2);
  asset = asset.toFixed(2);
  debt = debt.toFixed(2);
  return { income, expense, asset, debt };
}
