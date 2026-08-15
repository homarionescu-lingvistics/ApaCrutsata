export type OfflineAction = {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  createdAt: string;
};

const STORAGE_KEY = "crutsanimia-offline-queue";

export function readOfflineQueue(): OfflineAction[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as OfflineAction[]) : [];
  } catch {
    return [];
  }
}

export function enqueueOfflineAction(type: string, payload: Record<string, unknown>): OfflineAction | null {
  if (typeof window === "undefined") return null;

  const action: OfflineAction = {
    id: crypto.randomUUID(),
    type,
    payload,
    createdAt: new Date().toISOString(),
  };

  const queue = readOfflineQueue();
  const next = [...queue, action];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return action;
}

export function clearOfflineQueue(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
