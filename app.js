const ROLE_OPTIONS = ["Admin", "Requester", "Approver", "Auditor", "Executive", "Vendor"];

const MODULE_REQUIREMENTS = {
  "Access & Identity": [
    "Secure login, session handling, and timeout behavior.",
    "Permission validation on both page access and API actions.",
    "Direct URL protection and access-denied fallback."
  ],
  "Dashboard / BI / Analytics": [
    "Pending task summary by current user context.",
    "Status widgets with drill-down capability.",
    "Role-based visibility for all dashboard metrics."
  ],
  "Project Center": [
    "Project creation with unique IDs and workflow mapping data.",
    "Progress computed from document completion percentage.",
    "Project updates with audit history."
  ],
  "Task Center": [
    "Unified own + delegated task queue.",
    "Action safety checks on latest task status.",
    "Return action must require comment/reason."
  ],
  "Document": [
    "Draft, submit, return, resubmit, and completion lifecycle.",
    "Validation of required fields and required attachments.",
    "Action history with audit traceability."
  ],
  "Workflow Builder": [
    "Root condition mapping with fallback/default workflow.",
    "Versioned workflow edits and simulation before publish.",
    "Sequential, alternative, and parallel step behavior."
  ],
  "Approver Flow Builder": [
    "Sequential and parallel approval paths.",
    "Role/user/department-based approver resolution.",
    "Versioned flow updates with simulation."
  ],
  "Document Core": [
    "Template, fields, signature placement, and versioning.",
    "Document mapping by actual document name.",
    "Published template immutable by version."
  ],
  "Report Center": [
    "Report catalog filtered by permission.",
    "Drill-back from report rows to source records.",
    "PDF/XLSX export with logging."
  ],
  Masterdata: [
    "Central selector datasets used consistently across modules.",
    "Active/inactive with effective period support.",
    "Change impact validation and audit trail."
  ],
  "User Management": [
    "User CRUD with department mapping and active/inactive controls.",
    "User-level override permission preview before save.",
    "User permission changes must be fully auditable."
  ],
  "Role Management": [
    "Role CRUD with module-level and action-level permission scopes.",
    "Role updates must show affected user count before publish.",
    "Effective permission matrix must be previewable and auditable."
  ],
  "Delegation Management": [
    "HR/Admin and self-service delegation assignment.",
    "Loop prevention and effective-date controls.",
    "Delegated acting context shown in task and logs."
  ],
  "LOV Management": [
    "Controlled value lists used by workflow and forms.",
    "Status dictionaries for document/workflow lifecycle."
  ],
  Notification: [
    "In-app, email, and LINE channels.",
    "Template placeholders with data sensitivity safeguards.",
    "Retry and failure logs."
  ],
  "Integration Sync": [
    "External sync status tracking.",
    "Retry queue management and run history visibility."
  ]
};

const BASE_SCREENS = [
  {
    id: "SCR-000",
    name: "Access Denied / Error",
    module: "Access & Identity",
    group: "System",
    type: "error",
    description: "Fallback for unauthorized access and blocked actions.",
    requirements: ["REQ-AUTH-004", "REQ-AUTH-005", "REQ-AUTH-010"],
    roles: ROLE_OPTIONS
  },
  {
    id: "SCR-001",
    name: "Login",
    module: "Access & Identity",
    group: "System",
    type: "login",
    description: "Secure login and session re-entry.",
    requirements: ["REQ-AUTH-001", "REQ-AUTH-002", "REQ-AUTH-006", "REQ-AUTH-007"],
    roles: ROLE_OPTIONS
  },
  {
    id: "SCR-002",
    name: "Dashboard",
    module: "Dashboard / BI / Analytics",
    group: "Workspaces",
    type: "dashboard",
    description: "Pending task, status, and workload overview.",
    requirements: ["REQ-DASH-001", "REQ-DASH-002", "REQ-DASH-003", "REQ-DASH-004", "REQ-DASH-005"],
    roles: ["Admin", "Requester", "Approver", "Auditor", "Executive"]
  },
  {
    id: "SCR-011",
    name: "Project List",
    module: "Project Center",
    group: "Workspaces",
    type: "project-list",
    description: "Project search, filters, and lifecycle list.",
    requirements: ["REQ-PRJ-001", "REQ-PRJ-002", "REQ-PRJ-009", "REQ-PRJ-011"],
    roles: ["Admin", "Requester", "Approver", "Executive"]
  },
  {
    id: "SCR-012",
    name: "Project Create / Edit",
    module: "Project Center",
    group: "Workspaces",
    type: "project-form",
    description: "Create or update root project data for workflow routing.",
    requirements: ["REQ-PRJ-003", "REQ-PRJ-004", "REQ-PRJ-005", "REQ-PRJ-010"],
    roles: ["Admin", "Requester"]
  },
  {
    id: "SCR-013",
    name: "Project Detail",
    module: "Project Center",
    group: "Workspaces",
    type: "project-detail",
    description: "Project context, progress, and related documents.",
    requirements: ["REQ-PRJ-006", "REQ-PRJ-007", "REQ-PRJ-008", "REQ-PRJ-009"],
    roles: ["Admin", "Requester", "Approver", "Executive"]
  },
  {
    id: "SCR-021",
    name: "Task Center",
    module: "Task Center",
    group: "Workspaces",
    type: "task-center",
    description: "Own tasks and delegated tasks in one queue.",
    requirements: ["REQ-TASK-001", "REQ-TASK-004", "REQ-TASK-006", "REQ-TASK-007", "REQ-TASK-009"],
    roles: ["Admin", "Approver", "Requester", "Vendor"]
  },
  {
    id: "SCR-100",
    name: "Document Detail",
    module: "Document",
    group: "Workspaces",
    type: "document-detail",
    description: "Document lifecycle, attachment, and status trail.",
    requirements: ["REQ-DOC-001", "REQ-DOC-004", "REQ-DOC-006", "REQ-DOC-012", "REQ-UPL-001", "REQ-UPL-006"],
    roles: ["Admin", "Requester", "Approver", "Vendor", "Auditor"]
  },
  {
    id: "SCR-201",
    name: "Workflow List",
    module: "Workflow Builder",
    group: "Governance",
    type: "workflow-list",
    description: "Workflow inventory with status tabs and card actions.",
    requirements: ["REQ-WF-001", "REQ-WF-002", "REQ-WF-004", "REQ-WF-014", "REQ-WF-015"],
    roles: ["Admin"]
  },
  {
    id: "SCR-202",
    name: "Workflow Root-Setup",
    module: "Workflow Builder",
    group: "Governance",
    type: "workflow-root",
    description: "Root condition setup for project-based routing.",
    requirements: ["REQ-WF-003", "REQ-WF-004", "REQ-WF-005"],
    roles: ["Admin"]
  },
  {
    id: "SCR-203",
    name: "Workflow Builder",
    module: "Workflow Builder",
    group: "Governance",
    type: "workflow-builder",
    description: "Visual sequence and condition builder for workflow steps.",
    requirements: ["REQ-WF-006", "REQ-WF-010", "REQ-WF-011", "REQ-WF-012", "REQ-WF-017"],
    roles: ["Admin"]
  },
  {
    id: "SCR-211",
    name: "Approver Flow List",
    module: "Approver Flow Builder",
    group: "Governance",
    type: "approver-list",
    description: "Approver flow cards with publish/version operations.",
    requirements: ["REQ-AF-001", "REQ-AF-003", "REQ-AF-010", "REQ-AF-011"],
    roles: ["Admin"]
  },
  {
    id: "SCR-212",
    name: "Approver Flow Builder",
    module: "Approver Flow Builder",
    group: "Governance",
    type: "approver-builder",
    description: "Define approver steps, resolver type, and completion logic.",
    requirements: ["REQ-AF-002", "REQ-AF-004", "REQ-AF-005", "REQ-AF-006", "REQ-AF-009"],
    roles: ["Admin"]
  },
  {
    id: "SCR-221",
    name: "Document Core List",
    module: "Document Core",
    group: "Governance",
    type: "document-core-list",
    description: "Manage document types and core metadata.",
    requirements: ["REQ-DGRP-001", "REQ-DGRP-002", "REQ-DGRP-003"],
    roles: ["Admin"]
  },
  {
    id: "SCR-222",
    name: "Document Template & Field Setup",
    module: "Document Core",
    group: "Governance",
    type: "document-template",
    description: "Template fields, signature zones, and publish control.",
    requirements: ["REQ-DGRP-004", "REQ-DGRP-005", "REQ-SIGP-001", "REQ-SIGP-005"],
    roles: ["Admin"]
  },
  {
    id: "SCR-800",
    name: "Report Center",
    module: "Report Center",
    group: "Reports",
    type: "report-center",
    description: "Central entrypoint for all operational and audit reports.",
    requirements: ["REQ-RPT-001", "REQ-RPT-002", "REQ-RPT-004", "REQ-RPT-007"],
    roles: ["Admin", "Approver", "Auditor", "Executive", "Requester"]
  },
  {
    id: "SCR-900",
    name: "Masterdata Catalog",
    module: "Masterdata",
    group: "Masterdata",
    type: "master-catalog",
    description: "Central list of all selector datasets consumed by modules.",
    requirements: ["REQ-MST-001", "REQ-MST-002", "REQ-MST-004", "REQ-MST-007"],
    roles: ["Admin"]
  },
  {
    id: "SCR-991",
    name: "User Management",
    module: "User Management",
    group: "Administration",
    type: "user-management",
    description: "Manage user accounts, department mapping, and effective permissions.",
    requirements: ["REQ-URM-001", "REQ-URM-004", "REQ-URM-007", "REQ-URM-009"],
    roles: ["Admin"]
  },
  {
    id: "SCR-992",
    name: "Role Management",
    module: "Role Management",
    group: "Administration",
    type: "role-management",
    description: "Manage role profiles, permission scope, and impacted user access.",
    requirements: ["REQ-URM-002", "REQ-URM-003", "REQ-URM-005", "REQ-URM-010"],
    roles: ["Admin"]
  },
  {
    id: "SCR-993",
    name: "Delegation Management",
    module: "Delegation Management",
    group: "Administration",
    type: "delegation",
    description: "Delegator/delegatee assignment with effective period and scope.",
    requirements: ["REQ-DEL-001", "REQ-DEL-003", "REQ-DEL-005", "REQ-DEL-008", "REQ-DEL-009"],
    roles: ["Admin", "Approver"]
  },
  {
    id: "SCR-994",
    name: "LOV Management",
    module: "LOV Management",
    group: "Administration",
    type: "lov",
    description: "Lifecycle values used in workflow, status, and action dictionaries.",
    requirements: ["REQ-MST-004", "REQ-MST-005"],
    roles: ["Admin"]
  },
  {
    id: "SCR-995",
    name: "Notification Center / Template",
    module: "Notification",
    group: "Administration",
    type: "notification",
    description: "Notification channel controls, templates, and failed queue handling.",
    requirements: ["REQ-NOTI-001", "REQ-NOTI-003", "REQ-NOTI-005", "REQ-NOTI-008"],
    roles: ["Admin"]
  },
  {
    id: "SCR-999",
    name: "Integration Sync",
    module: "Integration Sync",
    group: "Integration",
    type: "integration",
    description: "Monitor external synchronization jobs and retries.",
    requirements: ["REQ-RPT-005", "REQ-NOTI-007", "REQ-MST-006"],
    roles: ["Admin", "Auditor"]
  }
];

const REPORT_SCREEN_META = [
  ["SCR-801", "RPT-Project Summary Report", "Track overall project outcomes and completion rates."],
  ["SCR-802", "RPT-Project Workflow Progress Report", "Measure workflow progression by project and stage."],
  ["SCR-803", "RPT-Document Status Report", "Track current document statuses with owner context."],
  ["SCR-804", "RPT-Pending Approval / Task Report", "Identify pending approvals and active waiting queues."],
  ["SCR-805", "RPT-Returned / Revision Report", "Track return counts, reasons, and resubmission turnaround."],
  ["SCR-806", "RPT-Workflow Performance / Bottleneck Report", "Analyze cycle times and bottleneck steps."],
  ["SCR-807", "RPT-Approver Workload Report", "View workload distribution across approver roles/users."],
  ["SCR-808", "RPT-Audit Trail Report", "Review action and status history for audit compliance."],
  ["SCR-809", "RPT-Export / Download Log Report", "Track export/download actions and data access."],
  ["SCR-810", "RPT-Integration Sync Report", "Track integration sync status and retry outcomes."],
  ["SCR-811", "RPT-Configuration / Masterdata Change Report", "Track configuration and masterdata changes over time."]
];

const MASTERDATA_SCREEN_META = [
  ["SCR-901", "MASTER-Budget Year", "Budget year selector for project setup and report filters."],
  ["SCR-902", "MASTER-Project Type", "Project type selector for workflow path selection."],
  ["SCR-903", "MASTER-Budget Type", "Budget type selector for reports and external mapping."],
  ["SCR-904", "MASTER-Procurement Method", "Procurement method selector for conditions and filters."],
  ["SCR-905", "MASTER-Procurement Category", "Procurement category grouping and report filtering."],
  ["SCR-906", "MASTER-Vendor Master", "Vendor references used in projects and documents."],
  ["SCR-907", "MASTER-GL Account", "GL account references for finance and procurement forms."],
  ["SCR-908", "MASTER-Strategy Operation", "Strategic operation selectors linked to projects."],
  ["SCR-909", "MASTER-Outcome", "Outcome taxonomy used for project targeting and reports."],
  ["SCR-910", "MASTER-Output", "Output taxonomy associated with outcomes."],
  ["SCR-911", "MASTER-Cost Center", "Cost center references used in project/document mapping."],
  ["SCR-912", "MASTER-Unit of Measure", "UoM selector for material/item document fields."],
  ["SCR-913", "MASTER-Material Group", "Material group classification for document + reports."],
  ["SCR-914", "MASTER-Material Image Reference", "Material image reference lookup for visual context."],
  ["SCR-915", "MASTER-Position", "Committee position and role references."],
  ["SCR-916", "MASTER-Reason Code", "Reason code values for return/cancel/archive actions."],
  ["SCR-917", "MASTER-Attachment Category", "Attachment category taxonomy for upload records."],
  ["SCR-918", "MASTER-Integration Mapping Code", "Internal/external mapping codes for integrations."],
  ["SCR-919", "MASTER-Department", "Department master data used for user ownership and access segmentation."]
];

const REPORT_SCREENS = REPORT_SCREEN_META.map(([id, name, description]) => ({
  id,
  name,
  module: "Report Center",
  group: "Reports",
  type: "report-detail",
  description,
  requirements: ["REQ-RPT-002", "REQ-RPT-003", "REQ-RPT-004", "REQ-RPT-006", "REQ-RPT-007"],
  roles: ["Admin", "Approver", "Auditor", "Executive", "Requester"]
}));

const MASTERDATA_SCREENS = MASTERDATA_SCREEN_META.map(([id, name, description]) => ({
  id,
  name,
  module: "Masterdata",
  group: "Masterdata",
  type: "master-dataset",
  description,
  requirements: ["REQ-MST-002", "REQ-MST-003", "REQ-MST-005", "REQ-MST-008", "REQ-MST-011"],
  roles: ["Admin"]
}));

const ALL_SCREENS = [...BASE_SCREENS, ...REPORT_SCREENS, ...MASTERDATA_SCREENS].sort((a, b) =>
  a.id.localeCompare(b.id)
);

const SCREEN_BY_ID = Object.fromEntries(ALL_SCREENS.map((screen) => [screen.id, screen]));

const NAV_GROUP_ORDER = ["System", "Workspaces", "Governance", "Reports", "Masterdata", "Administration", "Integration"];

