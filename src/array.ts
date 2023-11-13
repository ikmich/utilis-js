export const array_ = {
  delete(array: any[], item: any) {
    let index = array.findIndex((item) => item === item);
    if (index && index >= 0) {
      array.splice(index, 1);
    }
  },

  deleteMany(array: any[], items: any[]) {
    items.forEach((item) => {
      array_.delete(array, item);
    });
  }
};
