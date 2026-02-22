export function retrieveFieldErrors(
  totalErrors: Record<string, string[]>,
  fieldInterest: string,
) {
  if (!(fieldInterest in totalErrors)) {
    return null;
  }

  return totalErrors[fieldInterest];
}
