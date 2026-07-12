/**
 * Formats a date string (YYYY-MM-DD or ISO datetime) to DD.MM.YYYY
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';

  const normalized = String(dateStr).split('T')[0];
  const [year, month, day] = normalized.split('-');
  if (!year || !month || !day) return String(dateStr);

  return `${day}.${month}.${year}`;
}
