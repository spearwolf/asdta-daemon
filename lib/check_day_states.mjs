const parseSeconds = (x) => {
  if (typeof x === 'number') {
    return x;
  }
  const val = parseFloat(x);
  if (!isNaN(val)) {
    if (x.match(/seconds?/i)) {
      return Math.round(val);
    }
    if (x.match(/minutes?/i)) {
      return Math.round(val / 60);
    }
    if (x.match(/hours?/i)) {
      return Math.round(val / 3600);
    }
  }
  throw new Error(`unknown time format: ${x}`);
};

export default function check_day_states(processes, cfg) {
  const increaseTimeAmount = parseSeconds(cfg.increaseTimeAmount);
  if (increaseTimeAmount <= 0) {
    throw new Error(`invalid "increaseTimeAmount" config value: ${increaseTimeAmount}`);
  }
  processes.forEach((p) => {
    if (p.dayState == null) {
      p.dayState = {
        name: p.name,
        timeAmount: 0,
        timeExceeded: false,
      };
    }
  });
  return processes;
}
