// Nav.jsx — sticky top nav. Idle: transparent. Past 80px scroll: blurred surface.
const Nav = () => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { num: "01", id: "approach", label: "Methodology" },
    { num: "02", id: "farm",     label: "Eco" },
    { num: "03", id: "repair",   label: "Domestic" },
    { num: "04", id: "art",      label: "Art" },
  ];
  return (
    <nav className={`pf-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="pf-nav-inner">
        <a href="#top" className="pf-logo">ДМФ</a>
        <div className="pf-nav-links">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} className="pf-nav-link">
              <span className="pf-nav-num">{l.num}</span>{l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
window.Nav = Nav;
