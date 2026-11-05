export interface AuditRecord {
  id: number;
  issue: string;
  priority: "High" | "Medium" | "Low";
  status: "Needs review" | "In progress" | "Resolved";
}

const STORAGE_KEY = "india-gov-audit-catalog";

const defaultRecords: AuditRecord[] = [
  {
    id: 1,
    issue: "Page structure and landmarks",
    priority: "High",
    status: "Needs review",
  },
  {
    id: 2,
    issue: "ARIA roles and hidden content",
    priority: "High",
    status: "Needs review",
  },
  {
    id: 3,
    issue: "Colour contrast",
    priority: "High",
    status: "Needs review",
  },
  {
    id: 4,
    issue: "Touch target size",
    priority: "Medium",
    status: "Needs review",
  },
  {
    id: 5,
    issue: "Links and list semantics",
    priority: "Medium",
    status: "Needs review",
  },
];

export function getAuditRecords(): AuditRecord[] {
  try {
    const savedRecords = localStorage.getItem(STORAGE_KEY);

    if (!savedRecords) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultRecords)
      );

      return defaultRecords;
    }

    const parsedRecords: unknown = JSON.parse(savedRecords);

    if (!Array.isArray(parsedRecords)) {
      throw new Error("Invalid audit catalog data.");
    }

    return parsedRecords as AuditRecord[];
  } catch {
    return defaultRecords;
  }
}

export function saveAuditRecords(records: AuditRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}
