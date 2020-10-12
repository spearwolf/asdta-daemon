import path from 'path';

import notifier from 'node-notifier';

const parseSeconds = (x) => {
  if (typeof x === 'number') {
    return x;
  }
  const val = parseFloat(x);
  if (isNaN(val)) {
    throw new Error(`unknown time format: ${x}`);
  }
  if (x.match(/seconds?/i)) {
    return Math.round(val);
  }
  if (x.match(/minutes?/i)) {
    return Math.round(val * 60);
  }
  if (x.match(/hours?/i)) {
    return Math.round(val * 60 * 60);
  }
};

function notify(title, message, icon, workspacePath) {
  if (title == null && icon == null) {
    notifier.notify(message);
  } else {
    const iconPath = icon
      ? path.isAbsolute(icon)
        ? icon
        : path.join(workspacePath, icon)
      : undefined;
    notifier.notify({title, message, icon: iconPath});
  }
}

export default function check_day_states(processes, cfg, workspacePath) {
  const increaseTimeAmount = parseSeconds(cfg.increaseTimeAmount);
  if (increaseTimeAmount <= 0) {
    throw new Error(
      `invalid "increaseTimeAmount" config value: ${cfg.increaseTimeAmount}`,
    );
  }
  processes.forEach((p) => {
    // create dayState if not available
    if (p.dayState == null) {
      p.dayState = {
        name: p.name,
        timeAmount: 0,
        timeExceeded: false,
        notificationsShown: [],
      };
    }
    const {dayState} = p;
    if (!Array.isArray(dayState.notificationsShown)) {
      dayState.notificationsShown = [];
    }
    // increase time amount
    dayState.timeAmount += increaseTimeAmount;
    const timeContingent = parseSeconds(p.timeContingent);
    if (dayState.timeExceeded || timeContingent - dayState.timeAmount <= 0) {
      dayState.timeExceeded = true;
      // TODO terminate process!!!
      console.log('TODO terminate process', p.name, p.process.pid);
    } else {
      // show notifications
      p.notifications
        .map(({remainingTime, ...notify}) => ({
          ...notify,
          id: remainingTime,
          remainingTime: parseSeconds(remainingTime),
        }))
        .filter((n) => !dayState.notificationsShown.includes(n.id))
        .filter((n) => n.remainingTime >= timeContingent - dayState.timeAmount)
        .forEach(({id, title, message, icon}) => {
          dayState.notificationsShown.push(id);
          notify(title, message, icon, workspacePath);
        });
    }
  });
  return processes;
}