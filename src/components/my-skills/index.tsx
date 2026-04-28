import React, { JSX, useEffect, useMemo, useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './my-skills.module.css';

type Skill = { icon: string; label: string; bullets: string[] };

function Card({
  icon,
  label,
  bullets,
  usedTitle,
}: Skill & { usedTitle: string }): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article
      className={styles.card}
      data-open={isOpen ? 'true' : 'false'}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen((v) => !v)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsOpen((v) => !v)}
      role="button"
      tabIndex={0}
      aria-pressed={isOpen}
    >
      <div className={`${styles.panel} ${styles.front}`}>
        <img className={styles.icon} src={icon} alt={label} />
        <div className={styles.label}>{label}</div>
      </div>

      <div className={`${styles.panel} ${styles.back}`}>
        <div className={styles.backInner}>
          <div className={styles.usedTitle}>{usedTitle}</div>
          <ul className={styles.usedList}>
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function MySkills(): JSX.Element {
  const { i18n } = useDocusaurusContext();
  const isGerman = i18n.currentLocale === 'de';

  const skills: Skill[] = useMemo(
    () =>
      isGerman
        ? [
            {
              icon: './icons/docker.svg',
              label: 'Docker',
              bullets: [
                'Containerisierte App-Setups',
                'Docker-Compose-Orchestrierung',
                'Volume- und Netzwerk-Konfiguration',
                'Konsistente Umgebungen',
              ],
            },
            {
              icon: './icons/yaml.svg',
              label: 'YAML',
              bullets: [
                'Docker-Compose-Konfigurationen',
                'CI/CD-Workflow-Dateien',
                'Strukturierte App-Einstellungen',
                'Wiederverwendbare Templates',
              ],
            },
            {
              icon: './icons/githubactions.svg',
              label: 'CI/CD',
              bullets: [
                'Automatisierte Build-Workflows',
                'GitHub-Actions-Pipelines',
                'Tests vor Releases',
                'Zuverlässige Deployments',
              ],
            },
            {
              icon: './icons/security.svg',
              label: 'IT Security',
              bullets: [
                'Juice-Shop-Sicherheitslabore',
                'Firewall-Regeln und Segmentierung',
                'Awareness für Angriffsflächen',
                'Best Practices für Zugriffskontrolle',
              ],
            },
            {
              icon: './icons/systemadministration.svg',
              label: 'System Administration',
              bullets: [
                'Benutzer- und Zugriffsverwaltung',
                'Endpoint- und Server-Support',
                'Monitoring und Wartung',
                'Operatives Troubleshooting',
              ],
            },
            {
              icon: './icons/network.svg',
              label: 'Networking',
              bullets: [
                'Netzwerkgrundlagen',
                'Grundlagen der Traffic-Analyse',
                'Segmentierung und Zugriffskontrolle',
                'Konnektivitäts-Troubleshooting',
              ],
            },
            {
              icon: './icons/python.svg',
              label: 'Python',
              bullets: [
                'Skripte für Passwort-Audits',
                'Port-Scanning-Tools',
                'Tools zur Metadaten-Extraktion',
                'Utilities für Privacy-Cleanup',
              ],
            },
            {
              icon: './icons/shell.svg',
              label: 'Shell Scripting',
              bullets: [
                'Linux-Setup-Skripte',
                'Automatisierung von Routineaufgaben',
                'Service-Management',
                'Terminal-Troubleshooting',
              ],
            },
            {
              icon: './icons/docusaurus.svg',
              label: 'Documentation',
              bullets: [
                'Docusaurus-Projektdokumentation',
                'Markdown-Content-Management',
                'Strukturierte Wissensdatenbanken',
                'Statische Seitengenerierung',
              ],
            },
          ]
        : [
            {
              icon: './icons/docker.svg',
              label: 'Docker',
              bullets: [
                'Containerized application setups',
                'Docker Compose orchestration',
                'Volume and network configuration',
                'Consistent environments',
              ],
            },
            {
              icon: './icons/yaml.svg',
              label: 'YAML',
              bullets: [
                'Docker Compose configs',
                'CI/CD workflow files',
                'Structured app settings',
                'Reusable templates',
              ],
            },
            {
              icon: './icons/githubactions.svg',
              label: 'CI/CD',
              bullets: [
                'Automated build workflows',
                'GitHub Actions pipelines',
                'Testing before releases',
                'Reliable deployments',
              ],
            },
            {
              icon: './icons/security.svg',
              label: 'IT Security',
              bullets: [
                'Juice Shop security labs',
                'Firewall rules and segmentation',
                'Attack surface awareness',
                'Access control best practices',
              ],
            },
            {
              icon: './icons/systemadministration.svg',
              label: 'System Administration',
              bullets: [
                'User and access management',
                'Endpoint and server support',
                'Monitoring and maintenance',
                'Operational troubleshooting',
              ],
            },
            {
              icon: './icons/network.svg',
              label: 'Networking',
              bullets: [
                'Network fundamentals',
                'Traffic analysis basics',
                'Segmentation and access control',
                'Connectivity troubleshooting',
              ],
            },
            {
              icon: './icons/python.svg',
              label: 'Python',
              bullets: [
                'Password audit scripts',
                'Port scanning tools',
                'Metadata extraction tools',
                'Privacy cleanup utilities',
              ],
            },
            {
              icon: './icons/shell.svg',
              label: 'Shell Scripting',
              bullets: [
                'Linux setup scripts',
                'Routine task automation',
                'Service management',
                'Terminal troubleshooting',
              ],
            },
            {
              icon: './icons/docusaurus.svg',
              label: 'Documentation',
              bullets: [
                'Docusaurus project docs',
                'Markdown content management',
                'Structured knowledge bases',
                'Static site generation',
              ],
            },
          ],
    [isGerman]
  );

  const title = isGerman ? 'Meine Skills' : 'My skills';
  const subtitle = isGerman ? 'Wo ich meine Skills eingesetzt habe' : 'Where I applied my skills';
  const usedTitle = isGerman ? 'So habe ich diesen Skill eingesetzt' : 'How I used this skill';

  const contentRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const rows = Array.from(root.querySelectorAll(`.${styles.row}`)) as HTMLElement[];

    const onScroll = () => {
      const sl = root.scrollLeft;
      let best = 0;
      let d = Infinity;

      for (let i = 0; i < rows.length; i++) {
        const di = Math.abs(rows[i].offsetLeft - sl);
        if (di < d) {
          d = di;
          best = i;
        }
      }
      setPage(best);
    };

    root.scrollLeft = 0;
    onScroll();

    root.addEventListener('scroll', onScroll, { passive: true });
    return () => root.removeEventListener('scroll', onScroll);
  }, [skills]);

  const scrollToPage = (i: number) => {
    const root = contentRef.current;
    if (!root) return;
    const rows = root.querySelectorAll<HTMLElement>(`.${styles.row}`);
    const t = rows[i];
    if (t) root.scrollTo({ left: t.offsetLeft, behavior: 'smooth' });
  };

  return (
    <section id="my-skills" className={styles.section}>
      <div className="section">
        <div className={styles.wrap}>
          <header className={styles.headline}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>
          </header>

          <div ref={contentRef} className={styles.content}>
            <div className={styles.desk}>
              {skills.map((s) => (
                <Card key={s.label} {...s} usedTitle={usedTitle} />
              ))}
            </div>

            <div className={styles.row}>
              {skills.slice(0, 3).map((s) => (
                <Card key={s.label} {...s} usedTitle={usedTitle} />
              ))}
            </div>

            <div className={styles.row}>
              {skills.slice(3, 6).map((s) => (
                <Card key={s.label} {...s} usedTitle={usedTitle} />
              ))}
            </div>

            <div className={styles.row}>
              {skills.slice(6, 9).map((s) => (
                <Card key={s.label} {...s} usedTitle={usedTitle} />
              ))}
            </div>
          </div>

          <div className={styles.dots}>
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                className={styles.dot}
                aria-current={page === i ? 'true' : undefined}
                aria-label={`${isGerman ? 'Seite' : 'Page'} ${i + 1}`}
                onClick={() => scrollToPage(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
