export const event = {
  name: "SCETATHON 2.0",
  tagline: "Ideas · Innovation · Impact",
  college: "Sarvajanik College of Engineering & Technology",
  university: "Sarvajanik University",
  venue: "SCET Campus, Dr. R.K. Desai Marg, Athwalines, Surat, Gujarat 395001",
  city: "Surat",
  email: "scetathon@scet.ac.in",
  phone: "+91 261 2240146",
  socials: [
    { label: "Instagram", url: "https://www.instagram.com/scetsurat_official" },
    { label: "LinkedIn", url: "https://www.linkedin.com/school/sarvajanik-college-of-engineering-&-technology" },
  ] as { label: string; url: string }[],
  site: "https://scetathon-demo.vercel.app",
  form: "",
  round1: "",
  start: "2027-01-28",
  end: "2027-01-29",
  kickoff: "2027-01-28T11:00:00+05:30",
  displayDate: "28–29 January 2027",
  datesFormatted: "28–29 JAN 2027",
  team: [3, 5],
  hours: 24,
  rounds: 2,
  problemCount: 8,
  showResults: false,
  showWinners: false,
  resultsOpen: false,
  winnersOpen: false,
  registrationOpen: false,
  nationalBadge: "24-HOUR NATIONAL-LEVEL HACKATHON",
  // departments: [
  //   {
  //     name: "Computer Engineering",
  //     short: "COMP // ENG",
  //     focus: "Intelligent Systems, AI/ML, Cloud & Embedded Systems",
  //     icon: "💻",
  //   },
  //   {
  //     name: "Chemical Engineering",
  //     short: "CHEM // ENG",
  //     focus: "Sustainable Processes, Green Chemistry, Clean Energy & Sensors",
  //     icon: "🧪",
  //   },
  // ],
  interdisciplinaryHighlight:
    "Spearheaded jointly by the Departments of Computer Engineering & Chemical Engineering at SCET, bridging computational intelligence with real-world material and process engineering.",
  hero: "A 24-hour national student hackathon at SCET, Surat, bridging computer engineering and chemical process innovations into functional prototypes.",
  intro:
    "SCETATHON 2.0 brings student squads from across the country to Sarvajanik College of Engineering & Technology, Surat. Spearheaded jointly by the Departments of Computer Engineering, Chemical Engineering and Electronics & Communication, teams collaborate across code and physical systems to turn pressing campus, climate, and industrial challenges into working hardware and software solutions over 24 continuous hours.",
  factsLine: "24 hours · teams of 3–5 · eight problem statements",
  prizesNotice: "Awards and category bounties will be announced upon jury confirmation.",
  sponsorsNotice: "Official community and industry partners for the 2027 edition will be published here upon confirmation.",
  colophon: {
    title: "Colophon & Artistic Influences",
    text: "Art directed as a campus poster unfolding into an event programme. Linework draws inspiration from the Mandana tradition of geometric floor and wall art (doubled contours, comb strokes and chalk diamonds on earth ground). Hosted at Sarvajanik College of Engineering & Technology (SCET), Surat.",
    illustratorCredit: "Original breadboard illustration and Mandana linework hand-authored for the SCETATHON 2027 programme.",
  },
  features: [
    ["Real-World Innovation", "Tackle high-impact challenge tracks mapped to urban, industrial, and social needs."],
    ["Cross-Discipline Synergy", "Assemble squads blending software engineering, hardware design, and product thinking."],
    ["Prestigious Recognition", "Present directly to senior tech leaders, venture builders, and academic juries."],
    ["Hands-On Mentorship", "Receive round-the-clock guidance from seasoned industry practitioners and domain researchers."],
  ],
  prizes: [
    { place: "1st Place", amount: null, title: "Champion Squad", tba: true },
    { place: "2nd Place", amount: null, title: "First Runner-Up", tba: true },
    { place: "3rd Place", amount: null, title: "Second Runner-Up", tba: true },
  ] as { place: string; amount: number | null; title?: string; tba?: boolean }[],
  sponsors: [
    ["Title", "To be announced"],
    ["Co-Sponsor", "To be announced"],
    ["Platform", "To be announced"],
    ["Ecosystem", "To be announced"],
  ],
  faq: [
    [
      "Who can join?",
      "Students enrolled in undergraduate, postgraduate, or diploma engineering and polytechnic programmes across recognized colleges and universities.",
    ],
    [
      "How are teams formed?",
      "Squads must have 3 to 5 members. Cross-department and interdisciplinary teams (e.g. software + electronics + design) are encouraged.",
    ],
    [
      "What should we bring?",
      "Valid college ID cards, laptops, chargers, hardware components or sensors needed for your build, and basic personal essentials.",
    ],
    [
      "Is there an entry fee?",
      "No. Participation in SCETATHON is free for all shortlisted teams. Meals, power, campus workspace, and high-speed network are provided.",
    ],
    [
      "How does evaluation work?",
      "Projects are evaluated by panels of academic faculty and senior industry practitioners on innovation, technical depth, prototype completeness, and pitch clarity.",
    ],
    [
      "What if our prototype isn't complete?",
      "Hackathons value working proof-of-concepts, clear architecture, and demonstrable progress. Present your functional core and outline the roadmap.",
    ],
  ] as [string, string][],
  milestones: [
    {
      name: "Round details",
      dateLabel: "To be announced",
      description: "The organizers will publish round dates and submission deadlines here.",
      tba: true,
    },
    {
      name: "Campus Check-in & Kickoff",
      dateLabel: "28 Jan 2027 · 11:00 AM IST",
      description: "Shortlisted squads report to the SCET Surat campus, receive credentials, and initiate the 24-hour build.",
      tba: false,
    },
    {
      name: "24-Hour Prototype Build & Evaluation",
      dateLabel: "28–29 Jan 2027",
      description: "Continuous on-campus engineering sprint, technical mentor checkpoints, and final live prototype demonstration.",
      tba: false,
    },
  ],
  agenda: [
    ["11:00 AM", "Kickoff & Check-in"],
    ["02:00 PM", "Architecture & Mentor Checkpoint"],
    ["08:00 PM", "Midway Prototype Review"],
    ["12:00 AM", "Midnight Build Sprint"],
    ["08:00 AM", "Final Integration & Testing"],
    ["11:00 AM", "24-Hour Project Freeze"],
    ["12:30 PM", "Jury Demos & Awards"],
  ],
  rules: [
    [
      "Eligibility",
      "Open to bonafide college and university students with valid institutional identification.",
    ],
    [
      "Team Composition",
      "3 to 5 members per squad. Each squad must nominate one primary student contact.",
    ],
    [
      "Originality & Integrity",
      "All code and prototypes developed during the 24 hours must be original work created on site. Open-source tools and public APIs are permitted with clear attribution.",
    ],
    [
      "Hardware Safety",
      "Teams building IoT, robotics, or embedded systems must adhere strictly to SCET campus electrical and lab safety protocols.",
    ],
  ],
  criteria: [
    ["Innovation & Originality", 25],
    ["Technical Depth & Feasibility", 25],
    ["Practical Impact & Usefulness", 20],
    ["Completeness of Working Prototype", 20],
    ["Pitch Clarity & Demonstration", 10],
  ] as [string, number][],
  judging: [
    "Online round abstract and feasibility review",
    "On-campus mentor checkpoints and code evaluation",
    "Final live prototype demonstration before industry jury",
  ],
  crew: [
    ["Patron & Leadership", "Sarvajanik University & SCET Administration"],
    ["Faculty Coordinators", "Departments of Computer Engineering & IT"],
    ["Student Executive Leads", "Overall Schedule, Technical Ops, and Participant Experience"],
    ["Infrastructure & Network", "Campus WiFi, High-Power Labs, and Venue Logistics"],
  ],
  teams: [] as { name: string; track: string }[],
  winners: [] as { name: string; project: string; photo: string }[],
  archive: [
    [
      "novex.jpeg",
      "Team Novex",
      "SCETATHON 1.0 Winner · Computer Engineering · Swach App",
    ],
  ] as [string, string, string][],
  map: "https://maps.google.com/maps?q=Sarvajanik+College+of+Engineering+and+Technology+Surat",
};

