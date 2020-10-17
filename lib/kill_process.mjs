import {execFile} from 'child_process';

export default function kill_process(name, ...pids) {
  console.log(new Date().toISOString(), `{${name}} kill`, ...pids);

  pids.forEach((pid) => {
    execFile('kill', ['-9', `${pid}`], (error, stdout, stderr) => {
      if (error) {
        console.error(stderr);
      } else {
        console.log(stdout);
      }
    });
  });
}
