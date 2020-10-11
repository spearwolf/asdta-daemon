import fs from 'fs';

export default function save_day_states(processes) {
  processes.forEach(({dayState, dayStateFile}) => {
    if (dayState && dayStateFile) {
      fs.writeFileSync(JSON.stringify(dayState, null, 2));
    }
  });
  return processes;
}
