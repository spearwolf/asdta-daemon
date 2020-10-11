#!/usr/bin/env node

/* eslint-env node */
import fs from 'fs';
import os from 'os';

import path from 'path';

import query_processes from './lib/query_processes.mjs';

const home = os.homedir();
const workspacePath = path.join(home, '.asdta');

const [, , ...args] = process.argv;

const configPath =
  args.length === 1 ? args[0] : path.join(workspacePath, 'asdta-cfg.json');

// =====================
// 1. load configuration
// =====================

const cfg = JSON.parse(fs.readFileSync(configPath));

// ==================
// 2. query processes
// ==================

query_processes(cfg).then(console.log);
