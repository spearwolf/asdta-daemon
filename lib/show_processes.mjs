/* eslint-env node */
import si from 'systeminformation';

export default async function show_processes(showOnlyProps) {
  const {list: runningProcesses} = await si.processes();
  const output =
    showOnlyProps?.length > 0
      ? runningProcesses.map((ps) =>
          showOnlyProps.length === 1
            ? ps[showOnlyProps[0]]
            : Object.fromEntries(showOnlyProps.map((propKey) => [propKey, ps[propKey]])),
        )
      : runningProcesses;
  console.log(JSON.stringify(output, null, 2));
}
