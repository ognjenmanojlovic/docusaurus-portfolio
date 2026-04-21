import React, { JSX, useEffect, useRef, useState } from 'react';
import styles from './my-skills.module.css';

type Skill = { icon: string; label: string; bullets: string[] };

const skills: Skill[] = [
  {
    icon: './icons/docker.svg',
    label: 'Docker',
    bullets: [
      'Containerized application setups',
      'Docker Compose orchestration',
      'Volume and network configuration',
      'Consistent environments',
    ]
  },
  {
    icon: './icons/yaml.svg',
    label: 'YAML',
    bullets: [
      'Docker Compose configs',
      'CI/CD workflow files',
      'Structured app settings',
      'Reusable templates',
    ]
  },
  {
    icon: './icons/githubactions.svg',
    label: 'CI/CD',
    bullets: [
      'Automated build workflows',
      'GitHub Actions pipelines',
      'Testing before releases',
      'Reliable deployments',
    ]
  },
  {
    icon: './icons/security.svg',
    label: 'IT Security',
    bullets: [
      'Juice Shop security labs',
      'Firewall rules and segmentation',
      'Attack surface awareness',
      'Access control best practices',
    ]
  },
  {
    icon: './icons/monitoring.svg',
    label: 'System Administration',
    bullets: [
      'User and access management',
      'Endpoint and server support',
      'Monitoring and maintenance',
      'Operational troubleshooting',
    ]
  },
  {
    icon: './icons/networking.svg',
    label: 'Networking',
    bullets: [
      'Network fundamentals',
      'Traffic analysis basics',
      'Segmentation and access control',
      'Connectivity troubleshooting',
    ]
  },
  {
    icon: './icons/python.svg',
    label: 'Python',
    bullets: [
      'Password audit scripts',
      'Port scanning tools',
      'Metadata extraction tools',
      'Privacy cleanup utilities',
    ]
  },
  {
    icon: './icons/shell.svg',
    label: 'Shell Scripting',
    bullets: [
      'Linux setup scripts',
      'Routine task automation',
      'Service management',
      'Terminal troubleshooting',
    ]
  },
  {
    icon: './icons/docusaurus.svg',
    label: 'Documentation',
    bullets: [
      'Docusaurus project docs',
      'Markdown content management',
      'Structured knowledge bases',
      'Static site generation',
    ]
  },
];

function Card({ icon, label, bullets }: Skill): JSX.Element {
  const [IsOpen, setIsOpen] = useState(false);
  return (
    <article
      className={styles.card}
      data-open={IsOpen ? 'true' : 'false'}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(v => !v)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setIsOpen(v => !v)}
      role="button"
      tabIndex={0}
      aria-pressed={IsOpen}
    >
      <div className={`${styles.panel} ${styles.front}`}>
        <img className={styles.icon} src={icon} alt={label} />
        <div className={styles.label}>{label}</div>
      </div>
      <div className={`${styles.panel} ${styles.back}`}>
        <div className={styles.backInner}>
          <div className={styles.usedTitle}>How I used this skill</div>
          <ul className={styles.usedList}>
            {bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function MySkills(): JSX.Element {
  const contentRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  // Track active page by nearest row; start at first page
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const rows = Array.from(root.querySelectorAll(`.${styles.row}`)) as HTMLElement[];

    const onScroll = () => {
      const sl = root.scrollLeft;
      let best = 0, d = Infinity;
      for (let i = 0; i < rows.length; i++) {
        const di = Math.abs(rows[i].offsetLeft - sl);
        if (di < d) { d = di; best = i; }
      }
      setPage(best);
    };

    root.scrollLeft = 0; // ensure start on first page
    onScroll();

    root.addEventListener('scroll', onScroll, { passive: true });
    return () => root.removeEventListener('scroll', onScroll);
  }, []);

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
            <h2 className={styles.title}>My skills</h2>
            <p className={styles.subtitle}> Where I applied my skills</p>
          </header>

          <div ref={contentRef} className={styles.content}>
            <div className={styles.desk}>
              {skills.map((s) => <Card key={s.label} {...s} />)}
            </div>
            <div className={styles.row}>
              {skills.slice(0, 3).map((s) => <Card key={s.label} {...s} />)}
            </div>
            <div className={styles.row}>
              {skills.slice(3, 6).map((s) => <Card key={s.label} {...s} />)}
            </div>
            <div className={styles.row}>
              {skills.slice(6, 9).map((s) => <Card key={s.label} {...s} />)}
            </div>
          </div>

          <div className={styles.dots}>
            {[0, 1, 2].map(i => (
              <button
                key={i}
                className={styles.dot}
                aria-current={page === i ? 'true' : undefined}
                aria-label={`Page ${i + 1}`}
                onClick={() => scrollToPage(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
