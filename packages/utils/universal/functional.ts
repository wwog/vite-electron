export function composeFns<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T): T => {
    return fns.reduce((acc, fn) => fn(acc), arg);
  };
}

export function composeFnsRight<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T): T => {
    return fns.reduceRight((acc, fn) => fn(acc), arg);
  };
}
