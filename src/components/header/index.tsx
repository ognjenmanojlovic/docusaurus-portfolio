import React, { JSX, useEffect, useMemo, useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './header.module.css';

type SectionLink = {
  id: string;
  label: string;
};

type ExternalLink = {
  url: string;
  label: string;
  external?: boolean;
};

type NavLink = SectionLink | ExternalLink;

const REVEAL_AT = 120;
const SHOW_DELTA = 24;
const HIDE_DELTA = 56;

export default function Header(): JSX.Element {
  const { i18n } = useDocusaurusContext();
  const isGerman = i18n.currentLocale === 'de';

  const LINKS: NavLink[] = useMemo(
    () => [
      { id: 'hero', label: isGerman ? 'Über mich' : 'About me' },
      { id: 'my-skills', label: isGerman ? 'Meine Skills' : 'My skills' },
      { id: 'project-highlights', label: isGerman ? 'Meine Projekte' : 'My projects' },
      { id: 'contact', label: isGerman ? 'Kontakt' : 'Contact' },
      { url: '/docs/projects', label: isGerman ? 'Doku' : 'Docs' },
    ],
    [isGerman]
  );

  const SECTION_LINKS: SectionLink[] = useMemo(
    () => LINKS.filter((l): l is SectionLink => 'id' in l),
    [LINKS]
  );

  const [isAffixed, setIsAffixed] = useState(false);
  const [isReveal, setIsReveal] = useState(false);
  const [isActiveId, setIsActiveId] = useState<string>(SECTION_LINKS[0]?.id ?? 'hero');
  const [isHeaderH, setIsHeaderH] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const el = useRef<HTMLElement>(null);
  const lastY = useRef(0);
  const dir = useRef<'up' | 'down' | null>(null);
  const downPeak = useRef(0);
  const upValley = useRef(0);

  const sections = useRef<{ id: string; top: number }[]>([]);

  const refreshMeasurements = () => {
    setIsHeaderH(el.current ? el.current.getBoundingClientRect().height : 0);

    sections.current = SECTION_LINKS.map((l) => {
      const n = document.getElementById(l.id);
      return n
        ? { id: l.id, top: n.getBoundingClientRect().top + window.scrollY }
        : null;
    }).filter(Boolean) as { id: string; top: number }[];

    sections.current.sort((a, b) => a.top - b.top);
  };

  const setActiveFromScroll = (y: number) => {
    if (!sections.current.length) return;

    const docH = document.documentElement.scrollHeight;
    const vh = window.innerHeight;

    if (y + vh >= docH - 2) {
      setIsActiveId(sections.current[sections.current.length - 1].id);
      return;
    }

    const line = y + isHeaderH + 8;

    let lo = 0;
    let hi = sections.current.length - 1;
    let ans = 0;

    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (sections.current[mid].top <= line) {
        ans = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    setIsActiveId(sections.current[ans].id);
  };

  useEffect(() => {
    refreshMeasurements();

    const onResize = () => {
      refreshMeasurements();
      setActiveFromScroll(window.scrollY);
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('load', refreshMeasurements);

    const onScroll = () => {
      const y = window.scrollY;
      const goingUp = y < lastY.current;

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

        if (!isReveal && downPeak.current - y >= SHOW_DELTA) {
          setIsReveal(true);
        }

        if (y < upValley.current) upValley.current = y;
      } else {
        if (dir.current !== 'down') {
          dir.current = 'down';
          downPeak.current = y;
        }

        if (isReveal && y - upValley.current >= HIDE_DELTA) {
          setIsReveal(false);
        }

        if (y > downPeak.current) downPeak.current = y;
      }

      lastY.current = y;
      setActiveFromScroll(y);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', refreshMeasurements);
      window.removeEventListener('scroll', onScroll);
    };
  }, [SECTION_LINKS, isHeaderH, isReveal]);

  const smoothTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      (isAffixed ? isHeaderH : 0);

    window.scrollTo({ top, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      {isAffixed ? <div style={{ height: isHeaderH }} /> : null}

      <header
        ref={el}
        className={[
          styles.header,
          isAffixed ? styles.affixed : '',
          isAffixed && isReveal ? styles.reveal : '',
        ].join(' ')}
      >
        <div className={styles.inner}>
          <nav className={styles.menu} aria-label="Primary">
            <ul className={styles.navList}>
              {LINKS.map((l) => (
                <li key={'id' in l ? l.id : l.url}>
                  {'id' in l ? (
                    <a
                      href={`#${l.id}`}
                      onClick={smoothTo(l.id)}
                      className={`${styles.link} ${isActiveId === l.id ? styles.activeLink : ''}`}
                      aria-current={isActiveId === l.id ? 'page' : undefined}
                    >
                      {l.label}
                    </a>
                  ) : (
                    <a href={l.url} className={styles.link}>
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <button
            className={styles.menuToggle}
            aria-expanded={isMenuOpen}
            aria-controls="mobileMenu"
            aria-label={isGerman ? 'Menü öffnen' : 'Open menu'}
            onClick={() => setIsMenuOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className={`${styles.lang} ${styles.langBar}`}>
            <a
              href="/"
              className={`${styles.langBtn} ${!isGerman ? styles.langActive : ''}`}
            >
              EN
            </a>
            <a
              href="/de/"
              className={`${styles.langBtn} ${isGerman ? styles.langActive : ''}`}
            >
              DE
            </a>
          </div>
        </div>
      </header>

      <nav
        id="mobileMenu"
        className={styles.mobileMenu}
        data-open={isMenuOpen || undefined}
        aria-hidden={!isMenuOpen}
      >
        <div className={styles.mobileMenuInner}>
          <button
            className={styles.closeBtn}
            onClick={() => setIsMenuOpen(false)}
            aria-label={isGerman ? 'Schließen' : 'Close'}
          >
            ×
          </button>

          <ul className={styles.menuStack} role="menu">
            {LINKS.map((l) => (
              <li key={'id' in l ? l.id : l.url}>
                {'id' in l ? (
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
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className={`${styles.lang} ${styles.langMenu}`}>
            <a
              href="/"
              className={`${styles.langBtnMobile} ${!isGerman ? styles.langActiveMobile : ''}`}
            >
              EN
            </a>
            <a
              href="/de/"
              className={`${styles.langBtnMobile} ${isGerman ? styles.langActiveMobile : ''}`}
            >
              DE
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}