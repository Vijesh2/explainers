const input = document.querySelector("#number-input");
const storedDecimal = document.querySelector("#stored-decimal");
const bitGrid = document.querySelector("#bit-grid");
const stepTabs = [...document.querySelectorAll("[data-step]")];
const presetButtons = [...document.querySelectorAll("[data-preset]")];
const stepCount = document.querySelector("#step-count");
const stepTitle = document.querySelector("#step-title");
const stepBody = document.querySelector("#step-body");

let activeStep = 0;

function float32Parts(value) {
  const rounded = Math.fround(value);
  const buffer = new ArrayBuffer(4);
  const view = new DataView(buffer);
  view.setFloat32(0, rounded, false);
  const bits = view.getUint32(0, false).toString(2).padStart(32, "0");
  const sign = bits.slice(0, 1);
  const exponentBits = bits.slice(1, 9);
  const fractionBits = bits.slice(9);
  const rawExponent = parseInt(exponentBits, 2);
  const fractionInt = parseInt(fractionBits, 2);
  const unbiasedExponent = rawExponent - 127;
  const classification = classify(rawExponent, fractionInt, rounded);

  return {
    inputValue: value,
    rounded,
    bits,
    sign,
    exponentBits,
    fractionBits,
    rawExponent,
    fractionInt,
    unbiasedExponent,
    classification,
    hex: "0x" + parseInt(bits, 2).toString(16).padStart(8, "0").toUpperCase()
  };
}

function classify(rawExponent, fractionInt, rounded) {
  if (Number.isNaN(rounded)) return "NaN";
  if (rawExponent === 255 && fractionInt === 0) return "infinity";
  if (rawExponent === 0 && fractionInt === 0) return "zero";
  if (rawExponent === 0) return "subnormal";
  return "normal";
}

function integerBinary(value) {
  if (!Number.isFinite(value)) return "not finite";
  const integer = Math.floor(Math.abs(value));
  return integer.toString(2);
}

function fractionBinary(value, places = 28) {
  if (!Number.isFinite(value)) return "not finite";
  let fraction = Math.abs(value) - Math.floor(Math.abs(value));
  const bits = [];

  for (let i = 0; i < places; i += 1) {
    fraction *= 2;
    if (fraction >= 1) {
      bits.push("1");
      fraction -= 1;
    } else {
      bits.push("0");
    }
    if (fraction === 0) break;
  }

  return bits.join("") || "0";
}

function groupedBits(text, size = 4) {
  return text.match(new RegExp(`.{1,${size}}`, "g")).join(" ");
}

function formatNumber(value) {
  if (Object.is(value, -0)) return "-0";
  if (Number.isNaN(value)) return "NaN";
  if (!Number.isFinite(value)) return value > 0 ? "Infinity" : "-Infinity";
  return value.toPrecision(9).replace(/\.?0+($|e)/, "$1");
}

function normalSignificand(parts) {
  if (parts.classification === "subnormal") {
    return `0.${parts.fractionBits}`;
  }
  if (parts.classification === "normal") {
    return `1.${parts.fractionBits}`;
  }
  return "special value";
}

function htmlRows(rows) {
  return `
    <div class="work-box">
      ${rows.map(([label, value]) => `
        <div class="work-row">
          <span>${label}</span>
          <code>${value}</code>
        </div>
      `).join("")}
    </div>
  `;
}

function renderBits(parts) {
  bitGrid.innerHTML = "";
  [...parts.bits].forEach((bit, index) => {
    const cell = document.createElement("div");
    const field = index === 0 ? "sign" : index < 9 ? "exponent" : "fraction";
    cell.className = `bit ${field}`;
    cell.title = `bit ${index}: ${field}`;
    cell.innerHTML = `${bit}<small>${index}</small>`;
    bitGrid.appendChild(cell);
  });
}

