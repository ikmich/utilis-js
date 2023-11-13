export const obj_ = {
  isEmpty(o: object) {
    return Object.keys(o).length === 0;
  },

  /**
   * Set an object key to be the first in the order of keys.
   * @param obj
   * @param key
   * @returns A new transformed object
   */
  setFirstKey(obj: any, key: string): any {
    const keys = Array.from(Object.keys(obj)).sort((a, b) => {
      if (a === key) return -1;
      if (b === key) return 1;
      return a.localeCompare(b);
    });

    const transformed = {};

    for (let k of keys) {
      transformed[k] = obj[k];
    }

    return transformed;
  },

  /**
   * Change the order of keys in an object.
   * @param obj
   * @param order
   * @returns A new transformed object.
   */
  reorderKeys(obj: any, order: string[]): any {
    const keys = Array.from(Object.keys(obj)).sort((a, b) => {
      for (let k of order) {
        if (a === k) return -1;
        if (b === k) return 1;
      }

      return a.localeCompare(b);
    });

    const transformed = {};

    for (let k of keys) {
      transformed[k] = obj[k];
    }

    return transformed;
  },

  initPropertyAsNumber(obj: any, key: string) {
    if (typeof obj[key] == 'undefined') {
      obj[key] = 0;
    }
  },

  initPropertyAsString(obj: any, key: string) {
    if (typeof obj[key] == 'undefined') {
      obj[key] = '';
    }
  },

  initPropertyAsObject(obj: any, key: string) {
    if (typeof obj[key] == 'undefined') {
      obj[key] = {};
    }
  },

  initPropertyAsSet(obj: any, key: string) {
    if (typeof obj[key] == 'undefined') {
      obj[key] = new Set();
    }
  },

  initPropertyAsArray(obj: any, key: string) {
    if (typeof obj[key] == 'undefined') {
      obj[key] = [];
    }
  },

  hydrate<T>(instance: T, props: { [K in keyof T]?: T[K] }): T {
    for (let [k, v] of Object.entries(props)) {
      instance[k] = v;
    }
    return instance;
  }
};