const MOCK = {
  projects: [
    { id: "PRJ-2026-001", name: "Digital Signature Procurement", owner: "S. Wattanapong", budget: "490,000", status: "In Review", progress: 62 },
    { id: "PRJ-2026-004", name: "Branch Infrastructure Refresh", owner: "N. Chaiyakarn", budget: "3,920,000", status: "Pending", progress: 38 },
    { id: "PRJ-2026-009", name: "External Vendor Onboarding", owner: "K. Naris", budget: "860,000", status: "Completed", progress: 100 },
    { id: "PRJ-2026-012", name: "Internal Workflow Migration", owner: "P. Tansiri", budget: "1,540,000", status: "In Review", progress: 71 },
    { id: "PRJ-2026-015", name: "Material Classification Rollout", owner: "M. Sujira", budget: "420,000", status: "Returned", progress: 54 }
  ],
  tasks: [
    { no: "TSK-14001", doc: "TOR-001", action: "Approve", assignee: "Approver Team A", due: "2026-05-25", status: "Pending" },
    { no: "TSK-14002", doc: "PO-009", action: "Return", assignee: "Requester", due: "2026-05-24", status: "Returned" },
    { no: "TSK-14003", doc: "PR-112", action: "Review", assignee: "Committee Group C", due: "2026-05-27", status: "In Review" },
    { no: "TSK-14004", doc: "DOC-822", action: "Approve", assignee: "Finance Lead", due: "2026-05-23", status: "Pending" },
    { no: "TSK-14005", doc: "DOC-907", action: "Archive", assignee: "Admin", due: "2026-05-28", status: "Completed" }
  ],
  workflowCards: [
    { name: "WF Procurement <= 500K", status: "Published", instances: "4 docs / 7 steps", editor: "N. Chaiyakarn", date: "2026-05-20" },
    { name: "WF Procurement > 500K", status: "On Review", instances: "6 docs / 9 steps", editor: "K. Naris", date: "2026-05-22" },
    { name: "WF IT Equipment", status: "Draft", instances: "3 docs / 5 steps", editor: "P. Tansiri", date: "2026-05-23" },
    { name: "WF Budget Transfer", status: "Published", instances: "5 docs / 8 steps", editor: "S. Wattanapong", date: "2026-05-19" }
  ],
  approverCards: [
    { name: "AF Committee Sequential", status: "Published", instances: "5 steps", editor: "N. Chaiyakarn", date: "2026-05-20" },
    { name: "AF Finance Resolver", status: "Draft", instances: "4 steps", editor: "M. Sujira", date: "2026-05-23" },
    { name: "AF Parallel Review", status: "On Review", instances: "6 steps", editor: "P. Tansiri", date: "2026-05-22" },
    { name: "AF External Vendor", status: "Published", instances: "3 steps", editor: "K. Naris", date: "2026-05-19" }
  ],
  users: [
    { user: "nitaya.w", role: "Admin", department: "PMO", status: "Active" },
    { user: "kanit.s", role: "Approver", department: "Finance", status: "Active" },
    { user: "naris.k", role: "Requester", department: "Procurement", status: "Active" },
    { user: "audit.bot", role: "Auditor", department: "Audit", status: "Active" },
    { user: "vendor.alpha", role: "Vendor", department: "External", status: "Inactive" }
  ],
  roles: [
    { role: "Admin", scope: "All Modules", users: 4, approvalLimit: "Unlimited", status: "Active" },
    { role: "Approver", scope: "Task + Approval", users: 18, approvalLimit: "10,000,000", status: "Active" },
    { role: "Requester", scope: "Project + Document Submit", users: 96, approvalLimit: "0", status: "Active" },
    { role: "Auditor", scope: "Read-only + Audit Trail", users: 6, approvalLimit: "0", status: "Active" },
    { role: "Vendor", scope: "External Task Only", users: 27, approvalLimit: "0", status: "Inactive" }
  ]
};

