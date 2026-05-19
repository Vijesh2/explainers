const demandInput = document.querySelector("#demand-input");
const windInput = document.querySelector("#wind-input");
const gasInput = document.querySelector("#gas-input");
const supplyStack = document.querySelector("#supply-stack");
const demandLine = document.querySelector("#demand-line");
const clearingPrice = document.querySelector("#clearing-price");
const marginalSource = document.querySelector("#marginal-source");
const demandMet = document.querySelector("#demand-met");
const gasPressure = document.querySelector("#gas-pressure");
const modelSummary = document.querySelector("#model-summary");
const alternativeTabs = [...document.querySelectorAll("[data-alternative]")];
const alternativeCard = document.querySelector("#alternative-card");

const fixedSources = [
  { id: "solar", label: "solar", capacity: 6, price: 18, color: "var(--solar)" },
  { id: "nuclear", label: "nuclear", capacity: 9, price: 45, color: "var(--nuclear)" },
  { id: "imports", label: "imports", capacity: 8, price: 92, color: "var(--imports)" }
];

const alternatives = {
  paybid: {
    title: "Pay-as-bid",
    intro: "Generators would be paid the price they bid rather than the single clearing price.",
    tradeoffs: [
      ["What it changes", "The market no longer automatically pays low-cost generators the gas-set clearing price."],
      ["Why it sounds attractive", "It feels closer to paying each generator its own cost, so wind or nuclear would not visibly receive the gas price."],
      [
        "What could go wrong",
        "In a pay-as-bid system, a generator is paid its own bid. That does not mean it will bid its true cost. If wind costs about £10/MWh to run, but operators expect gas to be needed at about £140/MWh, a wind generator may bid £120/MWh or £135/MWh rather than £10/MWh. The market can become a forecasting game: generators try to guess the highest accepted price, which makes bids less transparent and may not reliably lower consumer prices."
      ],
      [
        "When it might help",
        "Pay-as-bid can work better in procurement-style settings, where a buyer asks for a defined product: backup capacity, demand flexibility, or a long-term renewable contract. Suppliers submit offers, winners receive their bid price, and the product is specified in advance. That is different from the live wholesale market, where supply and demand must be balanced continuously. For that live market, pay-as-bid is not a simple swap because generators would change how they bid."
      ]
    ]
  },
  average: {
    title: "Average-cost pricing",
    intro: "Consumers would pay closer to the average cost of the mix rather than the cost of the final generator.",
    tradeoffs: [
      ["What it changes", "The visible price would be less dominated by the marginal generator in each settlement period."],
      ["Why it sounds attractive", "Bills could look more connected to the full generation mix, especially when low-carbon power is abundant."],
      [
        "What could go wrong",
        "Average-cost pricing can make the bill look calmer while the physical system is still under pressure. If lots of wind and nuclear are running but the system still needs some £150/MWh gas, the average price may be far below the cost of that final flexible supply. That lower blended price can hide the scarcity signal that tells batteries to discharge, flexible generators to run, large users to reduce demand, or investors to build more flexibility."
      ],
      [
        "When it might help",
        "Average-cost pricing can be useful for bill stability when it sits inside regulated or contracted arrangements: long-term generator contracts, fixed-price low-carbon support, or supplier portfolios bought at blended prices. But it cannot remove the need for a real-time balancing mechanism. The system still has to decide who provides extra power on a cold, still evening, who is paid to reduce demand, and how backup plants or storage recover their costs."
      ]
    ]
  },
  split: {
    title: "Separate gas and low-carbon markets",
    intro: "Low-carbon generators and gas generators would be paid through different financial arrangements, even though their electricity still flows through one physical grid.",
    tradeoffs: [
      ["What it changes", "Renewables, nuclear, or other low-carbon sources could be insulated from gas-set wholesale prices more directly, while gas and flexible backup are paid through a separate route."],
      ["Why it sounds attractive", "It targets the central complaint: cheap low-carbon power should not always be priced as if it came from gas, especially when gas is only needed for the final slice of demand."],
      [
        "What could go wrong",
        "Splitting the financial market does not split the physics. The grid still has to balance supply and demand every second. If demand rises at 6pm and wind output falls, gas, storage, imports, or demand reduction may still be needed. The design then has to answer hard questions: who pays backup plants to be available, who pays them when they run, how are those costs shared, and what stops costs being hidden in levies, capacity payments, balancing charges, or supplier obligations?"
      ],
      [
        "When it might help",
        "A split can help when the goal is to give consumers more stable access to low-carbon power prices while separately paying for reliability. The UK already does a partial version through long-term contracts such as Contracts for Difference. A wind farm may sell into the wholesale market, but a fixed strike price means it receives a top-up when market prices are low and pays back the difference when market prices are high. That makes its revenue less dependent on live gas-set prices."
      ],
      [
        "CfD example",
        "If a renewable generator has a £70/MWh strike price and the wholesale price is £50/MWh, it receives a £20/MWh top-up. If the wholesale price is £120/MWh, it pays back £50/MWh. Physically, the power still enters the same grid. Financially, the generator is partly insulated from wholesale volatility, and consumers can benefit when gas-driven prices rise above the strike price."
      ]
    ]
  },
  cap: {
    title: "Price caps or gas-price decoupling",
    intro: "The market would limit the price impact of gas plants or compensate them outside the normal clearing price.",
    tradeoffs: [
      ["What it changes", "Consumer-facing prices could be held below the full cost of gas-fired generation during spikes."],
      ["Why it sounds attractive", "It offers visible protection when international gas prices surge."],
      ["What could go wrong", "If gas plants are still needed, their costs do not disappear. They may move to taxes, levies, public borrowing, or supplier losses."],
      ["When it might help", "Temporary crisis measures can be justified, but a permanent cap needs a durable funding and investment model."]
    ]
  },
  zonal: {
    title: "Zonal or locational pricing",
    intro: "Prices would vary by region, reflecting local supply, demand, and grid constraints.",
    tradeoffs: [
      ["What it changes", "The price would better reveal where electricity is cheap, scarce, or blocked by network limits."],
      ["Why it sounds attractive", "It can reward generation, storage, and demand flexibility in the places where they help the system most."],
      ["What could go wrong", "It creates regional winners and losers, complicates investment decisions, and can be politically hard to introduce."],
      ["When it might help", "It may improve operational efficiency, but the UK government decided in July 2025 to retain a single national GB-wide wholesale market."]
    ]
  }
};

