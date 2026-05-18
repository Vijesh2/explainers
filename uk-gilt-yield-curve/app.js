const DATA_DATE = new Date("2026-05-15T00:00:00Z");

const gilts = [
  { name: "UKT 1.5 07/26", isin: "GB00BYZW3G56", coupon: 1.5, maturity: "2026-07-22", clean: 99.581, dirty: 100.061663, yield: 3.862895, accrued: 0.480663 },
  { name: "UKT 0.375 10/26", isin: "GB00BNNGP668", coupon: 0.375, maturity: "2026-10-22", clean: 98.531, dirty: 98.557639, yield: 3.84462, accrued: 0.026639 },
  { name: "UKT 4.125 01/27", isin: "GB00BL6C7720", coupon: 4.125, maturity: "2027-01-29", clean: 99.907, dirty: 101.149058, yield: 4.257234, accrued: 1.242058 },
  { name: "UKT 3.75 03/27", isin: "GB00BPSNB460", coupon: 3.75, maturity: "2027-03-07", clean: 99.563, dirty: 100.296696, yield: 4.324631, accrued: 0.733696 },
  { name: "UKT 1.25 07/27", isin: "GB00BDRHNP05", coupon: 1.25, maturity: "2027-07-22", clean: 96.431, dirty: 96.831552, yield: 4.386338, accrued: 0.400552 },
  { name: "UKT 4.25 12/27", isin: "GB00B16NNR78", coupon: 4.25, maturity: "2027-12-07", clean: 99.708, dirty: 101.599484, yield: 4.444889, accrued: 1.891484 },
  { name: "UKT 0.125 01/28", isin: "GB00BMBL1G81", coupon: 0.125, maturity: "2028-01-31", clean: 93.189, dirty: 93.225948, yield: 4.312556, accrued: 0.036948 },
  { name: "UKT 4.375 03/28", isin: "GB00BSQNRC93", coupon: 4.375, maturity: "2028-03-07", clean: 99.715, dirty: 100.570978, yield: 4.537883, accrued: 0.855978 },
  { name: "UKT 4.5 06/28", isin: "GB00BMF9LG83", coupon: 4.5, maturity: "2028-06-07", clean: 99.904, dirty: 101.906747, yield: 4.548184, accrued: 2.002747 },
  { name: "UKT 1.625 10/28", isin: "GB00BFX0ZL78", coupon: 1.625, maturity: "2028-10-22", clean: 93.597, dirty: 93.712437, yield: 4.434228, accrued: 0.115437 },
  { name: "UKT 6 12/28", isin: "GB0002404191", coupon: 6, maturity: "2028-12-07", clean: 103.701, dirty: 106.37133, yield: 4.450132, accrued: 2.67033 },
  { name: "UKT 0.5 01/29", isin: "GB00BLPK7227", coupon: 0.5, maturity: "2029-01-31", clean: 89.984, dirty: 90.13179, yield: 4.47304, accrued: 0.14779 },
  { name: "UKT 4 05/29", isin: "GB00BVP99566", coupon: 4, maturity: "2029-05-22", clean: 98.306, dirty: 98.261801, yield: 4.609169, accrued: -0.044199 },
  { name: "UKT 4.125 07/29", isin: "GB00BQC82B83", coupon: 4.125, maturity: "2029-07-22", clean: 98.592, dirty: 99.913823, yield: 4.604255, accrued: 1.321823 },
  { name: "UKT 0.875 10/29", isin: "GB00BJMH534", coupon: 0.875, maturity: "2029-10-22", clean: 88.577, dirty: 88.639158, yield: 4.507546, accrued: 0.062158 },
  { name: "UKT 4.375 03/30", isin: "GB00BSQNRD01", coupon: 4.375, maturity: "2030-03-07", clean: 99.136, dirty: 99.991978, yield: 4.623553, accrued: 0.855978 },
  { name: "UKT 0.375 10/30", isin: "GB00BL68HH02", coupon: 0.375, maturity: "2030-10-22", clean: 83.507, dirty: 83.533639, yield: 4.526411, accrued: 0.026639 },
  { name: "UKT 4.75 12/30", isin: "GB00B24FF097", coupon: 4.75, maturity: "2030-12-07", clean: 100.722, dirty: 102.836011, yield: 4.571968, accrued: 2.114011 },
  { name: "UKT 4.125 03/31", isin: "GB00BVP99673", coupon: 4.125, maturity: "2031-03-07", clean: 97.601, dirty: 98.408065, yield: 4.687139, accrued: 0.807065 },
  { name: "UKT 0.25 07/31", isin: "GB00BMGR2809", coupon: 0.25, maturity: "2031-07-31", clean: 80.082, dirty: 80.155895, yield: 4.596683, accrued: 0.073895 },
  { name: "UKT 4 10/31", isin: "GB00BPSNBF73", coupon: 4, maturity: "2031-10-22", clean: 96.554, dirty: 96.838153, yield: 4.726492, accrued: 0.284153 },
  { name: "UKT 1 01/32", isin: "GB00BM8Z2T38", coupon: 1, maturity: "2032-01-31", clean: 81.419, dirty: 81.71458, yield: 4.75731, accrued: 0.29558 },
  { name: "UKT 4.25 06/32", isin: "GB0004893086", coupon: 4.25, maturity: "2032-06-07", clean: 97.427, dirty: 99.318484, yield: 4.743399, accrued: 1.891484 },
  { name: "UKT 3.25 01/33", isin: "GB00BMV7TC88", coupon: 3.25, maturity: "2033-01-31", clean: 90.807, dirty: 91.767635, yield: 4.873004, accrued: 0.960635 },
  { name: "UKT 4.125 03/33", isin: "GB00BVP99780", coupon: 4.125, maturity: "2033-03-07", clean: 95.666, dirty: 96.473065, yield: 4.880179, accrued: 0.807065 },
  { name: "UKT 0.875 07/33", isin: "GB00BM8Z2S21", coupon: 0.875, maturity: "2033-07-31", clean: 75.715, dirty: 75.973633, yield: 4.918987, accrued: 0.258633 },
  { name: "UKT 4.625 01/34", isin: "GB00BPJJKN53", coupon: 4.625, maturity: "2034-01-31", clean: 97.703, dirty: 99.070058, yield: 4.98664, accrued: 1.367058 },
  { name: "UKT 4.25 07/34", isin: "GB00BQC82C90", coupon: 4.25, maturity: "2034-07-31", clean: 94.769, dirty: 96.025215, yield: 5.035243, accrued: 1.256215 },
  { name: "UKT 4.5 09/34", isin: "GB00B52WS153", coupon: 4.5, maturity: "2034-09-07", clean: 96.486, dirty: 97.366435, yield: 5.021726, accrued: 0.880435 },
  { name: "UKT 4.5 03/35", isin: "GB00BT7J0027", coupon: 4.5, maturity: "2035-03-07", clean: 95.777, dirty: 96.657435, yield: 5.100408, accrued: 0.880435 },
  { name: "UKT 0.625 07/35", isin: "GB00BMGR2916", coupon: 0.625, maturity: "2035-07-31", clean: 67.389, dirty: 67.573738, yield: 5.110483, accrued: 0.184738 },
  { name: "UKT 4.75 10/35", isin: "GB00BTXS1K06", coupon: 4.75, maturity: "2035-10-22", clean: 96.94, dirty: 97.277432, yield: 5.163513, accrued: 0.337432 },
  { name: "UKT 4.25 03/36", isin: "GB0032452392", coupon: 4.25, maturity: "2036-03-07", clean: 92.804, dirty: 93.635522, yield: 5.19512, accrued: 0.831522 },
  { name: "UKT 4.875 07/36", isin: "GB00BWBR1N39", coupon: 4.875, maturity: "2036-07-31", clean: 97.12, dirty: 97.564406, yield: 5.2434, accrued: 0.444406 },
  { name: "UKT 4.625 03/37", isin: "GB00BVP99905", coupon: 4.625, maturity: "2037-03-07", clean: 94.46, dirty: 95.31462, yield: 5.304452, accrued: 0.85462 },
  { name: "UKT 1.75 09/37", isin: "GB00BZB26Y51", coupon: 1.75, maturity: "2037-09-07", clean: 70, dirty: 70.342391, yield: 5.314036, accrued: 0.342391 },
  { name: "UKT 3.75 01/38", isin: "GB00BQC4R999", coupon: 3.75, maturity: "2038-01-29", clean: 85.91, dirty: 87.039144, yield: 5.388577, accrued: 1.129144 },
  { name: "UKT 4.75 12/38", isin: "GB00B00NY175", coupon: 4.75, maturity: "2038-12-07", clean: 94.04, dirty: 96.154011, yield: 5.409848, accrued: 2.114011 },
  { name: "UKT 1.125 01/39", isin: "GB00BLPK7334", coupon: 1.125, maturity: "2039-01-31", clean: 61.01, dirty: 61.342528, yield: 5.407509, accrued: 0.332528 },
  { name: "UKT 4.25 09/39", isin: "GB00B3KJDS62", coupon: 4.25, maturity: "2039-09-07", clean: 88.55, dirty: 89.381522, yield: 5.472071, accrued: 0.831522 },
  { name: "UKT 4.375 01/40", isin: "GB00BQC82D08", coupon: 4.375, maturity: "2040-01-31", clean: 89.04, dirty: 90.333163, yield: 5.525102, accrued: 1.293163 },
  { name: "UKT 4.25 12/40", isin: "GB00B6460505", coupon: 4.25, maturity: "2040-12-07", clean: 87.1, dirty: 88.991484, yield: 5.553565, accrued: 1.891484 },
  { name: "UKT 5.25 01/41", isin: "GB00BVP99897", coupon: 5.25, maturity: "2041-01-31", clean: 96.72, dirty: 98.271796, yield: 5.578982, accrued: 1.551796 },
  { name: "UKT 1.25 10/41", isin: "GB00BJQWYH73", coupon: 1.25, maturity: "2041-10-22", clean: 55.66, dirty: 55.748798, yield: 5.571153, accrued: 0.088798 },
  { name: "UKT 4.5 12/42", isin: "GB00B1VWPJ53", coupon: 4.5, maturity: "2042-12-07", clean: 87.69, dirty: 89.692747, yield: 5.654601, accrued: 2.002747 },
  { name: "UKT 4.75 10/43", isin: "GB00BPJJKP77", coupon: 4.75, maturity: "2043-10-22", clean: 89.4, dirty: 89.737432, yield: 5.718397, accrued: 0.337432 },
  { name: "UKT 3.25 01/44", isin: "GB00B84Z9V04", coupon: 3.25, maturity: "2044-01-22", clean: 72.58, dirty: 73.621436, yield: 5.738352, accrued: 1.041436 },
  { name: "UKT 3.5 01/45", isin: "GB00BN65R313", coupon: 3.5, maturity: "2045-01-22", clean: 74.39, dirty: 75.511547, yield: 5.754843, accrued: 1.121547 },
  { name: "UKT 0.875 01/46", isin: "GB00BNNGP775", coupon: 0.875, maturity: "2046-01-31", clean: 42.81, dirty: 43.068633, yield: 5.771357, accrued: 0.258633 },
  { name: "UKT 4.25 12/46", isin: "GB00B128DP45", coupon: 4.25, maturity: "2046-12-07", clean: 81.74, dirty: 83.631484, yield: 5.779225, accrued: 1.891484 },
  { name: "UKT 1.5 07/47", isin: "GB00BDCHBW80", coupon: 1.5, maturity: "2047-07-22", clean: 47.87, dirty: 48.350663, yield: 5.809983, accrued: 0.480663 },
  { name: "UKT 1.75 01/49", isin: "GB00BFWFP71", coupon: 1.75, maturity: "2049-01-22", clean: 49.14, dirty: 49.700773, yield: 5.815376, accrued: 0.560773 },
  { name: "UKT 4.25 12/49", isin: "GB00B39R3707", coupon: 4.25, maturity: "2049-12-07", clean: 80.12, dirty: 82.011484, yield: 5.80946, accrued: 1.891484 },
  { name: "UKT 0.625 10/50", isin: "GB00BMBL1F74", coupon: 0.625, maturity: "2050-10-22", clean: 32.95, dirty: 32.994399, yield: 5.784952, accrued: 0.044399 },
  { name: "UKT 1.25 07/51", isin: "GB00BLH38158", coupon: 1.25, maturity: "2051-07-31", clean: 39.74, dirty: 40.109475, yield: 5.851275, accrued: 0.369475 },
  { name: "UKT 3.75 07/52", isin: "GB00B6RNH572", coupon: 3.75, maturity: "2052-07-22", clean: 72.2, dirty: 73.401657, yield: 5.833934, accrued: 1.201657 },
  { name: "UKT 1.5 07/53", isin: "GB00BM8Z2V59", coupon: 1.5, maturity: "2053-07-31", clean: 41.02, dirty: 41.46337, yield: 5.864524, accrued: 0.44337 },
  { name: "UKT 3.75 10/53", isin: "GB00BPCJD997", coupon: 3.75, maturity: "2053-10-22", clean: 71.37, dirty: 71.636393, yield: 5.860471, accrued: 0.266393 },
  { name: "UKT 4.375 07/54", isin: "GB00BPSNBB36", coupon: 4.375, maturity: "2054-07-31", clean: 79.62, dirty: 80.913163, yield: 5.860086, accrued: 1.293163 },
  { name: "UKT 1.625 10/54", isin: "GB00BJLR0J16", coupon: 1.625, maturity: "2054-10-22", clean: 41.89, dirty: 42.005437, yield: 5.837905, accrued: 0.115437 },
  { name: "UKT 4.25 12/55", isin: "GB00B06YGN05", coupon: 4.25, maturity: "2055-12-07", clean: 77.77, dirty: 79.661484, yield: 5.837272, accrued: 1.891484 },
  { name: "UKT 5.375 01/56", isin: "GB00BT7J0241", coupon: 5.375, maturity: "2056-01-31", clean: 93.48, dirty: 95.068743, yield: 5.839143, accrued: 1.588743 },
  { name: "UKT 1.75 07/57", isin: "GB00BD0XH204", coupon: 1.75, maturity: "2057-07-22", clean: 41.86, dirty: 42.420773, yield: 5.806791, accrued: 0.560773 },
  { name: "UKT 4 01/60", isin: "GB00B54QLM75", coupon: 4, maturity: "2060-01-22", clean: 73.51, dirty: 74.791768, yield: 5.797705, accrued: 1.281768 },
  { name: "UKT 0.5 10/61", isin: "GB00BMBL1D50", coupon: 0.5, maturity: "2061-10-22", clean: 22.44, dirty: 22.475519, yield: 5.491346, accrued: 0.035519 },
  { name: "UKT 4 10/63", isin: "GB00BMF9LF76", coupon: 4, maturity: "2063-10-22", clean: 72.62, dirty: 72.904153, yield: 5.799443, accrued: 0.284153 },
  { name: "UKT 2.5 07/65", isin: "GB00BYYMZX75", coupon: 2.5, maturity: "2065-07-22", clean: 49.71, dirty: 50.511105, yield: 5.738619, accrued: 0.801105 },
  { name: "UKT 3.5 07/68", isin: "GB00BBJNQY21", coupon: 3.5, maturity: "2068-07-22", clean: 64.7, dirty: 65.821547, yield: 5.727107, accrued: 1.121547 },
  { name: "UKT 1.625 10/71", isin: "GB00BFMCN652", coupon: 1.625, maturity: "2071-10-22", clean: 35.59, dirty: 35.705437, yield: 5.492638, accrued: 0.115437 },
  { name: "UKT 1.125 10/73", isin: "GB00BLBDX619", coupon: 1.125, maturity: "2073-10-22", clean: 27.48, dirty: 27.559918, yield: 5.350455, accrued: 0.079918 },
];

