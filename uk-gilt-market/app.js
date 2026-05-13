const couponInput = document.querySelector("#coupon-input");
const priceInput = document.querySelector("#price-input");
const maturityInput = document.querySelector("#maturity-input");
const couponReadout = document.querySelector("#coupon-readout");
const yieldReadout = document.querySelector("#yield-readout");
const capitalReadout = document.querySelector("#capital-readout");
const bondSummary = document.querySelector("#bond-summary");
const cashflowTrack = document.querySelector("#cashflow-track");

const interestInput = document.querySelector("#interest-input");
const spendingInput = document.querySelector("#spending-input");
const shockInput = document.querySelector("#shock-input");
const shareReadout = document.querySelector("#share-readout");
const shockReadout = document.querySelector("#shock-readout");
const spendingDonut = document.querySelector("#spending-donut");
const donutNumber = document.querySelector("#donut-number");
const spendingSummary = document.querySelector("#spending-summary");

function money(value, digits = 2) {
  return `£${Number(value).toFixed(digits)}`;
}

function bn(value, digits = 1) {
  return `£${Number(value).toFixed(digits)}bn`;
}

function percent(value, digits = 1) {
  return `${Number(value).toFixed(digits)}%`;
}

function approximateYield(coupon, price, years) {
  const annualCapitalMove = (100 - price) / years;
  const averageCapital = (100 + price) / 2;
  return ((coupon + annualCapitalMove) / averageCapital) * 100;
}

function renderCashflows(coupon, years) {
  const visibleYears = Math.min(10, years);
  cashflowTrack.innerHTML = "";

  for (let i = 1; i <= visibleYears; i += 1) {
    const isFinal = i === visibleYears;
    const step = document.createElement("div");
    step.className = "cashflow-step";
    const height = isFinal ? Math.min(132, 36 + coupon * 7) : Math.max(16, 16 + coupon * 8);
    const label = isFinal && years > visibleYears ? `year ${years}` : `year ${i}`;
    const amount = isFinal ? coupon + 100 : coupon;

    step.innerHTML = `
      <b style="height: ${height}px"></b>
      <span>${label}</span>
      <strong>${money(amount)}</strong>
    `;
    cashflowTrack.appendChild(step);
  }
}

function renderBond() {
  const couponRate = Number(couponInput.value);
  const price = Number(priceInput.value);
  const years = Number(maturityInput.value);
  const capitalMove = 100 - price;
  const approxYield = approximateYield(couponRate, price, years);

  couponReadout.textContent = money(couponRate);
  yieldReadout.textContent = percent(approxYield);
  capitalReadout.textContent = `${capitalMove >= 0 ? "+" : ""}${money(capitalMove, 0)}`;
  renderCashflows(couponRate, years);

  if (price < 100) {
    bondSummary.textContent = `At £${price}, the investor buys below the £100 maturity value. The yield is above the coupon because the holder also expects a capital gain if held to maturity.`;
  } else if (price > 100) {
    bondSummary.textContent = `At £${price}, the investor pays above the £100 maturity value. The yield is below the coupon because part of the coupon income is offset by a capital loss at maturity.`;
  } else {
    bondSummary.textContent = "At £100, the approximate yield is close to the coupon because there is no capital gain or loss at maturity.";
  }
}

function renderSpending() {
  const debtInterest = Number(interestInput.value);
  const totalSpending = Number(spendingInput.value);
  const shock = Number(shockInput.value);
  const share = (debtInterest / totalSpending) * 100;
  const shockCost = 252.1 * (shock / 100);
  const totalWithShock = debtInterest + shockCost;
  const shareWithShock = (totalWithShock / totalSpending) * 100;

  shareReadout.textContent = percent(shareWithShock);
  shockReadout.textContent = `${shockCost >= 0 ? "+" : ""}${bn(shockCost)}`;
  donutNumber.textContent = percent(shareWithShock);
  spendingDonut.style.setProperty("--slice", `${Math.min(360, shareWithShock * 3.6)}deg`);

  if (shock === 0) {
    spendingSummary.textContent = `With these assumptions, debt interest is ${percent(share)} of total managed expenditure. That is close to the OBR March 2026 baseline for 2025-26: £109.7bn of debt interest against £1,368bn of total managed expenditure.`;
    return;
  }

  spendingSummary.textContent = `With these assumptions, debt interest is ${percent(shareWithShock)} of total managed expenditure. A ${percent(shock, 2)} yield move on £252.1bn of planned 2026-27 gilt sales changes annual interest by roughly ${shockCost >= 0 ? "+" : ""}${bn(shockCost)} once fully reflected in that new borrowing.`;
}

[couponInput, priceInput, maturityInput].forEach((input) => {
  input.addEventListener("input", renderBond);
});

[interestInput, spendingInput, shockInput].forEach((input) => {
  input.addEventListener("input", renderSpending);
});

renderBond();
renderSpending();
