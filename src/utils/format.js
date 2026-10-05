// Date and currency formatting utilities

/**
 * Parses YYYY-MM-DD to a Date object in local time
 */
export function parseLocalDate(dateStr) {
  if (!dateStr) return new Date();
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Formats a Date object to YYYY-MM-DD string
 */
export function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Formats a date string (YYYY-MM-DD) into readable format: "12 October 2026"
 */
export function formatDisplayDate(dateStr) {
  if (!dateStr) return '';
  const d = parseLocalDate(dateStr);
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Calculates end date given a start date and duration in days.
 * E.g. Start on Oct 12 for 5 days -> Days 12, 13, 14, 15, 16 -> End Date is Oct 16.
 */
export function calculateEndDate(startDateStr, durationDays) {
  if (!startDateStr) return '';
  const start = parseLocalDate(startDateStr);
  const days = Math.max(1, Number(durationDays) || 1);
  const end = new Date(start);
  end.setDate(start.getDate() + (days - 1));
  return toISODate(end);
}

/**
 * Formats a readable date range: "12 Oct – 16 Oct 2026"
 */
export function formatCompactDateRange(startStr, endStr) {
  if (!startStr || !endStr) return '';
  const s = parseLocalDate(startStr);
  const e = parseLocalDate(endStr);
  const sDay = s.getDate();
  const sMonth = s.toLocaleDateString('en-GB', { month: 'short' });
  const eDay = e.getDate();
  const eMonth = e.toLocaleDateString('en-GB', { month: 'short' });
  const year = e.getFullYear();

  if (sMonth === eMonth && s.getFullYear() === e.getFullYear()) {
    return `${sDay} – ${eDay} ${sMonth} ${year}`;
  }
  return `${sDay} ${sMonth} – ${eDay} ${eMonth} ${year}`;
}

/**
 * Formats currency amount cleanly
 */
export function formatCurrencyValue(value, currency = '₹') {
  if (!value && value !== 0) return '';
  const numeric = typeof value === 'number' ? value : parseInt(String(value).replace(/[^0-9]/g, ''), 10);
  if (isNaN(numeric)) return String(value);
  return `${currency}${numeric.toLocaleString()}`;
}
