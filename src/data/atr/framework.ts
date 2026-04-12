export type AtrDocument = {
  id: "foundation" | "execution" | "delivery" | "governance";
  title: string;
  subtitle: string;
  summary: string;
  pdfPath: string;
  principles: string[];
  controls: string[];
  deploymentPatterns: string[];
  scalingAndAiGovernance: string[];
};

export const atrDocuments: AtrDocument[] = [
  {
    id: "foundation",
    title: "Foundational Architecture",
    subtitle: "GEM & ATR Foundation",
    summary:
      "Defines the baseline enterprise posture for a unified cyber and physical security ecosystem with governance-ready controls.",
    pdfPath: "/docs/atr/01_GEM_ATR_Foundation_Architecture.pdf",
    principles: [
      "Unified cybersecure digital ecosystem baseline",
      "Investor-grade governance posture from day one",
      "Security and governance as first-class architecture layers",
    ],
    controls: [
      "Zero Trust operating model",
      "Role and attribute based access control",
      "Encryption at rest and in transit",
      "Continuous monitoring integration",
    ],
    deploymentPatterns: [
      "Control-first architecture sequencing",
      "Policy enforcement before feature expansion",
      "Foundational telemetry integration",
    ],
    scalingAndAiGovernance: [
      "Governance-ready baseline for future domain expansion",
      "Policy traceability for scaling decisions",
      "Control ownership defined early for growth",
    ],
  },
  {
    id: "execution",
    title: "Execution and Build Architecture",
    subtitle: "Runtime and Build Structure",
    summary:
      "Translates strategy into delivery architecture through API front doors, containerized services, and event-driven automation.",
    pdfPath: "/docs/atr/02_GEM_ATR_Execution_Architecture.pdf",
    principles: [
      "API Gateway fronting all services",
      "Containerized microservice boundaries",
      "Event-driven automation backbone",
      "Managed cloud deployment strategy",
    ],
    controls: [
      "Privilege escalation prevention",
      "Event isolation and dead-letter queue handling",
      "Audit logs for financial workflows",
      "Security scanning in CI/CD pipelines",
    ],
    deploymentPatterns: [
      "Kubernetes or Serverless operational model",
      "Observability-first deployment baseline",
      "Structured service ownership boundaries",
    ],
    scalingAndAiGovernance: [
      "Modular services for horizontal scaling",
      "Composable integration model for new capabilities",
      "Execution guardrails tied to governance controls",
    ],
  },
  {
    id: "delivery",
    title: "Delivery, Automation and Deployment Framework",
    subtitle: "Release and Operational Delivery",
    summary:
      "Defines release safety, workflow automation, and governance ownership across frontend, backend, and infrastructure teams.",
    pdfPath: "/docs/atr/03_GEM_ATR_Delivery_Deployment_Framework.pdf",
    principles: [
      "Event-driven onboarding workflows",
      "Subscription and billing trigger automation",
      "Compliance escalation by risk thresholds",
    ],
    controls: [
      "Automated security validation in delivery pipelines",
      "Post-deployment monitoring and anomaly checks",
      "Controlled rollback and recovery procedures",
    ],
    deploymentPatterns: [
      "Blue/Green release strategy",
      "Canary deployment controls",
      "Infrastructure ownership mapping by domain",
      "Recurring security review cycles",
    ],
    scalingAndAiGovernance: [
      "Agent task governance for operational consistency",
      "Backend domain isolation for controlled expansion",
      "Delivery controls mapped to compliance obligations",
    ],
  },
  {
    id: "governance",
    title: "Enterprise Governance and Scaling",
    subtitle: "Long-Term Control and Growth Model",
    summary:
      "Establishes architecture governance for global scale, compliance traceability, and responsible AI operations.",
    pdfPath: "/docs/atr/04_GEM_ATR_Enterprise_Governance_and_Scaling.pdf",
    principles: [
      "Domain-driven bounded contexts",
      "API-first interoperability",
      "Immutable audit trail enforcement",
      "Version-controlled service contracts",
    ],
    controls: [
      "Data classification and retention control model",
      "Encryption and privacy-aligned data handling",
      "Financial traceability requirements",
      "Regional compliance module support",
    ],
    deploymentPatterns: [
      "Horizontal autoscaling service topology",
      "Multi-region deployment planning",
      "Currency abstraction for global operations",
    ],
    scalingAndAiGovernance: [
      "Human-in-the-loop decision controls",
      "Transparent decision logging",
      "Model version tracking and auditability",
      "Bias monitoring and governance reviews",
    ],
  },
];

export const atrControlMatrixHighlights = [
  {
    title: "Identity and Access Integrity",
    detail:
      "Zero Trust access patterns with role and attribute scoping protect privileged workflows.",
  },
  {
    title: "Immutable Audit Backbone",
    detail:
      "Append-only evidence posture improves non-repudiation and supports external assurance requirements.",
  },
  {
    title: "Deployment Safety by Design",
    detail:
      "Blue/Green and Canary release controls reduce operational blast radius during critical updates.",
  },
  {
    title: "Scalable Governance Model",
    detail:
      "Domain boundaries, regional compliance controls, and AI governance rules support controlled expansion.",
  },
];
