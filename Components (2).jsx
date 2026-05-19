// ProjectHeader.jsx — large numeral + ghost numeral + eyebrow + title block.
const ProjectHeader = ({ num, eyebrow, title, lede, accent }) => (
  <div className="pf-section-head" style={{ "--accent": accent }}>
    <div className="pf-ghost">{num}</div>
    <div className="pf-section-top">
      <div className="pf-section-num">{num}</div>
      <div className="pf-eyebrow">{eyebrow}</div>
    </div>
    <h2 className="pf-section-title" dangerouslySetInnerHTML={{ __html: title }} />
    {lede && <p className="pf-section-lede">{lede}</p>}
  </div>
);
window.ProjectHeader = ProjectHeader;

// AccentSlab.jsx — 3px horizontal coloured slab. Used over/under hero photos.
const AccentSlab = ({ accent, width = 240 }) => (
  <div className="pf-slab" style={{ background: accent, width }} />
);
window.AccentSlab = AccentSlab;

// SpecTable.jsx — two-column key/value list, top hairline divider.
const SpecTable = ({ rows, title = "Характеристики" }) => (
  <div className="pf-spec">
    <div className="pf-spec-title">{title}</div>
    <dl className="pf-spec-grid">
      {rows.map(([k, v], i) => (
        <React.Fragment key={i}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </React.Fragment>
      ))}
    </dl>
  </div>
);
window.SpecTable = SpecTable;

// Lightbox — global fullscreen image viewer. Hover any ImageCard, click to expand.
const LightboxContext = React.createContext(null);
window.LightboxContext = LightboxContext;

const LightboxProvider = ({ children }) => {
  const [item, setItem] = React.useState(null);
  const [hiResReady, setHiResReady] = React.useState(false);
  const open  = React.useCallback((src, fullSrc, caption, alt) => {
    setHiResReady(false);
    setItem({ src, fullSrc, caption, alt });
  }, []);
  const close = React.useCallback(() => setItem(null), []);

  // Preload the high-res image in the background; swap when ready.
  React.useEffect(() => {
    if (!item || !item.fullSrc || item.fullSrc === item.src) {
      setHiResReady(false);
      return;
    }
    const img = new Image();
    img.onload = () => setHiResReady(true);
    img.src = item.fullSrc;
    return () => { img.onload = null; };
  }, [item]);

  React.useEffect(() => {
    if (!item) return;
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [item, close]);

  const showSrc = item && (hiResReady && item.fullSrc ? item.fullSrc : item.src);
  const isUpgrading = item && item.fullSrc && item.fullSrc !== item.src && !hiResReady;

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      {item && (
        <div className="pf-lightbox" onClick={close} role="dialog" aria-modal="true">
          <button className="pf-lightbox-close" aria-label="Закрыть" onClick={close}>×</button>
          <figure className="pf-lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <img src={showSrc} alt={item.alt || ""} />
            {isUpgrading && <div className="pf-lightbox-loading" aria-hidden="true">· загружаем оригинал ·</div>}
            {item.caption && <figcaption>{item.caption}</figcaption>}
          </figure>
        </div>
      )}
    </LightboxContext.Provider>
  );
};
window.LightboxProvider = LightboxProvider;

// ImageCard.jsx — image plate w/ optional caption + accent slab. Click → lightbox.
// `src` is the lightweight preview (.webp). `fullSrc` is the high-res original loaded on click.
const ImageCard = ({ src, fullSrc, alt = "", caption, slab, height = 460, fullBleed, expandable = true }) => {
  const ctx = React.useContext(LightboxContext);
  const canExpand = expandable && !!src && !!ctx;
  const handleClick = canExpand ? () => ctx.open(src, fullSrc, caption, alt) : undefined;
  const handleKey = canExpand
    ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); } }
    : undefined;

  return (
    <figure
      className={`pf-image-card ${fullBleed ? "is-bleed" : ""} ${canExpand ? "is-clickable" : ""}`}
      style={{ height }}
      onClick={handleClick}
      onKeyDown={handleKey}
      role={canExpand ? "button" : undefined}
      tabIndex={canExpand ? 0 : undefined}
      aria-label={canExpand ? `${alt || "Изображение"} — открыть полностью` : undefined}
    >
      {slab && <div className="pf-slab" style={{ background: slab, width: 240 }} />}
      {src
        ? <img src={src} alt={alt} loading="lazy" decoding="async" />
        : <div className="pf-image-placeholder">{alt || "Image"}</div>}
      {canExpand && (
        <span className="pf-image-expand" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5l-5 5M2.5 13.5l5-5" />
          </svg>
        </span>
      )}
      {caption && <figcaption className="pf-image-cap">{caption}</figcaption>}
    </figure>
  );
};
window.ImageCard = ImageCard;

