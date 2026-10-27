const keySizes={
  "512":{label:"RSA-512",digits:"155 digits",title:"Broken in hours — never use",
    body:"RSA-512 is the demonstration case: an academic cluster took five months in 1999, and a single modern machine can now finish the job in hours. It shows that factoring attacks are practical, not hypothetical.",
    facts:[["Digits","155"],["Classical status","Repeatedly factored"],["Quantum status","Trivial for a CRQC"],["Verdict","Obsolete"]],
    classicalLabel:"Hours",cBar:4,quantumLabel:"Minutes",qBar:3},
  "1024":{label:"RSA-1024",digits:"312 digits",title:"Deprecated — within reach of a patient adversary",
    body:"No full RSA-1024 factoring has been published, but the margin has been eroding for two decades. NIST discouraged new use after 2013, and a well-resourced actor is widely assumed to be capable of it.",
    facts:[["Digits","312"],["Classical status","No public break, considered feasible"],["Quantum status","Minutes to hours"],["Verdict","Do not deploy"]],
    classicalLabel:"Years+ (well-resourced)",cBar:24,quantumLabel:"Minutes to hours",qBar:6},
  "2048":{label:"RSA-2048",digits:"617 digits",title:"Safe today, exposed after Q-Day",
    body:"This is the current workhorse of web and TLS encryption. Factoring it classically is far beyond any existing or plausible classical machine — while a fault-tolerant quantum computer running Shor's algorithm is expected to need only hours. That gap between the two columns is the entire risk in one picture.",
    facts:[["Digits","617"],["Classical status","Impractical — centuries at minimum"],["Quantum status","Estimated ~8 hours on ~20 million physical qubits (2019 estimate, since revised downward)"],["Verdict","Migrate before 2030–35"]],
    classicalLabel:"Far beyond any computer",cBar:66,quantumLabel:"~8 hours (projected)",qBar:14},
  "4096":{label:"RSA-4096",digits:"1,234 digits",title:"Buys classical headroom, none against Shor",
    body:"Doubling the key size multiplies classical difficulty enormously but only adds polynomial quantum work. A larger key buys time against the slow, patient classical threat and almost none against a CRQC.",
    facts:[["Digits","1,234"],["Classical status","Effectively unbreakable for the foreseeable future"],["Quantum status","Same attack, somewhat more resources"],["Verdict","Not a quantum defence"]],
    classicalLabel:"Unreachable classically",cBar:100,quantumLabel:"Hours to days (projected)",qBar:24}
};

const keyButtons=[...document.querySelectorAll("[data-key]")],keyNote=document.querySelector("#key-note");
const classicalBar=document.querySelector("#key-classical-bar"),quantumBar=document.querySelector("#key-quantum-bar");
const classicalLabel=document.querySelector("#key-classical"),quantumLabel=document.querySelector("#key-quantum");

function renderKey(key){
  const size=keySizes[key];
  keyNote.innerHTML=`<div><span>${size.digits}</span><h3>${size.title}</h3><p>${size.body}</p></div><ul>${size.facts.map(([name,value])=>`<li><strong>${name}</strong>${value}</li>`).join("")}</ul>`;
  classicalLabel.textContent=size.classicalLabel;
  quantumLabel.textContent=size.quantumLabel;
  classicalBar.style.width=size.cBar+"%";
  quantumBar.style.width=size.qBar+"%";
  keyButtons.forEach(button=>{
    const active=button.dataset.key===key;
    button.classList.toggle("active",active);
    button.setAttribute("aria-selected",String(active));
  });
}
keyButtons.forEach(button=>button.addEventListener("click",()=>renderKey(button.dataset.key)));

const horizonButtons=[...document.querySelectorAll("[data-horizon]")],hndlCard=document.querySelector("#hndl-card");

function renderHorizon(key){
  const horizon=horizons[key];
  hndlCard.innerHTML=`<div class="hndl-head"><span>${horizon.risk}</span><h3>${horizon.title}</h3></div><p>${horizon.body}</p><div class="hndl-cols"><article><h4>What a stored-traffic attacker gets</h4><p>${horizon.gets}</p></article><article><h4>What to do</h4><p>${horizon.doThis}</p></article></div>`;
  horizonButtons.forEach(button=>{
    const active=button.dataset.horizon===key;
    button.classList.toggle("active",active);
    button.setAttribute("aria-selected",String(active));
  });
}
horizonButtons.forEach(button=>button.addEventListener("click",()=>renderHorizon(button.dataset.horizon)));

const horizons={
  short:{risk:"Low harvest exposure",title:"Under a year: quantum is not your main problem",
    body:"Data that only needs to stay secret for months is unlikely to outlive the migration window. The live risks here are ordinary ones: stolen credentials, exposed keys, software flaws, and AI-assisted attacks on how the cryptography is implemented rather than on the mathematics.",
    gets:"Very little of lasting value: the traffic would be readable only if a CRQC arrives almost immediately, and its short shelf life makes long-term storage pointless.",
    doThis:"Focus on patching, key management, TLS configuration and side-channel resistance — the same hygiene that blunts AI-driven attacks."},
  medium:{risk:"Partially exposed",title:"1–5 years: you are inside the danger window",
    body:"If Q-Day lands in the early 2030s — the middle of most expert estimates — traffic captured now and held for three years becomes readable on arrival. Confidentiality requirements of this length are exactly what harvest-now-decrypt-later models target.",
    gets:"Everything in captured sessions: contracts, credentials, internal documents, location and behavioural logs — useful for years after collection.",
    doThis:"Treat these systems as priority migrations: deploy hybrid post-quantum key exchange now, and prefer algorithms with forward secrecy so stored handshakes cannot be replayed later."},
  long:{risk:"Already vulnerable",title:"5–20 years: the harvest has already begun",
    body:"This is the classic harvest-now-decrypt-later case. Adversaries are assessed to be intercepting and storing encrypted traffic today — state secrets, corporate IP, healthcare and financial records — precisely because they expect to read it a decade from now. If your data must be confidential into the 2030s, it is vulnerable now.",
    gets:"Long-lived intelligence: material that stays sensitive for a decade — negotiations, health data, defence and critical-infrastructure communications — decrypted retroactively the moment a CRQC switches on.",
    doThis:"Migration is not optional. Inventory public-key usage, prioritise these systems, and move to NIST post-quantum standards with hybrid deployment before the agency deadlines."},
  vlong:{risk:"Maximum exposure",title:"Decades: worst case for harvest now, decrypt later",
    body:"Some data is designed to stay secret for a lifetime: medical and genomic records, state secrets, legal privilege, trade secrets, journalistic sources. A capture today can be decrypted in the 2050s and still damage someone.",
    gets:"A permanent archive of your past communications, held by whoever collected it, readable for as long as they keep it.",
    doThis:"Assume stored captures will eventually be opened. Migrate to post-quantum cryptography immediately, minimise what is retained, and prefer systems that cannot be decrypted retroactively."}
};


renderKey("2048");
renderHorizon("long");
