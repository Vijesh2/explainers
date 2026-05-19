const layerButtons = [...document.querySelectorAll("[data-layer]")];
const layerCard = document.querySelector("#layer-card");

const layers = {
  operators: {
    title: "Passenger operators are moving into public ownership",
    body: "This is the nationalisation part that passengers can track by company name. DfT-contracted operators transfer as contracts expire or hit break points, using the Passenger Railway Services (Public Ownership) Act 2024.",
    points: [
      "South Western Railway, c2c, Greater Anglia and West Midlands Trains had transferred by 19 May 2026.",
      "Govia Thameslink Railway, Chiltern Railways and Great Western Railway had published transfer dates.",
      "The government target is to complete DfT-contracted passenger transfers by the end of 2027."
    ]
  },
  infrastructure: {
    title: "GBR is meant to join track and train",
    body: "Network Rail already sits in the public sector, so the bigger GBR change is integration: one body planning infrastructure, passenger operations, timetables and access together.",
    points: [
      "The Railways Bill would create the legal basis for GBR.",
      "Royal Assent is not formally scheduled; current commentary expects the Bill to become law in autumn 2026, putting GBR operation around autumn 2027.",
      "The policy aim is one public directing mind rather than separate infrastructure and operator incentives."
    ]
  },
  tickets: {
    title: "Ticketing should become more centralised",
    body: "The public-facing promise is less fragmentation: one official GBR app and website, a clearer passenger offer, and powers to reform fares and retail.",
    points: [
      "The government says passengers should not need to navigate 14 separate operator websites.",
      "A single GBR ticketing offer is expected to sell GBR services without booking fees.",
      "Simpler fares are possible, but this is not the same as an automatic fare cut."
    ]
  },
  outside: {
    title: "Some rail activity stays outside the core GBR model",
    body: "GBR is public, but it is not a complete state takeover of every company or railway service connected to Britain's rail system.",
    points: [
      "Open access operators are passenger companies that run services outside the main DfT contracts after getting track-access rights, such as Hull Trains, Grand Central and Lumo; they are not folded into the DfT passenger transfer programme.",
      "Rolling stock leasing and many suppliers remain private-sector activities.",
      "Devolved and local services such as ScotRail, Transport for Wales, London Overground, the Elizabeth line and Merseyrail are not simply absorbed into GBR."
    ]
  }
};

function renderLayer(key) {
  const layer = layers[key];
  layerCard.innerHTML = `
    <h3>${layer.title}</h3>
    <p>${layer.body}</p>
    <ul>
      ${layer.points.map((point) => `<li>${point}</li>`).join("")}
    </ul>
  `;

  layerButtons.forEach((button) => {
    const isActive = button.dataset.layer === key;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
}

layerButtons.forEach((button) => {
  button.addEventListener("click", () => renderLayer(button.dataset.layer));
});

renderLayer("operators");
