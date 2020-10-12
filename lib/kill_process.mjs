import {spawn} from 'child_process';

export default function kill_process(...pids) {
  pids.forEach((pid) => {
    const kill = spawn('kill', [`${pid}`]);

    kill.stdout.on('data', (data) => {
      console.log(data);
    });

    kill.stderr.on('data', (data) => {
      console.error(data);
    });
  });
}