const state = {
  role: localStorage.getItem("edoc-role") || "Admin",
  authenticated: localStorage.getItem("edoc-auth") !== "false",
  navQuery: "",
  dashboardStatusFocus: "All",
  dashboardReturnedFocus: "All",
  dashboardWorkloadMode: "Role-Based",
  dashboardTrendPeriod: "Week",
  dashboardTrendDepartments: ["All"],
  projectSearch: "",
  taskSearch: "",
  workflowSearch: "",
  workflowStatus: "All",
  workflowSort: "newest",
  workflowBuilderView: "board",
  workflowSideTab: "documents",
  workflowActiveModal: null,
  workflowSelectedLine: null,
  workflowConnectMode: false,
  workflowConnectFrom: null,
  workflowNodes: null,
  workflowLines: null,
  approverSearch: "",
  approverStatus: "All",
  approverSort: "newest",
  approverBuilderView: "board",
  approverActiveModal: null,
  approverSelectedLine: null,
  approverConnectMode: false,
  approverConnectFrom: null,
  approverNodes: null,
  approverLines: null,
  screenSearch: "",
  toastTimer: null
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function getCurrentScreenId() {
  const raw = location.hash.replace("#", "").trim();
  if (!raw) {
    return state.authenticated ? "SCR-002" : "SCR-001";
  }
  return raw;
}

function statusToBadge(status) {
  if (status === "Published" || status === "Completed" || status === "Active") return "badge-published";
  if (status === "On Review" || status === "In Review" || status === "Pending") return "badge-review";
  if (status === "Returned" || status === "Failed" || status === "Inactive") return "badge-returned";
  return "badge-draft";
}

function canAccess(screen) {
  if (!state.authenticated && screen.id !== "SCR-001") return false;
  if (state.role === "Admin") return true;
  return (screen.roles || []).includes(state.role);
}

function renderSidebar(currentId) {
  const grouped = {};
  NAV_GROUP_ORDER.forEach((group) => {
    grouped[group] = [];
  });

  ALL_SCREENS.forEach((screen) => {
    if (!grouped[screen.group]) grouped[screen.group] = [];
    const searchMatch = `${screen.id} ${screen.name} ${screen.module}`.toLowerCase().includes(state.navQuery.toLowerCase());
    if (searchMatch) grouped[screen.group].push(screen);
  });

  const groupsMarkup = Object.entries(grouped)
    .filter(([, items]) => items.length > 0)
    .map(([group, items]) => {
      const listMarkup = items
        .map((screen) => {
          const activeClass = screen.id === currentId ? "is-active" : "";
          const inaccessible = !canAccess(screen) ? " (locked)" : "";
          return `
            <li class="nav-item ${activeClass}">
              <a href="#${screen.id}">
                <span class="scr-code">${screen.id}</span>
                <span class="nav-label">${escapeHtml(screen.name)}${inaccessible}</span>
              </a>
            </li>
          `;
        })
        .join("");
      return `
        <section class="nav-group">
          <h4 class="nav-group-title">${escapeHtml(group)}</h4>
          <ul class="nav-list">${listMarkup}</ul>
        </section>
      `;
    })
    .join("");

  return `
    <aside class="sidebar">
      <div class="brand-block">
        <div class="brand-mark">ED</div>
        <div class="brand-copy">
          <p class="brand-title">e-Doc Product</p>
          <p class="brand-sub">Complete Key Screen List</p>
        </div>
      </div>

      <section class="role-panel">
        <label for="roleSelect">Active Role</label>
        <select id="roleSelect">
          ${ROLE_OPTIONS.map((role) => `<option value="${role}" ${role === state.role ? "selected" : ""}>${role}</option>`).join("")}
        </select>
        <label for="navSearch">Find Screen</label>
        <input id="navSearch" type="search" placeholder="Search SCR or page name" value="${escapeHtml(state.navQuery)}">
      </section>

      <div class="nav-scroll">
        ${groupsMarkup}
      </div>

      <footer class="sidebar-footer">
        <span>${state.authenticated ? "Session Active" : "Session Locked"}</span>
        <a href="#SCR-001">${state.authenticated ? "Switch User" : "Login"}</a>
      </footer>
    </aside>
  `;
}

function renderHeader(screen) {
  return `
    <header class="main-header">
      <div class="main-header-top">
        <div class="breadcrumbs">
          <span>Product</span>
          <span>/</span>
          <span>${escapeHtml(screen.module)}</span>
          <span>/</span>
          <span>${escapeHtml(screen.id)}</span>
        </div>
        <div class="header-actions">
          <span class="chip status-chip">${escapeHtml(state.role)}</span>
          <span class="chip ${state.authenticated ? "status-ok" : "status-danger"}">${state.authenticated ? "Authenticated" : "Logged out"}</span>
          <button class="btn-soft" id="sessionToggle">${state.authenticated ? "Logout" : "Login"}</button>
        </div>
      </div>
      <h1 class="screen-title">${escapeHtml(screen.id)} - ${escapeHtml(screen.name)}</h1>
      <p class="screen-subtitle">${escapeHtml(screen.description)}</p>
    </header>
  `;
}

function renderRequirementPanel(screen) {
  const reqItems = (screen.requirements || []).map((req) => `<li><code>${escapeHtml(req)}</code></li>`).join("");
  const points = (MODULE_REQUIREMENTS[screen.module] || ["No summary points mapped."])
    .map((point) => `<li>${escapeHtml(point)}</li>`)
    .join("");

  return `
    <div class="right-panel">
      <article class="view-card">
        <h3>Requirement Traceability</h3>
        <ul class="req-list">${reqItems}</ul>
      </article>
      <article class="view-card">
        <h3>Module Intent</h3>
        <ul class="module-points">${points}</ul>
      </article>
    </div>
  `;
}

function sumChartValues(items) {
  return items.reduce((total, item) => total + (Number(item.value) || 0), 0);
}

function renderDonutGraphic(segments, centerValue, centerLabel) {
  const positiveTotal = sumChartValues(segments);
  const total = Math.max(positiveTotal, 1);
  let startAngle = 0;
  const stops = segments
    .map((segment) => {
      const size = ((Number(segment.value) || 0) / total) * 360;
      const endAngle = startAngle + size;
      const stop = `${segment.color} ${startAngle.toFixed(2)}deg ${endAngle.toFixed(2)}deg`;
      startAngle = endAngle;
      return stop;
    })
    .join(", ");
  const gradient = positiveTotal > 0 ? `conic-gradient(${stops})` : "conic-gradient(#dbe7f4 0deg 360deg)";

  return `
    <div class="chart-donut" style="background:${gradient}">
      <div class="chart-donut-core">
        <strong>${escapeHtml(centerValue)}</strong>
        <span>${escapeHtml(centerLabel)}</span>
      </div>
    </div>
  `;
}

function renderBarMetricRows(items, maxValueOverride) {
  const maxValue = maxValueOverride || Math.max(...items.map((item) => Number(item.value) || 0), 1);
  return items
    .map((item) => {
      const value = Number(item.value) || 0;
      const ratio = maxValue === 0 ? 0 : (value / maxValue) * 100;
      const width = value > 0 ? Math.max(ratio, 6) : 0;
      return `
        <div class="chart-bar-row">
          <span class="chart-bar-label">${escapeHtml(item.label)}</span>
          <div class="chart-bar-track">
            <span class="chart-bar-fill" style="width:${width.toFixed(1)}%;background:${escapeHtml(item.color)}"></span>
          </div>
          <span class="chart-bar-value">${escapeHtml(String(value))}</span>
        </div>
      `;
    })
    .join("");
}

function renderDocumentStackedRows(documents, statusOrder, colorByStatus, statusFocus) {
  const maxFocused = Math.max(
    ...documents.map((doc) => Number(doc.statuses[statusFocus]) || 0),
    1
  );
  return documents
    .map((doc) => {
      const total = statusOrder.reduce((sum, status) => sum + (Number(doc.statuses[status]) || 0), 0);
      const docName = escapeHtml(doc.name);

      if (statusFocus !== "All") {
        const focused = Number(doc.statuses[statusFocus]) || 0;
        const ratio = (focused / maxFocused) * 100;
        const width = focused > 0 ? Math.max(ratio, 6) : 0;
        return `
          <div class="stacked-row">
            <div class="stacked-row-head">
              <span>${docName}</span>
              <span>${escapeHtml(String(focused))}</span>
            </div>
            <div class="stacked-track">
              <span class="stacked-segment" style="width:${width.toFixed(1)}%;background:${escapeHtml(colorByStatus[statusFocus])}"></span>
            </div>
          </div>
        `;
      }

      const segments = statusOrder
        .map((status) => {
          const value = Number(doc.statuses[status]) || 0;
          if (value === 0 || total === 0) return "";
          const ratio = (value / total) * 100;
          const width = Math.max(ratio, 3);
          return `<span class="stacked-segment" style="width:${width.toFixed(1)}%;background:${escapeHtml(colorByStatus[status])}" title="${escapeHtml(
            `${status}: ${value}`
          )}"></span>`;
        })
        .join("");

      return `
        <div class="stacked-row">
          <div class="stacked-row-head">
            <span>${docName}</span>
            <span>${escapeHtml(String(total))}</span>
          </div>
          <div class="stacked-track">${segments}</div>
        </div>
      `;
    })
    .join("");
}

function renderLineChartSvg(labels, series) {
  const width = 600;
  const height = 240;
  const padLeft = 38;
  const padRight = 12;
  const padTop = 16;
  const padBottom = 30;
  const maxValue = Math.max(1, ...series.flatMap((item) => item.values.map((value) => Number(value) || 0)));
  const usableWidth = width - padLeft - padRight;
  const usableHeight = height - padTop - padBottom;
  const xStep = labels.length > 1 ? usableWidth / (labels.length - 1) : usableWidth;
  const xPos = (index) => padLeft + xStep * index;
  const yPos = (value) => padTop + usableHeight - ((Number(value) || 0) / maxValue) * usableHeight;

  const gridLines = Array.from({ length: 5 }, (_, index) => {
    const ratio = index / 4;
    const y = padTop + ratio * usableHeight;
    const label = Math.round(maxValue * (1 - ratio));
    return `
      <line x1="${padLeft}" y1="${y.toFixed(2)}" x2="${(width - padRight).toFixed(2)}" y2="${y.toFixed(2)}"></line>
      <text x="${(padLeft - 8).toFixed(2)}" y="${(y + 4).toFixed(2)}">${label}</text>
    `;
  }).join("");

  const xLabels = labels
    .map(
      (label, index) => `
      <text x="${xPos(index).toFixed(2)}" y="${(height - 8).toFixed(2)}" text-anchor="middle">${escapeHtml(label)}</text>
    `
    )
    .join("");

  const seriesLines = series
    .map((line) => {
      const points = line.values
        .map((value, index) => `${xPos(index).toFixed(2)},${yPos(value).toFixed(2)}`)
        .join(" ");
      const dots = line.values
        .map(
          (value, index) => `
          <circle cx="${xPos(index).toFixed(2)}" cy="${yPos(value).toFixed(2)}" r="3"></circle>
        `
        )
        .join("");

      return `
        <g class="line-series" style="--line-color:${escapeHtml(line.color)}">
          <polyline points="${points}"></polyline>
          ${dots}
        </g>
      `;
    })
    .join("");

  const legend = series
    .map(
      (line) => `
      <span class="line-legend-item">
        <i style="background:${escapeHtml(line.color)}"></i>
        ${escapeHtml(line.label)}
      </span>
    `
    )
    .join("");

  return `
    <div class="line-chart-wrap">
      <svg class="line-chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Performance trend line chart">
        <g class="line-grid">${gridLines}</g>
        <g class="line-series-wrap">${seriesLines}</g>
        <g class="line-axis-labels">${xLabels}</g>
      </svg>
      <div class="line-legend">${legend}</div>
    </div>
  `;
}

function renderDashboard(screen) {
  const pending = MOCK.tasks.filter((task) => task.status === "Pending").length;
  const inReview = MOCK.tasks.filter((task) => task.status === "In Review").length;
  const completed = MOCK.tasks.filter((task) => task.status === "Completed").length;
  const returned = MOCK.tasks.filter((task) => task.status === "Returned").length;
  const delegated = 2;
  const dueToday = MOCK.tasks.filter((task) => task.due === "2026-05-24").length;
  const overdue = 3;
  const completedPercent = Math.round((completed / Math.max(MOCK.tasks.length, 1)) * 100);

  const documentStatusSegments = [
    { key: "Draft", value: 6, color: "#8f9bb2" },
    { key: "Submitted", value: 8, color: "#1b9ddd" },
    { key: "In Review", value: 10, color: "#1c7ec8" },
    { key: "Returned", value: 4, color: "#de6b4d" },
    { key: "Completed", value: 16, color: "#18a88d" },
    { key: "Archived", value: 5, color: "#3f6f9b" }
  ];
  const statusOrder = documentStatusSegments.map((segment) => segment.key);
  const colorByStatus = Object.fromEntries(documentStatusSegments.map((segment) => [segment.key, segment.color]));
  const statusFocus = state.dashboardStatusFocus;
  const totalDocuments = sumChartValues(documentStatusSegments);

  const documents = [
    { name: "TOR", statuses: { Draft: 1, Submitted: 2, "In Review": 2, Returned: 1, Completed: 3, Archived: 1 } },
    { name: "PR", statuses: { Draft: 1, Submitted: 1, "In Review": 2, Returned: 1, Completed: 4, Archived: 1 } },
    { name: "PO", statuses: { Draft: 1, Submitted: 1, "In Review": 3, Returned: 1, Completed: 3, Archived: 1 } },
    { name: "Contract", statuses: { Draft: 2, Submitted: 2, "In Review": 2, Returned: 1, Completed: 2, Archived: 1 } },
    { name: "Inspection", statuses: { Draft: 1, Submitted: 2, "In Review": 1, Returned: 0, Completed: 4, Archived: 1 } }
  ];

  const agingData = [
    { label: "0-30 days", value: 14, color: "#1aa78f" },
    { label: "31-90 days", value: 8, color: "#1a86ce" },
    { label: "90+ days", value: 3, color: "#e27a56" }
  ];

  const ownDelegatedSegments = [
    { key: "Own Task", value: 18, color: "#0c79bf" },
    { key: "Delegated Task", value: 7, color: "#21b694" }
  ];

  const returnedSummary = [
    {
      reason: "Missing attachment",
      items: [
        { label: "TOR", value: 7, color: "#1b9ddd" },
        { label: "PR", value: 4, color: "#61b8e8" },
        { label: "Contract", value: 3, color: "#9ed5f2" },
        { label: "Inspection", value: 2, color: "#d2ecfb" }
      ]
    },
    {
      reason: "Invalid fields",
      items: [
        { label: "PO", value: 6, color: "#ff9f66" },
        { label: "Inspection", value: 3, color: "#ffc28f" },
        { label: "TOR", value: 2, color: "#ffd9ba" },
        { label: "Contract", value: 2, color: "#ffe8d6" }
      ]
    },
    {
      reason: "Budget mismatch",
      items: [
        { label: "PR", value: 5, color: "#8f7de1" },
        { label: "PO", value: 3, color: "#b8abea" },
        { label: "Contract", value: 1, color: "#d7cff4" },
        { label: "TOR", value: 1, color: "#ebe4fb" }
      ]
    }
  ];
  const returnedFocus = state.dashboardReturnedFocus;

  const workloadRoleData = [
    { label: "Approver", value: 19, color: "#1b9ddd" },
    { label: "Requester", value: 14, color: "#28b18f" },
    { label: "Reviewer", value: 11, color: "#4e8fd4" },
    { label: "Finance Lead", value: 8, color: "#7da9db" }
  ];
  const workloadDepartmentData = [
    { label: "Procurement", value: 17, color: "#1b9ddd" },
    { label: "Finance", value: 13, color: "#28b18f" },
    { label: "PMO", value: 10, color: "#4e8fd4" },
    { label: "Audit", value: 6, color: "#7da9db" }
  ];
  const workloadData = state.dashboardWorkloadMode === "Department-Based" ? workloadDepartmentData : workloadRoleData;

  const trendByPeriod = {
    Day: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        { label: "Submit Times", values: [14, 12, 15, 13, 16, 11, 10], color: "#1b9ddd" },
        { label: "Approval Times", values: [10, 9, 11, 10, 12, 8, 7], color: "#21b694" },
        { label: "Complete Times", values: [8, 7, 9, 8, 10, 7, 6], color: "#315f98" }
      ]
    },
    Week: {
      labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
      series: [
        { label: "Submit Times", values: [12, 15, 14, 17, 16, 18], color: "#1b9ddd" },
        { label: "Approval Times", values: [9, 11, 12, 13, 14, 15], color: "#21b694" },
        { label: "Complete Times", values: [7, 9, 10, 11, 12, 14], color: "#315f98" }
      ]
    },
    Month: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      series: [
        { label: "Submit Times", values: [58, 63, 61, 67, 71, 74], color: "#1b9ddd" },
        { label: "Approval Times", values: [44, 47, 48, 51, 55, 57], color: "#21b694" },
        { label: "Complete Times", values: [39, 41, 43, 45, 49, 53], color: "#315f98" }
      ]
    }
  };
  const trendDepartmentWeights = {
    Procurement: 1,
    Finance: 0.86,
    PMO: 0.72,
    Audit: 0.58
  };
  const trendPeriod = trendByPeriod[state.dashboardTrendPeriod] ? state.dashboardTrendPeriod : "Week";
  const trendDepartments =
    Array.isArray(state.dashboardTrendDepartments) && state.dashboardTrendDepartments.length > 0
      ? state.dashboardTrendDepartments
      : ["All"];
  const trendWeightList = trendDepartments.includes("All")
    ? [1]
    : trendDepartments.map((department) => trendDepartmentWeights[department]).filter((value) => Number.isFinite(value));
  const trendFactor =
    trendWeightList.length > 0
      ? trendWeightList.reduce((sum, value) => sum + value, 0) / trendWeightList.length
      : 1;
  const performanceLabels = trendByPeriod[trendPeriod].labels;
  const performanceSeries = trendByPeriod[trendPeriod].series.map((line) => ({
    ...line,
    values: line.values.map((value) => Math.max(1, Math.round(value * trendFactor)))
  }));

  const rows = MOCK.tasks
    .slice(0, 5)
    .map(
      (task) => `
      <tr>
        <td>${escapeHtml(task.no)}</td>
        <td>${escapeHtml(task.doc)}</td>
        <td>${escapeHtml(task.action)}</td>
        <td>${escapeHtml(task.assignee)}</td>
        <td>${escapeHtml(task.due)}</td>
        <td><span class="badge ${statusToBadge(task.status)}">${escapeHtml(task.status)}</span></td>
      </tr>
    `
    )
    .join("");

  const statusPills = ["All", ...statusOrder]
    .map(
      (status) => `
      <button class="pill ${status === statusFocus ? "is-active" : ""}" data-status-focus="${escapeHtml(status)}">${escapeHtml(status)}</button>
    `
    )
    .join("");

  const documentLegend = documentStatusSegments
    .map(
      (segment) => `
      <button class="chart-legend-row chart-legend-action ${segment.key === statusFocus ? "is-active" : ""}" data-status-focus="${escapeHtml(
        segment.key
      )}" type="button">
        <span class="chart-dot" style="background:${escapeHtml(segment.color)}"></span>
        <span>${escapeHtml(segment.key)}</span>
        <strong>${escapeHtml(String(segment.value))}</strong>
      </button>
    `
    )
    .join("");

  const ownDelegatedLegend = ownDelegatedSegments
    .map(
      (segment) => `
      <div class="chart-legend-row">
        <span class="chart-dot" style="background:${escapeHtml(segment.color)}"></span>
        <span>${escapeHtml(segment.key)}</span>
        <strong>${escapeHtml(String(segment.value))}</strong>
      </div>
    `
    )
    .join("");

  const returnedSummaryMarkup = returnedSummary
    .map((group) => {
      const total = group.items.reduce((sum, item) => sum + item.value, 0);
      const max = Math.max(...group.items.map((item) => item.value), 1);
      const expanded = returnedFocus === group.reason;
      const visibleItems = expanded ? group.items : group.items.slice(0, 3);
      const hiddenCount = Math.max(group.items.length - visibleItems.length, 0);
      return `
        <section class="cluster-group ${expanded ? "is-expanded" : ""}">
          <button class="cluster-head cluster-toggle" type="button" data-returned-focus="${escapeHtml(group.reason)}" aria-expanded="${expanded}">
            <h4>${escapeHtml(group.reason)}</h4>
            <span>${escapeHtml(String(total))} returns</span>
          </button>
          ${renderBarMetricRows(visibleItems, max)}
          <p class="cluster-note">${
            expanded
              ? "Expanded view: showing all documents for this return reason."
              : hiddenCount > 0
                ? `Collapsed view: top 3 documents shown (+${hiddenCount} more).`
                : "Collapsed view: all documents fit within top list."
          }</p>
        </section>
      `;
    })
    .join("");
  const returnedReasonPills = ["All", ...returnedSummary.map((group) => group.reason)]
    .map(
      (reason) => `
      <button class="pill ${reason === returnedFocus ? "is-active" : ""}" data-returned-focus="${escapeHtml(reason)}">${escapeHtml(
        reason === "All" ? "All Reasons" : reason
      )}</button>
    `
    )
    .join("");
  const trendPeriodPills = ["Day", "Week", "Month"]
    .map(
      (period) => `
      <button class="pill ${period === trendPeriod ? "is-active" : ""}" data-trend-period="${escapeHtml(period)}">${escapeHtml(period)}</button>
    `
    )
    .join("");
  const trendDepartmentPills = ["All", "Procurement", "Finance", "PMO", "Audit"]
    .map(
      (department) => `
      <button class="pill ${trendDepartments.includes(department) ? "is-active" : ""}" data-trend-department="${escapeHtml(
        department
      )}">${escapeHtml(department === "All" ? "All Departments" : department)}</button>
    `
    )
    .join("");

  return `
    <section class="content-grid">
      <div class="stack">
        <section class="dashboard-section">
          <header class="dashboard-section-head">
            <h2>Operational Dashboard Section</h2>
            <p>Day-to-day document flow, approval execution, and task monitoring.</p>
          </header>

          <article class="view-card">
            <h3>My Pending Task KPI Cards</h3>
            <div class="kpi-grid">
              <button class="kpi kpi-action-card" type="button" data-go="SCR-021">
                <p class="kpi-value">${escapeHtml(String(pending))}</p>
                <p class="kpi-label">Own Pending</p>
                <span class="kpi-hint">Drill to Task Center</span>
              </button>
              <button class="kpi kpi-action-card" type="button" data-go="SCR-021">
                <p class="kpi-value">${escapeHtml(String(delegated))}</p>
                <p class="kpi-label">Delegated Pending</p>
                <span class="kpi-hint">Drill to Task Center</span>
              </button>
              <button class="kpi kpi-action-card" type="button" data-go="SCR-021">
                <p class="kpi-value">${escapeHtml(String(overdue))}</p>
                <p class="kpi-label">Overdue Tasks</p>
                <span class="kpi-hint">Drill to Pending Approval / Task</span>
              </button>
              <button class="kpi kpi-action-card" type="button" data-go="SCR-021">
                <p class="kpi-value">${escapeHtml(String(dueToday))}</p>
                <p class="kpi-label">Due Today</p>
                <span class="kpi-hint">Drill to task queue</span>
              </button>
            </div>
          </article>

          <article class="view-card">
            <h3>My Document Status Cards</h3>
            <div class="kpi-grid">
              ${documentStatusSegments
                .map(
                  (segment) => `
                <button class="kpi kpi-action-card" type="button" data-status-focus="${escapeHtml(segment.key)}">
                  <p class="kpi-value">${escapeHtml(String(segment.value))}</p>
                  <p class="kpi-label">${escapeHtml(segment.key)}</p>
                  <span class="kpi-hint">Drill dashboard status split</span>
                </button>
              `
                )
                .join("")}
            </div>
          </article>

          <section class="dashboard-chart-grid">
            <article class="view-card chart-card">
              <h3>Document Summary by Status</h3>
              <div class="chart-toolbar">
                <span class="chart-toolbar-label">Status Focus</span>
                <div class="pill-row chart-pill-row">${statusPills}</div>
              </div>
              <div class="donut-layout">
                ${renderDonutGraphic(documentStatusSegments, String(totalDocuments), "Documents")}
                <div class="chart-legend">${documentLegend}</div>
              </div>
              <p class="mini-note">Drilldown: click a status chip or legend row to focus document split by that status.</p>
              <div class="stacked-list">
                ${renderDocumentStackedRows(documents, statusOrder, colorByStatus, statusFocus)}
              </div>
            </article>

            <article class="view-card chart-card">
              <h3>Pending Approval Aging Chart</h3>
              <div class="chart-bars">
                ${renderBarMetricRows(agingData)}
              </div>
            </article>

            <article class="view-card chart-card">
              <h3>Own / Delegated Task Donut</h3>
              <div class="donut-layout">
                ${renderDonutGraphic(ownDelegatedSegments, "25", "Task Pool")}
                <div class="chart-legend">${ownDelegatedLegend}</div>
              </div>
            </article>

            <article class="view-card chart-card">
              <h3>Returned Summary</h3>
              <div class="chart-toolbar">
                <span class="chart-toolbar-label">Reason Drilldown</span>
                <div class="pill-row chart-pill-row">${returnedReasonPills}</div>
              </div>
              <div class="cluster-wrap">
                ${returnedSummaryMarkup}
              </div>
              <p class="mini-note">Click a return reason to expand all document types under that reason. Other reasons collapse automatically.</p>
            </article>
          </section>

          <article class="view-card">
            <h3>Recent Tasks</h3>
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Task No</th>
                    <th>Document</th>
                    <th>Action</th>
                    <th>Assignee</th>
                    <th>Due</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>${rows}</tbody>
              </table>
            </div>
          </article>
        </section>

        <section class="dashboard-section">
          <header class="dashboard-section-head">
            <h2>Management Dashboard Section</h2>
            <p>Executive-level workload balance, trend signals, and portfolio outcome metrics.</p>
          </header>

          <article class="view-card">
            <h3>Executive KPI Cards</h3>
            <div class="kpi-grid">
              <button class="kpi kpi-action-card" type="button" data-go="SCR-011">
                <p class="kpi-value">${escapeHtml(String(MOCK.projects.length))}</p>
                <p class="kpi-label">Total Projects</p>
                <span class="kpi-hint">Drill to Project List</span>
              </button>
              <button class="kpi kpi-action-card" type="button" data-go="SCR-803">
                <p class="kpi-value">${escapeHtml(String(totalDocuments))}</p>
                <p class="kpi-label">Total Documents</p>
                <span class="kpi-hint">Drill to Document Status Report</span>
              </button>
              <button class="kpi kpi-action-card" type="button" data-go="SCR-804">
                <p class="kpi-value">${escapeHtml(String(inReview))}</p>
                <p class="kpi-label">In Review</p>
                <span class="kpi-hint">Drill to Pending Approval Report</span>
              </button>
              <button class="kpi kpi-action-card" type="button" data-go="SCR-805">
                <p class="kpi-value">${escapeHtml(String(returned))}</p>
                <p class="kpi-label">Returned</p>
                <span class="kpi-hint">Drill to Returned / Revision Report</span>
              </button>
              <button class="kpi kpi-action-card" type="button" data-go="SCR-800">
                <p class="kpi-value">${escapeHtml(String(completedPercent))}%</p>
                <p class="kpi-label">Completion Rate</p>
                <span class="kpi-hint">Drill to Report Center</span>
              </button>
              <button class="kpi kpi-action-card" type="button" data-go="SCR-800">
                <p class="kpi-value">${escapeHtml(String(completed))}</p>
                <p class="kpi-label">Completed Tasks</p>
                <span class="kpi-hint">Drill to executive reports</span>
              </button>
            </div>
          </article>

          <section class="dashboard-chart-grid">
            <article class="view-card chart-card">
              <h3>Workload</h3>
              <div class="chart-toolbar">
                <span class="chart-toolbar-label">Based</span>
                <div class="pill-row chart-pill-row">
                  <button class="pill ${state.dashboardWorkloadMode === "Role-Based" ? "is-active" : ""}" data-workload-mode="Role-Based">Role-Based</button>
                  <button class="pill ${state.dashboardWorkloadMode === "Department-Based" ? "is-active" : ""}" data-workload-mode="Department-Based">Department-Based</button>
                </div>
              </div>
              <div class="chart-bars">
                ${renderBarMetricRows(workloadData)}
              </div>
            </article>

            <article class="view-card chart-card">
              <h3>Performance Trend Line</h3>
              <div class="chart-toolbar chart-toolbar-stack">
                <div class="chart-toolbar-group">
                  <span class="chart-toolbar-label">Time Period</span>
                  <div class="pill-row chart-pill-row">${trendPeriodPills}</div>
                </div>
                <div class="chart-toolbar-group">
                  <span class="chart-toolbar-label">Departments</span>
                  <div class="pill-row chart-pill-row">${trendDepartmentPills}</div>
                </div>
              </div>
              ${renderLineChartSvg(performanceLabels, performanceSeries)}
              <p class="mini-note">Multi-select departments for trend comparison. Values aggregate by selected departments.</p>
            </article>
          </section>
        </section>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}

function renderProjectList(screen) {
  const filtered = MOCK.projects.filter((project) => {
    const q = state.projectSearch.toLowerCase().trim();
    if (!q) return true;
    return `${project.id} ${project.name} ${project.owner} ${project.status}`.toLowerCase().includes(q);
  });

  const rows = filtered
    .map(
      (project) => `
      <tr>
        <td>${escapeHtml(project.id)}</td>
        <td>${escapeHtml(project.name)}</td>
        <td>${escapeHtml(project.owner)}</td>
        <td>${escapeHtml(project.budget)}</td>
        <td>${escapeHtml(project.progress)}%</td>
        <td><span class="badge ${statusToBadge(project.status)}">${escapeHtml(project.status)}</span></td>
        <td><button data-go="SCR-013">Open</button></td>
      </tr>
    `
    )
    .join("");

  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>Project Portfolio</h3>
          <div class="toolbar compact">
            <label>Search
              <input id="projectSearch" type="search" placeholder="Search project, owner, status" value="${escapeHtml(state.projectSearch)}">
            </label>
            <label>Status
              <select>
                <option>All</option>
                <option>In Review</option>
                <option>Pending</option>
                <option>Completed</option>
              </select>
            </label>
            <button class="btn-primary" data-go="SCR-012">+ New Project</button>
          </div>
          <p class="mini-note">${filtered.length} projects matched.</p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Project ID</th>
                  <th>Name</th>
                  <th>Owner</th>
                  <th>Budget</th>
                  <th>Progress</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}

function renderProjectForm(screen) {
  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>Create / Edit Project</h3>
          <div class="form-grid">
            <label>Project Name
              <input type="text" value="Digital Signature Procurement">
            </label>
            <label>Project ID
              <input type="text" value="PRJ-2026-001">
            </label>
            <label>Budget Amount
              <input type="text" value="490000">
            </label>
            <label>Department
              <select>
                <option>100001 - Procurement</option>
                <option>100002 - Finance</option>
                <option>100003 - PMO</option>
              </select>
            </label>
            <label>Project Type
              <select>
                <option>Procurement</option>
                <option>Infrastructure</option>
                <option>Service</option>
              </select>
            </label>
            <label>Budget Type
              <select>
                <option>CAPEX</option>
                <option>OPEX</option>
              </select>
            </label>
            <label class="full">Description
              <textarea>Project for onboarding digital signatures in approval workflow.</textarea>
            </label>
          </div>
          <div class="action-row">
            <button class="btn-primary" data-toast="Project saved">Save Draft</button>
            <button data-toast="Workflow mapped">Map Workflow</button>
            <button class="btn-soft" data-go="SCR-013">Open Project Detail</button>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}

function renderProjectDetail(screen) {
  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>Project Overview</h3>
          <div class="kpi-grid">
            <div class="kpi"><p class="kpi-value">PRJ-2026-001</p><p class="kpi-label">Project ID</p></div>
            <div class="kpi"><p class="kpi-value">62%</p><p class="kpi-label">Overall Progress</p></div>
            <div class="kpi"><p class="kpi-value">7</p><p class="kpi-label">Required Documents</p></div>
            <div class="kpi"><p class="kpi-value">2</p><p class="kpi-label">Pending Tasks</p></div>
          </div>
        </article>
        <article class="view-card">
          <h3>Document Progression</h3>
          <ul class="timeline">
            <li><strong>DOC-001 TOR</strong> - Completed</li>
            <li><strong>DOC-002 Vendor Selection</strong> - Completed</li>
            <li><strong>DOC-003 PR</strong> - In Review</li>
            <li><strong>DOC-004 PO</strong> - Pending</li>
            <li><strong>DOC-005 Inspection</strong> - Not Started</li>
          </ul>
          <div class="action-row">
            <button data-go="SCR-100">Open Document Detail</button>
            <button class="btn-primary" data-toast="Export job queued">Export Project Summary</button>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}

function renderTaskCenter(screen) {
  const filtered = MOCK.tasks.filter((task) => {
    const q = state.taskSearch.toLowerCase().trim();
    if (!q) return true;
    return `${task.no} ${task.doc} ${task.action} ${task.status}`.toLowerCase().includes(q);
  });

  const rows = filtered
    .map(
      (task) => `
      <tr>
        <td>${escapeHtml(task.no)}</td>
        <td>${escapeHtml(task.doc)}</td>
        <td>${escapeHtml(task.action)}</td>
        <td>${escapeHtml(task.assignee)}</td>
        <td>${escapeHtml(task.due)}</td>
        <td><span class="badge ${statusToBadge(task.status)}">${escapeHtml(task.status)}</span></td>
        <td>
          <div class="action-row">
            <button data-go="SCR-100">View</button>
            <button data-toast="Task action submitted">Act</button>
          </div>
        </td>
      </tr>
    `
    )
    .join("");

  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>Task Queue</h3>
          <div class="toolbar compact">
            <label>Search
              <input id="taskSearch" type="search" value="${escapeHtml(state.taskSearch)}" placeholder="Search task, doc, action">
            </label>
            <label>Action Type
              <select>
                <option>All</option>
                <option>Approve</option>
                <option>Return</option>
                <option>Review</option>
              </select>
            </label>
            <button data-toast="Group approve preview">Group Approve</button>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Task No</th>
                  <th>Document</th>
                  <th>Action</th>
                  <th>Assignee</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}

function renderDocumentDetail(screen) {
  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>Document Header</h3>
          <div class="kpi-grid">
            <div class="kpi"><p class="kpi-value">DOC-PR-0003</p><p class="kpi-label">Document No</p></div>
            <div class="kpi"><p class="kpi-value">Submitted</p><p class="kpi-label">Status</p></div>
            <div class="kpi"><p class="kpi-value">PRJ-2026-001</p><p class="kpi-label">Project Link</p></div>
            <div class="kpi"><p class="kpi-value">v2</p><p class="kpi-label">Current Revision</p></div>
          </div>
        </article>

        <article class="view-card">
          <h3>Core Document Fields</h3>
          <div class="form-grid">
            <label>Document Group
              <select><option>Procurement Documents</option></select>
            </label>
            <label>Requester
              <input type="text" value="naris.k">
            </label>
            <label>Budget Year
              <select><option>2026</option></select>
            </label>
            <label>Cost Center
              <select><option>CC-100122</option></select>
            </label>
            <label class="full">Purpose
              <textarea>Request purchasing approval for signature implementation package.</textarea>
            </label>
          </div>
        </article>

        <article class="view-card">
          <h3>Attachment & Audit</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Attachment</th>
                  <th>Category</th>
                  <th>Version</th>
                  <th>Preview</th>
                  <th>Uploaded By</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>TOR_v2.pdf</td><td>Supporting Document</td><td>v2</td><td>Ready</td><td>naris.k</td></tr>
                <tr><td>price_reference.xlsx</td><td>Reference</td><td>v1</td><td>Ready</td><td>naris.k</td></tr>
                <tr><td>committee_note.docx</td><td>Review Note</td><td>v1</td><td>Ready</td><td>kanit.s</td></tr>
              </tbody>
            </table>
          </div>
          <div class="action-row">
            <button class="btn-primary" data-toast="Document submitted to approver flow">Submit</button>
            <button class="btn-danger" data-toast="Return comment is required">Return</button>
            <button data-toast="Export PDF queued">Export PDF</button>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}

function sortCards(items, mode) {
  const copied = [...items];
  if (mode === "name") {
    copied.sort((a, b) => a.name.localeCompare(b.name));
    return copied;
  }
  copied.sort((a, b) => {
    const ta = new Date(a.date).getTime();
    const tb = new Date(b.date).getTime();
    return mode === "oldest" ? ta - tb : tb - ta;
  });
  return copied;
}

function renderStatusPills(containerId, current, statuses) {
  return `
    <div class="pill-row" id="${containerId}">
      ${statuses
        .map((status) => `<button class="pill ${status === current ? "is-active" : ""}" data-status="${status}">${status}</button>`)
        .join("")}
    </div>
  `;
}

function renderCards(items) {
  return items
    .map(
      (item) => `
    <article class="entity-card">
      <div class="entity-head">
        <h4>${escapeHtml(item.name)}</h4>
        <span class="badge ${statusToBadge(item.status)}">${escapeHtml(item.status)}</span>
      </div>
      <div class="entity-meta">
        <span>instance: ${escapeHtml(item.instances)}</span>
        <span>editor: ${escapeHtml(item.editor)}</span>
        <span>updated: ${escapeHtml(item.date)}</span>
      </div>
      <div class="entity-actions">
        <button data-toast="Open Builder">Edit</button>
        <button data-toast="Duplicated to draft">Duplicate</button>
        <button data-toast="Delete confirmation opened">Delete</button>
      </div>
    </article>
  `
    )
    .join("");
}

function renderWorkflowList(screen) {
  const status = state.workflowStatus;
  const query = state.workflowSearch.toLowerCase().trim();
  const baseRows = [
    {
      name: "กระบวนการจัดซื้อจัดจ้าง",
      statusForFilter: "Published",
      statusMeta: "Instance : 142",
      owner: "Tamako",
      updatedText: "Updated 2 hours ago",
      date: "2026-05-23"
    },
    {
      name: "ขออนุมัติเดินทางไปปฏิบัติงาน",
      statusForFilter: "Draft",
      statusMeta: "Not yet officially activated.",
      owner: "Tamako",
      updatedText: "Updated 2 hours ago",
      date: "2026-05-22"
    }
  ];

  const sorted = [...baseRows].sort((a, b) => {
    if (state.workflowSort === "name") return a.name.localeCompare(b.name);
    const ta = new Date(a.date).getTime();
    const tb = new Date(b.date).getTime();
    return state.workflowSort === "oldest" ? ta - tb : tb - ta;
  });

  const visible = sorted.filter((item) => {
    const statusOk = status === "All" || item.statusForFilter === status;
    if (!statusOk) return false;
    if (!query) return true;
    return `${item.name} ${item.statusForFilter} ${item.owner} ${item.statusMeta}`.toLowerCase().includes(query);
  });

  const statusTabs = ["All", "Published", "Draft", "Archived"]
    .map(
      (tab) => `
      <button class="workflow-status-tab ${state.workflowStatus === tab ? "is-active" : ""}" data-status="${escapeHtml(tab)}">${escapeHtml(tab)}</button>
    `
    )
    .join("");

  const rows = visible
    .map((item) => {
      const badgeClass =
        item.statusForFilter === "Published"
          ? "is-published"
          : item.statusForFilter === "Draft"
            ? "is-draft"
            : "is-archived";

      return `
        <article class="workflow201-row-card">
          <div class="workflow201-row-main">
            <h4>${escapeHtml(item.name)}</h4>
          </div>
          <div class="workflow201-row-status">
            <span class="workflow201-row-badge ${badgeClass}">
              <i aria-hidden="true">${item.statusForFilter === "Published" ? "●" : "◌"}</i>
              ${escapeHtml(item.statusForFilter)}
            </span>
            <span>${escapeHtml(item.statusMeta)}</span>
          </div>
          <div class="workflow201-row-owner">
            <div>
              <strong>${escapeHtml(item.owner)}</strong>
              <p>${escapeHtml(item.updatedText)}</p>
            </div>
          </div>
          <div class="workflow201-row-actions">
            <button data-go="SCR-203" title="Edit workflow" aria-label="Edit workflow">
              <svg class="wf201-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 20h4l10-10-4-4L4 16v4zm3-2H6v-1l8-8 1 1-8 8zM15 4l4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
            <button data-toast="Workflow duplicated to draft" title="Duplicate workflow" aria-label="Duplicate workflow">
              <svg class="wf201-icon" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="8" y="7" width="10" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"></rect>
                <rect x="4" y="3" width="10" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"></rect>
              </svg>
            </button>
            <button data-toast="Workflow more options opened" title="More options" aria-label="More options">
              <svg class="wf201-icon" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="5" r="1.8" fill="currentColor"></circle>
                <circle cx="12" cy="12" r="1.8" fill="currentColor"></circle>
                <circle cx="12" cy="19" r="1.8" fill="currentColor"></circle>
              </svg>
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card workflow201-body-card">
          <div class="workflow201-body-inner">
            <header class="workflow201-hero">
              <div>
                <h2>Workflow Management</h2>
                <p>Customize and Manage Your Approval Workflows</p>
              </div>
              <button class="workflow201-create-btn" data-go="SCR-202">
                <svg class="wf201-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"></path>
                  <path d="M14 3v5h5M12 12v6M9 15h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
                </svg>
                Create Workflow
              </button>
            </header>

            <div class="workflow201-tab-row" id="workflowStatusPills">${statusTabs}</div>
            <article class="workflow201-board">
              <div class="workflow201-tools">
                <label class="workflow201-search-box">
                  <svg class="wf201-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8"></circle>
                    <path d="m16.2 16.2 3.8 3.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
                  </svg>
                  <input id="workflowSearch" type="search" placeholder="Search..." value="${escapeHtml(state.workflowSearch)}">
                </label>
                <label class="workflow201-sort-box">
                  <svg class="wf201-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 4v15m0 0-3-3m3 3 3-3M16 20V5m0 0-3 3m3-3 3 3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                  <span>Sort by : </span>
                  <select id="workflowSort">
                    <option value="newest" ${state.workflowSort === "newest" ? "selected" : ""}>Latest</option>
                    <option value="oldest" ${state.workflowSort === "oldest" ? "selected" : ""}>Oldest</option>
                    <option value="name" ${state.workflowSort === "name" ? "selected" : ""}>A-Z</option>
                  </select>
                </label>
              </div>

              <div class="workflow201-row-list">
                ${rows || `<p class="workflow201-empty">No workflows matched your filters.</p>`}
              </div>
            </article>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}
