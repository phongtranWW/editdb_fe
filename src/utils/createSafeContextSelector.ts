import { createContext, useContextSelector } from "use-context-selector";

export function createSafeContext<T>(name: string) {
  const context = createContext<T | undefined>(undefined);

  function useSafeContext() {
    const ctx = useContextSelector(context, (v) => v);
    if (ctx === undefined) {
      throw new Error(`${name} must be used within its Provider`);
    }
    return ctx;
  }

  return [context, useSafeContext] as const;
}
