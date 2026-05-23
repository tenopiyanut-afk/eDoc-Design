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
  "User & Role Management": [
    "User/role CRUD with active task impact warnings.",
    "User-level override higher than role-level permission.",
    "Permission preview and full permission audit log."
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
    name: "User & Role Management",
    module: "User & Role Management",
    group: "Administration",
    type: "urm",
    description: "Manage users, roles, departments, and effective permissions.",
    requirements: ["REQ-URM-001", "REQ-URM-004", "REQ-URM-007", "REQ-URM-009", "REQ-URM-010"],
    roles: ["Admin"]
  },
  {
    id: "SCR-992",
    name: "Delegation Management",
    module: "Delegation Management",
    group: "Administration",
    type: "delegation",
    description: "Delegator/delegatee assignment with effective period and scope.",
    requirements: ["REQ-DEL-001", "REQ-DEL-003", "REQ-DEL-005", "REQ-DEL-008", "REQ-DEL-009"],
    roles: ["Admin", "Approver"]
  },
  {
    id: "SCR-993",
    name: "LOV Management",
    module: "LOV Management",
    group: "Administration",
    type: "lov",
    description: "Lifecycle values used in workflow, status, and action dictionaries.",
    requirements: ["REQ-MST-004", "REQ-MST-005"],
    roles: ["Admin"]
  },
  {
    id: "SCR-994",
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
  ["SCR-918", "MASTER-Integration Mapping Code", "Internal/external mapping codes for integrations."]
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
  ]
};

const state = {
  role: localStorage.getItem("edoc-role") || "Admin",
  authenticated: localStorage.getItem("edoc-auth") !== "false",
  navQuery: "",
  projectSearch: "",
  taskSearch: "",
  workflowSearch: "",
  workflowStatus: "All",
  workflowSort: "newest",
  approverSearch: "",
  approverStatus: "All",
  approverSort: "newest",
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

function renderDashboard(screen) {
  const pending = MOCK.tasks.filter((task) => task.status === "Pending").length;
  const inReview = MOCK.tasks.filter((task) => task.status === "In Review").length;
  const completed = MOCK.tasks.filter((task) => task.status === "Completed").length;
  const returned = MOCK.tasks.filter((task) => task.status === "Returned").length;

  const rows = MOCK.tasks
    .slice(0, 4)
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

  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>My Workload</h3>
          <div class="kpi-grid">
            <div class="kpi"><p class="kpi-value">${pending}</p><p class="kpi-label">Pending Tasks</p></div>
            <div class="kpi"><p class="kpi-value">${inReview}</p><p class="kpi-label">In Review</p></div>
            <div class="kpi"><p class="kpi-value">${completed}</p><p class="kpi-label">Completed</p></div>
            <div class="kpi"><p class="kpi-value">${returned}</p><p class="kpi-label">Returned</p></div>
          </div>
        </article>

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
  const sorted = sortCards(MOCK.workflowCards, state.workflowSort);
  const visible = sorted.filter((item) => {
    const statusOk = status === "All" || item.status === status;
    if (!statusOk) return false;
    if (!query) return true;
    return `${item.name} ${item.status} ${item.editor}`.toLowerCase().includes(query);
  });

  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>Workflow Management</h3>
          <div class="toolbar compact">
            <label>Search
              <input id="workflowSearch" type="search" placeholder="Search workflow name" value="${escapeHtml(state.workflowSearch)}">
            </label>
            <label>Sort
              <select id="workflowSort">
                <option value="newest" ${state.workflowSort === "newest" ? "selected" : ""}>Newest</option>
                <option value="oldest" ${state.workflowSort === "oldest" ? "selected" : ""}>Oldest</option>
                <option value="name" ${state.workflowSort === "name" ? "selected" : ""}>A-Z</option>
              </select>
            </label>
            <button class="btn-primary" data-go="SCR-202">+ New Workflow</button>
          </div>
          ${renderStatusPills("workflowStatusPills", state.workflowStatus, ["All", "Published", "Draft", "On Review"])}
          <p class="mini-note">${visible.length} workflow cards visible.</p>
          <div class="card-grid">${renderCards(visible)}</div>
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

function renderWorkflowBuilder(screen) {
  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>Workflow Step Builder</h3>
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
            <button data-toast="Step added">+ Add Step</button>
            <button data-toast="Simulation completed">Run Simulation</button>
            <button class="btn-primary" data-toast="Workflow published">Publish</button>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}

function renderApproverList(screen) {
  const status = state.approverStatus;
  const query = state.approverSearch.toLowerCase().trim();
  const sorted = sortCards(MOCK.approverCards, state.approverSort);
  const visible = sorted.filter((item) => {
    const statusOk = status === "All" || item.status === status;
    if (!statusOk) return false;
    if (!query) return true;
    return `${item.name} ${item.status} ${item.editor}`.toLowerCase().includes(query);
  });

  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>Approver Flow Management</h3>
          <div class="toolbar compact">
            <label>Search
              <input id="approverSearch" type="search" placeholder="Search approver flow name" value="${escapeHtml(state.approverSearch)}">
            </label>
            <label>Sort
              <select id="approverSort">
                <option value="newest" ${state.approverSort === "newest" ? "selected" : ""}>Newest</option>
                <option value="oldest" ${state.approverSort === "oldest" ? "selected" : ""}>Oldest</option>
                <option value="name" ${state.approverSort === "name" ? "selected" : ""}>A-Z</option>
              </select>
            </label>
            <button class="btn-primary" data-go="SCR-212">+ New Approver Flow</button>
          </div>
          ${renderStatusPills("approverStatusPills", state.approverStatus, ["All", "Published", "Draft", "On Review"])}
          <p class="mini-note">${visible.length} approver flow cards visible.</p>
          <div class="card-grid">${renderCards(visible)}</div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
    </section>
  `;
}

function renderApproverBuilder(screen) {
  return `
    <section class="content-grid">
      <div class="stack">
        <article class="view-card">
          <h3>Approver Flow Builder</h3>
          <div class="form-grid">
            <label>Approver Flow Name
              <input type="text" value="AF Procurement Committee">
            </label>
            <label>Completion Rule
              <select><option>All Required Approvers</option><option>Any 1 Approver</option></select>
            </label>
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
            <button data-toast="Approver step added">+ Add Step</button>
            <button data-toast="Approver simulation completed">Simulate</button>
            <button class="btn-primary" data-toast="Approver flow published">Publish</button>
          </div>
        </article>
      </div>
      ${renderRequirementPanel(screen)}
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

function renderURM(screen) {
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
          <h3>User & Role Management</h3>
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
    case "urm":
      return renderURM(screen);
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