function formatGw(value) {
  return `${Math.round(value)} GW`;
}

function formatPrice(value) {
  return `£${Math.round(value)}/MWh`;
}

function sourcesForState() {
  return [
    { id: "wind", label: "wind", capacity: Number(windInput.value), price: 12, color: "var(--wind)" },
    ...fixedSources,
    { id: "gas", label: "gas", capacity: 32, price: Number(gasInput.value), color: "var(--gas)" }
  ].sort((a, b) => a.price - b.price);
}

function findMarginal(sources, demand) {
  let runningTotal = 0;
  for (const source of sources) {
    runningTotal += source.capacity;
    if (runningTotal >= demand) {
      return source;
    }
  }
  return sources[sources.length - 1];
}

function gasSetterPressureLabel(demand, sources) {
  const nonGasCapacity = sources
    .filter((source) => source.id !== "gas")
    .reduce((sum, source) => sum + source.capacity, 0);
  const gasNeed = demand - nonGasCapacity;

  if (gasNeed > 9) return "often";
  if (gasNeed > 0) return "sometimes";
  return "rarely";
}

function renderMarket() {
  const demand = Number(demandInput.value);
  const sources = sourcesForState();
  const marginal = findMarginal(sources, demand);
  const totalCapacity = sources.reduce((sum, source) => sum + source.capacity, 0);
  const linePosition = Math.min(100, (demand / totalCapacity) * 100);

  supplyStack.innerHTML = "";
  sources.forEach((source) => {
    const block = document.createElement("div");
    block.className = `supply-block ${source.id === marginal.id ? "marginal" : ""}`;
    block.style.width = `${(source.capacity / totalCapacity) * 100}%`;
    block.style.background = source.color;
    block.innerHTML = `<strong>${source.label}</strong><span>${formatPrice(source.price)}</span>`;
    supplyStack.appendChild(block);
  });

  demandLine.style.left = `${linePosition}%`;
  clearingPrice.textContent = formatPrice(marginal.price);
  marginalSource.textContent = marginal.label;
  demandMet.textContent = formatGw(demand);
  gasPressure.textContent = gasSetterPressureLabel(demand, sources);

  if (marginal.id === "gas") {
    modelSummary.textContent = "Gas is needed to meet the last slice of demand, so gas sets the clearing price.";
  } else {
    modelSummary.textContent = `${marginal.label[0].toUpperCase()}${marginal.label.slice(1)} meets the final slice of demand here, so gas no longer sets the clearing price in this simplified model.`;
  }
}

function renderAlternative(key) {
  const option = alternatives[key];
  alternativeCard.innerHTML = `
    <h3>${option.title}</h3>
    <p>${option.intro}</p>
    <div class="tradeoff-grid">
      ${option.tradeoffs.map(([heading, body], index) => `
        <div class="${index > 1 ? "wide" : ""}">
          <strong>${heading}</strong>
          <p>${body}</p>
        </div>
      `).join("")}
    </div>
  `;

  alternativeTabs.forEach((tab) => {
    const isActive = tab.dataset.alternative === key;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
}

[demandInput, windInput, gasInput].forEach((input) => {
  input.addEventListener("input", renderMarket);
});

alternativeTabs.forEach((tab) => {
  tab.addEventListener("click", () => renderAlternative(tab.dataset.alternative));
});

renderMarket();
renderAlternative("paybid");
