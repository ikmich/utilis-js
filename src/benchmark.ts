export type BenchmarkInput = {
  name: string;
  fn: () => any;
}

export type BenchmarkResult = {
  name: string;
  time: number;
}

export class SimpleBenchmark {

  inputs: BenchmarkInput[] = [];
  results: BenchmarkResult[] = [];

  constructor(public readonly context: string) {
  }

  addInput(name: string, fn: () => any): SimpleBenchmark {

    this.inputs.push({
      name, fn
    });
    return this;
  }

  run() {
    for (let input of this.inputs) {
      const t0 = performance.now();
      input.fn();
      const t = performance.now() - t0;

      this.results.push({
        name: input.name,
        time: t
      });
    }

    this.showResults();
  }

  showResults() {

    this.results.sort((a, b) => {
      if (a.time < b.time) {
        return -1;
      }
      if (a.time > b.time) {
        return 1;
      }
      return 0;
    });

    console.log('');
    console.log(`-> BENCHMARK RESULTS FOR CONTEXT "${this.context}":`);

    type ResultRow = {
      position: number;
      name: string;
      time: number;
    }
    const table: ResultRow[] = [];

    this.results.forEach((result, i) => {
      const row: ResultRow = {
        position: i + 1,
        name: result.name,
        time: result.time
      };

      table.push(row);
    });

    console.table(table);
  }
}