function renderWorkflowRoot(screen) {
  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>Workflow Root Conditions</h3>
          <div class="form-grid">
            <label>Workflow Name
              <input type="text" value="WF Procurement <= 500K">
            </label>
            <label>Version
              <input type="text" value="v3 (Draft)">
            </label>
            <label>Budget Maximum
              <input type="text" value="500000">
            </label>
            <label>Department
              <select><option>100001 - Procurement</option></select>
            </label>
            <label>Project Type
              <select><option>Procurement</option></select>
            </label>
            <label>Fallback
              <select><option>Use default workflow when no match</option></select>
            </label>
          </div>
          <div class="action-row">
            <button class="btn-primary" data-go="SCR-203">Continue to Builder</button>
            <button data-toast="Root condition validated">Validate Overlap</button>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}

function ensureWorkflowBuilderState() {
  if (!Array.isArray(state.workflowNodes)) {
    state.workflowNodes = [
      { id: "start", type: "start", label: "Start", x: 230, y: 24, w: 100, h: 38 },
      { id: "doc-pr", type: "document", code: "DOC-0002", label: "Create PR", x: 200, y: 100, w: 150, h: 52 },
      { id: "amount", type: "condition", label: "Amount", x: 216, y: 205, w: 118, h: 82 },
      { id: "gm", type: "approval", label: "GM Approve", x: 70, y: 345, w: 130, h: 54 },
      { id: "exec", type: "approval", label: "Exec Approve", x: 360, y: 345, w: 136, h: 54 },
      { id: "end", type: "end", label: "End", x: 230, y: 455, w: 100, h: 38 }
    ];
  }

  if (!Array.isArray(state.workflowLines)) {
    state.workflowLines = [
      { id: "line-start-pr", from: "start", to: "doc-pr", label: "", type: "then" },
      { id: "line-pr-amount", from: "doc-pr", to: "amount", label: "", type: "then" },
      { id: "line-amount-gm", from: "amount", to: "gm", label: "< 500k", type: "if" },
      { id: "line-amount-exec", from: "amount", to: "exec", label: ">= 500k", type: "if" },
      { id: "line-gm-end", from: "gm", to: "end", label: "approved", type: "then" },
      { id: "line-exec-end", from: "exec", to: "end", label: "approved", type: "then" }
    ];
  }

  if (state.workflowBuilderView === "alt") state.workflowBuilderView = "board";
  if (state.workflowBuilderView === "legacy") state.workflowBuilderView = "table";
  if (!state.workflowBuilderView) state.workflowBuilderView = "board";
  if (!state.workflowSideTab) state.workflowSideTab = "documents";
  if (typeof state.workflowConnectMode !== "boolean") state.workflowConnectMode = false;
}

