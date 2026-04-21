import React, { JSX, useEffect, useRef, useState } from 'react';
import styles from './header.module.css';

const LINKS = [
  { id: 'hero', label: 'About me' },
  { id: 'my-skills', label: 'My skills' },
  { id: 'project-highlights', label: 'My projects' },
  { id: 'contact', label: 'Contact' },
  { url: '/docs', label: 'Docs', external: true },
];

const REVEAL_AT = 120;   // start fixing header after this
const SHOW_DELTA = 24;   // scroll up at least this much to show
const HIDE_DELTA = 56;   // scroll down at least this much to hide

export default function Header(): JSX.Element {
  const [IsAffixed, setIsAffixed] = useState(false);
  const [IsReveal, setIsReveal] = useState(false);
  const [IsActiveId, setIsActiveId] = useState<string>(LINKS[0].id);
  const [IsheaderH, setIsHeaderH] = useState(0);
  const [IsMenuOpen, setIsMenuOpen] = useState(false);

  const el = useRef<HTMLElement>(null);
  const lastY = useRef(0);
  const dir = useRef<'up' | 'down' | null>(null);
  const downPeak = useRef(0);
  const upValley = useRef(0);

  // cache section offsets for precise active detection
  const sections = useRef<{ id: string; top: number }[]>([]);

  const refreshMeasurements = () => {
    // header height
    setIsHeaderH(el.current ? el.current.getBoundingClientRect().height : 0);

    // section tops in document coordinates
    sections.current = LINKS.map(l => {
      const n = document.getElementById(l.id);
      return n
        ? { id: l.id, top: n.getBoundingClientRect().top + window.scrollY }
        : null;
    })
      .filter(Boolean) as { id: string; top: number }[];

    sections.current.sort((a, b) => a.top - b.top);
  };

  const setActiveFromScroll = (y: number) => {
    if (!sections.current.length) return;

    // bottom-of-page guarantee last section
    const docH = document.documentElement.scrollHeight;
    const vh = window.innerHeight;
    if (y + vh >= docH - 2) {
      setIsActiveId(sections.current[sections.current.length - 1].id);
      return;
    }

    // line just under fixed header
    const line = y + IsheaderH + 8;

    // binary search for greatest top <= line
    let lo = 0, hi = sections.current.length - 1, ans = 0;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (sections.current[mid].top <= line) {
        ans = mid; lo = mid + 1;
      } else hi = mid - 1;
    }
    setIsActiveId(sections.current[ans].id);
  };

  useEffect(() => {
    refreshMeasurements();

    const onResize = () => {
      refreshMeasurements();
      // also recompute active on resize
      setActiveFromScroll(window.scrollY);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('load', refreshMeasurements);

    const onScroll = () => {
      const y = window.scrollY;
      const goingUp = y < lastY.current;

      // affix threshold
      const nowAffixed = y > REVEAL_AT;
      if (!nowAffixed) {
        setIsAffixed(false);
        setIsReveal(false);
        dir.current = null;
        downPeak.current = y;
        upValley.current = y;
        lastY.current = y;
        setActiveFromScroll(y);
        return;
      }
      setIsAffixed(true);

      // hysteresis for reveal/hide to avoid flicker
      if (dir.current === null) {
        dir.current = goingUp ? 'up' : 'down';
        downPeak.current = y;
        upValley.current = y;
      }

      if (goingUp) {
        if (dir.current !== 'up') {
          dir.current = 'up';
          upValley.current = y;
        }
        if (!IsReveal && downPeak.current - y >= SHOW_DELTA) {
          setIsReveal(true);
        }
        // track valley
        if (y < upValley.current) upValley.current = y;
      } else {
        if (dir.current !== 'down') {
          dir.current = 'down';
          downPeak.current = y;
        }
        if (IsReveal && y - upValley.current >= HIDE_DELTA) {
          setIsReveal(false);
        }
        // track peak
        if (y > downPeak.current) downPeak.current = y;
      }

      lastY.current = y;
      setActiveFromScroll(y);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // initial compute
    onScroll();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', refreshMeasurements);
      window.removeEventListener('scroll', onScroll);
    };
  }, [IsheaderH, IsReveal]);

  const smoothTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - (IsAffixed ? IsheaderH : 0);
    window.scrollTo({ top, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      {IsAffixed ? <div style={{ height: IsheaderH }} /> : null}

      <header
        ref={el}
        className={[
          styles.header,
          IsAffixed ? styles.affixed : '',
          IsAffixed && IsReveal ? styles.reveal : '',
        ].join(' ')}
      >
        <div className={styles.inner}>
          {/* desktop nav */}
          <nav className={styles.menu} aria-label="Primary">
            <ul className={styles.navList}>
              {LINKS.map((l) => (
                <li key={l.label}>
                  {l.id ? (
                    // scroll to in-page section
                    <a
                      href={`#${l.id}`}
                      onClick={smoothTo(l.id)}
                      className={`${styles.link} ${IsActiveId === l.id ? styles.activeLink : ''}`}
                      aria-current={IsActiveId === l.id ? 'page' : undefined}
                    >
                      {l.label}
                    </a>
                  ) : (
                    // normal link (Docs)
                    <a
                      href={l.url}
                      className={styles.link}
                    >
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* mobile toggle */}
          <button
            className={styles.menuToggle}
            aria-expanded={IsMenuOpen}
            aria-controls="mobileMenu"
            aria-label="Open menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <span /><span /><span />
          </button>

          {/* desktop languages */}
          <div className={`${styles.lang} ${styles.langBar}`}>
            <button type="button" className={`${styles.langBtn} ${styles.langActive}`}>EN</button>
            {/* <button type="button" className={styles.langBtn}>DE</button> */}
          </div>
        </div>
      </header>

      {/* mobile overlay */}
      <nav
        id="mobileMenu"
        className={styles.mobileMenu}
        data-open={IsMenuOpen || undefined}
        aria-hidden={!IsMenuOpen}
      >
        <div className={styles.mobileMenuInner}>
          <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)} aria-label="Close">×</button>

          <ul className={styles.menuStack} role="menu">
            {LINKS.map((l) => (
              <li key={l.id ?? l.url}>
                {l.id ? (
                  <a
                    className={styles.menuLink}
                    role="menuitem"
                    href={`#${l.id}`}
                    onClick={smoothTo(l.id)}
                  >
                    {l.label}
                  </a>
                ) : (
                  <a
                    className={styles.menuLink}
                    role="menuitem"
                    href={l.url}
                    onClick={() => setIsMenuOpen(false)} // close mobile menu after click
                  >
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className={`${styles.lang} ${styles.langMenu}`}>
            <button type="button" className={`${styles.langBtnMobile} ${styles.langActiveMobile}`}>EN</button>
            {/* <button type="button" className={styles.langBtnMobile}>DE</button> */}
          </div>
        </div>
      </nav>
    </>
  );
}
