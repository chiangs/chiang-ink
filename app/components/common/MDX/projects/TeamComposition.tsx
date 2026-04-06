/**
 * TeamComposition
 * ─────────────────────────────────────────────────────────────────────────────
 * Rendered automatically by work/$slug.tsx when frontmatter team is present.
 * Sits directly below the roles bar — contextualises leadership scope.
 * Two labelled groups: delivery team (agency) + client contributors.
 *
 * Frontmatter shape:
 *
 *   team:
 *     delivery:
 *       - "UX Designer"
 *       - "Backend Developer"
 *       - "Backend Developer"
 *       - "Data Engineer"
 *     client:
 *       - "Data Engineer"
 *       - "Infrastructure SME"
 *       - "Domain SME"
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProjectTeam = {
  delivery?: string[];
  client?: string[];
};

// ─── Constants ────────────────────────────────────────────────────────────────

const DELIVERY_LABEL = "DELIVERY TEAM";
const CLIENT_LABEL = "CLIENT CONTRIBUTORS";
const SEPARATOR = "·";

// ─── Component ────────────────────────────────────────────────────────────────

export function TeamComposition({ team }: { team: ProjectTeam }) {
  const hasDelivery = Array.isArray(team.delivery) && team.delivery.length > 0;
  const hasClient = Array.isArray(team.client) && team.client.length > 0;

  if (!hasDelivery && !hasClient) return null;

  return (
    <div className="bg-surface-low border-b border-border">
      <div className="max-w-container mx-auto px-margin-mob md:px-margin py-5 flex flex-col gap-4">
        {/* Delivery team */}
        {hasDelivery && (
          <TeamGroup label={DELIVERY_LABEL} members={team.delivery!} />
        )}

        {/* Client contributors */}
        {hasClient && <TeamGroup label={CLIENT_LABEL} members={team.client!} />}
      </div>
    </div>
  );
}

// ─── Team Group ───────────────────────────────────────────────────────────────

function TeamGroup({ label, members }: { label: string; members: string[] }) {
  // Collapse duplicate roles — "Backend Developer ×2"
  const collapsed = collapseRoles(members);

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
      <span
        className="font-body font-medium text-sm uppercase tracking-[0.15em] text-text-muted shrink-0"
        style={{ opacity: 0.55 }}
      >
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {collapsed.map((entry, i) => (
          <span key={entry.role} className="flex items-center gap-x-3">
            <span className="font-body text-sm text-accent">
              {entry.role}
              {entry.count > 1 && (
                <span
                  className="text-text-muted font-medium ml-1"
                  style={{ fontSize: "11px", opacity: 0.9 }}
                >
                  ×{entry.count}
                </span>
              )}
            </span>
            {i < collapsed.length - 1 && (
              <span
                className="text-text-muted select-none"
                style={{ opacity: 0.3 }}
                aria-hidden
              >
                {SEPARATOR}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Utilities ────────────────────────────────────────────────────────────────

type CollapsedRole = { role: string; count: number };

function collapseRoles(members: string[]): CollapsedRole[] {
  const map = new Map<string, number>();
  for (const m of members) {
    map.set(m, (map.get(m) ?? 0) + 1);
  }
  return Array.from(map.entries()).map(([role, count]) => ({ role, count }));
}
