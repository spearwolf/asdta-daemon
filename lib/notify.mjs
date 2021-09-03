import path from 'path';

import notifier from 'node-notifier';

export function notify(title, message, icon, workspacePath) {
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

export function show_notification(processName, notificationType, cfg, workspacePath) {
  const process = cfg.processes.find((p) => p.name === processName);
  if (process) {
    const notification = find_notification(process, notificationType);
    if (notification) {
      console.log(JSON.stringify(notification, null, 2));
      notify(notification.title, notification.message, notification.icon, workspacePath);
    } else {
      console.log(
        `Error: could not find notification type='${notificationType}'; process name=`,
        processName,
      );
    }
  } else {
    console.log('Error: could not find a config section for process name:', processName);
  }
}

function find_notification(processCfg, notificationType) {
  let notification;
  if (notificationType?.toLowerCase().startsWith('bye')) {
    notification = processCfg.byeByeNotification;
  }
  if (!notification) {
    const maxIdx = processCfg.notifications?.length ?? -1;
    const idx =
      typeof notificationType === 'number'
        ? notificationType
        : parseInt(notificationType, 10);
    if (idx >= 0 && idx < maxIdx) {
      notification = processCfg.notifications[idx];
    }
  }
  if (!notification && !notificationType && processCfg.notifications) {
    notification = processCfg.notifications[0];
  }
  return notification;
}
