import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const SITE = {
  name: "Nicholas Ng",
  role: "Culinary Creative · Pastry & R&D",
  location: "Toronto, Canada",
  email: "n25ng@uwaterloo.ca",
  availabilityNote: "Open to kitchen stages & R&D internships",
  socials: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/nicholas-ng1/" }],
  accentChoices: [
    { name: "Pastel Peach", class: "from-rose-100 to-orange-100" },
    { name: "Matcha", class: "from-lime-100 to-emerald-100" },
    { name: "Blueberry", class: "from-sky-100 to-indigo-100" },
  ],
};

const PROJECTS = [
  {
    slug: "process-kanban-batch-calendar",
    title: "Prep Kanban & Batch Calendar",
    role: "Process Design",
    blurb:
      "Visual par-levels + time-blocked batches to smooth proofing windows and reduce waste during service.",
    link: "#/journal/process-kanban-batch-calendar",
    tags: ["process", "kanban", "operations"],
  },
  {
    slug: "process-label-traceability-fifo",
    title: "Labeling, Traceability & FIFO",
    role: "Process Design",
    blurb:
      "Color-coded day dots + QR-linked SOPs for clean handoffs, allergen clarity, and first-in-first-out discipline.",
    link: "#/journal/process-label-traceability-fifo",
    tags: ["process", "labeling", "food safety"],
  },
  {
    slug: "menu-spring-shiso-mille-feuille",
    title: "Spring: Strawberry–Shiso Mille‑Feuille",
    role: "Culinary R&D",
    blurb:
      "Toasted‑rice crème diplomate, green strawberry, shiso syrup, black sesame dust; crisp‑creamy‑herbal.",
    link: "#/journal/menu-spring-shiso-mille-feuille",
    tags: ["R&D", "spring", "pastry"],
  },
  {
    slug: "menu-summer-stone-fruit-flight",
    title: "Summer: Stone Fruit Flight",
    role: "Culinary R&D",
    blurb:
      "3% salted milk ice cream, compressed nectarines, roasted apricot vinegar, hojicha tuile — salt × acid × fat.",
    link: "#/journal/menu-summer-stone-fruit-flight",
    tags: ["R&D", "summer", "tasting"],
  },
  {
    slug: "menu-autumn-kabocha-praline-tart",
    title: "Autumn: Kabocha–Pumpkin Seed Praline Tart",
    role: "Culinary R&D",
    blurb:
      "Miso caramel, pepita praline, buckwheat pâte sucrée; nutty, saline, with gentle bitterness for balance.",
    link: "#/journal/menu-autumn-kabocha-praline-tart",
    tags: ["R&D", "autumn", "tart"],
  },
  {
    slug: "menu-winter-pear-sake-lees-parfait",
    title: "Winter: Roasted Pear × Sake Lees Parfait",
    role: "Culinary R&D",
    blurb:
      "Pear roasted in brown butter, sake lees semifreddo, buckwheat crisp, yuzu-gel accents; warm–cold contrast.",
    link: "#/journal/menu-winter-pear-sake-lees-parfait",
    tags: ["R&D", "winter", "parfait"],
  },
];

const RECIPES = [
  {
    title: "Brown Butter Miso Cookie",
    summary:
      "Umami‑sweet cookie; barley malt for gloss, white miso for salinity; low spread; freeze‑to‑bake friendly.",
    link: "#/journal/recipe-brown-butter-miso-cookie",
    tags: ["cookie", "savory‑sweet"],
  },
  {
    title: "Cream Cheese Garlic Dinner Rolls",
    summary:
      "Enriched pull‑apart rolls; cream cheese tenderizes crumb; roasted garlic butter glaze + chive salt finish.",
    link: "#/journal/recipe-cream-cheese-garlic-rolls",
    tags: ["bread", "family meal"],
  },
  {
    title: "Braised Beef Short Rib",
    summary:
      "Low‑and‑slow red‑wine braise with soy aromatics; glossed jus; parsnip purée and pickled shallot for lift.",
    link: "#/journal/recipe-braised-beef-short-rib",
    tags: ["savory", "braise"],
  },
];

