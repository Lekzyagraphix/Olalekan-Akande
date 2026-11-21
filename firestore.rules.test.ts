/**
 * Security Rules Verification Spec (Reference Test Suite)
 * Verifies that all Dirty Dozen attack payloads are denied by firestore.rules.
 */
export const DIRTY_DOZEN_CASES = [
  {
    name: '1. Unauthenticated settings write denied',
    path: '/settings/site',
    operation: 'update',
    auth: null,
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '2. Unverified admin email spoof denied',
    path: '/projects/delightful-juices',
    operation: 'update',
    auth: { uid: 'spoof', email: 'olalekanakande007@gmail.com', email_verified: false },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '3. Draft project read by visitor denied',
    path: '/projects/draft-project',
    operation: 'get',
    auth: null,
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '4. Enquiry list scraping by non-admin denied',
    path: '/enquiries',
    operation: 'list',
    auth: { uid: 'visitor', email: 'visitor@example.com', email_verified: true },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '5. Enquiry status forgery on create denied',
    path: '/enquiries/enq-1',
    operation: 'create',
    payload: { status: 'completed' },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '6. Enquiry shadow field injection denied',
    path: '/enquiries/enq-2',
    operation: 'create',
    payload: { isAdminOverride: true },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '7. Enquiry backdated timestamp forgery denied',
    path: '/enquiries/enq-3',
    operation: 'create',
    payload: { createdAt: '2020-01-01T00:00:00Z' },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '8. Self-assigned admin escalation denied',
    path: '/admins/attacker-uid',
    operation: 'create',
    auth: { uid: 'attacker-uid', email: 'attacker@example.com', email_verified: true },
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '9. Path variable ID poisoning denied',
    path: '/projects/invalid.id.with.dots',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '10. Oversized enquiry description denied',
    path: '/enquiries/enq-4',
    operation: 'create',
    payloadSize: 50000,
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '11. Oversized project gallery array denied',
    path: '/projects/delightful-juices',
    operation: 'update',
    gallerySize: 25,
    expected: 'PERMISSION_DENIED',
  },
  {
    name: '12. Media uploadedBy spoofing denied',
    path: '/media/m1',
    operation: 'create',
    payload: { uploadedBy: 'different-uid' },
    expected: 'PERMISSION_DENIED',
  },
];
