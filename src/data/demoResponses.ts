export interface DemoScenario {
  id: number;
  prompt: string;
  response: string;
  involvedAgents: string[];
  activitySteps: string[];
}

export const demoScenarios: DemoScenario[] = [
  {
    id: 1,
    prompt: "What is the ISA transfer process?",
    involvedAgents: ["MASTER_AGENT", "OPS_AGENT"],
    activitySteps: [
      "Routing to OPS AGENT",
      "Retrieving internal SOPs",
      "Generating response",
    ],
    response: `1. Customer initiates transfer in OSS
2. Ceding provider receives signed transfer form
3. Ceding provider sends funds and Subscription History form
4. Ops team adds funds to accounts and update annual allowance
5. Funds are automatically invested as per customer's instructions`,
  },
  {
    id: 2,
    prompt: "Review the new 'Instant Access Savings' product page for Consumer Duty compliance.",
    involvedAgents: ["MASTER_AGENT", "COMPLIANCE_AGENT", "PRODUCT_AGENT"],
    activitySteps: [
      "Routing to COMPLIANCE AGENT",
      "Cross-referencing Consumer Duty regulations",
      "Consulting PRODUCT AGENT",
      "Generating compliance report",
    ],
    response: `ANALYSIS: Consumer Duty Compliance Review

PRINCIPLE: Good Outcomes
CROSS-CUTTING RULE: Act in good faith — PASS
CROSS-CUTTING RULE: Avoid foreseeable harm — PASS
CROSS-CUTTING RULE: Enable and support retail customers — ACTION REQUIRED

RECOMMENDATION: The term 'instant' may be misleading if transfers
take > 5 minutes. Change copy to 'Fast Access' and add microcopy:
'Transfers typically complete within minutes.'`,
  },
  {
    id: 3,
    prompt: "Generate technical specifications for a new 2-Factor Authentication feature.",
    involvedAgents: ["MASTER_AGENT", "INCIDENT_AGENT"],
    activitySteps: [
      "Routing to INCIDENT AGENT",
      "Retrieving security documentation",
      "Generating technical specifications",
    ],
    response: `FEATURE: Two-Factor Authentication (2FA)

METHOD: TOTP via authenticator application
FLOW:
  1. User enters username and password
  2. System validates credentials against auth service
  3. System presents 2FA code input screen
  4. User enters 6-digit code from authenticator
  5. System validates code against stored secret key

DEPENDENCIES:
  — Backend service for secret key generation
  — Frontend component library for input form
  — Database migration: add 2fa_secret, 2fa_enabled columns`,
  },
];
