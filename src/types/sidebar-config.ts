/**
 * Sidebar widget configuration — stored as JSON field on Article/Program/Solution entities.
 * Allows admin to customise which widgets appear on the detail page sidebar.
 */

/* ── Widget types that can appear in sidebar ── */

export type SidebarWidgetType =
  "solutions" | "articles" | "programs" | "projects" | "slides";

export interface SidebarWidgetConfig {
  /** Which entity type to display */
  type: SidebarWidgetType;
  /** Override the default widget title (e.g. "Giải pháp UAV" instead of "Giải pháp nổi bật") */
  title?: string;
  /** Specific item IDs to display — when empty, shows auto-selected items */
  itemSlugs?: string[];
  /** Maximum items to show (default: 3) */
  maxItems?: number;
}

export interface SidebarCtaConfig {
  /** Whether to show the CTA widget */
  enabled: boolean;
  /** Override CTA title */
  title?: string;
  /** Override CTA description */
  description?: string;
  /** Override primary button label */
  primaryLabel?: string;
  /** Override primary button href */
  primaryHref?: string;
  /** Override secondary button label */
  secondaryLabel?: string;
  /** Override secondary button href */
  secondaryHref?: string;
}

export interface SidebarConfig {
  /**
   * "auto" = default behavior (show related items by same field/category)
   * "custom" = admin has explicitly configured what to show
   */
  mode: "auto" | "custom";
  /** Widget list — only used when mode = "custom" */
  widgets?: SidebarWidgetConfig[];
  /** CTA widget config — override defaults */
  cta?: SidebarCtaConfig;
}

/**
 * Safely extracts and normalizes SidebarConfig from any entity, raw object, or stringified JSON.
 */
export function parseSidebarConfig(raw: unknown): SidebarConfig | null {
  if (!raw) return null;

  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (trimmed.startsWith("{")) {
      try {
        const parsed = JSON.parse(trimmed);
        return parseSidebarConfig(parsed);
      } catch {
        return null;
      }
    }
    return null;
  }

  if (typeof raw === "object") {
    const obj = raw as Record<string, any>;

    // Case: Wrapped in entity with sidebarConfig property
    if ("sidebarConfig" in obj && obj.sidebarConfig) {
      return parseSidebarConfig(obj.sidebarConfig);
    }

    // Case: Inside content.sidebarConfig (object)
    if (
      obj.content &&
      typeof obj.content === "object" &&
      obj.content.sidebarConfig
    ) {
      return parseSidebarConfig(obj.content.sidebarConfig);
    }

    // Case: Inside content as JSON string
    if (typeof obj.content === "string") {
      try {
        const parsedContent = JSON.parse(obj.content);
        if (parsedContent?.sidebarConfig) {
          return parseSidebarConfig(parsedContent.sidebarConfig);
        }
      } catch {}
    }

    // Case: Direct valid SidebarConfig object
    if (obj.mode === "auto" || obj.mode === "custom") {
      return {
        mode: obj.mode,
        widgets: Array.isArray(obj.widgets) ? obj.widgets : [],
        cta: obj.cta && typeof obj.cta === "object" ? obj.cta : undefined,
      };
    }

    // Case: widgets array or cta provided without explicit mode
    if (Array.isArray(obj.widgets) || obj.cta) {
      return {
        mode:
          Array.isArray(obj.widgets) && obj.widgets.length > 0
            ? "custom"
            : "auto",
        widgets: Array.isArray(obj.widgets) ? obj.widgets : [],
        cta: obj.cta && typeof obj.cta === "object" ? obj.cta : undefined,
      };
    }
  }

  return null;
}
