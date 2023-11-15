import { exec, ExecException, ExecOptions, spawn, SpawnOptionsWithoutStdio } from 'child_process';

export type ShellProcessCallbacks = {
  onStdout: (chunk: Buffer) => void;
  onStderr: (err: Buffer) => void;
  onClose: (code: number, signal: NodeJS.Signals) => void;
  onError: (err: Error) => void;
}

export type ShellExecOptions = {} & SpawnOptionsWithoutStdio;

export type ExecOutput = {
  stdout: string;
  stderr: string;
}

export const shell_ = {
  exec: (command: string, opts: ExecOptions = {}) => {
    return new Promise<ExecOutput>((resolve, reject) => {
      exec(command, opts, (error: ExecException | null, stdout: string, stderr: string) => {
        if (error) {
          throw error;
        }

        const out: ExecOutput = {
          stdout: '',
          stderr: ''
        };

        out.stderr = stderr;
        out.stdout = stdout;
        
        resolve(out);
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
      childProcess.stdout.on('data', callbacks?.onStdout);
      childProcess.stderr.on('data', callbacks?.onStderr);
      childProcess.on('close', callbacks?.onClose);
      childProcess.on('error', callbacks?.onError);
    }

    return childProcess;
  }
};