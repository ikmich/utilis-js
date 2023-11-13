import { exec, ExecException, spawn, SpawnOptionsWithoutStdio } from 'child_process';

export type ShellProcessCallbacks = {
  onStdOut: (chunk: Buffer) => void;
  onStdErr: (err: Buffer) => void;
  onClose: (code: number, signal: NodeJS.Signals) => void;
  onError: (err: Error) => void;
}

export type ShellExecOptions = {} & SpawnOptionsWithoutStdio;

export const shell_ = {
  exec: (command: string) => {
    return new Promise((resolve, reject) => {
      exec(command, (error: ExecException | null, stdout: string, stderr: string) => {
        if (error) {
          reject(error);
          return;
        }

        if (stderr) {
          reject(stderr);
        }

        resolve(stdout);
      });
    });
  },

  spawn(command: string, callbacks?: ShellProcessCallbacks, options?: ShellExecOptions) {
    if (!command && !command.trim()) return;
    if (!options) options = {};
    if (!options.cwd) options.cwd = process.cwd();

    let opts: SpawnOptionsWithoutStdio = { ...options };

    const parts = command.split(/\s+/);
    const main = parts[0];
    const args = parts.filter((item, i) => {
      return i > 0;
    });

    let childProcess = spawn(main, args, opts);
    if (callbacks) {
      childProcess.stdout.on('data', callbacks?.onStdOut);
      childProcess.stderr.on('data', callbacks?.onStdErr);
      childProcess.on('close', callbacks?.onClose);
      childProcess.on('error', callbacks?.onError);
    }

    return childProcess;
  }
};