/**
 * Canonical Silo Engine Q&A.
 *
 * Kept in its own module for two reasons: component files may only export
 * components (react-refresh/only-export-components), and scripts/prerender.mjs
 * imports this directly to emit FAQPage JSON-LD at build time — so the
 * structured data and the rendered answers can never drift apart.
 */

export const faqs = [
  {
    q: "What is Silo Engine?",
    a: "Silo Engine is Sharpnr's self-hosted infrastructure platform. It provides file and object storage with CDN-backed delivery, PostgreSQL provisioning, a controlled database explorer, and — on the roadmap — data lakes, data warehouses, and analytics infrastructure. It is the layer Sharpnr Engine and other Sharpnr applications provision resources from.",
  },
  {
    q: "Is Silo Engine available to use today?",
    a: "Not yet. Silo Engine is in Phase 1, Foundation — the initial architecture and implementation phase. Configuration, the Axum server, application state and dependency injection, error handling, and tracing are the current focus. Storage lands in Phase 2 and PostgreSQL provisioning in Phase 4. Contact Sharpnr for early access.",
  },
  {
    q: "How is Silo Engine different from Sharpnr Engine?",
    a: "Sharpnr Engine owns business logic — Hospitality, Accounting, HR, CRM, and other business modules. Silo Engine owns infrastructure and data resources: storage, storage backends, quotas, checksums, compression, PostgreSQL provisioning, credentials, data lakes, backups, and audit logging. Silo is deliberately not the database for any business domain.",
  },
  {
    q: "Which databases can Silo provision?",
    a: "PostgreSQL. Silo creates the database, creates organization-scoped PostgreSQL roles, applies permissions, generates credentials, and returns connection information. The physical PostgreSQL server or cluster is an implementation detail.",
  },
  {
    q: "Do organizations get PostgreSQL superuser access?",
    a: "No. An organization never receives superuser credentials. Silo creates organization-scoped roles such as org_123_app, org_123_migrator, org_123_readonly, and org_123_admin. Sharpnr employees are application-level identities, so Silo does not create a PostgreSQL login for every employee.",
  },
  {
    q: "Can I run arbitrary SQL in the Silo database explorer?",
    a: "Not in v1. The explorer deliberately exposes controlled operations over schemas, tables, views, functions, indexes, constraints, and rows. An SQL workspace is planned for Phase 7, after the controlled explorer is mature. The browser never connects directly to PostgreSQL — it talks to Silo Engine over HTTPS, and Silo talks to PostgreSQL.",
  },
  {
    q: "Does Silo Engine require Kubernetes or containers?",
    a: "No. The initial deployment target is self-hosted physical infrastructure running as a normal service under systemd, with Nginx in front. Container orchestration is intentionally out of scope for the first version, though the architecture avoids assumptions that would block future horizontal scaling.",
  },
  {
    q: "Where does Silo store data?",
    a: "On RAID-backed storage on Sharpnr infrastructure — roughly 1 PB across multiple machines on a local network switch, with about 160 GB of combined RAM and 10 combined CPUs. Storage sits behind a StorageBackend abstraction, so S3, Ceph, or other implementations can be added without changing the public Silo API.",
  },
  {
    q: "Are public file URLs tied to the filesystem layout?",
    a: "No, deliberately. A public object is addressed as https://cdn.sharpnr.com/{org_id}/{employee_id}/{folder}/{filename}, which is independent of the physical storage path. The request travels from the public URL through CDN/Nginx to Silo Engine, then through the storage abstraction to physical storage.",
  },
  {
    q: "What data formats does the Silo data lake support?",
    a: "Parquet is the primary format under consideration because it is columnar and works well with analytical query engines. JSON, JSONL, CSV, Avro, and ORC are also planned. For early analytical and query workloads, DuckDB is a candidate for querying Parquet directly.",
  },
  {
    q: "How does Silo handle very large files?",
    a: "By streaming. Compression is designed as reader to compressor to writer so multi-gigabyte objects are never loaded whole into memory, with Zstandard as the initial algorithm behind a trait-based abstraction. Checksums are computed on the upload stream for integrity verification, duplicate detection, and auditing. Long-running work moves to background workers rather than blocking the request.",
  },
  {
    q: "What is Silo Engine built with?",
    a: "Rust, Axum, and Tokio, with PostgreSQL for metadata and OpenAPI as the published contract. Documentation is served at /swagger-ui, /redoc, and /v1/openapi.json. Configuration is centralized in a single EngineConfig loaded once at startup, and dependencies are injected explicitly rather than through a DI framework.",
  },
];