const JOURNAL = {
  "process-kanban-batch-calendar": {
    title: "Prep Kanban & Batch Calendar",
    type: "Process Design",
    tags: ["kanban", "par levels", "proofing"],
    summary:
      "A visual system to smooth production: define pars, time‑block batches, and expose proofing windows at a glance.",
    sections: [
      { heading: "Objective", body: ["Reduce over/under‑production, missed proofing windows, and last‑minute fire drills during service."] },
      { heading: "Context & Constraints", body: ["Shared retarder; two deck ovens; 4 bakers split across AM/PM; viennoiserie + savory prep; limited sheet trays."] },
      { heading: "Design", body: [
        "Board columns: To‑Batch → Proofing → Retard → Bake → Done. Each card = batch with SKU, qty, target time, oven, and owner.",
        "Color code by service (AM/PM). Par levels visible at top; when below par, a trigger auto‑adds a batch card.",
        "Batch Calendar: 30‑/60‑min blocks mapped to proofer capacity; dough temp targets logged on the card.",
      ] },
      { heading: "SOP (Daily)", body: [
        "Stand‑up: review yesterday’s miss (≤5 min); pull cards until pars met; assign owners.",
        "During prep: move cards right as states change; log actuals vs. targets (dough temp, proof start/finish).",
        "Pre‑service: reconcile open cards; slide non‑critical to next window; escalate constraints (space/heat).",
      ] },
      { heading: "Metrics & Outcomes", body: ["Target: ≤5% product outside ideal proof; ≥95% pars met by T‑30; ≥30% reduction in last‑minute bakes."] },
      { heading: "Iteration Notes", body: ["Added 15‑min ‘float’ buffers around lamination during heat waves; introduced cross‑training tags on cards."] },
    ],
  },
  "process-label-traceability-fifo": {
    title: "Labeling, Traceability & FIFO",
    type: "Process Design",
    tags: ["labeling", "allergens", "FIFO"],
    summary:
      "Standardized labels with QR‑linked SOPs, day‑dot colors, and batch codes to make FIFO and handoffs effortless.",
    sections: [
      { heading: "Objective", body: ["Eliminate unlabeled containers and allergen ambiguity; accelerate onboarding; enforce FIFO without nagging."] },
      { heading: "Label Spec", body: [
        "Fields: product code, prep date/time, owner, allergens (icons), batch code (YYWW‑SKU‑##), discard date.",
        "QR: points to SKU SOP (prep steps, hold temps, yield, plating).",
        "Day‑dot color by weekday; shelf map shows dedicated zones to prevent cross‑contamination.",
      ] },
      { heading: "SOP", body: [
        "Prep: print label before starting; apply after mixing; place in assigned shelf zone.",
        "Pull: oldest batch first; if labels mismatch contents, container is quarantined until resolved.",
        "Close: reconcile waste log; capture ‘reason’ for any discard over 2% per SKU.",
      ] },
      { heading: "Metrics", body: ["Audit goal: 0 unlabeled containers; ≤1% waste on high‑volume SKUs; 100% allergen fields completed."] },
      { heading: "Notes", body: ["QRs reduced verbal SOP questions by ~40%; added bilingual allergen icon legend near label printer."] },
    ],
  },
  "menu-spring-shiso-mille-feuille": {
    title: "Spring: Strawberry–Shiso Mille‑Feuille",
    type: "Menu R&D",
    tags: ["spring", "pastry", "crisp×cream"],
    summary:
      "Crisp laminated layers with toasted‑rice crème, green strawberry brightness, and shiso herbal lift.",
    sections: [
      { heading: "Components", body: ["Rough‑puff layers; toasted‑rice milk crème diplomate; macerated green strawberries; shiso syrup; black sesame dust."] },
      { heading: "Texture & Balance", body: ["Target: crackle → custard → juicy; fat from crème vs. acid from unripe berries; herb for length."] },
      { heading: "Prep Timeline", body: ["D‑1 lamination + bake; D‑0 crème, syrup, macerate berries; assemble à la minute to protect crispness."] },
      { heading: "Service Notes", body: ["Warm layers lightly; pipe cooled crème; finish with shiso threads and sesame micro‑dust just before pass."] },
    ],
  },
  "menu-summer-stone-fruit-flight": {
    title: "Summer: Stone Fruit Flight",
    type: "Menu R&D",
    tags: ["summer", "tasting", "salted ice cream"],
    summary:
      "Salt × acid × fat: 3% salted milk ice cream; compressed nectarines; roasted apricot vinegar; hojicha tuile.",
    sections: [
      { heading: "Plates", body: ["#1 Nectarine + salted milk ice cream; #2 Apricot caramel + vinegar gel; #3 Plum with hojicha tuile shards."] },
      { heading: "Why 3% Salt?", body: ["Enhances dairy and tamps sweetness in the heat; pairs with stone fruit acidity without palate fatigue."] },
      { heading: "Prep & Pars", body: ["Spin base daily; compress fruit T‑2h; bake tuiles D‑1; carry 10% buffer on ice cream in heat waves."] },
    ],
  },
  "menu-autumn-kabocha-praline-tart": {
    title: "Autumn: Kabocha–Pumpkin Seed Praline Tart",
    type: "Menu R&D",
    tags: ["autumn", "tart", "miso caramel"],
    summary:
      "Buckwheat crust, pepita praline, miso caramel, kabocha custard; nutty, saline, gently bitter.",
    sections: [
      { heading: "Build", body: ["Buckwheat pâte sucrée shell; kabocha purée custard; thin miso caramel layer; pepita brittle shards."] },
      { heading: "Balance", body: ["Pepita bitterness and miso salinity counter custard sweetness; finish with crème fraîche quenelle."] },
      { heading: "Ops", body: ["Blind bake shells D‑1; fill and set D‑0; brittle at pass; track cut loss (goal ≤8%)."] },
    ],
  },
  "menu-winter-pear-sake-lees-parfait": {
    title: "Winter: Roasted Pear × Sake Lees Parfait",
    type: "Menu R&D",
    tags: ["winter", "parfait", "buckwheat"],
    summary:
      "Brown‑butter roasted pear, sake‑lees semifreddo, buckwheat crisp, yuzu gel; warm–cold contrast.",
    sections: [
      { heading: "Components", body: ["Sake‑lees semifreddo; roasted pears; buckwheat streusel; yuzu gel; pear‑skin syrup for aroma."] },
      { heading: "Service", body: ["Hold semifreddo at ‑12 °C; warm pears T‑3 min; build quickly to preserve temperature contrast."] },
      { heading: "Risks", body: ["Lees vary in salinity; taste‑adjust sugar; avoid overpowering with yuzu — use as accent only."] },
    ],
  },
  "recipe-brown-butter-miso-cookie": {
    title: "Brown Butter Miso Cookie",
    type: "Recipe Development",
    tags: ["cookie", "miso", "barley malt"],
    yield: "~16 cookies @ 60 g each (≈960 g dough)",
    summary:
      "Umami‑sweet cookie. Brown butter for nutty depth, white miso for gentle salinity/umami, barley malt for shine. Resting improves hydration and flavor.",
    ingredients: [
      {
        title: "Base (Baker’s % vs. Flour)",
        base: { label: "Flour base", grams: 300 },
        items: [
          { name: "All‑purpose flour", grams: 300, notes: "11% protein target" },
          { name: "Baking soda", grams: 4, notes: "spread + browning" },
          { name: "Baking powder", grams: 4, notes: "lift" },
          { name: "Fine salt", grams: 1, notes: "miso adds more" },
          { name: "Unsalted butter (browned, cooled)", grams: 170, notes: "brown 200 g → ~170 g yield" },
          { name: "Dark brown sugar", grams: 120, notes: "moisture + toffee" },
          { name: "Granulated sugar", grams: 150, notes: "structure" },
          { name: "Large eggs", grams: 100, notes: "~2 eggs" },
          { name: "White miso", grams: 40, notes: "~10–12% NaCl; adjust salt accordingly" },
          { name: "Barley malt syrup", grams: 15, notes: "surface gloss" },
          { name: "Vanilla extract", grams: 5 },
          { name: "(Optional) 60–70% chocolate", grams: 150, notes: "rough chunks" },
        ],
      },
    ],
    sections: [
      { heading: "Method", body: [
        "Brown butter to hazelnut‑amber, 160–170 °C pan temp; chill to ~40 °C (avoid scrambling eggs).",
        "Whisk sugars, miso, vanilla into butter until glossy. Beat in eggs 1 min for slight aeration.",
        "Sift dry (flour, leaveners, salt). Fold into wet to just combine; add chocolate if using.",
        "Portion 60 g. Wrap tray; rest 12–24 h at 4 °C (hydrates flour; miso flavor rounds).",
        "Bake 190 °C / 375 °F, 10–12 min. Pan‑bang once at 8 min for crinkle. Aim pale edges, set centers.",
      ] },
      { heading: "Targets", body: [
        "Spread: 1.8–2.1×; Internal temp out of oven: 95–98 °C; pH dough ~6.0–6.4 depending on miso.",
      ] },
      { heading: "Notes / Troubleshooting", body: [
        "Too salty: reduce fine salt first, not miso; miso adds depth beyond NaCl.",
        "Too cakey: reduce baking powder by 25% or increase butter by 5–10 g.",
        "Too flat: shorten rest or add +10 g flour.",
        "Freeze‑to‑bake: tray‑freeze portions; bake from frozen +2 min.",
      ] },
      { heading: "Variants", body: [
        "Sesame: swap 60 g flour for toasted sesame flour; add 10 g tahini; finish with black sesame.",
        "Coffee: bloom 4 g instant espresso in butter while warm.",
      ] },
    ],
  },
  "recipe-cream-cheese-garlic-rolls": {
    title: "Cream Cheese Garlic Dinner Rolls",
    type: "Recipe Development",
    tags: ["bread", "enriched", "garlic"],
    yield: "16 rolls @ ~55 g (9×9in or 23×23 cm pan)",
    summary:
      "Soft, pull‑apart rolls. Cream cheese tenderizes; roasted‑garlic butter glaze; chive salt finish.",
    ingredients: [
      {
        title: "Dough (Baker’s % vs. Flour)",
        base: { label: "Total flour", grams: 500 },
        items: [
          { name: "Bread flour", grams: 500, notes: "12–13% protein" },
          { name: "Whole milk (24–26 °C)", grams: 250, notes: "50% hyd." },
          { name: "Water", grams: 60, notes: "adjust for dough feel" },
          { name: "Cream cheese, room temp", grams: 100, notes: "20%" },
          { name: "Egg", grams: 50, notes: "10%" },
          { name: "Sugar", grams: 40, notes: "8%" },
          { name: "Fine salt", grams: 10, notes: "2%" },
          { name: "Instant yeast", grams: 7, notes: "1.4%" },
          { name: "Unsalted butter, soft", grams: 40, notes: "8%" },
        ],
      },
      {
        title: "Garlic Butter Glaze",
        base: { label: "—", grams: 200 },
        items: [
          { name: "Unsalted butter", grams: 100 },
          { name: "Roasted garlic (squeezed cloves)", grams: 60, notes: "from 2 heads" },
          { name: "Milk", grams: 30 },
          { name: "Honey", grams: 10 },
        ],
      },
      {
        title: "Chive Salt",
        base: { label: "—", grams: 10 },
        items: [
          { name: "Kosher salt", grams: 8 },
          { name: "Finely snipped chives", grams: 2 },
        ],
      },
    ],
    sections: [
      { heading: "Method", body: [
        "Mix flour, milk, water, sugar, yeast to shaggy; rest 15 min (hydrate).",
        "Knead in egg → cream cheese → salt; when cohesive, knead in butter. Target medium windowpane.",
        "Bulk at 26 °C until ~70% rise (60–90 min). Degas lightly.",
        "Divide 16× ~55 g; pre‑shape; rest 10 min; tight round. Pan 4×4 grid in greased 23 cm pan.",
        "Proof 26–28 °C to ~2× volume, tops just touching (35–55 min).",
        "Bake 190 °C / 375 °F, 18–22 min until 93–96 °C internal.",
        "Brush hot with garlic butter; sprinkle chive salt. Cool 10 min before pulling apart.",
      ] },
      { heading: "Targets", body: [
        "Dough temp after mix: 25–26 °C; pH 5.6–5.8; finished crumb: fine, shreddable.",
      ] },
      { heading: "Notes / Troubleshooting", body: [
        "Too tight/firm: increase water by 10–20 g or check flour protein.",
        "Slow proof: warm milk to 28 °C and verify yeast freshness.",
        "Greasy crumb: over‑proofing + too‑early butter; glaze post‑bake only.",
      ] },
      { heading: "Make‑Ahead", body: [
        "After shaping, retard covered at 4 °C up to 16 h; temper 40–60 min; proof and bake.",
      ] },
    ],
  },
  "recipe-braised-beef-short-rib": {
    title: "Braised Beef Short Rib",
    type: "Recipe Development",
    tags: ["savory", "braise", "glossed jus"],
    yield: "Serves 6 (≈2 kg bone‑in ribs)",
    summary:
      "Classic red‑wine braise with soy aromatics for depth. Low‑and‑slow to gelatinize collagen; finish with reduced, glossy jus.",
    ingredients: [
      {
        title: "Meat & Seasoning (percent vs. meat)",
        base: { label: "Meat base", grams: 2000 },
        items: [
          { name: "Beef short ribs, bone‑in", grams: 2000, notes: "English‑cut, 2–3 bones per portion" },
          { name: "Kosher salt (1.8%)", grams: 36, notes: "season Day‑1" },
          { name: "Black pepper", grams: 4 },
        ],
      },
      {
        title: "Aromatics & Braise",
        base: { label: "—", grams: 1980 },
        items: [
          { name: "Neutral oil", grams: 30 },
          { name: "Onion, large dice", grams: 300 },
          { name: "Carrot, large dice", grams: 200 },
          { name: "Celery, large dice", grams: 150 },
          { name: "Garlic, smashed", grams: 20 },
          { name: "Tomato paste", grams: 30 },
          { name: "Dry red wine", grams: 750, notes: "reduce by half" },
          { name: "Beef stock", grams: 750 },
          { name: "Soy sauce", grams: 30, notes: "umami/salt" },
          { name: "Bay", grams: 1 },
          { name: "Thyme", grams: 3 },
          { name: "Star anise (optional)", grams: 1 },
        ],
      },
      {
        title: "Finishes & Sides (suggested)",
        base: { label: "—", grams: 500 },
        items: [
          { name: "Parsnip purée", grams: 400, notes: "buttery, smooth" },
          { name: "Pickled shallots", grams: 100, notes: "acid lift" },
        ],
      },
    ],
    sections: [
      { heading: "Plan", body: [
        "D‑1: Salt ribs 1.8% by weight. Chill uncovered to dry surface.",
        "D‑0: Sear hard on all sides; sweat mirepoix; tomato paste until brick red; deglaze with wine → reduce by half; add stock, soy, herbs; return ribs.",
        "Lid on; braise 150 °C / 300 °F until probe‑tender (≈3–3.5 h, internal ~95 °C). Rest in liquid 30 min.",
        "Strain; separate fat; reduce liquid to nappé. Glaze ribs in reduced jus to serve.",
      ] },
      { heading: "Targets", body: [
        "Meat pull temp ≈ 95 °C; sauce viscosity coats spoon lightly; sodium balance ≈ 0.7–0.9% in finished jus.",
      ] },
      { heading: "Notes / Troubleshooting", body: [
        "Stringy/dry: oven too hot or cooked past probe‑tender without liquid coverage.",
        "Flat flavor: reduce more; add 5–10 g fish sauce; finish with a few drops of vinegar for brightness.",
        "Greasy sauce: chill and lift fat cap; or whirl 1–2 cold butter cubes to mount just before serving.",
      ] },
      { heading: "Service", body: [
        "Plate on parsnip purée, gloss with jus, top with pickled shallots and chive.",
      ] },
    ],
  },
};

