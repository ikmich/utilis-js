/**
 * Converts a number to decimal format.
 * @param value
 * @param precision
 */
export function _decimal(value: number, precision: number = 2): number {
  return Number(value.toFixed(precision));
}

/**
 * Check if a string value is a number. Accepts a number as input parameter but this just returns true without
 * checking.
 * @param val
 */
export function _isNumber(val: string | number): boolean {
  if (typeof val == 'number') return true;

  return !isNaN(Number(val));
}