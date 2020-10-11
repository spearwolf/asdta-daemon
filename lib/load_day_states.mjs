import fs from 'fs';
import path from 'path';

export default function load_day_states(processes, dayPath) {
  return processes.map((p) => {
    const dayStateFile = path.join(dayPath, `${p.name}.json`);
    let dayState = null;
    if (fs.existsSync(dayStateFile)) {
      dayState = JSON.parse(fs.readFileSync(dayStateFile));
    }
    return {
      ...p,
      dayStateFile,
      dayState,
    };
  });
}
