/**
 * Canonical Silo Q&A.
 *
 * Kept in its own module for two reasons: component files may only export
 * components (react-refresh/only-export-components), and scripts/prerender.mjs
 * imports this directly to emit FAQPage JSON-LD at build time — so the
 * structured data and the rendered answers can never drift apart.
 */

export const faqs = [
  {
    q: "What is Silo?",
    a: "Silo is Sharpnr's all-in-one data platform. It provides S3-compatible object storage with CDN delivery, a Drive for the files people work with day to day, managed PostgreSQL, and a data lake and warehouse for analytics — all on one platform, behind one API, under one permission model.",
  },
  {
    q: "What can I store in Silo?",
    a: "Structured, semi-structured and unstructured data. Objects and media go in buckets, everyday documents go in Drive, application data goes in managed PostgreSQL, and raw or analytical data goes in the lake and warehouse. They share the same underlying storage, credentials and audit trail.",
  },
  {
    q: "How is Drive different from object storage?",
    a: "They are the same bytes with different front doors. Buckets are for applications: an S3-compatible API, versioning, lifecycle rules. Drive is for people: a folder tree, in-browser previews, sharing by link or by person, version history and desktop sync. Both obey the same permissions, encryption and quotas.",
  },
  {
    q: "Which databases can Silo provision?",
    a: "PostgreSQL. Silo creates the database, creates organization-scoped roles, applies permissions, generates credentials, and returns connection information. The physical PostgreSQL server or cluster is an implementation detail you never have to manage.",
  },
  {
    q: "Do organizations get PostgreSQL superuser access?",
    a: "No. An organization never receives superuser credentials. Silo creates organization-scoped roles such as org_123_app, org_123_migrator, org_123_readonly, and org_123_admin. Sharpnr employees are application-level identities, so Silo does not create a PostgreSQL login for every employee.",
  },
  {
    q: "Can I run arbitrary SQL in the Silo explorer?",
    a: "Not yet. The explorer deliberately exposes controlled operations over schemas, tables, views, functions, indexes, constraints and rows, with scoped read queries and result limits. A full SQL workspace comes after the controlled explorer is mature. The browser never connects directly to PostgreSQL — it talks to Silo over HTTPS.",
  },
  {
    q: "Is the object storage API S3-compatible?",
    a: "Yes. Buckets expose an S3-compatible API, so existing SDKs, CLI tools and libraries work without rewriting them. Silo adds versioning, lifecycle rules, checksums, server-side encryption and per-organization quotas on top.",
  },
  {
    q: "How do permissions work across services?",
    a: "One model covers all of them. Access is role-based and resource-scoped — Read, Write or Admin on a bucket, a database, a dataset or a Drive folder. Roles are governed centrally in Cortex and enforced by Silo, so there is no separate permission system per service to keep in sync.",
  },
  {
    q: "Is there one audit trail, or one per service?",
    a: "One. File uploads and downloads, database provisioning, permission changes, dataset ingests and credential issuance all land in the same append-oriented log, with the organization, actor, resource and timestamp. Sensitive payloads stay out of it.",
  },
  {
    q: "How does Silo handle very large files?",
    a: "By streaming. Uploads and compression run reader to compressor to writer, so multi-gigabyte objects are never loaded whole into memory. Checksums are computed on the upload stream for integrity verification, duplicate detection and auditing, and long-running work moves to background workers rather than blocking the request.",
  },
  {
    q: "Are public file URLs tied to the storage layout?",
    a: "No, deliberately. A public object is addressed independently of its physical storage path, so files can be moved between backends without breaking any URL that has already been shared.",
  },
  {
    q: "What formats does the data lake support?",
    a: "Parquet is the primary format — columnar, and well suited to analytical query engines. JSON, JSONL, CSV, Avro and ORC are also supported, with schema-on-read and catalogued metadata so datasets stay findable rather than becoming folklore.",
  },
  {
    q: "Is Silo available today?",
    a: "Silo is in early access and onboarding its first organizations. Object storage, Drive and CDN delivery are the furthest along; PostgreSQL provisioning and the data lake follow, with the warehouse and cross-region backups after that. Talk to us about what you need and when.",
  },
];
