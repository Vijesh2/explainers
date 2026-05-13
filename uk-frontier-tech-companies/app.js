const companies = [
  {
    name: "ElevenLabs",
    url: "https://elevenlabs.io/",
    theme: "frontier-ai",
    category: "Benchmark company · AI audio",
    signal: "$500m Series D; reported $11bn valuation",
    why: "A London-founded voice AI company that has already broken out commercially across speech generation, dubbing, conversational agents and audio workflows.",
    capital: 100,
    sovereignty: 78,
    spillover: 90,
    anchor: 82,
  },
  {
    name: "Ineffable Intelligence",
    url: "https://www.ineffable.ai/",
    theme: "frontier-ai",
    category: "Frontier AI",
    signal: "$1.1bn seed; reported $5.1bn valuation",
    why: "A UK-headquartered lab led by David Silver, focused on self-learning systems that learn through experience rather than only from human-generated data.",
    capital: 96,
    sovereignty: 96,
    spillover: 96,
    anchor: 92,
  },
  {
    name: "Recursive Superintelligence",
    url: "https://www.recursive.com/",
    theme: "frontier-ai",
    category: "Recursive AI",
    signal: "Reported at least $500m raised; $4bn pre-money valuation",
    why: "A London-incorporated attempt to automate parts of the AI development pipeline itself, making it one of the highest-upside and highest-uncertainty entries.",
    capital: 94,
    sovereignty: 86,
    spillover: 92,
    anchor: 78,
  },
  {
    name: "Isomorphic Labs",
    url: "https://www.isomorphiclabs.com/",
    theme: "bio-health",
    category: "AI drug design",
    signal: "$2.1bn Series B",
    why: "Translates the DeepMind and AlphaFold lineage into AI-first drug design, where models, proprietary workflows and therapeutic assets can compound together.",
    capital: 98,
    sovereignty: 82,
    spillover: 90,
    anchor: 84,
  },
  {
    name: "Wayve",
    url: "https://wayve.ai/",
    theme: "physical",
    category: "Autonomy",
    signal: "$1.05bn Series C",
    why: "Develops embodied AI for autonomous driving, with the potential to make the UK a serious base for real-world autonomy rather than only software research.",
    capital: 92,
    sovereignty: 82,
    spillover: 88,
    anchor: 86,
  },
  {
    name: "Fractile",
    url: "https://www.fractile.ai/",
    theme: "ai-infra",
    category: "AI chips",
    signal: "Reported $220m Series B; £100m UK expansion plan",
    why: "Targets the inference bottleneck by moving memory and compute closer together, a route to cheaper AI deployment and less dependence on incumbent GPU stacks.",
    capital: 80,
    sovereignty: 90,
    spillover: 86,
    anchor: 88,
  },
  {
    name: "Isembard",
    url: "https://www.isembard.com/",
    theme: "physical",
    category: "Advanced manufacturing",
    signal: "$50m Series A",
    why: "Uses software and AI to operate high-precision component factories for aerospace, defence, robotics and energy, where capacity is strategically scarce.",
    capital: 66,
    sovereignty: 86,
    spillover: 84,
    anchor: 84,
  },
  {
    name: "Rivan Industries",
    url: "https://rivan.com/",
    theme: "physical",
    category: "Synthetic energy",
    signal: "£25m fundraise; prior £10m seed",
    why: "Vertically integrates direct air capture, electrolysis and reactor technology to produce synthetic natural gas for hard-to-electrify industrial demand.",
    capital: 60,
    sovereignty: 84,
    spillover: 82,
    anchor: 86,
  },
  {
    name: "Doubleword",
    url: "https://www.doubleword.ai/",
    theme: "ai-infra",
    category: "Enterprise AI infrastructure",
    signal: "$12m Series A",
    why: "Makes self-hosted AI inference easier for regulated enterprises that need control over models, data and deployment environments.",
    capital: 54,
    sovereignty: 74,
    spillover: 78,
    anchor: 72,
  },
  {
    name: "Callosum",
    url: "https://www.callosum.com/",
    theme: "ai-infra",
    category: "AI systems software",
    signal: "$10.25m funding; ARIA-backed work",
    why: "Builds orchestration for heterogeneous AI compute across chip architectures, a strategically important counterweight to single-stack dependence.",
    capital: 52,
    sovereignty: 88,
    spillover: 84,
    anchor: 80,
  },
  {
    name: "OpenBind",
    url: "https://openbind.uk/",
    theme: "bio-health",
    category: "Drug discovery data",
    signal: "Up to £8m DSIT backing",
    why: "Generates structural biology data at Diamond Light Source to support machine-learning models for structure-based drug design.",
    capital: 46,
    sovereignty: 76,
    spillover: 80,
    anchor: 90,
  },
  {
    name: "twig",
    url: "https://twig.bio/",
    theme: "bio-health",
    category: "Bioengineering",
    signal: "£3m seed; Sovereign AI compute support",
    why: "Combines AI, automation and wet-lab experimentation to engineer microbes for cleaner ingredient production through precision fermentation.",
    capital: 38,
    sovereignty: 66,
    spillover: 76,
    anchor: 78,
  },
  {
    name: "Prima Mente",
    url: "https://www.primamente.com/",
    theme: "bio-health",
    category: "BioAI",
    signal: "Sovereign AI compute support",
    why: "Works on biological foundation models and self-generated data, initially focused on the brain and neurological disease.",
    capital: 30,
    sovereignty: 72,
    spillover: 82,
    anchor: 76,
  },
  {
    name: "Cosine",
    url: "https://cosine.sh/",
    theme: "frontier-ai",
    category: "AI coding agents",
    signal: "500,000 reported GPU hours through Sovereign AI",
    why: "Builds AI software-engineering agents, with particular relevance for regulated or sovereign software environments.",
    capital: 32,
    sovereignty: 70,
    spillover: 78,
    anchor: 72,
  },
  {
    name: "General Reasoning",
    url: "https://www.gr.inc/",
    theme: "frontier-ai",
    category: "AI research",
    signal: "No disclosed funding amount found",
    why: "Works on reinforcement learning, multi-agent systems and long-horizon reasoning, all central problems for more capable AI agents.",
    capital: 22,
    sovereignty: 64,
    spillover: 80,
    anchor: 68,
  },
  {
    name: "Cursive",
    url: "https://www.cursive.ai/",
    theme: "frontier-ai",
    category: "Adaptive AI agents",
    signal: "Sovereign AI compute support",
    why: "A London AI research company working on agents that learn continuously from real-world use and models for behavioural prediction.",
    capital: 26,
    sovereignty: 68,
    spillover: 76,
    anchor: 74,
  },
];

