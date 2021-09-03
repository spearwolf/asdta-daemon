/* eslint-env node */
import fs from 'fs';
import os from 'os';

import path from 'path';

import {cut_out_param, cut_out_param_with_value} from './lib/param_utils.mjs';
import check_day_states from './lib/check_day_states.mjs';
import get_day_path from './lib/get_day_path.mjs';
import load_day_states from './lib/load_day_states.mjs';
import {show_notification} from './lib/notify.mjs';
import query_processes from './lib/query_processes.mjs';
import save_day_states from './lib/save_day_states.mjs';
import show_processes from './lib/show_processes.mjs';

const home = os.homedir();
const workspacePath = path.join(home, '.asdta');
const dayPath = get_day_path(workspacePath);

const [, , ...args] = process.argv;

const [hasCustomConfigPath, customConfigPath] = cut_out_param_with_value(
  args,
  '-c',
  '--config',
);

// lazy load main configuration
const get_config = (() => {
  let _cfg;
  return () => {
    if (!_cfg) {
      if (hasCustomConfigPath) {
        console.log('// Load config from', customConfigPath);
      }

      const configPath = hasCustomConfigPath
        ? customConfigPath
        : path.join(workspacePath, 'asdta-cfg.json');

      _cfg = JSON.parse(fs.readFileSync(configPath));
    }
    return _cfg;
  };
})();

switch (args[0]) {
  case 'ps':
    show_processes(args.slice(1));
    break;

  case 'notify': {
    const [, processName, notificationType] = args;
    show_notification(processName, notificationType, get_config(), workspacePath);
    break;
  }

  default: {
    const VERBOSE = cut_out_param(args, '-v', '--verbose');
    const DRY_RUN = cut_out_param(args, '-n', '--dry-run');

    if (DRY_RUN) {
      console.log(`// Dry run activated (verbose=${VERBOSE})`);
    }

    const config = get_config();

    query_processes(config, VERBOSE)
      .then((processes) => load_day_states(processes, dayPath))
      .then((processes) => check_day_states(processes, config, workspacePath, DRY_RUN))
      .then((processes) => (DRY_RUN ? processes : save_day_states(processes, dayPath)))
      .then((processes) => {
        if (VERBOSE) {
          console.log(JSON.stringify(processes, null, 2));
        }
      });
  }
}
