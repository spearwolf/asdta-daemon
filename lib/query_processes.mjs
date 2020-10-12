/* eslint-env node */
import si from 'systeminformation';

export default async function query_processes(cfg) {
  const {list: runningProcesses} = await si.processes();

  return cfg.processes
    .map(({name, query, ...processConf}) => {
      const queryAttrs = Object.keys(query);
      const foundProcess = runningProcesses.find((p) => {
        return (
          queryAttrs.filter((attr) => {
            const queryVal = query[attr];
            const m = queryVal.match(/^\/([^/]+)\/([^/]+)/);
            if (m) {
              return p[attr].match(new RegExp(m[1], m[2]));
            }
            if (queryVal.startsWith('=')) {
              return p[attr] === queryVal.substr(1);
            }
            return p[attr].indexOf(queryVal) >= 0;
          }).length === queryAttrs.length
        );
      });
      if (foundProcess) {
        return {
          name,
          ...processConf,
          process: {
            pid: foundProcess.pid,
            name: foundProcess.name,
            command: foundProcess.command,
            started: foundProcess.started,
          },
        };
      }
      return undefined;
    })
    .filter((x) => Boolean(x));
}
