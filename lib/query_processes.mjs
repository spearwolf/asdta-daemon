/* eslint-env node */
import si from 'systeminformation';

export default async function query_processes(cfg, VERBOSE) {
  const {list: runningProcesses} = await si.processes();

  return cfg.processes
    .map(({name, query, ...processConf}) => {
      const queryAttrs = Object.keys(query);
      const foundProcesses = runningProcesses.filter((p) => {
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
      if (foundProcesses) {
        if (VERBOSE) {
          console.log('foundProcessess', JSON.stringify(foundProcesses, null, 2));
        }
        return {
          name,
          ...processConf,
          process: {
            pids: foundProcesses.map((p) => p.pid),
          },
        };
      }
      return undefined;
    })
    .filter((x) => Boolean(x));
}
