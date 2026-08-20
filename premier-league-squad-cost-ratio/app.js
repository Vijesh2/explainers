const fields = ["revenue", "trading", "wages", "transfers", "agents"];
const inputs = Object.fromEntries(fields.map((id) => [id, document.getElementById(id)]));
const outputs = Object.fromEntries(fields.map((id) => [id, document.getElementById(`${id}-output`)]));

const money = (value) => `${value < 0 ? "−" : ""}£${Math.abs(value).toLocaleString("en-GB")}m`;

function update() {
  const values = Object.fromEntries(fields.map((id) => [id, Number(inputs[id].value)]));
  const costs = values.wages + values.transfers + values.agents;
  const resources = Math.max(1, values.revenue + values.trading);
  const ratio = (costs / resources) * 100;
  const greenSpend = resources * 0.85;
  const overspend = Math.max(0, costs - greenSpend);

  fields.forEach((id) => { outputs[id].textContent = money(values[id]); });
  document.getElementById("ratio-output").textContent = `${ratio.toFixed(1)}%`;
  document.getElementById("cost-output").textContent = money(costs);
  document.getElementById("resource-output").textContent = money(resources);
  document.getElementById("green-output").textContent = money(Math.round(greenSpend));
  document.getElementById("marker").style.left = `${Math.min(100, Math.max(0, ratio / 1.4))}%`;

  const status = document.getElementById("status-output");
  const copy = document.getElementById("result-copy");
  if (ratio <= 85) {
    status.textContent = "Inside the green threshold";
    status.style.color = "var(--lime)";
    copy.textContent = "No SCR levy or sporting sanction.";
  } else if (ratio <= 115) {
    status.textContent = "Using the multi-year allowance";
    status.style.color = "#ffd36e";
    copy.textContent = `Illustrative green-threshold overspend: ${money(Math.round(overspend))}. A confirmed breach can trigger a levy and shrink next season’s red-line allowance.`;
  } else {
    status.textContent = "Above the starting red threshold";
    status.style.color = "#ff8f96";
    const redOverspend = Math.max(0, costs - resources * 1.15);
    const addedPoints = Math.ceil(redOverspend / 6.5);
    copy.textContent = `Illustrative red-threshold overspend: ${money(Math.round(redOverspend))}. The rule starts at a six-point deduction, plus roughly ${addedPoints} further point${addedPoints === 1 ? "" : "s"} at £6.5m per point.`;
  }
}

fields.forEach((id) => inputs[id].addEventListener("input", update));
update();
