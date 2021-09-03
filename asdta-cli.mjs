/* eslint-env node */
import fs from 'fs';
import os from 'os';

import path from 'path';

import check_day_states from './lib/check_day_states.mjs';
import get_day_path from './lib/get_day_path.mjs';
import load_day_states from './lib/load_day_states.mjs';
import query_processes from './lib/query_processes.mjs';
import save_day_states from './lib/save_day_states.mjs';
import show_processes from './lib/show_processes.mjs';

const home = os.homedir();
const workspacePath = path.join(home, '.asdta');
const dayPath = get_day_path(workspacePath);

const [, , ...args] = process.argv;

const cutOutParam = (args, ...options) => {
  const idx = args.findIndex((arg) => options.includes(arg));
  if (idx >= 0) {
    args.splice(idx, 1);
    return true;
  }
  return false;
};

if (args[0] === 'ps') {
  show_processes(args.slice(1));
} else {
  const VERBOSE = cutOutParam(args, '-v', '--verbose');
  const DRY_RUN = cutOutParam(args, '-n', '--dry-run');

  if (DRY_RUN) {
    console.log(`// Dry run activated (verbose=${VERBOSE})`);
  }

  const configPath =
    args.length >= 1 ? args[args.length - 1] : path.join(workspacePath, 'asdta-cfg.json');

  // load main configuration
  const cfg = JSON.parse(fs.readFileSync(configPath));

  query_processes(cfg, VERBOSE)
    .then((processes) => load_day_states(processes, dayPath))
    .then((processes) => check_day_states(processes, cfg, workspacePath, DRY_RUN))
    .then((processes) => (DRY_RUN ? processes : save_day_states(processes, dayPath)))
    .then((processes) => {
      if (VERBOSE) {
        console.log(JSON.stringify(processes, null, 2));
      }
    });
}
