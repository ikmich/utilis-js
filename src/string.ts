export const str_ = {
  eqi(s1: string, s2: string) {
    return s1.toLowerCase() === s2.toLowerCase();
  },

  capFirst(s: string) {
    return s.charAt(0).toUpperCase() + s.substring(1, s.length).toLowerCase();
  }
};