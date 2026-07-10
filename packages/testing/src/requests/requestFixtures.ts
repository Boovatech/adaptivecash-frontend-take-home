import type { CashRequestDetail } from '@adaptivecash/api-client';

const fixtures: CashRequestDetail[] = [
  {
    id: 'REQ-2026-0142',
    serviceType: 'CashCollection',
    applicant: 'North Retail Network LLC',
    branch: 'Kyiv Central Branch',
    requestedFor: '2026-07-15T09:30:00Z',
    status: 'ReadyForSignature',
    owner: 'Olena K.',
    updatedAt: '2026-07-10T08:42:00Z',
    expectedSigner: 'Olena Kovalenko',
    nextAction: 'Review the immutable request package and start external signing.',
    documents: [
      {
        id: 'DOC-0142-A',
        name: 'Cash collection request package',
        versionId: '9f92104a-e8df-4f9f-9213-c50267f68982',
        versionHash: '7af66b9f07ba16db19bd98d420f42a7fe98c07f07db2fce07b59659135fd44dd',
        status: 'Ready'
      }
    ],
    evidence: [
      {
        id: 'EV-0142-1',
        occurredAt: '2026-07-10T08:32:00Z',
        action: 'Request created',
        actor: 'Branch operator',
        detail: 'Tenant and actor context captured.'
      },
      {
        id: 'EV-0142-2',
        occurredAt: '2026-07-10T08:42:00Z',
        action: 'Review approved',
        actor: 'Cash operations reviewer',
        detail: 'Document version pinned for signing.'
      }
    ]
  },
  {
    id: 'REQ-2026-0143',
    serviceType: 'CashDelivery',
    applicant: 'West Regional Pharmacy and Healthcare Distribution Network',
    branch: 'Lviv Operations Branch',
    requestedFor: '2026-07-16T07:00:00Z',
    status: 'Draft',
    owner: 'Maksym P.',
    updatedAt: '2026-07-10T08:18:00Z',
    expectedSigner: 'Maksym Petrenko',
    nextAction: 'Complete required fields and attach the delivery schedule.',
    documents: [
      {
        id: 'DOC-0143-A',
        name: 'Cash delivery schedule',
        versionId: 'd8c64b7e-04cb-496d-8214-c97a4fe72a95',
        versionHash: '83bc7f0cb1f61549b445a06a2675a62b21a5fb0225afab62c67cdfcf72d10c20',
        status: 'RequiresReview'
      }
    ],
    evidence: []
  },
  {
    id: 'REQ-2026-0144',
    serviceType: 'CashCollection',
    applicant: 'Metro Market Group',
    branch: 'Dnipro Branch 07',
    requestedFor: '2026-07-15T14:00:00Z',
    status: 'InReview',
    owner: 'Iryna S.',
    updatedAt: '2026-07-10T07:55:00Z',
    expectedSigner: 'Iryna Shevchenko',
    nextAction: 'Wait for risk review of the collection route.',
    documents: [
      {
        id: 'DOC-0144-A',
        name: 'Collection route request',
        versionId: '2fc4a0f7-8c3f-42e5-95e9-64fd19839019',
        versionHash: '1e0f8f1a4edce1554a4c04fcc5f81a3e11e5494fff3f8229f4dcb8e60bb92d2d',
        status: 'RequiresReview'
      }
    ],
    evidence: [
      {
        id: 'EV-0144-1',
        occurredAt: '2026-07-10T07:55:00Z',
        action: 'Submitted for review',
        actor: 'Branch operator',
        detail: 'Risk review requested.'
      }
    ]
  },
  {
    id: 'REQ-2026-0145',
    serviceType: 'CashDelivery',
    applicant: 'South Manufacturing Campus',
    branch: 'Odesa Corporate Branch',
    requestedFor: '2026-07-17T06:30:00Z',
    status: 'Signing',
    owner: 'Andrii B.',
    updatedAt: '2026-07-10T07:33:00Z',
    expectedSigner: 'Andrii Bondarenko',
    nextAction: 'Complete the active provider signing session.',
    documents: [
      {
        id: 'DOC-0145-A',
        name: 'Cash delivery authorization',
        versionId: 'b8593f92-8180-46c9-a6cf-a171840ab0ad',
        versionHash: '3e809ff714b919a81f154c22789966d308fe3dc77dfcd197166a349512d231ef',
        status: 'Ready'
      }
    ],
    evidence: []
  },
  {
    id: 'REQ-2026-0146',
    serviceType: 'CashCollection',
    applicant: 'Central Fuel Stations',
    branch: 'Poltava Branch',
    requestedFor: '2026-07-14T18:00:00Z',
    status: 'Submitted',
    owner: 'Nadia T.',
    updatedAt: '2026-07-10T06:48:00Z',
    expectedSigner: 'Nadia Tkachenko',
    nextAction: 'No action. Provider verification evidence is available.',
    documents: [
      {
        id: 'DOC-0146-A',
        name: 'Collection request and route manifest',
        versionId: 'af80bd21-2360-4239-9ea6-f150d5eddb3d',
        versionHash: '78c504646e47b47b88e7cb8619f41411eed7a705bf7213e7c2fe6eaad633e2f4',
        status: 'Ready'
      }
    ],
    evidence: [
      {
        id: 'EV-0146-1',
        occurredAt: '2026-07-10T06:48:00Z',
        action: 'Provider signature verified',
        actor: 'External signing provider',
        detail: 'Verification result attached to the immutable version.'
      }
    ]
  },
  {
    id: 'REQ-2026-0147',
    serviceType: 'CashDelivery',
    applicant: 'East Logistics Terminal',
    branch: 'Kharkiv Recovery Branch',
    requestedFor: '2026-07-18T11:00:00Z',
    status: 'Failed',
    owner: 'Serhii M.',
    updatedAt: '2026-07-10T06:12:00Z',
    expectedSigner: 'Serhii Melnyk',
    nextAction: 'Review the provider failure and start a new signing session.',
    documents: [
      {
        id: 'DOC-0147-A',
        name: 'Emergency cash delivery authorization',
        versionId: '067d55ef-bcef-4d3b-8de5-944bd439ab9b',
        versionHash: '64452819a90a95fc35d4e5af19377ae33728288cd51181ac4b0dcc0e499007ad',
        status: 'Ready'
      }
    ],
    evidence: [
      {
        id: 'EV-0147-1',
        occurredAt: '2026-07-10T06:12:00Z',
        action: 'Signing session failed',
        actor: 'External signing provider',
        detail: 'Provider returned a retryable failure.'
      }
    ]
  }
];

export function createRequestFixtures(): CashRequestDetail[] {
  return structuredClone(fixtures);
}
