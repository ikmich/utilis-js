export * from './number.js';
export * from './array.js';
export * from './object.js';
export * from './queue.js';
export * from './string.js';
export * from './shell.js';
export * from './env.js';
export * from './path.js';

export function _isEmpty(o: any | undefined) {
  if (!o) return true;

  if (o.constructor === Object) {
    return Object.keys(o).length === 0;
  }

  if (Array.isArray(o)) {
    return o.length === 0;
  }

  if (typeof o === 'string') {
    return o === '';
  }

  if (typeof o === 'number') {
    return false;
  }

  return !!o;
}

/**
 * Execute a function and return its result.
 * @param f
 */
export function _fn<T extends any>(f: () => T) {
  return f();
}

/**
 * Pauses execution for a period.
 * @param ms
 */
export async function _delay(ms: number) {
  if (ms <= 0) return;
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, ms);
  });
}

/**
 * Random number in range.
 * @param start
 * @param end
 */
export function randNum(start: number, end: number) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

export function _isUndefined(ob: any): boolean {
  return typeof ob == 'undefined';
}

export function _toJson(obj: Record<any, unknown> | Array<unknown>, pretty = false) {
  // return inspect(obj, false, 16, false);
  return JSON.stringify(obj, null, pretty ? 2 : 0);
}

export function _fromJson<T extends unknown>(json: string): T {
  return JSON.parse(json) as T;
}

export function _isTrueLike(val: string | number | boolean): boolean {
  if (typeof val == 'string') {
    return ['true', 'on', '1'].includes(val.toLowerCase());
  }
  return [1, true].includes(val);
}

export function _isFalseLike(val: string | number | boolean): boolean {
  if (typeof val == 'string') {
    return ['false', 'off', '0'].includes(val.toLowerCase());
  }
  return [0, false].includes(val);
}

export function _isBooleanLike(val: string | number | boolean): boolean {
  return _isTrueLike(val) || _isFalseLike(val);
}

export function _generateUniqueNumbers(size: number): Set<number> {
  const nums = new Set<number>();
  while (nums.size !== size) {
    nums.add(Math.floor(Math.random() * size) + 1);
  }

  return nums;
}