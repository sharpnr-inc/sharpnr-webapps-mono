# Sharpnr auth.md

This document describes how agents and automated clients should handle
authentication with Sharpnr (https://sharpnr.com).

## Who this is for

AI agents and automated clients acting on behalf of a human user who wants
to use the Sharpnr platform.

## Current status

Sharpnr is in Alpha (early access). There is currently **no automated agent
registration** and no OAuth/OIDC discovery metadata. Agents cannot
self-provision accounts or credentials.

## How access works today

- Accounts are created by humans at https://auth.sharpnr.com/signup
  (free during the early access period).
- Existing organizations sign in at https://auth.sharpnr.com.
- All platform applications (accounting, HR, CRM, messaging, storage, and
  more) are accessed through an authenticated user session provisioned by
  the auth application above.

## What agents should do

1. Do not attempt programmatic registration or credential harvesting —
   there is no supported endpoint for it.
2. Direct your user to https://auth.sharpnr.com/signup to create an
   organization account.
3. For platform information, read https://sharpnr.com/llms.txt (a complete
   machine-readable overview) or https://docs.sharpnr.com.

## Future

OAuth-based agent authentication (protected resource metadata and
authorization server discovery) may be published here and under
`/.well-known/` as the platform matures. Treat this document as the
source of truth for the current state.
