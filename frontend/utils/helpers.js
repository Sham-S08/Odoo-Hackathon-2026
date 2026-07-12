export function classNames(...values) {
  return values.filter(Boolean).join(" ");
}

export function isOverlapping(startA, endA, startB, endB) {
  return startA < endB && startB < endA;
}

export function isOverdue(expectedReturnDate, referenceDate = new Date()) {
  if (!expectedReturnDate) return false;
  return new Date(expectedReturnDate) < referenceDate;
}
