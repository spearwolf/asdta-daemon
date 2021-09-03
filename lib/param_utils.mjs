export function cut_out_param(args, ...options) {
  const idx = args.findIndex((arg) => options.includes(arg));
  if (idx >= 0) {
    args.splice(idx, 1);
    return true;
  }
  return false;
}

export function cut_out_param_with_value(args, ...options) {
  const idx = args.findIndex((arg) => options.includes(arg));
  if (idx >= 0) {
    const value = args[idx + 1];
    args.splice(idx, 2);
    return [true, value];
  }
  return [false];
}