const lensCopy = {
  capital: {
    title: "Disclosed capital signal",
    copy: "Large rounds and reported valuations show where investors see a chance to build globally important companies, but they do not measure UK capture on their own.",
    color: "#315f9f",
  },
  sovereignty: {
    title: "Sovereign capability",
    copy: "This lens emphasises companies that could reduce dependence on foreign platforms, compute stacks, energy inputs, industrial capacity or critical data.",
    color: "#b5572c",
  },
  spillover: {
    title: "Economy-wide spillovers",
    copy: "This lens highlights technologies that could raise productivity or capability across many sectors, even when the first product market is narrow.",
    color: "#1d7f6e",
  },
  anchor: {
    title: "UK anchoring",
    copy: "This lens favours companies with visible UK headquarters, facilities, public support, research roots, or infrastructure that could keep more value creation local.",
    color: "#6650a4",
  },
};

const themeNames = {
  all: "all themes",
  "frontier-ai": "frontier AI",
  "bio-health": "bio and health",
  "ai-infra": "AI infrastructure",
  physical: "physical economy",
};

const lensSelect = document.querySelector("#lens-select");
const themeSelect = document.querySelector("#theme-select");
const list = document.querySelector("#company-list");
const lensTitle = document.querySelector("#lens-title");
const lensCopyEl = document.querySelector("#lens-copy");
const lensKicker = document.querySelector("#lens-kicker");

function render() {
  const lens = lensSelect.value;
  const theme = themeSelect.value;
  const model = lensCopy[lens];
  const filtered = companies
    .filter((company) => theme === "all" || company.theme === theme)
    .sort((a, b) => b[lens] - a[lens]);

  lensTitle.textContent = model.title;
  lensCopyEl.textContent = model.copy;
  lensKicker.textContent = `Current lens: ${themeNames[theme]}`;

  list.innerHTML = "";
  filtered.forEach((company, index) => {
    const card = document.createElement("article");
    card.className = "company-card";
    card.innerHTML = `
      <div>
        <div class="company-meta">#${index + 1} · ${company.category}</div>
        <h3><a href="${company.url}" target="_blank" rel="noreferrer">${company.name}</a></h3>
        <p>${company.why}</p>
        <div class="tags" aria-label="Signals for ${company.name}">
          <span>${company.signal}</span>
          <span>${themeNames[company.theme]}</span>
        </div>
      </div>
      <div class="score-box" style="--score: ${company[lens]}; --score-color: ${model.color};">
        <span class="score-label">${model.title}</span>
        <div class="score-line" aria-hidden="true"><span></span></div>
        <strong class="score-value">${company[lens]}</strong>
      </div>
    `;
    list.appendChild(card);
  });
}

lensSelect.addEventListener("change", render);
themeSelect.addEventListener("change", render);

render();
