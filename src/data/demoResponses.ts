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
    prompt: "Review the copy for the new design of the Annual Benefit Statement document.",
    involvedAgents: ["MASTER_AGENT", "COMPLIANCE_AGENT", "PRODUCT_AGENT"],
    activitySteps: [
      "Routing to COMPLIANCE AGENT",
      "Cross-referencing internal standards",
      "Consulting PRODUCT AGENT",
      "Generating review report",
    ],
    response: `The copy for the new design has been reviewed, and it aligns with internal standards and guidelines. No issues were identified, and the content is suitable for use in the updated design.`,
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