// Gallery.jsx — N-column grid of image cards.
const Gallery = ({ items, columns = 3, itemHeight }) => {
  const fallbackHeight = columns >= 4 ? 240 : columns === 3 ? 320 : 480;
  const h = itemHeight ?? fallbackHeight;
  return (
    <div className="pf-gallery" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {items.map((it, i) => (
        <ImageCard key={i} {...it} height={it.height ?? h} />
      ))}
    </div>
  );
};
window.Gallery = Gallery;

// TechDrawing.jsx — dark plate with white-line annotated drawings (placeholder schematic).
const TechDrawing = ({ views, accent }) => (
  <div className="pf-tech">
    {views.map((v, i) => (
      <div key={i} className="pf-tech-cell">
        <div className="pf-tech-art">
          <svg viewBox="0 0 200 240" width="100%" height="100%" fill="none" stroke="#F0F0F0" strokeWidth="1.4">
            {v.shape === "front" && <>
              <rect x="40" y="20" width="120" height="200" />
              <line x1="40" y1="80" x2="160" y2="80" />
              <line x1="40" y1="140" x2="160" y2="140" />
              <circle cx="65" cy="55" r="8" /><circle cx="135" cy="55" r="8" />
              <circle cx="100" cy="115" r="10" /><circle cx="100" cy="180" r="10" />
            </>}
            {v.shape === "side" && <>
              <rect x="60" y="20" width="80" height="200" />
              <line x1="60" y1="60" x2="140" y2="60" />
              <line x1="60" y1="180" x2="140" y2="180" />
            </>}
            {v.shape === "top" && <>
              <rect x="20" y="60" width="160" height="120" />
              <line x1="20" y1="120" x2="180" y2="120" />
              <line x1="100" y1="60" x2="100" y2="180" />
            </>}
          </svg>
          <div className="pf-tech-tick" style={{ background: accent }} />
        </div>
        <div className="pf-tech-cap">{v.caption}</div>
      </div>
    ))}
  </div>
);
window.TechDrawing = TechDrawing;

// PersonaCard — quote-style persona block with name + age + body.
const PersonaCard = ({ name, age, body, accent }) => (
  <div className="pf-persona" style={{ "--accent": accent }}>
    <div className="pf-persona-mark">“</div>
    <div className="pf-persona-name">{name} · <span>{age}</span></div>
    <p className="pf-persona-body">{body}</p>
  </div>
);
window.PersonaCard = PersonaCard;

// AnalogRow — title + body + image, alternating sides.
const AnalogRow = ({ title, body, src, alt, source, flip, accent }) => (
  <div className={`pf-analog ${flip ? "is-flip" : ""}`} style={{ "--accent": accent }}>
    <div className="pf-analog-text">
      <div className="pf-analog-source">{source}</div>
      <h3 className="pf-analog-title">{title}</h3>
      <p className="pf-analog-body">{body}</p>
    </div>
    <ImageCard src={src} alt={alt} height={420} />
  </div>
);
window.AnalogRow = AnalogRow;

// PrincipleList — numbered list of principles with accent dots.
const PrincipleList = ({ items, accent }) => (
  <ol className="pf-principles" style={{ "--accent": accent }}>
    {items.map((t, i) => (
      <li key={i}>
        <span className="pf-principle-num">{String(i + 1).padStart(2, "0")}</span>
        <span className="pf-principle-text">{t}</span>
      </li>
    ))}
  </ol>
);
window.PrincipleList = PrincipleList;

// Footer.jsx — three-line summary + bottom legal/social row.
const Footer = () => (
  <footer className="pf-footer">
    <div className="pf-footer-row">
      <div>Данилов М.Ф.</div>
      <div>Recycling — 4 подхода</div>
      <div>1-МГ-50 — 2026</div>
    </div>
    <div className="pf-footer-bottom">
      <a className="pf-footer-handle" href="https://t.me/danilovmf" target="_blank" rel="noreferrer noopener">@danilovmf</a>
      <div className="pf-footer-license">© gulovvue 2026</div>
    </div>
  </footer>
);
window.Footer = Footer;
