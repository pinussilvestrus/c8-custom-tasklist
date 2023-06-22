import { format, parseISO } from 'date-fns';

export function formatDate(dateString, showTime) {
  return format(
    parseISO(dateString),
    showTime ? 'dd MMM yyyy - hh:mm a' : 'dd MMM yyyy',
  );
}
