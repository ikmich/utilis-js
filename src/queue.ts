export class Queue {
  // items: any[] = [];

  constructor(private items: any[]) {
    // this.items = items;
  }

  add(item: any) {
    this.items.push(item);
    return item;
  }

  pop(): any {
    return this.items.shift();
  }

  remove(index: number) {
    return this.items.splice(index, 1);
  }

  size() {
    return this.items.length;
  }
}