const select = document.querySelector("#gilt-select");
const cleanReadout = document.querySelector("#clean-readout");
const accruedReadout = document.querySelector("#accrued-readout");
const accruedSignpost = document.querySelector("#accrued-signpost");
const dirtyReadout = document.querySelector("#dirty-readout");
const settlementReadout = document.querySelector("#settlement-readout");
const maturityReadout = document.querySelector("#maturity-readout");
const couponReadout = document.querySelector("#coupon-readout");
const yieldReadout = document.querySelector("#yield-readout");
const solvedReadout = document.querySelector("#solved-readout");
const settlementCopy = document.querySelector("#settlement-copy");
const maturityCopy = document.querySelector("#maturity-copy");
const accrualRuleReadout = document.querySelector("#accrual-rule-readout");
const periodCouponReadout = document.querySelector("#period-coupon-readout");
const accrualDaysReadout = document.querySelector("#accrual-days-readout");
const accrualDaysDetail = document.querySelector("#accrual-days-detail");
const periodDaysReadout = document.querySelector("#period-days-readout");
const periodDaysDetail = document.querySelector("#period-days-detail");
const periodDaysCount = document.querySelector("#period-days-count");
const derivedAccruedReadout = document.querySelector("#derived-accrued-readout");
const accrualExplanation = document.querySelector("#accrual-explanation");
const targetPriceReadout = document.querySelector("#target-price-readout");
const cashflowCountReadout = document.querySelector("#cashflow-count-readout");
const finalFlowReadout = document.querySelector("#final-flow-readout");
const solvedPvReadout = document.querySelector("#solved-pv-readout");
const lowYieldLabel = document.querySelector("#low-yield-label");
const lowPvReadout = document.querySelector("#low-pv-readout");
const lowPvCopy = document.querySelector("#low-pv-copy");
const highYieldLabel = document.querySelector("#high-yield-label");
const highPvReadout = document.querySelector("#high-pv-readout");
const highPvCopy = document.querySelector("#high-pv-copy");
const yieldExplanation = document.querySelector("#yield-explanation");
const previousCouponReadout = document.querySelector("#previous-coupon-readout");
const exdivReadout = document.querySelector("#exdiv-readout");
const nextCouponReadout = document.querySelector("#next-coupon-readout");
const statusReadout = document.querySelector("#status-readout");
const statusCopy = document.querySelector("#status-copy");
const couponStrip = document.querySelector("#coupon-strip");
const formulaCopy = document.querySelector("#formula-copy");
const curveSummary = document.querySelector("#curve-summary");
const chart = document.querySelector("#curve-chart");
const tooltip = document.querySelector("#tooltip");