function getWorkflowLinePoints(line, nodesById) {
  const source = nodesById[line.from];
  const target = nodesById[line.to];
  if (!source || !target) return null;

  const sourceCenterX = source.x + source.w / 2;
  const sourceCenterY = source.y + source.h / 2;
  const targetCenterX = target.x + target.w / 2;
  const targetCenterY = target.y + target.h / 2;
  const horizontal = Math.abs(targetCenterX - sourceCenterX) > Math.abs(targetCenterY - sourceCenterY);

  let sx = sourceCenterX;
  let sy = targetCenterY >= sourceCenterY ? source.y + source.h : source.y;
  let tx = targetCenterX;
  let ty = targetCenterY >= sourceCenterY ? target.y : target.y + target.h;

  if (horizontal) {
    sx = targetCenterX >= sourceCenterX ? source.x + source.w : source.x;
    sy = sourceCenterY;
    tx = targetCenterX >= sourceCenterX ? target.x : target.x + target.w;
    ty = targetCenterY;
  }

  const midY = sy + (ty - sy) / 2;
  const midX = sx + (tx - sx) / 2;
  const points = horizontal
    ? `${sx},${sy} ${midX},${sy} ${midX},${ty} ${tx},${ty}`
    : `${sx},${sy} ${sx},${midY} ${tx},${midY} ${tx},${ty}`;

  return { points, labelX: midX, labelY: midY };
}

function renderWorkflowModal() {
  if (!state.workflowActiveModal) return "";

  const selectedLine = (state.workflowLines || []).find((line) => line.id === state.workflowSelectedLine) || state.workflowLines?.[0];
  const modalContent = {
    save: {
      title: "Save Workflow Draft",
      body: `
        <p>Save the current board positions, document steps, connector labels, and table mapping as a draft version.</p>
        <div class="wf203-summary-grid">
          <span>Version</span><strong>v3 Draft</strong>
          <span>Changed blocks</span><strong>${state.workflowNodes.length}</strong>
          <span>Connectors</span><strong>${state.workflowLines.length}</strong>
        </div>
      `,
      action: "Save Draft"
    },
    publish: {
      title: "Publish Workflow",
      body: `
        <p>Publish this workflow version after validation. Published workflow versions become available for new project routing.</p>
        <label class="wf203-check"><input type="checkbox" checked> Run overlap validation before publish</label>
        <label class="wf203-check"><input type="checkbox" checked> Freeze published document-core mapping</label>
      `,
      action: "Publish"
    },
    unpublish: {
      title: "Unpublish Workflow",
      body: `<p>Move the active workflow out of production. Existing instances keep their current version.</p>`,
      action: "Unpublish"
    },
    delete: {
      title: "Delete Draft Workflow",
      body: `<p>Delete this draft version and keep the latest published workflow untouched.</p><label>Reason<textarea>Duplicate draft created during workflow review.</textarea></label>`,
      action: "Delete Draft"
    },
    validate: {
      title: "Simulation Result",
      body: `
        <ul class="wf203-modal-list">
          <li>All required document cores are connected.</li>
          <li>Amount condition has two outbound paths.</li>
          <li>No unreachable block detected.</li>
        </ul>
      `,
      action: "Close"
    },
    document: {
      title: "Document Block Setup",
      body: `
        <div class="form-grid">
          <label>Document Core<select><option>DOC-0002 - PR</option><option>DOC-0001 - TOR</option><option>DOC-0003 - PO</option></select></label>
          <label>Step Mode<select><option>Sequential</option><option>Parallel</option><option>Alternative</option></select></label>
          <label>Approver Flow<select><option>AF Procurement Committee</option><option>AF Finance Resolver</option></select></label>
          <label>Required<select><option>Yes</option><option>No</option></select></label>
        </div>
      `,
      action: "Apply"
    },
    logic: {
      title: "Connector Logic",
      body: `
        <div class="wf203-line-context">${escapeHtml(selectedLine?.from || "source")} -> ${escapeHtml(selectedLine?.to || "target")}</div>
        <div class="form-grid">
          <label>Connector Type<select><option ${selectedLine?.type === "if" ? "selected" : ""}>IF</option><option>THEN</option><option>AND</option><option>OR</option><option>ELSE</option></select></label>
          <label>Field<select><option>Project budget amount</option><option>Document status</option><option>Department</option></select></label>
          <label>Operator<select><option>>=</option><option><</option><option>=</option><option>contains</option></select></label>
          <label>Value<input type="text" value="${escapeHtml(selectedLine?.label || "approved")}"></label>
        </div>
      `,
      action: "Apply Logic"
    },
    close: {
      title: "Close Builder",
      body: `<p>There are unsaved board changes. Choose whether to save the draft before leaving the builder.</p>`,
      action: "Save and Close"
    }
  };

  const current = modalContent[state.workflowActiveModal] || modalContent.save;
  return `
    <div class="wf203-modal-backdrop" role="presentation">
      <section class="wf203-modal" role="dialog" aria-modal="true" aria-label="${escapeHtml(current.title)}">
        <header>
          <h4>${escapeHtml(current.title)}</h4>
          <button data-wf203-close-modal aria-label="Close modal">x</button>
        </header>
        <div class="wf203-modal-body">${current.body}</div>
        <footer>
          <button data-wf203-close-modal>Cancel</button>
          <button class="btn-primary" data-wf203-close-modal data-toast="${escapeHtml(current.action)} completed">${escapeHtml(current.action)}</button>
        </footer>
      </section>
    </div>
  `;
}

