#!/usr/bin/env node

/* eslint-env node */
import fs from 'fs';
import os from 'os';

import path from 'path';

import check_day_states from './lib/check_day_states.mjs';
import get_day_path from './lib/get_day_path.mjs';
import load_day_states from './lib/load_day_states.mjs';
import query_processes from './lib/query_processes.mjs';
import save_day_states from './lib/save_day_states.mjs';

const home = os.homedir();
const workspacePath = path.join(home, '.asdta');
const dayPath = get_day_path(workspacePath);

const [, , ...args] = process.argv;

const configPath =
  args.length === 1 ? args[0] : path.join(workspacePath, 'asdta-cfg.json');

// load main configuration
const cfg = JSON.parse(fs.readFileSync(configPath));

query_processes(cfg)
  .then((processes) => load_day_states(processes, dayPath))
  .then((processes) => check_day_states(processes, cfg, workspacePath))
  .then((processes) => save_day_states(processes, dayPath))
  .then((processes) => console.log(JSON.stringify(processes, null, 2)));
