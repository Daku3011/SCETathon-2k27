/**
 * SCETATHON 2.0 — Problem Statements & Themes
 *
 * Official Hackathon Themes:
 *   1. SMART & SUSTAINABLE CAMPUS AND CITIES
 *   2. AI FOR HUMANITY: HEALTH, SAFETY & ACCESSIBILITY
 *   3. INDUSTRY 5.0: INTELLIGENT MANUFACTURING & RESOURCE INNOVATION
 *
 * Spearheaded jointly by the Departments of Computer Engineering
 * and Chemical Engineering at Sarvajanik College of Engineering & Technology (SCET).
 */

export interface ThemeDef {
  id: string;
  code: string;
  name: string;
  short: string;
  tagline: string;
  color: "lime" | "coral" | "lilac";
  accentHex: string;
  bgHex: string;
  borderHex: string;
  icon: string;
  description: string;
  domains: string[];
}

export const themes: ThemeDef[] = [
  {
    id: "01",
    code: "TRACK-A",
    name: "SMART & SUSTAINABLE CAMPUS AND CITIES",
    short: "Smart Campus & Cities",
    tagline: "Urban Intelligence, Resource Conservation & Green Microgrids",
    color: "lime",
    accentHex: "#D8FF50",
    bgHex: "rgba(216, 255, 80, 0.05)",
    borderHex: "rgba(216, 255, 80, 0.25)",
    icon: "🏙️",
    description:
      "Design intelligent systems for urban infrastructure, campus operations, energy efficiency, water conservation, circular waste, and sustainable living — from IoT telemetry to green microgrids.",
    domains: [
      "IoT & Edge Telemetry",
      "Smart Energy & Solar Grids",
      "Circular Waste Management",
      "Water Leakage & Purity",
      "Urban Mobility",
    ],
  },
  {
    id: "02",
    code: "TRACK-B",
    name: "AI FOR HUMANITY: HEALTH, SAFETY & ACCESSIBILITY",
    short: "AI for Humanity",
    tagline: "Empowering Lives Through Humane, Accessible Technology",
    color: "coral",
    accentHex: "#FF7358",
    bgHex: "rgba(255, 115, 88, 0.05)",
    borderHex: "rgba(255, 115, 88, 0.25)",
    icon: "🧬",
    description:
      "Leverage artificial intelligence, computer vision, and assistive technology to solve critical challenges in healthcare delivery, public safety, emergency hazard warning, and universal accessibility.",
    domains: [
      "Assistive Technologies",
      "Healthcare AI & Triage",
      "Campus & Industrial Safety",
      "Disaster Early Warning",
      "Universal Accessibility",
    ],
  },
  {
    id: "03",
    code: "TRACK-C",
    name: "INDUSTRY 5.0: INTELLIGENT MANUFACTURING & RESOURCE INNOVATION",
    short: "Industry 5.0",
    tagline: "Human-Centric Automation, Process Engineering & Material Science",
    color: "lilac",
    accentHex: "#C9C5FD",
    bgHex: "rgba(201, 197, 253, 0.05)",
    borderHex: "rgba(201, 197, 253, 0.25)",
    icon: "⚙️",
    description:
      "Reimagine modern industry at the intersection of bits and atoms: human-machine collaboration, smart chemical reactor optimization, digital twins, predictive maintenance, and green solvent lifecycle engineering.",
    domains: [
      "Chemical Process Twins",
      "Predictive Maintenance",
      "Green Solvents & Materials",
      "Industrial Automation",
      "Resource Optimization",
    ],
  },
];