function renderWorkflowBuilder(screen) {
  ensureWorkflowBuilderState();
  const currentView = state.workflowBuilderView === "table" ? "table" : "board";
  const switcher = `
    <div class="wf203-switcher">
      <button class="${currentView === "board" ? "is-active" : ""}" data-workflow-builder-view="board">Board View</button>
      <button class="${currentView === "table" ? "is-active" : ""}" data-workflow-builder-view="table">Table View</button>
    </div>
  `;

  const tableMarkup = `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card wf203-card">
          <div class="wf203-topbar">
            <div>
              <h3>Builds Workflow</h3>
              <p>Inactive workflow</p>
            </div>
            ${switcher}
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Step</th>
                  <th>Document</th>
                  <th>Mode</th>
                  <th>Required</th>
                  <th>Approver Flow</th>
                  <th>Next</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>01</td><td>DOC-0001 TOR</td><td>Sequential</td><td>Yes</td><td>AF-0002</td><td>DOC-0002</td></tr>
                <tr><td>02</td><td>DOC-0002 PR</td><td>Sequential</td><td>Yes</td><td>AF-0003</td><td>DOC-0003 OR DOC-0004</td></tr>
                <tr><td>03</td><td>DOC-0003 PO</td><td>Alternative</td><td>No</td><td>AF-0001</td><td>End</td></tr>
                <tr><td>04</td><td>DOC-0004 Contract</td><td>Alternative</td><td>No</td><td>AF-0001</td><td>End</td></tr>
              </tbody>
            </table>
          </div>
          <div class="action-row">
            <button data-wf203-modal="document">+ Add Step</button>
            <button data-wf203-modal="validate">Run Simulation</button>
            <button class="btn-primary" data-wf203-modal="publish">Publish</button>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;

  if (currentView === "table") return tableMarkup;

  const nodesById = Object.fromEntries(state.workflowNodes.map((node) => [node.id, node]));
  const lines = state.workflowLines
    .map((line) => {
      const linePoints = getWorkflowLinePoints(line, nodesById);
      if (!linePoints) return "";
      return `
        <g class="wf203-line-group ${state.workflowSelectedLine === line.id ? "is-selected" : ""}" data-line-id="${escapeHtml(line.id)}">
          <polyline class="wf203-line-hit" points="${linePoints.points}" data-wf203-line="${escapeHtml(line.id)}"></polyline>
          <polyline class="wf203-line" points="${linePoints.points}" marker-end="url(#wf203Arrow)"></polyline>
          ${line.label ? `<text x="${linePoints.labelX}" y="${linePoints.labelY - 8}" text-anchor="middle">${escapeHtml(line.label)}</text>` : ""}
        </g>
      `;
    })
    .join("");

  const lineHotspots = state.workflowLines
    .map((line) => {
      const linePoints = getWorkflowLinePoints(line, nodesById);
      if (!linePoints) return "";
      return `
        <button
          class="wf203-line-hotspot"
          style="left:${linePoints.labelX}px; top:${linePoints.labelY}px"
          data-line-hotspot="${escapeHtml(line.id)}"
          data-wf203-line="${escapeHtml(line.id)}"
          aria-label="Open connector logic"
          type="button"></button>
      `;
    })
    .join("");

  const nodes = state.workflowNodes
    .map(
      (node) => `
        <button class="wf203-node is-${escapeHtml(node.type)} ${state.workflowConnectFrom === node.id ? "is-connecting" : ""}"
          style="left:${node.x}px; top:${node.y}px; width:${node.w}px; height:${node.h}px"
          data-wf203-node="${escapeHtml(node.id)}"
          type="button">
          <span>${escapeHtml(node.label)}</span>
          ${node.code ? `<small>${escapeHtml(node.code)}</small>` : ""}
        </button>
      `
    )
    .join("");

  const documentCores = [
    ["DOC-0001", "TOR", "Procurement"],
    ["DOC-0002", "PR", "Purchase Request"],
    ["DOC-0003", "PO", "Purchase Order"],
    ["DOC-0004", "Contract", "Legal"],
    ["DOC-0005", "Inspection", "Committee"],
    ["DOC-0006", "Payment", "Finance"]
  ];

  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card wf203-card">
          <div class="wf203-topbar">
            <div>
              <h3>Builds Workflow</h3>
              <p>Inactive workflow</p>
            </div>
            ${switcher}
            <div class="wf203-actions">
              <button data-wf203-modal="save">Save</button>
              <button data-wf203-modal="publish">Publish</button>
              <button data-wf203-modal="unpublish">Unpublish</button>
              <button data-wf203-modal="delete">Delete</button>
              <button data-wf203-modal="close" aria-label="Close builder">x</button>
            </div>
          </div>

          <div class="wf203-builder">
            <section class="wf203-board-panel">
              <div class="wf203-board-tab">Diagram</div>
              <div class="wf203-board ${state.workflowConnectMode ? "is-connect-mode" : ""}" id="workflowBoard">
                <svg class="wf203-lines" viewBox="0 0 560 520" preserveAspectRatio="none">
                  <defs>
                    <marker id="wf203Arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                      <path d="M0,0 L0,6 L6,3 z" fill="#727b86"></path>
                    </marker>
                  </defs>
                  ${lines}
                </svg>
                ${lineHotspots}
                ${nodes}
                <div class="wf203-board-tools">
                  <button data-wf203-add-shape="condition">Decision</button>
                  <button data-wf203-connect>Connector</button>
                  <button data-wf203-modal="validate">Validate</button>
                </div>
              </div>
            </section>

            <aside class="wf203-palette">
              <div class="wf203-palette-tabs">
                <button class="${state.workflowSideTab === "documents" ? "is-active" : ""}" data-wf203-side-tab="documents">Documents</button>
                <button class="${state.workflowSideTab === "connectors" ? "is-active" : ""}" data-wf203-side-tab="connectors">Logic</button>
              </div>
              ${
                state.workflowSideTab === "connectors"
                  ? `
                    <div class="wf203-palette-body">
                      <section class="wf203-connector-box">
                        <h4>Connector</h4>
                        <button data-wf203-connect>Line</button>
                        <button data-wf203-add-shape="condition">IF / ELSE</button>
                        <button data-wf203-modal="logic">Logic setup</button>
                      </section>
                      <div class="wf203-side-list">
                        <button data-wf203-modal="logic">IF amount is greater than threshold</button>
                        <button data-wf203-modal="logic">AND all documents completed</button>
                        <button data-wf203-modal="logic">OR alternate approval path</button>
                        <button data-wf203-modal="logic">ELSE return to requester</button>
                      </div>
                    </div>
                  `
                  : `
                    <div class="wf203-palette-body">
                      <section class="wf203-connector-box">
                        <h4>Document Cores</h4>
                        <button data-wf203-modal="document">Block setup</button>
                      </section>
                      <div class="wf203-side-list">
                        ${documentCores
                          .map(
                            ([code, name, group]) => `
                              <button data-wf203-add-doc="${escapeHtml(code)}" data-doc-name="${escapeHtml(name)}">
                                <i></i><span>${escapeHtml(code)} - ${escapeHtml(name)}</span><small>${escapeHtml(group)}</small>
                              </button>
                            `
                          )
                          .join("")}
                      </div>
                    </div>
                  `
              }
            </aside>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
      ${renderWorkflowModal()}
    </section>
  `;
}
function renderApproverList(screen) {
  const status = state.approverStatus;
  const query = state.approverSearch.toLowerCase().trim();
  const sorted = sortCards(MOCK.approverCards, state.approverSort).map((item, index) => ({
    ...item,
    owner: "Tamako",
    updatedText: `Updated ${index + 1} hours ago`,
    statusMeta: item.instances
  }));

  const visible = sorted.filter((item) => {
    const statusOk = status === "All" || item.status === status;
    if (!statusOk) return false;
    if (!query) return true;
    return `${item.name} ${item.status} ${item.editor}`.toLowerCase().includes(query);
  });

  const statusTabs = ["All", "Published", "Draft", "On Review"]
    .map(
      (tab) => `
      <button class="workflow-status-tab ${state.approverStatus === tab ? "is-active" : ""}" data-status="${escapeHtml(tab)}">${escapeHtml(tab)}</button>
    `
    )
    .join("");

  const rows = visible
    .map((item) => {
      const badgeClass =
        item.status === "Published" ? "is-published" : item.status === "On Review" ? "is-review" : "is-draft";
      return `
        <article class="workflow201-row-card">
          <div class="workflow201-row-main">
            <h4>${escapeHtml(item.name)}</h4>
          </div>
          <div class="workflow201-row-status">
            <span class="workflow201-row-badge ${badgeClass}">
              <i aria-hidden="true">${item.status === "Published" ? "*" : item.status === "On Review" ? "?" : "o"}</i>
              ${escapeHtml(item.status)}
            </span>
            <span>${escapeHtml(item.statusMeta)}</span>
          </div>
          <div class="workflow201-row-owner">
            <div>
              <strong>${escapeHtml(item.owner)}</strong>
              <p>${escapeHtml(item.updatedText)}</p>
            </div>
          </div>
          <div class="workflow201-row-actions">
            <button data-go="SCR-212" title="Edit approver flow" aria-label="Edit approver flow">
              <svg class="wf201-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 20h4l10-10-4-4L4 16v4zm3-2H6v-1l8-8 1 1-8 8zM15 4l4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
            <button data-toast="Approver flow duplicated to draft" title="Duplicate approver flow" aria-label="Duplicate approver flow">
              <svg class="wf201-icon" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="8" y="7" width="10" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"></rect>
                <rect x="4" y="3" width="10" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"></rect>
              </svg>
            </button>
            <button data-toast="Approver flow options opened" title="More options" aria-label="More options">
              <svg class="wf201-icon" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="5" r="1.8" fill="currentColor"></circle>
                <circle cx="12" cy="12" r="1.8" fill="currentColor"></circle>
                <circle cx="12" cy="19" r="1.8" fill="currentColor"></circle>
              </svg>
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card workflow201-body-card">
          <div class="workflow201-body-inner">
            <header class="workflow201-hero">
              <div>
                <h2>Approver Flow Management</h2>
                <p>Customize and manage approval paths, resolver rules, and committee routing.</p>
              </div>
              <button class="workflow201-create-btn" data-go="SCR-212">
                <svg class="wf201-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
                </svg>
                Create Approver Flow
              </button>
            </header>

            <div class="workflow201-tab-row" id="approverStatusPills">${statusTabs}</div>
            <article class="workflow201-board">
              <div class="workflow201-tools">
                <label class="workflow201-search-box">
                  <svg class="wf201-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8"></circle>
                    <path d="m16.2 16.2 3.8 3.8" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"></path>
                  </svg>
                  <input id="approverSearch" type="search" placeholder="Search approver flow..." value="${escapeHtml(state.approverSearch)}">
                </label>
                <label class="workflow201-sort-box">
                  <svg class="wf201-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 4v15m0 0-3-3m3 3 3-3M16 20V5m0 0-3 3m3-3 3 3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                  <span>Sort by : </span>
                  <select id="approverSort">
                    <option value="newest" ${state.approverSort === "newest" ? "selected" : ""}>Latest</option>
                    <option value="oldest" ${state.approverSort === "oldest" ? "selected" : ""}>Oldest</option>
                    <option value="name" ${state.approverSort === "name" ? "selected" : ""}>A-Z</option>
                  </select>
                </label>
              </div>

              <div class="workflow201-row-list">
                ${rows || `<p class="workflow201-empty">No approver flows matched your filters.</p>`}
              </div>
            </article>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}

function ensureApproverBuilderState() {
  if (!Array.isArray(state.approverNodes)) {
    state.approverNodes = [
      { id: "start", type: "start", label: "Start", x: 230, y: 24, w: 100, h: 38 },
      { id: "resolver", type: "resolver", label: "Role Resolver", code: "Procurement Manager", x: 196, y: 104, w: 168, h: 54 },
      { id: "committee", type: "committee", label: "Committee Review", code: "Group B", x: 188, y: 208, w: 184, h: 58 },
      { id: "finance", type: "approval", label: "Finance Approval", code: "Finance Dept", x: 188, y: 330, w: 184, h: 58 },
      { id: "end", type: "end", label: "End", x: 230, y: 455, w: 100, h: 38 }
    ];
  }

  if (!Array.isArray(state.approverLines)) {
    state.approverLines = [
      { id: "af-start-resolver", from: "start", to: "resolver", label: "resolve", type: "then" },
      { id: "af-resolver-committee", from: "resolver", to: "committee", label: "all required", type: "and" },
      { id: "af-committee-finance", from: "committee", to: "finance", label: "approved", type: "then" },
      { id: "af-finance-end", from: "finance", to: "end", label: "complete", type: "then" }
    ];
  }

  if (!state.approverBuilderView) state.approverBuilderView = "board";
  if (typeof state.approverConnectMode !== "boolean") state.approverConnectMode = false;
}

function renderApproverModal() {
  if (!state.approverActiveModal) return "";

  const selectedLine = (state.approverLines || []).find((line) => line.id === state.approverSelectedLine) || state.approverLines?.[0];
  const modalContent = {
    step: {
      title: "Approver Step Setup",
      body: `
        <div class="form-grid">
          <label>Resolver Type<select><option>Role-based</option><option>Department Resolver</option><option>Committee</option><option>Specific User</option></select></label>
          <label>Resolver Source<input type="text" value="Procurement Manager"></label>
          <label>Mode<select><option>Sequential</option><option>Parallel</option><option>Alternative</option></select></label>
          <label>Required<select><option>Yes</option><option>No</option></select></label>
        </div>
      `,
      action: "Apply Step"
    },
    logic: {
      title: "Approver Connector Logic",
      body: `
        <div class="wf203-line-context">${escapeHtml(selectedLine?.from || "source")} -> ${escapeHtml(selectedLine?.to || "target")}</div>
        <div class="form-grid">
          <label>Completion Rule<select><option>All required approvers</option><option>Any one approver</option><option>Majority vote</option></select></label>
          <label>Escalation<select><option>No escalation</option><option>After due date</option><option>After SLA breach</option></select></label>
          <label>Return Target<select><option>Requester</option><option>Previous approver</option><option>Workflow owner</option></select></label>
          <label>Label<input type="text" value="${escapeHtml(selectedLine?.label || "approved")}"></label>
        </div>
      `,
      action: "Apply Logic"
    },
    validate: {
      title: "Approver Simulation Result",
      body: `
        <ul class="wf203-modal-list">
          <li>Resolver source is available for all selected departments.</li>
          <li>Committee Group B has five active members.</li>
          <li>Completion rule does not create an approval loop.</li>
        </ul>
      `,
      action: "Close"
    },
    publish: {
      title: "Publish Approver Flow",
      body: `<p>Publish this approver flow version and make it selectable in workflow builder steps.</p>`,
      action: "Publish"
    },
    save: {
      title: "Save Approver Flow Draft",
      body: `<p>Save current resolver blocks, connector rules, and table mapping as a draft.</p>`,
      action: "Save Draft"
    }
  };

  const current = modalContent[state.approverActiveModal] || modalContent.step;
  return `
    <div class="wf203-modal-backdrop" role="presentation">
      <section class="wf203-modal" role="dialog" aria-modal="true" aria-label="${escapeHtml(current.title)}">
        <header>
          <h4>${escapeHtml(current.title)}</h4>
          <button data-af-close-modal aria-label="Close modal">x</button>
        </header>
        <div class="wf203-modal-body">${current.body}</div>
        <footer>
          <button data-af-close-modal>Cancel</button>
          <button class="btn-primary" data-af-close-modal data-toast="${escapeHtml(current.action)} completed">${escapeHtml(current.action)}</button>
        </footer>
      </section>
    </div>
  `;
}

function renderApproverBuilder(screen) {
  ensureApproverBuilderState();
  const currentView = state.approverBuilderView === "table" ? "table" : "board";
  const switcher = `
    <div class="wf203-switcher">
      <button class="${currentView === "board" ? "is-active" : ""}" data-af-builder-view="board">Board View</button>
      <button class="${currentView === "table" ? "is-active" : ""}" data-af-builder-view="table">Table View</button>
    </div>
  `;

  const tableMarkup = `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card wf203-card">
          <div class="wf203-topbar">
            <div>
              <h3>Approver Flow Builder</h3>
              <p>AF Procurement Committee</p>
            </div>
            ${switcher}
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Step</th>
                  <th>Mode</th>
                  <th>Resolver Type</th>
                  <th>Source</th>
                  <th>Required</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>01</td><td>Sequential</td><td>Role-based</td><td>Procurement Manager</td><td>Yes</td></tr>
                <tr><td>02</td><td>Parallel</td><td>Committee</td><td>Committee Group B</td><td>Yes</td></tr>
                <tr><td>03</td><td>Sequential</td><td>Department Resolver</td><td>Finance Department</td><td>Yes</td></tr>
              </tbody>
            </table>
          </div>
          <div class="action-row">
            <button data-af-modal="step">+ Add Step</button>
            <button data-af-modal="validate">Simulate</button>
            <button class="btn-primary" data-af-modal="publish">Publish</button>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
      ${renderApproverModal()}
    </section>
  `;

  if (currentView === "table") return tableMarkup;

  const nodesById = Object.fromEntries(state.approverNodes.map((node) => [node.id, node]));
  const lines = state.approverLines
    .map((line) => {
      const linePoints = getWorkflowLinePoints(line, nodesById);
      if (!linePoints) return "";
      return `
        <g class="wf203-line-group ${state.approverSelectedLine === line.id ? "is-selected" : ""}" data-af-line-id="${escapeHtml(line.id)}">
          <polyline class="wf203-line-hit" points="${linePoints.points}" data-af-line="${escapeHtml(line.id)}"></polyline>
          <polyline class="wf203-line" points="${linePoints.points}" marker-end="url(#afArrow)"></polyline>
          ${line.label ? `<text x="${linePoints.labelX}" y="${linePoints.labelY - 8}" text-anchor="middle">${escapeHtml(line.label)}</text>` : ""}
        </g>
      `;
    })
    .join("");

  const lineHotspots = state.approverLines
    .map((line) => {
      const linePoints = getWorkflowLinePoints(line, nodesById);
      if (!linePoints) return "";
      return `
        <button
          class="wf203-line-hotspot"
          style="left:${linePoints.labelX}px; top:${linePoints.labelY}px"
          data-af-line-hotspot="${escapeHtml(line.id)}"
          data-af-line="${escapeHtml(line.id)}"
          aria-label="Open approver connector logic"
          type="button"></button>
      `;
    })
    .join("");

  const nodes = state.approverNodes
    .map(
      (node) => `
        <button class="wf203-node is-${escapeHtml(node.type)} ${state.approverConnectFrom === node.id ? "is-connecting" : ""}"
          style="left:${node.x}px; top:${node.y}px; width:${node.w}px; height:${node.h}px"
          data-af-node="${escapeHtml(node.id)}"
          type="button">
          <span>${escapeHtml(node.label)}</span>
          ${node.code ? `<small>${escapeHtml(node.code)}</small>` : ""}
        </button>
      `
    )
    .join("");

  const sources = [
    ["role", "Role Resolver", "Procurement Manager"],
    ["dept", "Department Resolver", "Finance Department"],
    ["committee", "Committee", "Committee Group B"],
    ["user", "Specific User", "kanit.s"]
  ];

  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card wf203-card">
          <div class="wf203-topbar">
            <div>
              <h3>Approver Flow Builder</h3>
              <p>AF Procurement Committee</p>
            </div>
            ${switcher}
            <div class="wf203-actions">
              <button data-af-modal="save">Save</button>
              <button data-af-modal="validate">Simulate</button>
              <button data-af-modal="publish">Publish</button>
            </div>
          </div>

          <div class="wf203-builder">
            <section class="wf203-board-panel">
              <div class="wf203-board-tab">Diagram</div>
              <div class="wf203-board ${state.approverConnectMode ? "is-connect-mode" : ""}" id="approverBoard">
                <svg class="wf203-lines" viewBox="0 0 560 520" preserveAspectRatio="none">
                  <defs>
                    <marker id="afArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                      <path d="M0,0 L0,6 L6,3 z" fill="#727b86"></path>
                    </marker>
                  </defs>
                  ${lines}
                </svg>
                ${lineHotspots}
                ${nodes}
                <div class="wf203-board-tools">
                  <button data-af-add-node="resolver">Resolver</button>
                  <button data-af-connect>Connector</button>
                  <button data-af-modal="validate">Validate</button>
                </div>
              </div>
            </section>

            <aside class="wf203-palette">
              <div class="wf203-palette-tabs">
                <button class="is-active">Resolvers</button>
                <button data-af-modal="logic">Logic</button>
              </div>
              <div class="wf203-palette-body">
                <section class="wf203-connector-box">
                  <h4>Approver Sources</h4>
                  <button data-af-modal="step">Step setup</button>
                </section>
                <div class="wf203-side-list">
                  ${sources
                    .map(
                      ([type, label, source]) => `
                        <button data-af-add-source="${escapeHtml(type)}" data-source-label="${escapeHtml(label)}" data-source-code="${escapeHtml(source)}">
                          <i></i><span>${escapeHtml(label)}</span><small>${escapeHtml(source)}</small>
                        </button>
                      `
                    )
                    .join("")}
                </div>
              </div>
            </aside>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
      ${renderApproverModal()}
    </section>
  `;
}

function renderDocumentCoreList(screen) {
  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>Document Core Inventory</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Document ID</th>
                  <th>Actual Name</th>
                  <th>Group</th>
                  <th>Template Version</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>DOC-0001</td><td>TOR</td><td>Procurement Documents</td><td>v4</td><td><span class="badge badge-published">Published</span></td><td><button data-go="SCR-222">Configure</button></td></tr>
                <tr><td>DOC-0002</td><td>PR</td><td>Purchase (PR/PO)</td><td>v2</td><td><span class="badge badge-review">On Review</span></td><td><button data-go="SCR-222">Configure</button></td></tr>
                <tr><td>DOC-0003</td><td>PO</td><td>Purchase (PR/PO)</td><td>v3</td><td><span class="badge badge-published">Published</span></td><td><button data-go="SCR-222">Configure</button></td></tr>
              </tbody>
            </table>
          </div>
          <div class="action-row">
            <button data-toast="New document definition started">+ Add Document Core</button>
            <button class="btn-primary" data-toast="Version history opened">Open Version History</button>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}

function renderDocumentTemplate(screen) {
  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>Template & Field Setup</h3>
          <div class="form-grid">
            <label>Document Type
              <select><option>DOC-0001 TOR</option></select>
            </label>
            <label>Template Version
              <input type="text" value="v4 (Draft)">
            </label>
            <label>Signature Zone
              <select><option>Page 4 - Footer</option><option>Auto append signature page</option></select>
            </label>
            <label>Overflow Handling
              <select><option>Append signature page</option></select>
            </label>
            <label class="full">Field Definitions
              <textarea>[BudgetAmount:number][ProjectType:selector][Vendor:selector][ReasonCode:selector]</textarea>
            </label>
          </div>
          <div class="action-row">
            <button data-toast="Template preview generated">Generate Preview</button>
            <button class="btn-primary" data-toast="Template version published">Publish Version</button>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}

function renderReportCenter(screen) {
  const cards = REPORT_SCREEN_META.map(([id, title, summary]) => {
    return `
      <article class="report-card">
        <h4>${escapeHtml(id)} - ${escapeHtml(title)}</h4>
        <p>${escapeHtml(summary)}</p>
        <button data-go="${id}">Open Report</button>
      </article>
    `;
  }).join("");

  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>Report Library</h3>
          <div class="report-grid">${cards}</div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}

function buildReportRows(reportCode) {
  const baseRows = [
    ["PRJ-2026-001", "Digital Signature Procurement", "In Review", "kanit.s", "2026-05-23 14:10"],
    ["PRJ-2026-004", "Infrastructure Refresh", "Pending", "naris.k", "2026-05-23 12:22"],
    ["PRJ-2026-009", "Vendor Onboarding", "Completed", "audit.bot", "2026-05-22 18:02"],
    ["PRJ-2026-012", "Workflow Migration", "In Review", "sujira.m", "2026-05-22 15:30"]
  ];
  return baseRows.map((row) => [reportCode, ...row]);
}

function renderReportDetail(screen) {
  const rows = buildReportRows(screen.id)
    .map(
      (row) => `
      <tr>
        <td>${escapeHtml(row[0])}</td>
        <td>${escapeHtml(row[1])}</td>
        <td>${escapeHtml(row[2])}</td>
        <td>${escapeHtml(row[3])}</td>
        <td>${escapeHtml(row[4])}</td>
        <td>${escapeHtml(row[5])}</td>
      </tr>
    `
    )
    .join("");

  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>${escapeHtml(screen.name)}</h3>
          <div class="toolbar">
            <label>Date From
              <input type="date" value="2026-05-01">
            </label>
            <label>Date To
              <input type="date" value="2026-05-24">
            </label>
            <label>Status
              <select><option>All</option><option>Pending</option><option>In Review</option><option>Completed</option></select>
            </label>
            <button class="btn-primary" data-toast="Report filtered">Apply Filter</button>
          </div>
          <div class="kpi-grid">
            <div class="kpi"><p class="kpi-value">124</p><p class="kpi-label">Total Records</p></div>
            <div class="kpi"><p class="kpi-value">19</p><p class="kpi-label">Pending</p></div>
            <div class="kpi"><p class="kpi-value">7</p><p class="kpi-label">Returned</p></div>
            <div class="kpi"><p class="kpi-value">2026-05-24 01:20</p><p class="kpi-label">Data Snapshot</p></div>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Report</th>
                  <th>Project ID</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Owner</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
          <div class="action-row">
            <button data-toast="XLSX export queued">Export XLSX</button>
            <button data-toast="PDF export queued">Export PDF</button>
            <button data-go="SCR-800">Back to Report Center</button>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}

function renderMasterCatalog(screen) {
  const cards = MASTERDATA_SCREEN_META.map(([id, title, description]) => {
    return `
      <article class="master-item">
        <h4>${escapeHtml(id)} - ${escapeHtml(title)}</h4>
        <p>${escapeHtml(description)}</p>
        <button data-go="${id}">Open Dataset</button>
      </article>
    `;
  }).join("");

  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>Masterdata Catalog</h3>
          <div class="master-grid">${cards}</div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}

function generateMasterRows(screen) {
  if (screen.id === "SCR-919") {
    return [
      ["MST-DEPT-001", "Office of Procurement", "2026-01-01", "Open End", "Active"],
      ["MST-DEPT-002", "Office of Finance", "2026-01-01", "Open End", "Active"],
      ["MST-DEPT-003", "Office of PMO", "2026-02-01", "Open End", "Active"],
      ["MST-DEPT-004", "Office of Audit", "2026-01-01", "Open End", "Active"],
      ["MST-DEPT-005", "Office of Legal", "2026-03-01", "2026-12-31", "Inactive"],
      ["MST-DEPT-006", "Office of Operations", "2026-01-01", "Open End", "Active"]
    ];
  }

  const prefix = screen.id.replace("SCR-", "MST-");
  return Array.from({ length: 6 }, (_, index) => {
    const code = `${prefix}-${index + 1}`;
    const name = `${screen.name.split("MASTER-").pop()} ${index + 1}`;
    const start = `2026-0${Math.min(index + 1, 9)}-01`;
    const end = index % 2 === 0 ? "Open End" : `2026-12-${String(index + 5).padStart(2, "0")}`;
    const status = index % 3 === 0 ? "Active" : index % 3 === 1 ? "Inactive" : "Active";
    return [code, name, start, end, status];
  });
}

function renderMasterDataset(screen) {
  const rows = generateMasterRows(screen)
    .map(
      (row) => `
      <tr>
        <td>${escapeHtml(row[0])}</td>
        <td>${escapeHtml(row[1])}</td>
        <td>${escapeHtml(row[2])}</td>
        <td>${escapeHtml(row[3])}</td>
        <td><span class="badge ${statusToBadge(row[4])}">${escapeHtml(row[4])}</span></td>
      </tr>
    `
    )
    .join("");

  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>${escapeHtml(screen.name)}</h3>
          <div class="toolbar compact">
            <label>Search Value
              <input type="search" placeholder="Search code or name">
            </label>
            <label>Status
              <select><option>All</option><option>Active</option><option>Inactive</option></select>
            </label>
            <button class="btn-primary" data-toast="New masterdata row added">+ Add Value</button>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Effective Start</th>
                  <th>Effective End</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
          <div class="action-row">
            <button data-toast="Impact check complete">Impact Check</button>
            <button data-toast="Masterdata version saved">Save Changes</button>
            <button data-go="SCR-900">Back to Catalog</button>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}

function renderUserManagement(screen) {
  const rows = MOCK.users
    .map(
      (user) => `
      <tr>
        <td>${escapeHtml(user.user)}</td>
        <td>${escapeHtml(user.role)}</td>
        <td>${escapeHtml(user.department)}</td>
        <td><span class="badge ${statusToBadge(user.status)}">${escapeHtml(user.status)}</span></td>
        <td><button data-toast="Permission preview generated">Permission Preview</button></td>
      </tr>
    `
    )
    .join("");

  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>User Management</h3>
          <div class="toolbar compact">
            <label>Search User
              <input type="search" placeholder="username or role">
            </label>
            <label>Status
              <select><option>All</option><option>Active</option><option>Inactive</option></select>
            </label>
            <button class="btn-primary" data-toast="User create form opened">+ Add User</button>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}

function renderRoleManagement(screen) {
  const rows = MOCK.roles
    .map(
      (role) => `
      <tr>
        <td>${escapeHtml(role.role)}</td>
        <td>${escapeHtml(role.scope)}</td>
        <td>${escapeHtml(String(role.users))}</td>
        <td>${escapeHtml(role.approvalLimit)}</td>
        <td><span class="badge ${statusToBadge(role.status)}">${escapeHtml(role.status)}</span></td>
        <td>
          <div class="action-row">
            <button data-toast="Permission matrix opened">Permission Matrix</button>
            <button data-toast="Role edit opened">Edit Role</button>
          </div>
        </td>
      </tr>
    `
    )
    .join("");

  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>Role Management</h3>
          <div class="toolbar compact">
            <label>Search Role
              <input type="search" placeholder="role name or scope">
            </label>
            <label>Status
              <select><option>All</option><option>Active</option><option>Inactive</option></select>
            </label>
            <button class="btn-primary" data-toast="Role create form opened">+ Add Role</button>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Permission Scope</th>
                  <th>Assigned Users</th>
                  <th>Approval Limit</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}

function renderDelegation(screen) {
  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>Delegation Rules</h3>
          <div class="form-grid">
            <label>Delegator
              <select><option>kanit.s</option><option>sujira.m</option></select>
            </label>
            <label>Delegatee
              <select><option>naris.k</option><option>audit.bot</option></select>
            </label>
            <label>Scope
              <select><option>All Procurement Documents</option><option>Document Group: Finance</option></select>
            </label>
            <label>Effective Date
              <input type="date" value="2026-05-24">
            </label>
            <label>End Date
              <input type="date" value="2026-06-24">
            </label>
            <label>Status
              <select><option>Active</option><option>Pending Approval</option><option>Cancelled</option></select>
            </label>
          </div>
          <div class="action-row">
            <button data-toast="Delegation loop check passed">Validate Loop</button>
            <button class="btn-primary" data-toast="Delegation saved">Save Delegation</button>
          </div>
        </article>
        <article class="view-card">
          <h3>Delegation History</h3>
          <ul class="timeline">
            <li><strong>2026-05-20</strong> - acting by naris.k on behalf of kanit.s (Approved DOC-003)</li>
            <li><strong>2026-05-19</strong> - HR updated scope from Procurement to Procurement + Finance</li>
            <li><strong>2026-05-18</strong> - delegation created by HR owner</li>
          </ul>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}

function renderLOV(screen) {
  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>List of Values</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Value ID</th>
                  <th>Value Name</th>
                  <th>No</th>
                  <th>EN Display</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>LOV-WFS</td><td>WORKFLOW-STATUS</td><td>0</td><td>Draft</td><td><span class="badge badge-published">Active</span></td></tr>
                <tr><td>LOV-WFS</td><td>WORKFLOW-STATUS</td><td>1</td><td>On Reviewing</td><td><span class="badge badge-published">Active</span></td></tr>
                <tr><td>LOV-000</td><td>DOCUMENT-STATUS</td><td>99</td><td>Archived</td><td><span class="badge badge-published">Active</span></td></tr>
                <tr><td>LOV-010</td><td>NOTIFICATION-CHANNEL</td><td>2</td><td>LINE</td><td><span class="badge badge-review">Review</span></td></tr>
              </tbody>
            </table>
          </div>
          <div class="action-row">
            <button data-toast="New LOV value row created">+ Add LOV</button>
            <button class="btn-primary" data-toast="LOV change audit captured">Save LOV</button>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}

function renderNotification(screen) {
  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>Notification Channels</h3>
          <div class="kpi-grid">
            <div class="kpi"><p class="kpi-value">In-app</p><p class="kpi-label">Enabled</p></div>
            <div class="kpi"><p class="kpi-value">Email</p><p class="kpi-label">Enabled</p></div>
            <div class="kpi"><p class="kpi-value">LINE</p><p class="kpi-label">Disabled</p></div>
            <div class="kpi"><p class="kpi-value">3</p><p class="kpi-label">Failed Queue</p></div>
          </div>
        </article>
        <article class="view-card">
          <h3>Template Editor</h3>
          <div class="form-grid">
            <label>Template Name
              <input type="text" value="task-assigned">
            </label>
            <label>Channel
              <select><option>In-app</option><option>Email</option></select>
            </label>
            <label class="full">Content
              <textarea>Task ${"{task_no}"} assigned for document ${"{document_no}"} with status ${"{status}"}.</textarea>
            </label>
          </div>
          <div class="action-row">
            <button data-toast="Notification test sent">Send Test</button>
            <button class="btn-primary" data-toast="Notification template saved">Save Template</button>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}

function renderIntegration(screen) {
  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>Integration Sync Jobs</h3>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Job ID</th>
                  <th>Source</th>
                  <th>Target</th>
                  <th>Status</th>
                  <th>Retry</th>
                  <th>Last Run</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>SYNC-1001</td><td>e-Doc</td><td>SAP</td><td><span class="badge badge-published">Synced</span></td><td>0</td><td>2026-05-24 00:20</td></tr>
                <tr><td>SYNC-1002</td><td>e-Doc</td><td>SAP</td><td><span class="badge badge-review">Pending Retry</span></td><td>2</td><td>2026-05-23 23:45</td></tr>
                <tr><td>SYNC-1003</td><td>e-Doc</td><td>Archive</td><td><span class="badge badge-returned">Failed</span></td><td>3</td><td>2026-05-23 22:10</td></tr>
              </tbody>
            </table>
          </div>
          <div class="action-row">
            <button data-toast="Retry triggered for failed jobs">Retry Failed</button>
            <button class="btn-primary" data-toast="Sync run started">Run Sync Now</button>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}

function renderError(requestedScreen) {
  const requested = requestedScreen || SCREEN_BY_ID[getCurrentScreenId()];
  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>Access Denied</h3>
          <p>You do not have permission to open <strong>${escapeHtml(requested.id)} - ${escapeHtml(requested.name)}</strong> with role <strong>${escapeHtml(state.role)}</strong>.</p>
          <p class="mini-note">Switch role or login with an authorized account to continue.</p>
          <div class="action-row">
            <button class="btn-primary" data-go="SCR-001">Go to Login</button>
            <button data-go="SCR-002">Go to Dashboard</button>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(SCREEN_BY_ID["SCR-000"])}
    </section>
  `;
}

function renderLogin(screen) {
  const authenticatedMarkup = state.authenticated
    ? `<p class="mini-note">You are already authenticated as <strong>${escapeHtml(state.role)}</strong>.</p>`
    : `<p class="mini-note">Session is currently logged out.</p>`;

  return `
    <section class="auth-wrap">
      <form class="auth-card" id="loginForm">
        <h3 class="auth-title">e-Doc Sign In</h3>
        <p class="auth-sub">Access by role, permission, and workflow scope.</p>
        ${authenticatedMarkup}
        <label>User ID
          <input type="text" id="loginUser" value="admin.user">
        </label>
        <label>Password
          <input type="password" id="loginPassword" value="password">
        </label>
        <label>Role Profile
          <select id="loginRole">
            ${ROLE_OPTIONS.map((role) => `<option value="${role}" ${role === state.role ? "selected" : ""}>${role}</option>`).join("")}
          </select>
        </label>
        <div class="action-row">
          <button type="submit" class="btn-primary">Login</button>
          <button type="button" id="sessionExpireBtn" class="btn-danger">Expire Session</button>
        </div>
        <p class="footer-note">Implements SCR-001 with role context load and session control behavior.</p>
      </form>
    </section>
  `;
}

function renderScreen(screen, requestedScreen) {
  if (!canAccess(screen) && screen.id !== "SCR-000") {
    return renderError(requestedScreen || screen);
  }

  switch (screen.type) {
    case "login":
      return renderLogin(screen);
    case "dashboard":
      return renderDashboard(screen);
    case "project-list":
      return renderProjectList(screen);
    case "project-form":
      return renderProjectForm(screen);
    case "project-detail":
      return renderProjectDetail(screen);
    case "task-center":
      return renderTaskCenter(screen);
    case "document-detail":
      return renderDocumentDetail(screen);
    case "workflow-list":
      return renderWorkflowList(screen);
    case "workflow-root":
      return renderWorkflowRoot(screen);
    case "workflow-builder":
      return renderWorkflowBuilder(screen);
    case "approver-list":
      return renderApproverList(screen);
    case "approver-builder":
      return renderApproverBuilder(screen);
    case "document-core-list":
      return renderDocumentCoreList(screen);
    case "document-template":
      return renderDocumentTemplate(screen);
    case "report-center":
      return renderReportCenter(screen);
    case "report-detail":
      return renderReportDetail(screen);
    case "master-catalog":
      return renderMasterCatalog(screen);
    case "master-dataset":
      return renderMasterDataset(screen);
    case "user-management":
      return renderUserManagement(screen);
    case "role-management":
      return renderRoleManagement(screen);
    case "delegation":
      return renderDelegation(screen);
    case "lov":
      return renderLOV(screen);
    case "notification":
      return renderNotification(screen);
    case "integration":
      return renderIntegration(screen);
    case "error":
      return renderError(requestedScreen || screen);
    default:
      return `<article class="view-card"><h3>Page Not Implemented</h3><p>${escapeHtml(screen.id)} is not mapped.</p></article>`;
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(state.toastTimer);
  state.toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

function renderApp() {
  const currentId = getCurrentScreenId();
  const requestedScreen = SCREEN_BY_ID[currentId] || SCREEN_BY_ID["SCR-000"];
  const activeScreen = canAccess(requestedScreen) ? requestedScreen : SCREEN_BY_ID["SCR-000"];

  const markup = `
    <div class="app-shell">
      ${renderSidebar(currentId)}
      <div class="main-shell">
        ${renderHeader(requestedScreen)}
        <main class="main-content">
          ${renderScreen(activeScreen, requestedScreen)}
        </main>
      </div>
    </div>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>
  `;

  document.getElementById("app").innerHTML = markup;
  bindGlobalEvents();
  bindScreenEvents(requestedScreen.id, activeScreen.id);
}

function bindGlobalEvents() {
  const roleSelect = document.getElementById("roleSelect");
  if (roleSelect) {
    roleSelect.addEventListener("change", (event) => {
      state.role = event.target.value;
      localStorage.setItem("edoc-role", state.role);
      renderApp();
    });
  }

  const navSearch = document.getElementById("navSearch");
  if (navSearch) {
    navSearch.addEventListener("input", (event) => {
      state.navQuery = event.target.value;
      renderApp();
    });
  }

  const sessionToggle = document.getElementById("sessionToggle");
  if (sessionToggle) {
    sessionToggle.addEventListener("click", () => {
      state.authenticated = !state.authenticated;
      localStorage.setItem("edoc-auth", String(state.authenticated));
      if (!state.authenticated) {
        location.hash = "SCR-001";
      } else if (getCurrentScreenId() === "SCR-001") {
        location.hash = "SCR-002";
      }
      renderApp();
    });
  }

  document.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-go");
      if (target) location.hash = target;
    });
  });

  document.querySelectorAll("[data-toast]").forEach((button) => {
    button.addEventListener("click", () => {
      const message = button.getAttribute("data-toast") || "Action completed";
      showToast(message);
    });
  });
}

function updateWorkflowLineDom() {
  const board = document.getElementById("workflowBoard");
  if (!board || !Array.isArray(state.workflowNodes) || !Array.isArray(state.workflowLines)) return;

  const nodesById = Object.fromEntries(state.workflowNodes.map((node) => [node.id, node]));
  state.workflowLines.forEach((line) => {
    const linePoints = getWorkflowLinePoints(line, nodesById);
    if (!linePoints) return;
    document.querySelectorAll(`[data-line-id="${line.id}"] polyline`).forEach((polyline) => {
      polyline.setAttribute("points", linePoints.points);
    });
    const label = document.querySelector(`[data-line-id="${line.id}"] text`);
    if (label) {
      label.setAttribute("x", String(linePoints.labelX));
      label.setAttribute("y", String(linePoints.labelY - 8));
    }
    const hotspot = document.querySelector(`[data-line-hotspot="${line.id}"]`);
    if (hotspot) {
      hotspot.style.left = `${linePoints.labelX}px`;
      hotspot.style.top = `${linePoints.labelY}px`;
    }
  });
}

function addWorkflowNode(type, label, code) {
  ensureWorkflowBuilderState();
  const count = state.workflowNodes.length + 1;
  const nextNode = {
    id: `${type}-${Date.now()}`,
    type,
    label,
    code: code || "",
    x: 80 + ((count * 38) % 300),
    y: 80 + ((count * 46) % 300),
    w: type === "condition" ? 118 : 140,
    h: type === "condition" ? 82 : 54
  };
  state.workflowNodes.push(nextNode);
  renderApp();
}

function bindWorkflowBuilderEvents() {
  ensureWorkflowBuilderState();

  document.querySelectorAll("[data-workflow-builder-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.workflowBuilderView = button.getAttribute("data-workflow-builder-view") || "board";
      state.workflowConnectMode = false;
      state.workflowConnectFrom = null;
      renderApp();
    });
  });

  document.querySelectorAll("[data-wf203-side-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.workflowSideTab = button.getAttribute("data-wf203-side-tab") || "documents";
      renderApp();
    });
  });

  document.querySelectorAll("[data-wf203-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      state.workflowActiveModal = button.getAttribute("data-wf203-modal") || "save";
      renderApp();
    });
  });

  document.querySelectorAll("[data-wf203-close-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      state.workflowActiveModal = null;
      renderApp();
    });
  });

  document.querySelectorAll("[data-wf203-add-doc]").forEach((button) => {
    button.addEventListener("click", () => {
      addWorkflowNode("document", button.getAttribute("data-doc-name") || "Document", button.getAttribute("data-wf203-add-doc") || "");
    });
  });

  document.querySelectorAll("[data-wf203-add-shape]").forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.getAttribute("data-wf203-add-shape") || "condition";
      addWorkflowNode(type, type === "condition" ? "Condition" : "Approval", "");
    });
  });

  document.querySelectorAll("[data-wf203-connect]").forEach((button) => {
    button.addEventListener("click", () => {
      state.workflowConnectMode = true;
      state.workflowConnectFrom = null;
      showToast("Connector mode: select the first block, then the target block.");
      document.getElementById("workflowBoard")?.classList.add("is-connect-mode");
    });
  });

  document.querySelectorAll("[data-wf203-line]").forEach((line) => {
    line.addEventListener("click", () => {
      state.workflowSelectedLine = line.getAttribute("data-wf203-line");
      state.workflowActiveModal = "logic";
      renderApp();
    });
  });

  document.querySelectorAll("[data-wf203-node]").forEach((nodeElement) => {
    nodeElement.addEventListener("click", () => {
      if (nodeElement.dataset.dragged === "true") return;
      const nodeId = nodeElement.getAttribute("data-wf203-node");
      if (!nodeId) return;

      if (!state.workflowConnectMode) {
        state.workflowActiveModal = "document";
        renderApp();
        return;
      }

      if (state.workflowConnectFrom === null) {
        state.workflowConnectFrom = nodeId;
        renderApp();
        return;
      }

      if (state.workflowConnectFrom && state.workflowConnectFrom !== nodeId) {
        const exists = state.workflowLines.some((line) => line.from === state.workflowConnectFrom && line.to === nodeId);
        if (!exists) {
          state.workflowLines.push({
            id: `line-${state.workflowConnectFrom}-${nodeId}-${Date.now()}`,
            from: state.workflowConnectFrom,
            to: nodeId,
            label: "then",
            type: "then"
          });
        }
        state.workflowConnectMode = false;
        state.workflowConnectFrom = null;
        renderApp();
      }
    });

    nodeElement.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      const board = document.getElementById("workflowBoard");
      const nodeId = nodeElement.getAttribute("data-wf203-node");
      const nodeState = state.workflowNodes.find((node) => node.id === nodeId);
      if (!board || !nodeState) return;

      const boardRect = board.getBoundingClientRect();
      const startX = event.clientX;
      const startY = event.clientY;
      const offsetX = event.clientX - boardRect.left - nodeState.x;
      const offsetY = event.clientY - boardRect.top - nodeState.y;
      let moved = false;

      nodeElement.setPointerCapture(event.pointerId);
      nodeElement.classList.add("is-dragging");

      const handleMove = (moveEvent) => {
        const nextX = Math.max(0, Math.min(560 - nodeState.w, moveEvent.clientX - boardRect.left - offsetX));
        const nextY = Math.max(0, Math.min(520 - nodeState.h, moveEvent.clientY - boardRect.top - offsetY));
        moved = moved || Math.abs(moveEvent.clientX - startX) > 4 || Math.abs(moveEvent.clientY - startY) > 4;
        nodeState.x = Math.round(nextX);
        nodeState.y = Math.round(nextY);
        nodeElement.style.left = `${nodeState.x}px`;
        nodeElement.style.top = `${nodeState.y}px`;
        updateWorkflowLineDom();
      };

      const handleUp = () => {
        nodeElement.classList.remove("is-dragging");
        nodeElement.dataset.dragged = moved ? "true" : "false";
        window.setTimeout(() => {
          nodeElement.dataset.dragged = "false";
        }, 0);
        nodeElement.removeEventListener("pointermove", handleMove);
        nodeElement.removeEventListener("pointerup", handleUp);
        nodeElement.removeEventListener("pointercancel", handleUp);
      };

      nodeElement.addEventListener("pointermove", handleMove);
      nodeElement.addEventListener("pointerup", handleUp);
      nodeElement.addEventListener("pointercancel", handleUp);
    });
  });
}

function updateApproverLineDom() {
  const board = document.getElementById("approverBoard");
  if (!board || !Array.isArray(state.approverNodes) || !Array.isArray(state.approverLines)) return;

  const nodesById = Object.fromEntries(state.approverNodes.map((node) => [node.id, node]));
  state.approverLines.forEach((line) => {
    const linePoints = getWorkflowLinePoints(line, nodesById);
    if (!linePoints) return;
    document.querySelectorAll(`[data-af-line-id="${line.id}"] polyline`).forEach((polyline) => {
      polyline.setAttribute("points", linePoints.points);
    });
    const label = document.querySelector(`[data-af-line-id="${line.id}"] text`);
    if (label) {
      label.setAttribute("x", String(linePoints.labelX));
      label.setAttribute("y", String(linePoints.labelY - 8));
    }
    const hotspot = document.querySelector(`[data-af-line-hotspot="${line.id}"]`);
    if (hotspot) {
      hotspot.style.left = `${linePoints.labelX}px`;
      hotspot.style.top = `${linePoints.labelY}px`;
    }
  });
}

function addApproverNode(type, label, code) {
  ensureApproverBuilderState();
  const count = state.approverNodes.length + 1;
  const visualType = type === "committee" ? "committee" : type === "user" ? "approval" : "resolver";
  const nextNode = {
    id: `approver-${visualType}-${Date.now()}`,
    type: visualType,
    label,
    code: code || "",
    x: 68 + ((count * 44) % 330),
    y: 76 + ((count * 52) % 330),
    w: visualType === "committee" ? 184 : 170,
    h: 58
  };
  state.approverNodes.push(nextNode);
  renderApp();
}

function bindApproverBuilderEvents() {
  ensureApproverBuilderState();

  document.querySelectorAll("[data-af-builder-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.approverBuilderView = button.getAttribute("data-af-builder-view") || "board";
      state.approverConnectMode = false;
      state.approverConnectFrom = null;
      renderApp();
    });
  });

  document.querySelectorAll("[data-af-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      state.approverActiveModal = button.getAttribute("data-af-modal") || "step";
      renderApp();
    });
  });

  document.querySelectorAll("[data-af-close-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      state.approverActiveModal = null;
      renderApp();
    });
  });

  document.querySelectorAll("[data-af-add-node]").forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.getAttribute("data-af-add-node") || "resolver";
      addApproverNode(type, type === "committee" ? "Committee Review" : "Approver Resolver", "New rule");
    });
  });

  document.querySelectorAll("[data-af-add-source]").forEach((button) => {
    button.addEventListener("click", () => {
      addApproverNode(
        button.getAttribute("data-af-add-source") || "resolver",
        button.getAttribute("data-source-label") || "Approver Source",
        button.getAttribute("data-source-code") || ""
      );
    });
  });

  document.querySelectorAll("[data-af-connect]").forEach((button) => {
    button.addEventListener("click", () => {
      state.approverConnectMode = true;
      state.approverConnectFrom = null;
      showToast("Connector mode: select the first approver block, then the target block.");
      document.getElementById("approverBoard")?.classList.add("is-connect-mode");
    });
  });

  document.querySelectorAll("[data-af-line]").forEach((line) => {
    line.addEventListener("click", () => {
      state.approverSelectedLine = line.getAttribute("data-af-line");
      state.approverActiveModal = "logic";
      renderApp();
    });
  });

  document.querySelectorAll("[data-af-node]").forEach((nodeElement) => {
    nodeElement.addEventListener("click", () => {
      if (nodeElement.dataset.dragged === "true") return;
      const nodeId = nodeElement.getAttribute("data-af-node");
      if (!nodeId) return;

      if (!state.approverConnectMode) {
        state.approverActiveModal = "step";
        renderApp();
        return;
      }

      if (state.approverConnectFrom === null) {
        state.approverConnectFrom = nodeId;
        renderApp();
        return;
      }

      if (state.approverConnectFrom && state.approverConnectFrom !== nodeId) {
        const exists = state.approverLines.some((line) => line.from === state.approverConnectFrom && line.to === nodeId);
        if (!exists) {
          state.approverLines.push({
            id: `af-line-${state.approverConnectFrom}-${nodeId}-${Date.now()}`,
            from: state.approverConnectFrom,
            to: nodeId,
            label: "approved",
            type: "then"
          });
        }
        state.approverConnectMode = false;
        state.approverConnectFrom = null;
        renderApp();
      }
    });

    nodeElement.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      const board = document.getElementById("approverBoard");
      const nodeId = nodeElement.getAttribute("data-af-node");
      const nodeState = state.approverNodes.find((node) => node.id === nodeId);
      if (!board || !nodeState) return;

      const boardRect = board.getBoundingClientRect();
      const startX = event.clientX;
      const startY = event.clientY;
      const offsetX = event.clientX - boardRect.left - nodeState.x;
      const offsetY = event.clientY - boardRect.top - nodeState.y;
      let moved = false;

      nodeElement.setPointerCapture(event.pointerId);
      nodeElement.classList.add("is-dragging");

      const handleMove = (moveEvent) => {
        const nextX = Math.max(0, Math.min(560 - nodeState.w, moveEvent.clientX - boardRect.left - offsetX));
        const nextY = Math.max(0, Math.min(520 - nodeState.h, moveEvent.clientY - boardRect.top - offsetY));
        moved = moved || Math.abs(moveEvent.clientX - startX) > 4 || Math.abs(moveEvent.clientY - startY) > 4;
        nodeState.x = Math.round(nextX);
        nodeState.y = Math.round(nextY);
        nodeElement.style.left = `${nodeState.x}px`;
        nodeElement.style.top = `${nodeState.y}px`;
        updateApproverLineDom();
      };

      const handleUp = () => {
        nodeElement.classList.remove("is-dragging");
        nodeElement.dataset.dragged = moved ? "true" : "false";
        window.setTimeout(() => {
          nodeElement.dataset.dragged = "false";
        }, 0);
        nodeElement.removeEventListener("pointermove", handleMove);
        nodeElement.removeEventListener("pointerup", handleUp);
        nodeElement.removeEventListener("pointercancel", handleUp);
      };

      nodeElement.addEventListener("pointermove", handleMove);
      nodeElement.addEventListener("pointerup", handleUp);
      nodeElement.addEventListener("pointercancel", handleUp);
    });
  });
}

function bindScreenEvents(requestedId, activeId) {
  if (activeId === "SCR-001") {
    const loginForm = document.getElementById("loginForm");
    const sessionExpireBtn = document.getElementById("sessionExpireBtn");
    if (loginForm) {
      loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const roleField = document.getElementById("loginRole");
        const selectedRole = roleField ? roleField.value : state.role;
        state.role = selectedRole;
        state.authenticated = true;
        localStorage.setItem("edoc-role", state.role);
        localStorage.setItem("edoc-auth", "true");
        location.hash = "SCR-002";
      });
    }
    if (sessionExpireBtn) {
      sessionExpireBtn.addEventListener("click", () => {
        state.authenticated = false;
        localStorage.setItem("edoc-auth", "false");
        showToast("Session expired. Please login again.");
        renderApp();
      });
    }
  }

  if (requestedId === "SCR-002") {
    document.querySelectorAll("[data-status-focus]").forEach((button) => {
      button.addEventListener("click", () => {
        state.dashboardStatusFocus = button.getAttribute("data-status-focus") || "All";
        renderApp();
      });
    });

    document.querySelectorAll("[data-workload-mode]").forEach((button) => {
      button.addEventListener("click", () => {
        state.dashboardWorkloadMode = button.getAttribute("data-workload-mode") || "Role-Based";
        renderApp();
      });
    });

    document.querySelectorAll("[data-returned-focus]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextFocus = button.getAttribute("data-returned-focus") || "All";
        state.dashboardReturnedFocus = nextFocus === state.dashboardReturnedFocus ? "All" : nextFocus;
        renderApp();
      });
    });

    document.querySelectorAll("[data-trend-period]").forEach((button) => {
      button.addEventListener("click", () => {
        state.dashboardTrendPeriod = button.getAttribute("data-trend-period") || "Week";
        renderApp();
      });
    });

    document.querySelectorAll("[data-trend-department]").forEach((button) => {
      button.addEventListener("click", () => {
        const selected = button.getAttribute("data-trend-department") || "All";
        if (selected === "All") {
          state.dashboardTrendDepartments = ["All"];
          renderApp();
          return;
        }

        const nextDepartments =
          Array.isArray(state.dashboardTrendDepartments) && state.dashboardTrendDepartments.length > 0
            ? state.dashboardTrendDepartments.filter((item) => item !== "All")
            : [];
        const existingIndex = nextDepartments.indexOf(selected);
        if (existingIndex >= 0) {
          nextDepartments.splice(existingIndex, 1);
        } else {
          nextDepartments.push(selected);
        }

        state.dashboardTrendDepartments = nextDepartments.length > 0 ? nextDepartments : ["All"];
        renderApp();
      });
    });
  }

  if (requestedId === "SCR-011") {
    const projectSearch = document.getElementById("projectSearch");
    if (projectSearch) {
      projectSearch.addEventListener("input", (event) => {
        state.projectSearch = event.target.value;
        renderApp();
      });
    }
  }

  if (requestedId === "SCR-021") {
    const taskSearch = document.getElementById("taskSearch");
    if (taskSearch) {
      taskSearch.addEventListener("input", (event) => {
        state.taskSearch = event.target.value;
        renderApp();
      });
    }
  }

  if (requestedId === "SCR-201") {
    const search = document.getElementById("workflowSearch");
    const sort = document.getElementById("workflowSort");
    if (search) {
      search.addEventListener("input", (event) => {
        state.workflowSearch = event.target.value;
        renderApp();
      });
    }
    if (sort) {
      sort.addEventListener("change", (event) => {
        state.workflowSort = event.target.value;
        renderApp();
      });
    }
    const pillContainer = document.getElementById("workflowStatusPills");
    if (pillContainer) {
      pillContainer.querySelectorAll("[data-status]").forEach((pill) => {
        pill.addEventListener("click", () => {
          state.workflowStatus = pill.getAttribute("data-status") || "All";
          renderApp();
        });
      });
    }
  }

  if (requestedId === "SCR-203") {
    bindWorkflowBuilderEvents();
  }

  if (requestedId === "SCR-212") {
    bindApproverBuilderEvents();
  }

  if (requestedId === "SCR-211") {
    const search = document.getElementById("approverSearch");
    const sort = document.getElementById("approverSort");
    if (search) {
      search.addEventListener("input", (event) => {
        state.approverSearch = event.target.value;
        renderApp();
      });
    }
    if (sort) {
      sort.addEventListener("change", (event) => {
        state.approverSort = event.target.value;
        renderApp();
      });
    }
    const pillContainer = document.getElementById("approverStatusPills");
    if (pillContainer) {
      pillContainer.querySelectorAll("[data-status]").forEach((pill) => {
        pill.addEventListener("click", () => {
          state.approverStatus = pill.getAttribute("data-status") || "All";
          renderApp();
        });
      });
    }
  }
}

window.addEventListener("hashchange", () => renderApp());
window.addEventListener("DOMContentLoaded", () => {
  if (!location.hash) {
    location.hash = state.authenticated ? "SCR-002" : "SCR-001";
  } else {
    renderApp();
  }
});
