import fs from 'fs';
import path from 'path';

function getDayPath(workspacePath) {
  const today = new Date();
  return path.join(
    workspacePath,
    `${today.getFullYear()}`,
    `${today.getMonth() + 1}`,
    `${today.getDate()}`,
  );
}

export default function load_day_states(processes, workspacePath) {
  const dayPath = getDayPath(workspacePath);
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