function stepContent(parts) {
  const absoluteRounded = Math.abs(parts.rounded);
  const binaryApprox = `${integerBinary(parts.rounded)}.${fractionBinary(parts.rounded)}`;
  const signMeaning = parts.sign === "1" ? "negative" : "positive";

  const specialNote = parts.classification === "normal" ? "" : `
    <div class="warning">
      This is a ${parts.classification} value, so IEEE 754 uses a special rule instead of the everyday normal-number formula.
    </div>
  `;

  return [
    {
      title: "Sign",
      body: `
        <p>The first bit stores only the direction of the number. A <strong>0</strong> means positive, and a <strong>1</strong> means negative.</p>
        ${htmlRows([
          ["Rounded input", formatNumber(parts.rounded)],
          ["Sign bit", `${parts.sign} (${signMeaning})`],
          ["Magnitude", formatNumber(absoluteRounded)]
        ])}
      `
    },
    {
      title: "Convert to binary",
      body: `
        <p>Computers store the value in base 2. Whole-number places are powers of two to the left of the point; fractional places are halves, quarters, eighths, and so on.</p>
        ${htmlRows([
          ["Decimal", formatNumber(absoluteRounded)],
          ["Binary form", binaryApprox],
          ["Pattern", "The fractional part is found by repeatedly multiplying the remainder by 2."]
        ])}
      `
    },
    {
      title: "Normalize",
      body: `
        <p>Normal floats move the binary point until one non-zero digit sits before it. The number of moves becomes the exponent.</p>
        ${htmlRows([
          ["Significand", normalSignificand(parts)],
          ["Power of two", parts.classification === "normal" ? `2^${parts.unbiasedExponent}` : "special case"],
          ["Meaning", parts.classification === "normal" ? `${normalSignificand(parts)} x 2^${parts.unbiasedExponent}` : "subnormal, zero, infinity, and NaN values use reserved exponent patterns"]
        ])}
        ${specialNote}
      `
    },
    {
      title: "Store the exponent",
      body: `
        <p>Float32 uses an 8-bit exponent with a bias of 127. Instead of storing the exponent directly, it stores <strong>exponent + 127</strong>.</p>
        ${htmlRows([
          ["Real exponent", parts.classification === "normal" ? parts.unbiasedExponent : "reserved"],
          ["Stored exponent", parts.rawExponent],
          ["Exponent bits", groupedBits(parts.exponentBits)]
        ])}
      `
    },
    {
      title: "Store the fraction",
      body: `
        <p>For normal numbers, the leading <strong>1</strong> is assumed and does not need a bit. The remaining digits after the binary point fill the 23 fraction bits.</p>
        ${htmlRows([
          ["Sign", parts.sign],
          ["Exponent", groupedBits(parts.exponentBits)],
          ["Fraction", groupedBits(parts.fractionBits)],
          ["All 32 bits", groupedBits(parts.bits)],
          ["Hex view", parts.hex]
        ])}
        <p>The stored float32 value is <strong>${formatNumber(parts.rounded)}</strong>. If that differs from the decimal you typed, the nearest available 32-bit pattern was chosen.</p>
      `
    }
  ];
}

function renderStep(parts) {
  const steps = stepContent(parts);
  const step = steps[activeStep];
  stepCount.textContent = `Step ${activeStep + 1} of ${steps.length}`;
  stepTitle.textContent = step.title;
  stepBody.innerHTML = step.body;
  stepTabs.forEach((tab, index) => {
    tab.classList.toggle("active", index === activeStep);
    tab.setAttribute("aria-current", index === activeStep ? "step" : "false");
  });
}

function render() {
  const value = Number(input.value);
  const parts = float32Parts(value);
  storedDecimal.textContent = formatNumber(parts.rounded);
  renderBits(parts);
  renderStep(parts);
}

input.addEventListener("input", render);

presetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    input.value = button.dataset.preset;
    render();
  });
});

stepTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activeStep = Number(tab.dataset.step);
    render();
  });
});

render();