export const navigation = [
  ["Programme", "#programme"],
  ["Problems", "#problems"],
  ["Gallery", "#gallery"],
  ["Register", "#register"],
];

export const drawerSecondaryNav = [
  ["Rules", "/guidelines"],
  ["Evaluation", "/evaluation"],
  ["FAQ", "#faq"],
  ["Contact", "/about#contact"],
];

export const publicationFlags = {
  results: event.showResults || event.resultsOpen,
  winners: event.showWinners || event.winnersOpen,
} as const;

export function isPublishedRoute(pathname: string) {
  if (pathname === "/results") return publicationFlags.results;
  if (pathname === "/winners") return publicationFlags.winners;
  return true;
}

export const copy = {
  textScetSURAT: "SCET / SURAT",
  textScetathon2027: "SCETATHON 2.0 / 2027",
  textAboutSCETATHON: "About SCETATHON",
  textHowJudgingWorks: "How judging works",
  textScetathonARCHIVE: "SCETATHON / ARCHIVE",
  text2026Gallery: "SCETATHON 1.0 / past edition",
  textGuidelinesRules: "Guidelines & rules",
  textProblemStatements: "Problem statements",
  textQualifiedTeams: "Qualified teams",
  textWinners: "Winners",
  textEventPartners: "Event partners",
  textEventTimeline: "Event timeline",
  textFaq: "FAQ",
  textProgramme: "Programme",
  textScetCrest: "Sarvajanik College of Engineering & Technology Crest",
  textEventLogo: "SCETATHON 2.0 Official Wordmark",
  textSkipToContent: "Skip to content",
  textMenu: "Menu",
  textClose: "Close",
  textBackToTop: "Back to top ↑",
  textExploreProblems: "Explore problems",
  textRegister: "Register",
  textRegistrationPreview: "Registration preview",
  textRoundDetailsTBA: "Round details · To be announced",
  tbaDefaultRevealText: "The organizers will publish round dates and submission deadlines here.",
  textClearFilters: "Clear filters",
  textComingSoon: "Coming soon",
  textComingSOON: "COMING SOON",
  textAwaitingAnnouncement: "Awaiting Announcement",
  textNoMatchingChallenges: "No matching challenges found.",
  textChooseThisProblem: "Choose this problem",
  textProposedGuidelinesFor2027OrganizersWillConfirm:
    "The 2027 guidelines establish rules for participation, ethics, and project demonstration.",
  textRuleSections: "Rule sections",
  textProposedWEIGHTS: "EVALUATION CRITERIA & WEIGHTS",
  textStep0: "PHASE 0",
  textQualifiedTeamsWillAppearAfterRound1:
    "The organizers will publish qualified teams here once Round 1 evaluations conclude.",
  textFindATeam: "Find a team",
  textTrack: "Track",
  textLoadingTeams: "Loading teams…",
  textQualifiedTeam: "Qualified team",
  textNoMatchingTeams: "No matching teams found.",
  textThe2027PodiumAndTeamGalleryWill:
    "The 2027 podium and winning projects gallery will be published here after the closing ceremony.",
  textPlace: "PLACE ",
  textIsAConstituentCollegeOfSarvajanikUniversity:
    " is a constituent college of Sarvajanik University in Surat established in 1995. ",
  textOrganizingTeam: "Organizing Committee",
  textOrganizingROLE: "ROLE",
  textContactTheOrganizers: "Contact the Organizers",
  textYourName: "Your Name",
  textEmail: "Email",
  textMessage: "Message",
  textOpenEmailDraft: "Send Message ↗",
  textScetCampusMap: "SCET Campus Map",
  textIllustrativeChallengesForThe2027EditionFinal:
    "Explore challenge statements across smart campus operations, climate resilience, and student community tooling.",
  textSearchProblemStatements: "Search Problem Statements",
  textSearchByTitleTopicOrKeyword: "Search by title, domain, or keyword…",
  textPs: "PS-",
  textNoMatchingChallengesTryAnotherKeywordOr:
    "No matching challenges found. Try another search keyword.",
  textFullChallengeBrief: "Full Challenge Brief",
  textCategory: "Domain",
  textDifficulty: "Complexity Level",
  textRegistration: "REGISTRATION // SCETATHON 2.0",
  textRegistrationOpensSoon: "Registration Opens Soon",
  textTheOfficialFormAndDeadlineWillAppear:
    "SCETATHON 2.0 takes place on 28–29 January 2027. The official registration portal will open shortly.",
  textGotIt: "Understood",
};
