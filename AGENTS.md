# agents.md

This repository contains a **Project Management SaaS** evolving through 4 structured phases — from an internal execution core to client interaction and AI-powered acceleration.

## Overview

Goal: enable teams (or freelancers) to manage projects with clear **scope, timeline, and deliverables**, and progressively evolve into a fluid **client collaboration workflow** (proposals, revisions, approvals) enhanced by contextual AI.

---

# Roadmap

## Phase 1 — Core Project Management (Internal)

Foundation layer focused on structuring and executing work:

- Projects
- Internal documents
- Features
- Tasks
- Milestones

Definition of done (examples):

- Full CRUD for core entities
- Clear relationships: project → features → tasks → milestones
- Basic role/permission control (if applicable)
- Stable internal workflow before exposing to clients

---

## Phase 2 — Minimal Client Interaction (External)

Lightweight client-facing layer without overcomplicating the system:

- Public or controlled-access project/proposal link
- Manual proposal creation
- Proposal versioning (history tracking)
- Proposal status lifecycle:
  - draft
  - sent
  - in_review
  - approved
  - rejected

Definition of done (examples):

- Client can view proposal inside the app
- Client can leave comments or considerations
- Proposal updates generate new versions
- Approval/rejection is auditable

---

## Phase 3 — AI as Contextual Accelerator

AI is not a generic chatbot. It acts as structured, contextual accelerators inside workflows.

Examples:

- “Generate tasks from feature description”
- “Estimate effort and timeline”
- “Generate executive summary for client”
- “Generate proposal draft”
- “Recalculate budget after scope change”

Principles:

- AI outputs are always drafts, requiring human review
- Prefer structured outputs (JSON schemas)
- AI must operate with project context (documents, features, history)
- Deterministic behavior when possible

---

## Phase 4 — Integrations

Automation and synchronization with external systems:

- GitHub sync (issues/PRs → tasks/features)
- Calendar sync (milestones, deadlines)
- Notification systems (email, Slack, etc.)
- Future extensibility via integrations

Definition of done (examples):

- Idempotent sync operations
- Logging and retry mechanisms
- Workspace-level configuration
- Clear separation between internal data and external sync state

---

# AI Organization

All AI-related configuration, prompts, schemas, and agent logic must live inside:

The `.ai` folder is responsible for:

- Prompt templates
- Structured output schemas
- Tool definitions
- RAG configuration (chunking, metadata, vector store rules)
- Context assembly logic
- Versioned AI behaviors

This ensures:

- Traceability
- Version control of prompts
- Clear separation between product logic and AI logic
- Future model/provider flexibility

---

# Architectural Principles

- Client-facing data must be versioned and auditable
- Proposal lifecycle must be explicit and state-driven
- AI should enhance workflows, not replace structured logic
- Internal core must be stable before expanding client features
- All AI behaviors should be reproducible and testable

---

# Future Direction

This project aims to unify:

Scope → Budget → Negotiation → Approval → Execution → Delivery

Inside a single structured workflow.

The long-term differentiation lies in:

- Tight integration between execution and commercial negotiation
- Context-aware AI accelerators
- Clean internal architecture ready for scale
