import {execFile} from 'child_process';

export default function kill_process(...pids) {
  console.log(new Date().toISOString(), '$ kill', ...pids);

  pids.forEach((pid) => {
    const child = execFile('kill', [`${pid}`], (error, stdout, stderr) => {
      if (error) {
        console.error(stderr);
      } else {
        console.log(stdout);
      }
      child.disconnect();
    });
  });
}
