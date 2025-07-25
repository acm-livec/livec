
---
project: LiveC
version: 0.9.0
updated: 2025-07-25
description: Collaborative curriculum revision platform for the ACM community.
status: alpha
codex-cli: true
---

# 📘 LiveC Project Summary

## 📌 Table of Contents

- [Project Purpose](#project-purpose)
- [Project Structure](#project-structure)
  - [Root](#project-root-livec)
  - [Frontend](#inside-frontend)
  - [Backend](#inside-backend)
  - [Other Folders](#other-folders)
- [Implemented Features](#implemented-features-with-file-paths)
- [Incomplete / Missing Features](#incompletemissing-features)
- [Observations / Discrepancies / Risks](#observations--discrepancies--risks)
- [Feature Status Table](#summary-table)
- [Object Models](#object-models)
  - [Suggestion](#1-suggestion-object)
  - [Curriculum](#2-curriculum-object)
  - [User Roles](#3-user-role-models-related-context)
- [Object Summary Table](#summary-table-2)

---

## 🧭 Project Purpose

LiveC is a web application that supports **collaborative curriculum editing** for the ACM community. It provides a structured process for community members to submit suggestions, which are reviewed by Associate Editors, Reviewers, and Editors-in-Chief in defined stages: **proposal → review → decision → publication**.

---

## 🗂 Project Structure

### Project Root (`LiveC/`)

```plaintext
* Prototype Requirements.pdf         — System Requirements Specification (SRS)
* frontend/                         — React application
* backend/                          — Node.js API & business logic
* documentation/, archived/, testing/
* jsdoc.json, AGENTS.md             — Docs & agent usage
* package.json                      — Monorepo dependencies
```

---

### Inside `/frontend/`

```plaintext
* features/     — Domain/role modules (AE, CM, R, EIC)
* components/   — Shared UI
* context/, routes/, pages/
* assets/, styles/, utils/
* main.jsx, App.jsx
```

---

### Inside `/backend/`

```plaintext
* models/       — Role-based and domain models
* controllers/  — Route logic (by role/resource)
* routes/       — Express route definitions
* services/, database/, errors/
* app.js, server.js
* logger/       — Custom logging middleware
```

---

### Other Folders

```plaintext
* archived/     — Legacy code
* documentation/— Developer or procedural docs
* testing/      — Manual/automated test cases
```

---

## ✅ Implemented Features (with File Paths)

### Community Member (CM)

- [x] Propose/view suggestions  
  ↳ `backend/src/models/users/community-member/member.model.js`  
  ↳ `frontend/src/features/community-member/Message.jsx`

- [x] View curriculum/documents  
  ↳ `frontend/src/features/document/Documentation.jsx`

---

### Associate Editor (AE)

- [x] Triage/review  
  ↳ `frontend/src/features/associate-editor/triage-view.jsx`

- [x] Assign reviewers  
  ↳ `backend/src/controllers/suggestion/post-reviewers.js`

---

### Reviewer (R)

- [x] Make recommendations  
  ↳ `frontend/src/features/reviewer/useReviewer.jsx`

---

### Editor-in-Chief (EIC)

- [x] Approve final suggestions  
  ↳ `backend/src/controllers/suggestion/post-approval.js`

---

## ❌ Incomplete / Missing Features

### Community Member

- [ ] CM1–CM3: Registration restrictions  
- [ ] CM5: Contributor acknowledgment  

### Associate Editor

- [ ] AE1–AE9: Triaging policy, external reviewers  
- [ ] AE10: Periodic review cycles  

### Reviewer

- [ ] R1–R3: Self-nomination, rich feedback forms  

### Editor in Chief

- [ ] EIC4: Manage board/AEs  
- [ ] EIC5: Cross-discipline analysis  

### Infrastructure

- [ ] Notifications & public posting  
- [ ] Contributor audit/versioning  
- [ ] Timed process automation (annual)  

---

## ⚠️ Observations / Discrepancies / Risks

- ✅ **Modular role logic** is in place (CM, AE, R, EIC).
- ⚠️ **Workflows lack sequence logic** — mostly button-driven/manual.
- ⚠️ **Audit/versioning** is limited to suggestion history.
- ⚠️ **Public communication & ACM integration** is unimplemented.

---

## 📊 Summary Table

| Role/Feature                        | Status            | Files |
|------------------------------------|-------------------|-------|
| CM: Suggestion                     | ✅ Implemented     | `member.model.js` |
| CM: Registration logic             | ❌ Not implemented | —     |
| CM: Contributor credit             | ❌ Not implemented | —     |
| AE: Triage, assign, review         | ✅ Implemented (partial) | `triage-view.jsx` |
| AE: Timed cycles                   | ❌ Not implemented | —     |
| Reviewer: Recommend                | ✅ Basic           | `useReviewer.jsx` |
| EIC: Approve                       | ✅ Basic           | `useEditorInChief.jsx` |
| Ed Board: Final Review             | ❌ Not implemented | —     |
| Public dissemination               | ❌ Not implemented | —     |
| Audit/version tracking             | ⚠️ Basic only      | `suggestion.model.js` |

---

## 🧱 Object Models

### 1. Suggestion Object

```js
{
  id, title, suggestion, submitter_id,
  section_id, time_created,
  status: { for_member: "SUBMITTED", ... },
  actions: [], documentation: [], reviewers: [],
  discipline, public_messages: []
}
```

➡️ Path: `backend/src/models/suggestion/suggestion.model.js`

---

### 2. Curriculum Object

```js
{
  id, discipline, version, lastUpdated,
  sections: [{ id, title, ... }],
  contributors: [], history: []
}
```

➡️ Path: `backend/src/models/curriculum/curriculum.model.js`

---

### 3. User Role Models

| Role            | Path                                                             |
|-----------------|------------------------------------------------------------------|
| CommunityMember | `backend/src/models/users/community-member/member.model.js`      |
| AssociateEditor | `backend/src/models/users/associate-editor/editor.model.js`      |
| Reviewer        | `backend/src/models/users/reviewer/reviewer.model.js`            |
| Editor-in-Chief | `backend/src/models/users/editor-in-chief/chief.model.js`        |

---

## 📦 Summary Table 2: Object Purpose

| Object     | Purpose                | Core Fields (examples)                                       |
|------------|------------------------|---------------------------------------------------------------|
| Suggestion | Feedback item          | id, text, status, actions, reviewers                          |
| Curriculum | Curriculum versioning  | id, sections, discipline, version, contributors               |
| User Role  | Role-linked assignment | id, assignedSuggestions, discipline                           |
