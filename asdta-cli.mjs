#!/usr/bin/env node
import fs from 'fs';
import os from 'os';
import path from 'path';

const home = os.homedir();
const workspacePath = path.join(home, '.asdta');
const configPath = path.join(workspacePath, 'asdta-cfg.json');

// =====================
// 1. load configuration
// =====================

const cfg = JSON.parse(fs.readFileSync(configPath));

console.log('ASDTA CONFIG', JSON.stringify(cfg, null, 2));
