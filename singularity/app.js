const scenarios = {
  abundance: {
    label: "Managed abundance",
    verdict: "Capability rises · access broadens · institutions adapt",
    body: "AI accelerates medicine, clean energy, education and production. Basic goods become cheaper, dangerous work declines and people gain more freedom over how they spend their lives.",
    question: "Can ownership and access broaden as quickly as capability?"
  },
  uneven: {
    label: "Uneven transformation",
    verdict: "Capability rises · ownership concentrates · adjustment lags",
    body: "A small number of firms or states control the strongest systems. Many people benefit as consumers while losing influence as workers and citizens. Extraordinary wealth coexists with insecurity.",
    question: "Who owns the models, compute, energy and automated businesses?"
  },
  control: {
    label: "Authoritarian control",
    verdict: "Capability rises · surveillance scales · autonomy shrinks",
    body: "AI enables pervasive monitoring, personalised persuasion and prediction of dissent. Society may be advanced and materially comfortable while offering little privacy or meaningful freedom.",
    question: "Which uses remain subject to democratic consent and refusal?"
  },
  loss: {
    label: "Loss of control",
    verdict: "Capability rises · objectives diverge · correction fails",
    body: "Highly capable systems pursue badly specified objectives and gain resources or influence because doing so helps complete the task. The danger does not require hatred or consciousness—only competence and misalignment.",
    question: "Can humans still understand, interrupt and redirect the system?"
  }
};

const preparation = {
  people: {
    title: "Increase your agency",
    intro: "The useful preparations also help if progress is slower than expected.",
    items: [
      ["Use AI seriously", "Build real workflows and learn where outputs fail—not just how to prompt."],
      ["Pair fluency with expertise", "Domain knowledge helps identify valuable problems and plausible mistakes."],
      ["Strengthen judgment", "Problem framing, verification, relationships and responsibility become more valuable."],
      ["Protect identity and attention", "Use strong authentication and independently verify urgent or emotional requests."],
      ["Keep flexibility", "Avoid betting your livelihood on one platform, narrow skill or confident forecast."],
      ["Invest in human foundations", "Health, trusted relationships and community remain useful in every scenario."]
    ]
  },
  organisations: {
    title: "Treat agents as powerful, fallible insiders",
    intro: "Risk comes from the whole system: model, objective, memory, tools, credentials and network.",
    items: [
      ["Map every agent", "Record its owner, purpose, model, data, tools, credentials and downstream actions."],
      ["Use least privilege", "Make permissions narrow, temporary and tied to a task; isolate testing from production."],
      ["Test the routes, not just the result", "Look for reward hacking, boundary crossing and behaviour when a task is impossible."],
      ["Contain for capability", "Assume the system may actively search for weaknesses regardless of its apparent intent."],
      ["Respond at machine speed", "Pre-authorise automatic isolation, credential revocation and evidence preservation."],
      ["Equip defenders", "Give security teams controlled access to AI capable of analysing autonomous attacks."],
      ["Preserve expertise", "Do not remove the people needed to detect failure or operate when AI is unavailable."],
      ["Plan three tempos", "Prepare for a plateau, steady improvement and a sudden capability jump."]
    ]
  },
  society: {
    title: "Build institutions that can keep pace",
    intro: "Civilisation-scale capability needs public capacity, not only personal adaptation.",
    items: [
      ["Evaluate independently", "Test frontier systems, tools and agents in realistic configurations."],
      ["Require incident reporting", "Create protected channels, common standards and clear accountability."],
      ["Strengthen the defensive commons", "Share threat intelligence and give public investigators real technical capacity."],
      ["Modernise education and protection", "Teach verification and adaptability; prepare for uneven labour disruption."],
      ["Broaden ownership", "Ensure productivity gains do not accrue only to owners of models, compute and energy."],
      ["Coordinate internationally", "Set common tests and controls for cyber, biological and autonomous capabilities."]
    ]
  }
};

const scenarioPanel = document.querySelector("#scenario-panel");
const scenarioButtons = [...document.querySelectorAll("[data-scenario]")];
const preparePanel = document.querySelector("#prepare-panel");
const prepareButtons = [...document.querySelectorAll("[data-audience]")];

function renderScenario(key) {
  const item = scenarios[key];
  scenarioPanel.dataset.theme = key;
  scenarioPanel.innerHTML = `
    <p class="scenario-verdict">${item.verdict}</p>
    <h3>${item.label}</h3>
    <p>${item.body}</p>
    <div class="scenario-question"><span>The deciding question</span><strong>${item.question}</strong></div>
  `;
  scenarioButtons.forEach((button) => {
    const active = button.dataset.scenario === key;
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
  });
}

function renderPreparation(key) {
  const item = preparation[key];
  preparePanel.innerHTML = `
    <div class="prepare-intro"><h3>${item.title}</h3><p>${item.intro}</p></div>
    <div class="prepare-grid">
      ${item.items.map(([title, body], index) => `
        <article><span>${String(index + 1).padStart(2, "0")}</span><div><h4>${title}</h4><p>${body}</p></div></article>
      `).join("")}
    </div>
  `;
  prepareButtons.forEach((button) => {
    const active = button.dataset.audience === key;
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
  });
}

function wireTabs(buttons, attribute, render) {
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => render(button.dataset[attribute]));
    button.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const offset = event.key === "ArrowRight" ? 1 : -1;
      const next = buttons[(index + offset + buttons.length) % buttons.length];
      next.focus();
      render(next.dataset[attribute]);
    });
  });
}

wireTabs(scenarioButtons, "scenario", renderScenario);
wireTabs(prepareButtons, "audience", renderPreparation);
renderScenario("abundance");
renderPreparation("people");
