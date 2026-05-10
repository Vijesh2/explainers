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

function compactFractionBits(bits) {
  const compact = bits.replace(/0+$/, "");
  return compact || "0";
}

function storedSignificand(parts) {
  if (parts.classification === "normal") {
    return `1.${compactFractionBits(parts.fractionBits)}`;
  }
  if (parts.classification === "subnormal") {
    return `0.${compactFractionBits(parts.fractionBits)}`;
  }
  return "special value";
}

function binaryPointMovement(exponent) {
  if (exponent === 0) {
    return "The binary point is already after the first 1.";
  }

  const direction = exponent > 0 ? "left" : "right";
  const count = Math.abs(exponent);
  const places = count === 1 ? "place" : "places";
  return `Move the binary point ${count} ${places} ${direction} so the number starts with one digit before the point.`;
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
  const integerPart = integerBinary(parts.rounded);
  const fractionPart = fractionBinary(parts.rounded);
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
        <p>The first bit answers one question: is the number positive or negative?</p>
        <p>A sign bit of <strong>0</strong> means positive. A sign bit of <strong>1</strong> means negative.</p>
        ${htmlRows([
          ["Sign bit", `${parts.sign}`],
          ["Meaning", signMeaning]
        ])}
      `
    },
    {
      title: "Convert to binary",
      body: `
        <p>Before the number can be stored in bits, the example is written in base 2. In base 10, places are ones, tens, hundreds. In base 2, places are 1, 2, 4, 8 to the left of the point, and 1/2, 1/4, 1/8 to the right.</p>
        <p>For the worked example we ignore the sign for a moment and convert <strong>${formatNumber(absoluteRounded)}</strong>.</p>
        ${htmlRows([
          ["Whole part", `${Math.floor(absoluteRounded)} in decimal -> ${integerPart} in binary`],
          ["Fraction part", `${formatNumber(absoluteRounded - Math.floor(absoluteRounded))} in decimal -> .${fractionPart} in binary`],
          ["Together", `${binaryApprox}`]
        ])}
        <div class="note-box">Fraction bits are found by repeatedly doubling the fractional remainder. Each time the doubled value reaches 1, the next bit is 1; otherwise it is 0.</div>
      `
    },
    {
      title: "Normalize",
      body: `
        <p>Floating point stores numbers in a compact scientific-notation style. The binary point is moved until the number starts with exactly one digit before the point.</p>
        <p>The number of places moved becomes the exponent. This is why it is called <strong>floating point</strong>: the point can move.</p>
        ${htmlRows([
          ["Before", binaryApprox],
          ["Move", parts.classification === "normal" ? binaryPointMovement(parts.unbiasedExponent) : "Special case"],
          ["After", parts.classification === "normal" ? `${storedSignificand(parts)} x 2^${parts.unbiasedExponent}` : "Subnormal, zero, infinity, and NaN values use reserved exponent patterns"]
        ])}
        ${specialNote}
      `
    },
    {
      title: "Store the exponent",
      body: `
        <p>The exponent records how far the binary point moved. Float32 does not store that number directly; it adds a fixed bias of 127 first, so negative and positive exponents can both fit in the same 8-bit field.</p>
        ${htmlRows([
          ["Point movement", parts.classification === "normal" ? `${parts.unbiasedExponent}` : "reserved"],
          ["Add the bias", parts.classification === "normal" ? `${parts.unbiasedExponent} + 127 = ${parts.rawExponent}` : "reserved exponent pattern"],
          ["Exponent bits", groupedBits(parts.exponentBits)]
        ])}
      `
    },
    {
      title: "Store the fraction",
      body: `
        <p>After normalization, normal numbers always start with <strong>1.</strong>. Because that leading 1 is guaranteed, float32 does not spend a bit storing it. It stores only the digits after the point.</p>
        ${htmlRows([
          ["Sign", parts.sign],
          ["Exponent", groupedBits(parts.exponentBits)],
          ["Fraction", groupedBits(parts.fractionBits)],
          ["All 32 bits", groupedBits(parts.bits)],
          ["Hex view", parts.hex]
        ])}
        <div class="inline-formula"><code>value = (-1)^sign x 1.fraction x 2^(exponent - 127)</code></div>
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
