export function _decimal(value: number, precision: number = 2): number {
  return Number(value.toFixed(precision));
}

export function _isNumber(val: any): boolean {
  return !isNaN(Number(val));
}