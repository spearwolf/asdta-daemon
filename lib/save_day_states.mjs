import fs from 'fs';

export default function save_day_states(processes, dayPath) {
  if (processes.length) {
    fs.mkdirSync(dayPath, {recursive: true});
    processes.forEach(({dayState, dayStateFile}) => {
      if (dayState && dayStateFile) {
        fs.writeFileSync(dayStateFile, JSON.stringify(dayState, null, 2));
      }
    });
  }
  return processes;
}
