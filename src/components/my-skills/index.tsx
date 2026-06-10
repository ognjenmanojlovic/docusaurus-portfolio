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
              icon: './icons/security.svg',
              label: 'IT Security',
              bullets: [
                'Juice-Shop-Sicherheitslabore',
                'SOC- und SIEM-Monitoring',
                'Security-Hardening',
                'Awareness für Schwachstellen',
              ],
            },
            {
              icon: './icons/systemadministration.svg',
              label: 'System Administration',
              bullets: [
                'Linux-Server-Administration',
                'Benutzer- und Zugriffsverwaltung',
                'Service-Monitoring und Wartung',
                'Operatives Troubleshooting',
              ],
            },
            {
              icon: './icons/network.svg',
              label: 'Networking',
              bullets: [
                'Netzwerkgrundlagen',
                'Firewall-Regeln und Segmentierung',
                'Traffic-Analyse-Basics',
                'Konnektivitäts-Troubleshooting',
              ],
            },
            {
              icon: './icons/docker.svg',
              label: 'Docker',
              bullets: [
                'Containerisierte App-Setups',
                'Docker-Compose-Orchestrierung',
                'Persistente Volumes und Netzwerke',
                'Reproduzierbare Lab-Umgebungen',
              ],
            },
            {
              icon: './icons/githubactions.svg',
              label: 'CI/CD',
              bullets: [
                'GitHub-Actions-Pipelines',
                'Security-Scans im Workflow',
                'Image-Builds und Artefakte',
                'Automatisierte Deployments',
              ],
            },
            {
              icon: './icons/python.svg',
              label: 'Python',
              bullets: [
                'Security-Tools und Skripte',
                'Log-Analyse und Reports',
                'Port-Scanning-Utilities',
                'File-Integrity-Checks',
              ],
            },
            {
              icon: './icons/kubernetes.svg',
              label: 'Kubernetes',
              bullets: [
                'k3d-Cluster-Deployments',
                'Helm-Charts und Manifeste',
                'Services, Ingress und Namespaces',
                'Container-Hardening im Cluster',
              ],
            },
            {
              icon: './icons/terraform.svg',
              label: 'Terraform',
              bullets: [
                'Infrastructure as Code',
                'Strukturierte Lab-Setups',
                'Wiederverwendbare Konfigurationen',
                'Basis für Cloud-Provisioning',
              ],
            },
            {
              icon: './icons/cloud.svg',
              label: 'Cloud',
              bullets: [
                'AWS-Grundlagen im Lab',
                'EC2, S3 und IAM Basics',
                'Monitoring und Audit-Logging',
                'Sichere Cloud-Konfigurationen',
              ],
            },
          ]
        : [
            {
              icon: './icons/security.svg',
              label: 'IT Security',
              bullets: [
                'Juice Shop security labs',
                'SOC & SIEM monitoring',
                'Security hardening',
                'Vulnerability awareness',
              ],
            },
            {
              icon: './icons/systemadministration.svg',
              label: 'System Administration',
              bullets: [
                'Linux server administration',
                'User and access management',
                'Service monitoring and maintenance',
                'Operational troubleshooting',
              ],
            },
            {
              icon: './icons/network.svg',
              label: 'Networking',
              bullets: [
                'Network fundamentals',
                'Firewall rules and segmentation',
                'Traffic analysis basics',
                'Connectivity troubleshooting',
              ],
            },
            {
              icon: './icons/docker.svg',
              label: 'Docker',
              bullets: [
                'Containerized application setups',
                'Docker Compose orchestration',
                'Persistent volumes and networks',
                'Reproducible lab environments',
              ],
            },
            {
              icon: './icons/githubactions.svg',
              label: 'CI/CD',
              bullets: [
                'GitHub Actions pipelines',
                'Security scans in workflows',
                'Image builds and artifacts',
                'Automated deployments',
              ],
            },
            {
              icon: './icons/python.svg',
              label: 'Python',
              bullets: [
                'Security tools and scripts',
                'Log analysis and reports',
                'Port scanning utilities',
                'File integrity checks',
              ],
            },
            {
              icon: './icons/kubernetes.svg',
              label: 'Kubernetes',
              bullets: [
                'k3d cluster deployments',
                'Helm charts and manifests',
                'Services, Ingress and namespaces',
                'Container hardening in clusters',
              ],
            },
            {
              icon: './icons/terraform.svg',
              label: 'Terraform',
              bullets: [
                'Infrastructure as Code',
                'Structured lab setups',
                'Reusable configurations',
                'Cloud provisioning basics',
              ],
            },
            {
              icon: './icons/cloud.svg',
              label: 'Cloud',
              bullets: [
                'AWS fundamentals in labs',
                'EC2, S3 and IAM basics',
                'Monitoring and audit logging',
                'Secure cloud configurations',
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
