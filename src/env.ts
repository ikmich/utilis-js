import { _isNumber } from './number.js';
import { _isBooleanLike, _isFalseLike, _isTrueLike } from './index.js';

/**
 * Read environment variable from process.env.
 * @param key The environment variable name/key (e.g. DB_HOST). This value passed is case-insensitive, and is
 * upper-cased for use with process.env.
 */
export function _env<T = string | number | boolean>(key: string): T | undefined {
  const val = process.env[key.toUpperCase()];

  if (val) {
    if (_isNumber(val)) {
      return <T>Number(val);
    }

    if (_isBooleanLike(val)) {
      if (_isTrueLike(val)) return <T>true;
      if (_isFalseLike(val)) return <T>false;
    }

    return <T>val;
  }

  return undefined;
}