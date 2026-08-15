export type AuditEvent = {
  type: string;
  actorId?: string | null;
  entityType?: string;
  entityId?: string | null;
  payload?: Record<string, unknown>;
  createdAt: string;
};

export function auditEvent(event: Omit<AuditEvent, "createdAt">): AuditEvent {
  const record: AuditEvent = {
    ...event,
    createdAt: new Date().toISOString(),
  };

  if (process.env.NODE_ENV !== "production") {
    console.info("[audit]", record);
  }

  return record;
}
