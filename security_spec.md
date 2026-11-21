# Security Specification & Red-Team Threat Model

## 1. Data Invariants
1. **Default-Deny Catch-All**: All unspecified paths under `/databases/{database}/documents` are denied.
2. **Verified Admin Gate**: Administrative writes across `/settings`, `/profile`, `/projects`, `/services`, `/testimonials`, `/seo`, `/media`, and `/admins` require `request.auth != null`, `request.auth.token.email_verified == true`, and either the verified owner email (`olalekanakande007@gmail.com`) or existence in `/admins/$(request.auth.uid)`.
3. **Draft Isolation**: Projects with `status == 'draft'`, unpublished services (`published == false`), and unpublished testimonials (`published == false`) must never be readable or listable by non-admin visitors.
4. **PII Isolation on Enquiries**: Anyone may submit an enquiry (`create`) if it passes strict schema validation (`status == 'unread'`, server timestamp `request.time`, no extra shadow fields), while `get`, `list`, `update`, and `delete` on `/enquiries` are strictly restricted to verified admins.
5. **Path Hardening & Boundary Limits**: Every document ID path variable is validated with `isValidId()` (`^[a-zA-Z0-9_-]+$`, `<= 128` chars) on single-document operations, and every string and array enforces strict type and `.size()` bounds.

## 2. The "Dirty Dozen" Attack Payloads (Must Return PERMISSION_DENIED)
1. **Unauthenticated Settings Tampering**: Unauthenticated `update` on `/settings/site` attempting to change `contactEmail` or `heroHeadline`.
2. **Unverified Admin Email Spoof**: Authenticated user with `email: "olalekanakande007@gmail.com"` and `email_verified: false` attempting to write `/projects/delightful-juices`.
3. **Draft Project Exfiltration**: Unauthenticated `get` on `/projects/draft-project` where `status == 'draft'`.
4. **Enquiry PII Scraping**: Unauthenticated or non-admin `list` or `get` on `/enquiries` or `/enquiries/{enquiryId}`.
5. **Enquiry Status Forgery on Create**: Public `create` on `/enquiries/enq-1` attempting to set `status: "completed"` instead of `"unread"`.
6. **Enquiry Shadow Field Injection**: Public `create` on `/enquiries/enq-2` including an unallowed key such as `isAdminOverride: true`.
7. **Timestamp Forgery on Enquiry**: Public `create` on `/enquiries/enq-3` passing a client-supplied past `createdAt` timestamp instead of `request.time`.
8. **Self-Assigned Admin Escalation**: Non-admin authenticated user writing `/admins/{theirUid}` with `role: "admin"`.
9. **Path ID Poisoning**: Attempting `create` on `/projects/../../evil..id` or a 300-character document ID.
10. **Denial-of-Wallet String Bomb**: Attempting `create` on `/enquiries/enq-4` with a 50,000-character `description`.
11. **Unbounded Array Injection**: Admin or attacker attempting to write `galleryImages` with > 20 items or invalid shape.
12. **Media Ownership Spoofing**: Attempting to write `/media/m1` with `uploadedBy` not matching `request.auth.uid`.
