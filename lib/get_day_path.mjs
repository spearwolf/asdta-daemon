import path from 'path';

export default function get_day_path(workspacePath) {
  const today = new Date();
  return path.join(
    workspacePath,
    `${today.getFullYear()}`,
    `${today.getMonth() + 1}`,
    `${today.getDate()}`,
  );
}