function utcDate(iso) {
  return new Date(`${iso}T00:00:00Z`);
}

function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

function isWeekend(date) {
  const day = date.getUTCDay();
  return day === 0 || day === 6;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function addBusinessDays(date, days) {
  let current = new Date(date);
  let remaining = Math.abs(days);
  const step = days >= 0 ? 1 : -1;

  while (remaining > 0) {
    current = addDays(current, step);
    if (!isWeekend(current)) {
      remaining -= 1;
    }
  }

  return current;
}

function addMonths(date, months) {
  const next = new Date(date);
  const day = next.getUTCDate();
  next.setUTCDate(1);
  next.setUTCMonth(next.getUTCMonth() + months);
  const lastDay = new Date(Date.UTC(next.getUTCFullYear(), next.getUTCMonth() + 1, 0)).getUTCDate();
  next.setUTCDate(Math.min(day, lastDay));
  return next;
}

const settlementDate = addBusinessDays(DATA_DATE, 1);

function yearsToMaturity(gilt) {
  const maturity = utcDate(gilt.maturity);
  return (maturity - settlementDate) / (365.25 * 24 * 60 * 60 * 1000);
}

function daysBetween(start, end) {
  return Math.round((end - start) / (24 * 60 * 60 * 1000));
}

function fmt(value, digits = 2) {
  return Number(value).toFixed(digits);
}

function fmtDate(value) {
  const date = value instanceof Date ? value : utcDate(value);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function couponDates(gilt) {
  const dates = [];
  let date = utcDate(gilt.maturity);

  while (date > addMonths(settlementDate, -6)) {
    dates.unshift(new Date(date));
    date = addMonths(date, -6);
  }

  return dates;
}

function couponContext(gilt) {
  const dates = couponDates(gilt);
  const nextCoupon = dates.find((date) => date > settlementDate) || utcDate(gilt.maturity);
  const pastCoupons = dates.filter((date) => date <= settlementDate);
  const previousCoupon = pastCoupons[pastCoupons.length - 1] || addMonths(nextCoupon, -6);
  const exDividend = addBusinessDays(nextCoupon, -7);
  const inExDividend = settlementDate > exDividend && settlementDate < nextCoupon;
  const couponPayment = gilt.coupon / 2;
  const periodDays = daysBetween(previousCoupon, nextCoupon);
  const elapsedDays = daysBetween(previousCoupon, settlementDate);
  const rebateDays = daysBetween(settlementDate, nextCoupon);
  const accrued = inExDividend
    ? -(couponPayment * rebateDays) / periodDays
    : (couponPayment * elapsedDays) / periodDays;

  return {
    dates,
    previousCoupon,
    nextCoupon,
    exDividend,
    inExDividend,
    couponPayment,
    periodDays,
    elapsedDays,
    rebateDays,
    accrued,
  };
}

function cashflows(gilt) {
  const context = couponContext(gilt);
  const includedDates = context.dates.filter((date) => {
    if (date <= settlementDate) return false;
    if (context.inExDividend && date <= context.nextCoupon) return false;
    return true;
  });
  return includedDates.map((date) => ({
    date,
    t: Math.max(0.0001, daysBetween(settlementDate, date) / 365.25),
    amount: context.couponPayment + (dateKey(date) === gilt.maturity ? 100 : 0),
  }));
}

function presentValue(gilt, annualYield) {
  return cashflows(gilt).reduce((total, flow) => {
    const discount = (1 + annualYield / 2) ** (2 * flow.t);
    return total + flow.amount / discount;
  }, 0);
}

function solveApproxYield(gilt) {
  const context = couponContext(gilt);
  const targetDirtyPrice = gilt.clean + context.accrued;
  let low = -0.05;
  let high = 0.15;

  for (let i = 0; i < 80; i += 1) {
    const mid = (low + high) / 2;
    const price = presentValue(gilt, mid);
    if (price > targetDirtyPrice) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return ((low + high) / 2) * 100;
}

function solveYieldDetails(gilt) {
  const context = couponContext(gilt);
  const targetDirtyPrice = gilt.clean + context.accrued;
  const solvedYield = solveApproxYield(gilt);
  const lowYield = solvedYield - 0.5;
  const highYield = solvedYield + 0.5;

  return {
    targetDirtyPrice,
    solvedYield,
    solvedPv: presentValue(gilt, solvedYield / 100),
    lowYield,
    lowPv: presentValue(gilt, lowYield / 100),
    highYield,
    highPv: presentValue(gilt, highYield / 100),
    flows: cashflows(gilt),
  };
}

function selectedGilt() {
  return gilts.find((gilt) => gilt.isin === select.value) || gilts[0];
}

function renderSelect() {
  select.innerHTML = gilts
    .map((gilt) => `<option value="${gilt.isin}">${gilt.name} - ${fmtDate(gilt.maturity)}</option>`)
    .join("");
}

function renderReadouts() {
  const gilt = selectedGilt();
  const context = couponContext(gilt);
  const calculatedDirty = gilt.clean + context.accrued;
  const yieldDetails = solveYieldDetails(gilt);
  cleanReadout.textContent = fmt(gilt.clean, 3);
  accruedReadout.textContent = fmt(context.accrued, 6);
  accruedSignpost.textContent = context.inExDividend
    ? `Rebate interest: -${fmt(context.couponPayment, 3)} x ${context.rebateDays}/${context.periodDays}`
    : `${fmt(context.couponPayment, 3)} x ${context.elapsedDays}/${context.periodDays}; derivation below`;
  dirtyReadout.textContent = fmt(calculatedDirty, 6);
  settlementReadout.textContent = fmtDate(settlementDate);
  maturityReadout.textContent = fmtDate(gilt.maturity);
  couponReadout.textContent = `${fmt(gilt.coupon, 3)}%`;
  yieldReadout.textContent = `${fmt(gilt.yield, 3)}%`;
  solvedReadout.textContent = `${fmt(yieldDetails.solvedYield, 3)}%`;
  settlementCopy.textContent = `The quoted price is from 15 May 2026, but gilt-market settlement is T+1, so cash changes hands on ${fmtDate(settlementDate)}. Accrued interest is counted to settlement, not to the quote date.`;
  maturityCopy.textContent = `${gilt.name} matures on ${fmtDate(gilt.maturity)}. That is when the final coupon and £100 principal are paid; the yield solve discounts cash flows from settlement to maturity.`;
  accrualRuleReadout.textContent = context.inExDividend
    ? "Ex-dividend: buyer receives rebate interest"
    : "Cum-dividend: buyer compensates seller";
  periodCouponReadout.textContent = fmt(context.couponPayment, 6);
  accrualDaysReadout.textContent = context.inExDividend
    ? `-${context.rebateDays}`
    : String(context.elapsedDays);
  accrualDaysDetail.textContent = context.inExDividend
    ? `${fmtDate(settlementDate)} to ${fmtDate(context.nextCoupon)}`
    : `${fmtDate(context.previousCoupon)} to ${fmtDate(settlementDate)}`;
  periodDaysReadout.textContent = String(context.periodDays);
  periodDaysDetail.textContent = `${fmtDate(context.previousCoupon)} to ${fmtDate(context.nextCoupon)}`;
  periodDaysCount.textContent = `${context.periodDays} actual calendar days`;
  derivedAccruedReadout.textContent = fmt(context.accrued, 6);
  accrualExplanation.textContent = context.inExDividend
    ? `Settlement is after the ${fmtDate(context.exDividend)} ex-dividend date, so the buyer will not receive the ${fmtDate(context.nextCoupon)} coupon. The accrued-interest term is negative: -${fmt(context.couponPayment, 6)} x ${context.rebateDays} / ${context.periodDays}.`
    : `Settlement is ${fmtDate(settlementDate)}, after the ${fmtDate(context.previousCoupon)} coupon date and before the ${fmtDate(context.nextCoupon)} coupon date. The buyer pays ${context.elapsedDays} days of accrued interest out of a ${context.periodDays}-day coupon period.`;
  targetPriceReadout.textContent = fmt(yieldDetails.targetDirtyPrice, 6);
  cashflowCountReadout.textContent = String(yieldDetails.flows.length);
  finalFlowReadout.textContent = `£${fmt(yieldDetails.flows[yieldDetails.flows.length - 1].amount, 3)}`;
  solvedPvReadout.textContent = fmt(yieldDetails.solvedPv, 6);
  lowYieldLabel.textContent = `At ${fmt(yieldDetails.lowYield, 3)}%`;
  lowPvReadout.textContent = fmt(yieldDetails.lowPv, 6);
  lowPvCopy.textContent = yieldDetails.lowPv > yieldDetails.targetDirtyPrice
    ? "PV is above the dirty price, so the trial yield is too low."
    : "PV is below the dirty price, so the trial yield is too high.";
  highYieldLabel.textContent = `At ${fmt(yieldDetails.highYield, 3)}%`;
  highPvReadout.textContent = fmt(yieldDetails.highPv, 6);
  highPvCopy.textContent = yieldDetails.highPv > yieldDetails.targetDirtyPrice
    ? "PV is above the dirty price, so the trial yield is too low."
    : "PV is below the dirty price, so the trial yield is too high.";
  yieldExplanation.textContent = `The approximate solved yield is the annual rate that makes the present value of ${yieldDetails.flows.length} remaining cash flow${yieldDetails.flows.length === 1 ? "" : "s"} equal ${fmt(yieldDetails.targetDirtyPrice, 6)}. A higher yield lowers present value; a lower yield raises it.`;
  previousCouponReadout.textContent = fmtDate(context.previousCoupon);
  exdivReadout.textContent = fmtDate(context.exDividend);
  nextCouponReadout.textContent = fmtDate(context.nextCoupon);
  statusReadout.textContent = context.inExDividend ? "Ex-dividend" : "Cum-dividend";
  statusCopy.textContent = context.inExDividend
    ? "The buyer is not entitled to the next coupon and receives rebate interest."
    : "The buyer is entitled to the next coupon and pays accrued interest to the seller.";
  formulaCopy.textContent = context.inExDividend
    ? `Accrued interest = -${fmt(context.couponPayment, 4)} x ${context.rebateDays} days / ${context.periodDays} days = ${fmt(context.accrued, 6)}. This is rebate interest because settlement is inside the ex-dividend period.`
    : `Accrued interest = ${fmt(context.couponPayment, 4)} x ${context.elapsedDays} days / ${context.periodDays} days = ${fmt(context.accrued, 6)}. Dirty price = ${fmt(gilt.clean, 3)} + ${fmt(context.accrued, 6)} = ${fmt(calculatedDirty, 6)}.`;
  couponStrip.innerHTML = cashflows(gilt)
    .map((flow, index) => `
      <div>
        <span>${index === 0 ? "Next paid" : "Coupon"}</span>
        <strong>${fmtDate(flow.date)}</strong>
        <small>£${fmt(flow.amount, 3)}</small>
      </div>
    `)
    .join("");
  curveSummary.textContent = `${gilt.name} matures in ${fmt(yearsToMaturity(gilt), 1)} years from settlement. Its clean price of ${fmt(gilt.clean, 3)} becomes a calculated dirty price of ${fmt(calculatedDirty, 6)} after applying the gilt accrued-interest convention, and the snapshot yield is ${fmt(gilt.yield, 3)}%.`;
}

function pointFor(gilt, scales) {
  const years = yearsToMaturity(gilt);
  const x = scales.left + ((years - scales.minYears) / (scales.maxYears - scales.minYears)) * scales.width;
  const y = scales.top + scales.height - ((gilt.yield - scales.minYield) / (scales.maxYield - scales.minYield)) * scales.height;
  return { x, y, years };
}

function renderChart() {
  const box = chart.getBoundingClientRect();
  const width = Math.max(320, box.width || 980);
  const height = Math.max(360, box.height || 500);
  const margin = width < 620
    ? { top: 34, right: 18, bottom: 52, left: 48 }
    : { top: 42, right: 32, bottom: 58, left: 62 };
  const minYears = 0;
  const maxYears = Math.ceil(Math.max(...gilts.map(yearsToMaturity)));
  const minYield = 3.5;
  const maxYield = 6.1;
  const scales = {
    left: margin.left,
    top: margin.top,
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
    minYears,
    maxYears,
    minYield,
    maxYield,
  };
  const selected = selectedGilt();
  const points = gilts.map((gilt) => ({ gilt, ...pointFor(gilt, scales) }));
  const line = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
  const xTicks = [0, 5, 10, 20, 30, 40, 48];
  const yTicks = [3.5, 4, 4.5, 5, 5.5, 6];

  chart.setAttribute("viewBox", `0 0 ${width} ${height}`);
  chart.innerHTML = `
    <title id="chart-title">UK gilt yield curve from Tradeweb closing prices</title>
    <desc id="chart-desc">A line chart plotting conventional gilt yields by years to maturity from the 15 May 2026 snapshot.</desc>
    ${yTicks.map((tick) => {
      const y = scales.top + scales.height - ((tick - minYield) / (maxYield - minYield)) * scales.height;
      return `<line class="grid-line" x1="${scales.left}" x2="${scales.left + scales.width}" y1="${y}" y2="${y}"></line>
        <text class="dot-label" x="${scales.left - 10}" y="${y + 4}" text-anchor="end">${tick.toFixed(1)}%</text>`;
    }).join("")}
    ${xTicks.map((tick) => {
      const x = scales.left + ((tick - minYears) / (maxYears - minYears)) * scales.width;
      return `<line class="grid-line" x1="${x}" x2="${x}" y1="${scales.top}" y2="${scales.top + scales.height}" opacity="0.55"></line>
        <text class="dot-label" x="${x}" y="${height - 18}" text-anchor="middle">${tick}y</text>`;
    }).join("")}
    <path class="curve-line" d="${line}"></path>
    ${points.map((point) => `
      <circle
        class="curve-dot${point.gilt.isin === selected.isin ? " is-selected" : ""}"
        data-isin="${point.gilt.isin}"
        cx="${point.x}"
        cy="${point.y}"
        r="${point.gilt.isin === selected.isin ? 6 : 4.5}">
      </circle>
    `).join("")}
    <text class="dot-label" x="${scales.left}" y="22">Yield to maturity</text>
    <text class="dot-label" x="${width - margin.right}" y="${height - 18}" text-anchor="end">Years to maturity</text>
  `;

  chart.querySelectorAll(".curve-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      select.value = dot.dataset.isin;
      update();
    });
    dot.addEventListener("mouseenter", () => showTooltip(dot));
    dot.addEventListener("mouseleave", () => {
      tooltip.hidden = true;
    });
  });
}

function showTooltip(dot) {
  const gilt = gilts.find((item) => item.isin === dot.dataset.isin);
  if (!gilt) return;
  const chartRect = chart.getBoundingClientRect();
  const x = Number(dot.getAttribute("cx"));
  const y = Number(dot.getAttribute("cy"));
  tooltip.innerHTML = `<strong>${gilt.name}</strong><br>${fmtDate(gilt.maturity)}<br>Yield ${fmt(gilt.yield, 3)}%, clean ${fmt(gilt.clean, 3)}`;
  tooltip.style.left = `${Math.min(chartRect.width - 270, Math.max(12, x + 12))}px`;
  tooltip.style.top = `${Math.max(12, y - 62)}px`;
  tooltip.hidden = false;
}

function update() {
  renderReadouts();
  renderChart();
}

renderSelect();
select.addEventListener("change", update);
window.addEventListener("resize", renderChart);
update();
