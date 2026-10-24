/**
 * Currency Formatter for Indian Rupees (INR - ₹)
 * Formats numbers in Indian notation (e.g. 1,50,000 instead of 150,000)
 */
export function formatINR(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return '₹' + Math.round(Number(amount)).toLocaleString('en-IN');
}

export function formatLakhs(amount) {
  if (!amount) return '₹0';
  const val = Number(amount);
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  }
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} Lakh`;
  }
  return formatINR(val);
}