export const problems = [
  // ── Theme 01: SMART & SUSTAINABLE CAMPUS AND CITIES ──
  [
    "Campus Pulse & Spatial Triage",
    "SMART & SUSTAINABLE CAMPUS AND CITIES",
    "Intermediate",
    "Help facilities teams triage campus maintenance, electrical surges, and infrastructure breakdown reports using a real-time spatial digital twin.",
    "Interactive campus map flagging high-priority issues with automated technician routing and resolution telemetry.",
    "MapLibre GL, React, Node.js, TimescaleDB",
    "Strictly redact personal student location data; support offline caching for low-connectivity campus basements.",
  ],
  [
    "Water Watch & Flow Anomaly Detection",
    "SMART & SUSTAINABLE CAMPUS AND CITIES",
    "Intermediate",
    "Locate abnormal water consumption, pipe leakage, and storage tank overflows across academic and laboratory blocks using simulated ultrasonic flow sensor feeds.",
    "Real-time anomaly detection dashboard with automatic valve shutoff simulation and daily conservation reports.",
    "Python, Time-Series ML, MQTT, Next.js",
    "Must maintain high precision even with sporadic, noisy sensor telemetry and intermittent network drops.",
  ],
  [
    "Zero-Waste Cycle & Smart Segregation",
    "SMART & SUSTAINABLE CAMPUS AND CITIES",
    "Advanced",
    "Automate campus waste classification at disposal points and optimize daily collection routes based on live fill-level telemetry and organic compost tracking.",
    "Computer vision classifier on edge hardware coupled with dynamic route planner for campus green maintenance trucks.",
    "YOLOv8 Edge, Raspberry Pi, Python, WebSockets",
    "Inference must run locally under 350ms per item with minimal energy footprint.",
  ],

  // ── Theme 02: AI FOR HUMANITY: HEALTH, SAFETY & ACCESSIBILITY ──
  [
    "Access Atlas: Step-Free Campus Navigator",
    "AI FOR HUMANITY: HEALTH, SAFETY & ACCESSIBILITY",
    "Advanced",
    "Help wheelchair users, visually impaired visitors, and injured students navigate multi-floor campus complexes with tactile audio cues and step-free pathfinding.",
    "Mobile-accessible route planner factoring in ramps, operational elevators, corridor width, and temporary obstacle alerts.",
    "OpenStreetMap, Graphhopper, Web Audio API, TypeScript",
    "Zero external cloud dependencies for basic indoor routing; must work fully offline on low-end mobile devices.",
  ],
  [
    "Hazard Sentinel: Chemical & Fire Warning",
    "AI FOR HUMANITY: HEALTH, SAFETY & ACCESSIBILITY",
    "Advanced",
    "Detect laboratory smoke, unusual exothermic thermal flares, and chemical plume leaks using CCTV camera feeds before traditional fire alarms trigger.",
    "Early-warning vision system with automated evacuation route broadcast and hazardous zone quarantine alerts.",
    "OpenCV, PyTorch, RTSP streaming, Web Push",
    "Must reject false positives from normal laboratory Bunsen burners and ambient chemical steam.",
  ],
  [
    "Peer Circuit: Student Mentorship Network",
    "AI FOR HUMANITY: HEALTH, SAFETY & ACCESSIBILITY",
    "Starter",
    "Match students seeking academic, mental health, or project guidance with verified peer mentors while preserving complete user anonymity.",
    "Encrypted consent-driven matching hub with skill taxonomy tagging, session scheduling, and emergency counselor escalations.",
    "Next.js, PostgreSQL (RLS), WebCrypto API, Radix UI",
    "End-to-end anonymity; zero identifiable personal details stored on unencrypted storage tables.",
  ],

  // ── Theme 03: INDUSTRY 5.0: INTELLIGENT MANUFACTURING & RESOURCE INNOVATION ──
  [
    "Chemical Reactor Digital Twin",
    "INDUSTRY 5.0: INTELLIGENT MANUFACTURING & RESOURCE INNOVATION",
    "Advanced",
    "Simulate exothermic batch and continuous stirred-tank reactors (CSTR) to optimize chemical yield while preventing thermal runaway.",
    "Digital twin dashboard showing live temperature profiles, stoichiometric conversion rates, and automated cooling jacket adjustment parameters.",
    "Python, SciPy / Differential Equations, WebAssembly, Plotly",
    "Physical conservation laws (mass and energy balances) must strictly bound all neural network predictions.",
  ],
  [
    "VibroSense: Predictive Motor Diagnostics",
    "INDUSTRY 5.0: INTELLIGENT MANUFACTURING & RESOURCE INNOVATION",
    "Intermediate",
    "Analyze multi-axis vibration, temperature, and acoustic sensor signals from industrial pumps and centrifuge units to detect bearing fatigue before failure.",
    "Edge-computable Fast Fourier Transform (FFT) analysis engine displaying remaining useful life (RUL) estimates and maintenance alerts.",
    "FastAPI, NumPy / Scipy FFT, InfluxDB, Chart.js",
    "Bandwidth-constrained design: sensor nodes only transmit spectral summaries, not raw high-frequency waveforms.",
  ],
  [
    "EcoSolvent: Green Material Lifecycle Index",
    "INDUSTRY 5.0: INTELLIGENT MANUFACTURING & RESOURCE INNOVATION",
    "Starter",
    "Assist process engineers in selecting environmentally benign, non-toxic, and recyclable solvents for chemical synthesis and manufacturing.",
    "Searchable comparative matrix scoring chemical toxicity, EHS hazards, boiling point energy costs, and circular recovery feasibility.",
    "TypeScript, React, SQLite, Tailwind CSS",
    "Include verified chemical registry numbers (CAS) and standardized safety data sheet (SDS) references.",
  ],
].map(
  (
    [title, category, difficulty, description, outcome, tech, constraint],
    i,
  ) => ({
    title,
    category,
    difficulty,
    description,
    outcome,
    tech,
    constraint,
    id: String(i + 1).padStart(2, "0"),
    slug: title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-").replace(/-$/, ""),
  }),
);
