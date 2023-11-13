export const path_ = {
  ensureLeadingSlash(path: string): string {
    return path.replace(/^\/*/, '/');
  },

  removeLeadingSlash(path: string): string {
    return path.replace(/^\/+/, '');
  },

  removeTrailingSlash(path:string): string {
    return path.replace(/\/+$/, '');
  }
};