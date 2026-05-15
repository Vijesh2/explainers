const fmtMoney = (value) => `£${Math.round(value)}m`;

const housing = {
  base: document.querySelector("#base-land"),
  planned: document.querySelector("#planned-land"),
  share: document.querySelector("#public-share"),
  upliftValue: document.querySelector("#uplift-value"),
  captureValue: document.querySelector("#capture-value"),
  privateValue: document.querySelector("#private-value"),
  baseBar: document.querySelector("#base-bar"),
  publicBar: document.querySelector("#public-bar"),
  privateBar: document.querySelector("#private-bar"),
};

function updateHousing() {
  let base = Number(housing.base.value);
  let planned = Number(housing.planned.value);

  if (planned <= base + 20) {
    planned = base + 20;
    housing.planned.value = String(planned);
  }

  const uplift = planned - base;
  const capture = uplift * (Number(housing.share.value) / 100);
  const privateUplift = uplift - capture;
  const total = base + capture + privateUplift;

  housing.upliftValue.textContent = fmtMoney(uplift);
  housing.captureValue.textContent = fmtMoney(capture);
  housing.privateValue.textContent = fmtMoney(privateUplift);

  housing.baseBar.textContent = fmtMoney(base);
  housing.publicBar.textContent = `public ${fmtMoney(capture)}`;
  housing.privateBar.textContent = `private ${fmtMoney(privateUplift)}`;

  housing.baseBar.style.width = `${(base / total) * 100}%`;
  housing.publicBar.style.width = `${(capture / total) * 100}%`;
  housing.privateBar.style.width = `${(privateUplift / total) * 100}%`;
}

const energyChoices = {
  capacity: {
    delivered: "medium",
    bills: "still high",
    notice: "headline",
    generation: "More capacity is announced.",
    grid: "The bottleneck remains, so some cheap power cannot move.",
    meter: "Bills do not fall much because the useful power is limited.",
    activeLink: "one",
  },
  bottleneck: {
    delivered: "higher",
    bills: "lower over time",
    notice: "power arrives",
    generation: "Existing clean generation becomes more useful.",
    grid: "The bottleneck is cleared with wires, storage or smarter operation.",
    meter: "More cheap power reaches homes and firms, so the bill pressure eases.",
    activeLink: "two",
  },
};

const energy = {
  buttons: document.querySelectorAll("[data-energy-choice]"),
  delivered: document.querySelector("#choice-delivered"),
  bills: document.querySelector("#choice-bills"),
  notice: document.querySelector("#choice-notice"),
  generation: document.querySelector("#flow-generation"),
  grid: document.querySelector("#flow-grid"),
  meter: document.querySelector("#flow-meter"),
  linkOne: document.querySelector("#flow-link-one"),
  linkTwo: document.querySelector("#flow-link-two"),
};

function updateEnergy(choiceKey) {
  const choice = energyChoices[choiceKey];

  energy.delivered.textContent = choice.delivered;
  energy.bills.textContent = choice.bills;
  energy.notice.textContent = choice.notice;
  energy.generation.textContent = choice.generation;
  energy.grid.textContent = choice.grid;
  energy.meter.textContent = choice.meter;
  energy.linkOne.classList.toggle("active", choice.activeLink === "one");
  energy.linkTwo.classList.toggle("active", choice.activeLink === "two");

  energy.buttons.forEach((button) => {
    const isActive = button.dataset.energyChoice === choiceKey;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

[housing.base, housing.planned, housing.share].forEach((input) => {
  input.addEventListener("input", updateHousing);
});

energy.buttons.forEach((button) => {
  button.addEventListener("click", () => {
    updateEnergy(button.dataset.energyChoice);
  });
});

updateHousing();
updateEnergy("capacity");
