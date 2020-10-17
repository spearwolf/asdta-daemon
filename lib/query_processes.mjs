/* eslint-env node */
import si from 'systeminformation';

export default async function query_processes(cfg, VERBOSE) {
  const {list: runningProcesses} = await si.processes();

  return cfg.processes
    .map(({name, query, ...processConf}) => {
      const queries = Array.isArray(query) ? query : [query];
      const foundProcesses = runningProcesses.filter((p) => {
        return queries.filter((q) => {
          const queryAttrs = Object.keys(q);
          return (
            queryAttrs.filter((attr) => {
              const queryVal = q[attr];
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
        }).length;
      });
      if (foundProcesses.length) {
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
