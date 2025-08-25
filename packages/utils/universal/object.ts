/** biome-ignore-all lint/suspicious/noExplicitAny: <ignore> */
function isPlainObject(value: any): value is Record<string, any> {
  if (typeof value !== "object" || value === null) return false;

  if (Array.isArray(value)) return false;
  if (value instanceof Date) return false;
  if (value instanceof RegExp) return false;
  if (value instanceof Error) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
}

export function deepMerge<T extends Record<string, any>>(
  target: T,
  ...sources: Partial<T>[]
): T {
  if (!sources.length) return target;

  const result = { ...target };

  for (const source of sources) {
    if (!source) continue;

    for (const key in source) {
      if (!Object.hasOwn(source, key)) continue;

      const sourceValue = source[key];
      const targetValue = result[key];

      if (sourceValue === undefined) continue;
      if (Array.isArray(sourceValue)) {
        if (Array.isArray(targetValue)) {
          result[key] = [...targetValue, ...sourceValue] as T[typeof key];
        } else {
          result[key] = [...sourceValue] as T[typeof key];
        }
      } else if (isPlainObject(sourceValue)) {
        if (isPlainObject(targetValue)) {
          result[key] = deepMerge(targetValue, sourceValue) as T[typeof key];
        } else {
          result[key] = deepMerge({}, sourceValue) as T[typeof key];
        }
      } else {
        result[key] = sourceValue as T[typeof key];
      }
    }
  }

  return result;
}