const classNames = (...xs) => xs.filter(Boolean).join(" ");

function useAccent(initial = 0) {
  const [i, setI] = useState(initial);
  const accent = SITE.accentChoices[i % SITE.accentChoices.length];
  return { accent, i, setI };
}

function useHashRoute() {
  const parse = () => {
    const h = window.location.hash || "";
    if (h.startsWith("#/journal/")) {
      const slug = h.replace("#/journal/", "");
      return { view: "journal", slug };
    }
    return { view: "home" };
  };
  const [route, setRoute] = useState(parse());
  useEffect(() => {
    const onHash = () => setRoute(parse());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

function pct(x, base) {
  if (!base) return "";
  const p = (x / base) * 100;
  return `${Math.round(p * 10) / 10}%`;
}

function getPrintCSS(compact = false) {
  return `
    * { box-sizing: border-box; }
    body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"; color: #111; line-height: 1.35; padding: ${compact ? "14mm" : "18mm"}; }
    h1 { font-size: ${compact ? "22pt" : "20pt"}; margin: 0 0 6pt; }
    h2 { font-size: ${compact ? "13pt" : "12pt"}; margin: 14pt 0 6pt; }
    p { margin: 6pt 0; ${compact ? "font-size: 11.5pt;" : ""} }
    .muted { color: #555; font-size: 9pt; }
    .tags { margin: 6pt 0 12pt; }
    .tag { display: inline-block; border: 1px solid #ddd; border-radius: 999px; padding: 2pt 6pt; font-size: 8.5pt; margin-right: 4pt; }
    table { width: 100%; border-collapse: collapse; margin: 4pt 0 10pt; font-size: ${compact ? "11pt" : "9.5pt"}; }
    th, td { border: 1px solid #e5e5e5; padding: ${compact ? "8pt 10pt" : "6pt 8pt"}; vertical-align: top; }
    th { text-align: left; background: #fafafa; }
    .num { text-align: right; font-variant-numeric: tabular-nums; }
    ${compact ? ".hide-notes{display:none}" : ""}
    @page { margin: ${compact ? "10mm" : "12mm"}; }
  `;
}

function buildPrintHTML(page, opts = { compact: false }) {
  const compact = !!opts.compact;
  const tags = !compact ? (page.tags || []).map((t) => `<span class="tag">${t}</span>`).join(" ") : "";
  const ing = (page.ingredients || [])
    .map((g) => `
      <section>
        <h2>${g.title}</h2>
        ${g.base?.label ? `<div class="muted">Base: ${g.base.label}${g.base.grams ? ` (${g.base.grams} g)` : ""}</div>` : ""}
        <table>
          <thead><tr><th>Ingredient</th><th>Grams</th>${g.base?.grams ? `<th>%</th>` : ""}${compact ? "" : `<th class=\"${compact ? 'hide-notes' : ''}\">Notes</th>`}</tr></thead>
          <tbody>
            ${g.items
              .map((it) => {
                const notesCell = compact ? "" : `<td class=\"${compact ? 'hide-notes' : ''}\">${it.notes ?? ""}</td>`;
                return `<tr><td>${it.name}</td><td class="num">${it.grams ?? ""}</td>${g.base?.grams ? `<td class="num">${pct(it.grams, g.base.grams)}</td>` : ""}${notesCell}</tr>`;
              })
              .join("")}
          </tbody>
        </table>
      </section>`)
    .join("");
  const keep = compact ? new Set(["Method", "Targets"]) : null;
  const secs = (page.sections || [])
    .filter((s) => !keep || keep.has(s.heading))
    .map(
      (s) => `
      <section>
        <h2>${s.heading}</h2>
        ${s.body.map((p) => `<p>${p}</p>`).join("")}
      </section>`
    )
    .join("");
  return `
  <article>
    <header>
      <h1>${page.title}</h1>
      <div class="muted">${page.type}</div>
      ${page.yield ? `<div class="muted">Yield: ${page.yield}</div>` : ""}
      ${tags ? `<div class="tags">${tags}</div>` : ""}
      ${compact ? "" : `<p>${page.summary || ""}</p>`}
    </header>
    ${ing}
    ${secs}
  </article>`;
}

function printPage(page, opts = { compact: false }) {
  const compact = !!opts.compact;
  const w = window.open("", "_blank", "noopener,noreferrer,width=900,height=1200");
  if (!w) {
    alert("Pop-up blocked. Please allow pop-ups to print.");
    return;
  }
  const css = getPrintCSS(compact);
  const html = `<!doctype html><html><head><meta charset="utf-8" />
    <title>${page.title} – ${SITE.name}</title>
    <style>${css}</style>
  </head><body>${buildPrintHTML(page, { compact })}</body></html>`;
  w.document.open();
  w.document.write(html);
  w.document.close();
  w.onload = () => {
    w.focus();
    w.print();
  };
}

async function downloadPDF(page, opts = { compact: false }) {
  const compact = !!opts.compact;
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-10000px";
  container.style.top = "0";
  container.style.background = "#ffffff";
  container.style.width = "794px";
  container.innerHTML = `<style>${getPrintCSS(compact)}</style>${buildPrintHTML(page, { compact })}`;
  document.body.appendChild(container);
  const canvas = await html2canvas(container, { scale: 2, backgroundColor: "#ffffff", windowWidth: 794 });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "pt", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;
  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  heightLeft -= pageHeight;
  while (heightLeft > 0) {
    pdf.addPage();
    position = - (imgHeight - heightLeft);
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }
  const safe = page.title.replace(/[\\/:*?"<>|]/g, "");
  pdf.save(`${safe}.pdf`);
  document.body.removeChild(container);
}

function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-white focus:text-black focus:px-3 focus:py-2 focus:rounded-xl focus:shadow"
    >
      Skip to content
    </a>
  );
}

function Nav({ accent }) {
  const items = [
    { href: "#about", label: "About" },
    { href: "#why", label: "Cooking/Baking" },
    { href: "#work", label: "Work" },
    { href: "#recipes", label: "Recipes" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-50 isolate backdrop-blur bg-white/60 supports-[backdrop-filter]:bg-white/60 border-b border-black/5">
      <nav className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <a href="#top" className="font-semibold tracking-tight">{SITE.name}</a>
        <ul className="flex gap-4 text-sm">
          {items.map((it) => (
            <li key={it.href}>
              <a className="hover:underline underline-offset-4" href={it.href}>
                {it.label}
              </a>
            </li>
          ))}
        </ul>
        <motion.button
          whileTap={{ scale: 0.96 }}
          aria-label="Change accent"
          className="text-xs px-3 py-1 rounded-full border border-black/10 shadow-sm"
          onClick={() => {
            const next = document.getElementById("accentIndex");
            next?.click();
          }}
        >
          Accent
        </motion.button>
      </nav>
      <div className={classNames("h-1 bg-gradient-to-r", accent.class)} />
    </header>
  );
}

function Hero({ accent }) {
  return (
    <section aria-label="Hero" className="relative overflow-hidden">
      <div aria-hidden className={classNames("pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b", accent.class)} />
      <div className="relative mx-auto max-w-5xl px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-5xl font-semibold tracking-tight"
        >
          {SITE.role}
        </motion.h1>
        <p className="mt-3 text-black/70 max-w-prose">
          {SITE.name} · {SITE.location} · {SITE.availabilityNote}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-2 shadow-sm hover:shadow transition"
          >
            <span>Contact</span>
            <span aria-hidden>→</span>
          </a>
          <div className="flex items-center gap-3 text-sm">
            {SITE.socials.map((s) => (
              <a key={s.label} href={s.href} className="underline underline-offset-4">
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { emoji: "🥐", text: "lamination" },
            { emoji: "🧪", text: "R&D" },
            { emoji: "📦", text: "systems" },
          ].map((chip) => (
            <motion.div
              key={chip.text}
              whileHover={{ rotate: -1.5, y: -2 }}
              className="rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-sm"
            >
              <span className="mr-2" aria-hidden>{chip.emoji}</span>
              <span className="uppercase text-xs tracking-wide text-black/70">{chip.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Section({ id, title, eyebrow, children }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-4 py-14">
      <div className="mb-6">
        {eyebrow && (
          <div className="text-xs uppercase tracking-wide text-black/50">{eyebrow}</div>
        )}
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function About() {
  return (
    <Section id="about" title="A bit about me" eyebrow="Profile">
      <div className="prose max-w-none prose-p:my-2">
        <p>
          I like building flavor systems the way engineers build products: iterate, measure, simplify. My lane is pastry, lamination, and process design for calm, repeatable service.
        </p>
        <p>
          I thrive in teams that value curiosity, mise en place, and clean handoffs. I document relentlessly so good ideas survive the rush.
        </p>
      </div>
    </Section>
  );
}

function WhyCooking() {
  const beliefs = [
    { icon: "🔥", title: "Heat + Time", text: "Respect kinetics: fermentation curves, carryover, and glass transitions are not vibes—they're parameters." },
    { icon: "🎯", title: "Fewer, Better Moves", text: "Constraint breeds clarity. I prefer small ingredient lists and crisp techniques over novelty for novelty's sake." },
    { icon: "🧰", title: "Systems Serve Guests", text: "Prep calendars, labeling, and checklists free attention for hospitality and plate integrity." },
  ];
  return (
    <Section id="why" title="Why I like cooking & baking" eyebrow="Philosophy">
      <div className="grid sm:grid-cols-3 gap-4">
        {beliefs.map((b) => (
          <motion.div key={b.title} whileHover={{ y: -2 }} className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
            <div className="text-2xl" aria-hidden>{b.icon}</div>
            <div className="mt-2 font-medium">{b.title}</div>
            <p className="text-sm text-black/70">{b.text}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 px-2 py-0.5 text-xs text-black/70">
      {children}
    </span>
  );
}

function Work() {
  const [q, setQ] = useState("");
  const tags = useMemo(() => Array.from(new Set(PROJECTS.flatMap((p) => p.tags))).sort(), []);
  const filtered = useMemo(() => {
    if (!q) return PROJECTS;
    return PROJECTS.filter((p) => p.tags.some((t) => t.toLowerCase().includes(q.toLowerCase())));
  }, [q]);
  return (
    <Section id="work" title="Examples of my work / projects" eyebrow="Selected work">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          aria-label="Filter projects by tag"
          placeholder="Filter by tag (e.g. R&D, process)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full sm:w-80 rounded-xl border border-black/10 px-3 py-2 shadow-sm"
        />
        <div className="flex flex-wrap gap-2 text-xs">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setQ(t)}
              className="rounded-full border border-black/10 px-2 py-1 hover:bg-black/5"
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <ul className="grid sm:grid-cols-2 gap-4">
        {filtered.map((p) => (
          <li key={p.slug} className="list-none">
            <a
              href={p.link}
              className="block rounded-2xl border border-black/10 bg-white p-4 shadow-sm hover:shadow transition"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-medium tracking-tight">{p.title}</h3>
                <span className="text-xs text-black/50">{p.role}</span>
              </div>
              <p className="mt-1 text-sm text-black/70">{p.blurb}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {p.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Recipes() {
  return (
    <Section id="recipes" title="Recipe development / ideation / thinkpieces" eyebrow="Notes & R&D">
      <ul className="grid sm:grid-cols-3 gap-4">
        {RECIPES.map((r) => (
          <li key={r.title} className="list-none">
            <a
              href={r.link}
              className="block h-full rounded-2xl border border-black/10 bg-white p-4 shadow-sm hover:shadow transition"
            >
              <h3 className="font-medium tracking-tight">{r.title}</h3>
              <p className="mt-1 text-sm text-black/70">{r.summary}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {r.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  return (
    <Section id="contact" title="How to contact me" eyebrow="Let’s talk">
      <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="text-sm text-black/60">Email</div>
            <a className="text-lg font-medium underline underline-offset-4" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
          </div>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(SITE.email);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                } catch {
                  alert("Copy failed. You can select the address manually.");
                }
              }}
              className="rounded-xl border border-black/10 px-3 py-2 text-sm shadow-sm hover:shadow"
            >
              {copied ? "Copied" : "Copy email"}
            </button>
            <a
              href={`mailto:${SITE.email}?subject=Stage%20Opportunity&body=Hi%20${encodeURIComponent(SITE.name)}%2C%20`}
              className="rounded-xl border border-black/10 px-3 py-2 text-sm shadow-sm hover:shadow"
            >
              Write email
            </a>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          {SITE.socials.map((s) => (
            <a key={s.label} href={s.href} className="underline underline-offset-4">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-5xl px-4 pb-12 text-xs text-black/60">
      <div className="flex flex-wrap items-center gap-2">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <span aria-hidden>•</span>
        <span>Made with care and clean hands.</span>
      </div>
    </footer>
  );
}

function IngredientTables({ ingredients }) {
  if (!ingredients) return null;
  return (
    <div className="mt-8 space-y-8">
      {ingredients.map((grp) => (
        <div key={grp.title}>
          <h2 className="text-xl font-medium">{grp.title}</h2>
          {grp.base?.label && (
            <div className="text-sm text-black/60 mb-2">Base: {grp.base.label}{grp.base.grams ? ` (${grp.base.grams} g)` : ""}</div>
          )}
          <div className="overflow-x-auto rounded-xl border border-black/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="p-2">Ingredient</th>
                  <th className="p-2">Grams</th>
                  {grp.base?.grams ? <th className="p-2">%</th> : null}
                  <th className="p-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {grp.items.map((it, idx) => (
                  <tr key={idx} className="border-t border-black/5">
                    <td className="p-2">{it.name}</td>
                    <td className="p-2 tabular-nums">{it.grams}</td>
                    {grp.base?.grams ? (
                      <td className="p-2 tabular-nums">{pct(it.grams, grp.base.grams)}</td>
                    ) : null}
                    <td className="p-2 text-black/60">{it.notes || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

function JournalPage({ slug }) {
  const page = JOURNAL[slug];
  if (!page) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-2xl font-semibold">Not found</h1>
        <p className="mt-2 text-black/60">That journal entry doesn’t exist.</p>
        <a className="mt-6 inline-block underline underline-offset-4" href="#work">← Back to work</a>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <a className="underline underline-offset-4 text-sm" href="#work">← Back to work</a>
      <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">{page.title}</h1>
      <div className="mt-2 text-sm text-black/60">{page.type}</div>
      <div className="mt-2 flex flex-wrap gap-1">{page.tags?.map((t) => <Tag key={t}>{t}</Tag>)}</div>
      {page.yield && <div className="mt-2 text-sm text-black/70">Yield: {page.yield}</div>}
      <p className="mt-4 text-black/80">{page.summary}</p>
      <IngredientTables ingredients={page.ingredients} />
      <div className="mt-8 space-y-8">
        {page.sections?.map((sec) => (
          <section key={sec.heading}>
            <h2 className="text-xl font-medium">{sec.heading}</h2>
            <div className="prose max-w-none prose-p:my-2">
              {sec.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        <button className="rounded-xl border border-black/10 px-3 py-2 text-sm shadow-sm hover:shadow" onClick={() => printPage(page, { compact: false })}>Print</button>
        <button className="rounded-xl border border-black/10 px-3 py-2 text-sm shadow-sm hover:shadow" onClick={() => printPage(page, { compact: true })}>Line Print</button>
        <button className="rounded-xl border border-black/10 px-3 py-2 text-sm shadow-sm hover:shadow" onClick={() => downloadPDF(page, { compact: false })}>PDF</button>
        <button className="rounded-xl border border-black/10 px-3 py-2 text-sm shadow-sm hover:shadow" onClick={() => downloadPDF(page, { compact: true })}>Line PDF</button>
        <a className="rounded-xl border border-black/10 px-3 py-2 text-sm shadow-sm hover:shadow" href="#work">Back to Work</a>
      </div>
    </main>
  );
}

export default function Portfolio() {
  const { accent, setI } = useAccent(0);
  const route = useHashRoute();
  return (
    <div id="top" className="min-h-screen bg-white bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.04),transparent_60%)] text-balance">
      <a id="top-anchor" />
      <a href="#main" className="sr-only">Skip</a>
      <input id="accentIndex" type="button" hidden onClick={() => setI((i) => i + 1)} />
      <Nav accent={accent} />
      {route.view === "journal" ? (
        <JournalPage slug={route.slug} />
      ) : (
        <main id="main">
          <Hero accent={accent} />
          <About />
          <WhyCooking />
          <Work />
          <Recipes />
          <Contact />
        </main>
      )}
      <Footer />
    </div>
  );
}
