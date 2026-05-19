// Hero.jsx — full-viewport title card. Pure typography on dark.
const HERO_APPROACHES = [
  { c: "#E8D5B0", num: "01", eyebrow: "Methodology", title: "Бытовая переработка", href: "#approach" },
  { c: "#8BFF6E", num: "02", eyebrow: "Eco",         title: "Модульная фитоферма", href: "#farm" },
  { c: "#FF8C42", num: "03", eyebrow: "Domestic",    title: "Ремонтная станция",   href: "#repair" },
  { c: "#E0DDD6", num: "04", eyebrow: "Art",         title: "Лента — разряд",      href: "#art" },
];

const Hero = () => (
  <header className="pf-hero" id="top">
    <div className="pf-hero-eyebrow">[ Recycling — 4 подхода ]</div>
    <div className="pf-hero-title" role="heading" aria-level="1" aria-label="Переработка дизайн">
      <span className="pf-hero-word pf-hero-word--top">Переработка</span>
      <nav className="pf-hero-rule" aria-label="Перейти к подходам">
        {HERO_APPROACHES.map((a, i) => (
          <a
            key={i}
            className="pf-hero-rule-seg"
            href={a.href}
            style={{ "--c": a.c }}
            aria-label={`${a.num} — ${a.eyebrow}: ${a.title}`}
          >
            <span className="seg-card" aria-hidden="true">
              <span className="seg-top">
                <span className="seg-num">{a.num}</span>
                <span className="seg-eyebrow">{a.eyebrow}</span>
              </span>
              <span className="seg-title">{a.title}</span>
            </span>
          </a>
        ))}
      </nav>
      <span className="pf-hero-word pf-hero-word--bot">Дизайн</span>
    </div>
    <div className="pf-hero-meta">
      <div>Данилов М.Ф. — 1-МГ-50</div>
      <div className="pf-hero-quote">
        «Четыре проекта, четыре подхода к переосмыслению материала: methodology, eco, domestic, art.»
      </div>
    </div>
    <a href="#approach" className="pf-hero-scroll">Смотреть проекты ↓</a>
  </header>
);
window.Hero = Hero;
