// Utility function to deeply merge objects
export function deepMerge(target: Record<string, unknown>, ...sources: Record<string, unknown>[]): Record<string, unknown> {
  if (!sources.length) return target;
  const source = sources.shift();

  if (typeof target !== 'object' || typeof source !== 'object' || target === null || source === null) {
    return target;
  }

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        !Array.isArray(source[key])
      ) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key] as Record<string, unknown>, source[key] as Record<string, unknown>);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
}