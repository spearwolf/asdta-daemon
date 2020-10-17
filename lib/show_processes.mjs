/* eslint-env node */
import si from 'systeminformation';

export default async function show_processes() {
  const {list: runningProcesses} = await si.processes();
  console.log(JSON.stringify(runningProcesses, null, 2));
}
