import React, { JSX, useMemo, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './project-highlights.module.css';

interface Tag {
  icon: string;
  label: string;
}

interface Project {
  id: string;
  name: string;
  image: string;
  tags: Tag[];
  description: string;
  docUrl?: string;
  githubUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  variant: 'desktop' | 'mobile';
  documentationLabel: string;
  githubLabel: string;
}

function ProjectCard({
  project,
  variant,
  documentationLabel,
  githubLabel,
}: ProjectCardProps) {
  if (variant === 'desktop') {
    return (
      <article className={styles.card} data-variant="desktop">
        <div className={styles.cardBody}>
          <div className={styles.leftCol}>
            <h3 className={styles.cardTitle}>{project.name}</h3>
            <div className={styles.imageWrap}>
              <img src={project.image} alt={project.name} className={styles.image} />
            </div>
          </div>

          <div className={styles.detailCol}>
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <span key={`${project.id}-${tag.label}`} className={styles.tag}>
                  <img src={tag.icon} alt="" className={styles.tagIcon} />
                  <span className={styles.tagText}>{tag.label}</span>
                </span>
              ))}
            </div>

            <p className={styles.description}>{project.description}</p>

            <div className={styles.buttons}>
              {project.docUrl && (
                <a
                  className={styles.btnPrimary}
                  href={project.docUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {documentationLabel}
                </a>
              )}

              {project.githubUrl && (
                <a
                  className={styles.btnSecondary}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {githubLabel}
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={styles.card} data-variant="mobile">
      <h3 className={styles.visuallyHidden}>{project.name}</h3>

      <div className={styles.cardBody}>
        <div className={styles.tags}>
          {project.tags.map((tag) => (
            <span key={`${project.id}-${tag.label}`} className={styles.tag}>
              <img src={tag.icon} alt="" className={styles.tagIcon} />
              <span className={styles.tagText}>{tag.label}</span>
            </span>
          ))}
        </div>

        <div className={styles.imageWrap}>
          <img src={project.image} alt={project.name} className={styles.image} />
        </div>

        <p className={styles.description}>{project.description}</p>

        <div className={styles.buttons}>
          {project.docUrl && (
            <a
              className={styles.btnPrimary}
              href={project.docUrl}
              target="_blank"
              rel="noreferrer"
            >
              {documentationLabel}
            </a>
          )}

          {project.githubUrl && (
            <a
              className={styles.btnSecondary}
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              {githubLabel}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectHighlights(): JSX.Element {
  const { i18n } = useDocusaurusContext();
  const isGerman = i18n.currentLocale === 'de';

  const projects: Project[] = useMemo(
    () =>
      isGerman
        ? [
            {
              id: 'conduit',
              name: 'Conduit Container',
              image: './img/projects/conduit.png',
              tags: [
                { icon: './icons/yaml_b.svg', label: 'Yaml' },
                { icon: './icons/shell_b.svg', label: 'Shell' },
                { icon: './icons/docker_b.svg', label: 'Docker' },
                { icon: './icons/githubactions_b.svg', label: 'CI/CD' },
              ],
              description:
                `Conduit Container ist mein Ansatz, Full-Stack-Anwendungen sicher und zuverlässig bereitzustellen.\n
      Frontend und Backend laufen als Docker-Services und werden von einer CI/CD-Pipeline unterstützt, die Builds, Releases und Deployments übernimmt.\n
      Das Ergebnis sind weniger manuelle Schritte, ein geringeres Fehlerrisiko und schnellere Auslieferung – ganz im Sinne meines DevSecOps-Mindsets aus Automatisierung und Stabilität.`,
              docUrl: '/docs/projects/conduit-container',
              githubUrl: 'https://github.com/ognjenmanojlovic/conduit-container',
            },
            {
              id: 'babytools',
              name: 'Baby Tools Shop',
              image: './img/projects/babytools.png',
              tags: [
                { icon: './icons/docker_b.svg', label: 'Docker' },
                { icon: './icons/shell_b.svg', label: 'Shell' },
                { icon: './icons/python.svg', label: 'Python' },
              ],
              description:
                `Ein Django-basierter Shop, der als containerisierter Service mit einem eigenen Dockerfile umgesetzt wurde, um Python-Umgebung und Abhängigkeiten sauber zu steuern.\n
       Das Setup lässt sich konsistent starten, warten und aktualisieren, was Deployments über verschiedene Umgebungen hinweg einfach und zuverlässig macht.\n
       Dieses Projekt gab mir wertvolle Praxiserfahrung darin, Webanwendungen in stabile und produktionsreife Container-Services zu überführen.`,
              docUrl: '/docs/projects/baby-tools-shop',
              githubUrl: 'https://github.com/ognjenmanojlovic/baby-tools-shop',
            },
            {
              id: 'juice',
              name: 'OWASP Juice Shop',
              image: './img/projects/juiceshop.png',
              tags: [
                { icon: './icons/security.svg', label: 'IT Security' },
                { icon: './icons/shell_b.svg', label: 'Shell' },
                { icon: './icons/python.svg', label: 'Python' },
              ],
              description:
                `Juice Shop Meister ist ein praxisnahes Security-Projekt, das sich auf die Analyse und Ausnutzung von Schwachstellen in OWASP Juice Shop konzentriert.\n
       Ich habe detaillierte Dokumentationen und Video-Walkthroughs erstellt, die zeigen, wie Angriffe durchgeführt werden, wie man sie verhindert und warum sie relevant sind.\n
       Das Projekt hat meine praktischen Penetration-Testing-Skills, mein Sicherheitsbewusstsein und meine Fähigkeit gestärkt, komplexe Risiken klar und strukturiert zu vermitteln.`,
              docUrl: '/docs/projects/juice-shop-master',
              githubUrl: 'https://github.com/ognjenmanojlovic/juice-shop-meister',
            },
            {
              id: 'password-cracking',
              name: 'Password Cracking',
              image: './img/projects/password-cracking.png',
              tags: [
                { icon: './icons/security.svg', label: 'IT Security' },
                { icon: './icons/shell_b.svg', label: 'Shell' },
                { icon: './icons/python.svg', label: 'Python' },
              ],
              description:
                `Password Cracking ist ein praxisorientiertes Security-Projekt, das Hashcat-Labs mit eigenen Python-basierten Tools kombiniert.\n
       Ich habe verschiedene Angriffsmethoden, Datei-Cracking-Techniken und unterstützende Skripte dokumentiert, die in kontrollierten Umgebungen für Passwort-Audits und Recovery-Aufgaben eingesetzt werden.\n
       Das Projekt hat mein Verständnis für Authentifizierungsschwächen, Angriffsabläufe und die Rolle von Automatisierung im Security Testing vertieft.`,
              docUrl: '/docs/projects/password-cracking',
              githubUrl: 'https://github.com/ognjenmanojlovic/docusaurus-portfolio/tree/main/docs/password-cracking',
            },
            {
              id: 'minecraft',
              name: 'Minecraft Server',
              image: './img/projects/minecraft.png',
              tags: [
                { icon: './icons/docker_b.svg', label: 'Docker' },
                { icon: './icons/yaml_b.svg', label: 'Yaml' },
                { icon: './icons/shell_b.svg', label: 'Shell' },
                { icon: './icons/security.svg', label: 'IT Security' },
              ],
              description:
                `Das Minecraft-Server-Projekt ist eine containerisierte Lösung für den Betrieb eines zuverlässigen Game-Servers mit persistenter Speicherung für Welt-Daten, Einstellungen und Logs.\n
       Es ermöglicht Neustarts und Updates ohne Fortschrittsverlust, während zentrale Konfigurationswerte über Environment-Variablen einfach verwaltet werden.\n
       Das Projekt zeigt meine Fähigkeit, praktische, stabile und wartungsfreundliche Services mit modernen Docker-Workflows umzusetzen.`,
              docUrl: '/docs/projects/minecraft-server',
              githubUrl: 'https://github.com/ognjenmanojlovic/minecraft-server',
            },
            {
              id: 'wordpress',
              name: 'WordPress',
              image: './img/projects/wordpress.png',
              tags: [
                { icon: './icons/docker_b.svg', label: 'Docker' },
                { icon: './icons/yaml_b.svg', label: 'Yaml' },
                { icon: './icons/shell_b.svg', label: 'Shell' },
                { icon: './icons/security.svg', label: 'IT Security' },
              ],
              description:
                `Ein schlankes Docker-Compose-Setup für WordPress und MySQL mit offiziellen Container-Images.\n
       Persistente Volumes schützen Daten über Neustarts hinweg, während umgebungsbasierte Konfiguration sensible Werte aus dem Repository fernhält und ein zuverlässiges Startverhalten sicherstellt.\n
       Dieses Projekt war mein Ansatz, einen klassischen CMS-Stack in eine saubere, stabile und produktionsreife Container-Lösung zu verwandeln.`,
              docUrl: '/docs/projects/wordpress-docker',
              githubUrl: 'https://github.com/ognjenmanojlovic/wordpress-docker',
            },
            {
              id: 'trucks',
              name: 'Truck Signs API',
              image: './img/projects/trucksigns.png',
              tags: [
                { icon: './icons/docker_b.svg', label: 'Docker' },
                { icon: './icons/yaml_b.svg', label: 'Yaml' },
                { icon: './icons/shell_b.svg', label: 'Shell' },
                { icon: './icons/python.svg', label: 'Python' },
              ],
              description:
                `Ein Dockerisierter Django-E-Commerce-Backend-Service mit PostgreSQL für zuverlässiges Datenmanagement.\n
       Die Services laufen in einem dedizierten Container-Netzwerk, während Environment-Variablen Konfiguration und sensible Einstellungen sicher verwalten. Admin-Zugang und Produktmanagement sind von Anfang an integriert.\n
       Dieses Projekt spiegelt meinen Fokus wider, Backend-Systeme zu bauen, die sicher, strukturiert und praxisnah einsetzbar sind.`,
              docUrl: '/docs/projects/truck-signs-api',
              githubUrl: 'https://github.com/ognjenmanojlovic/truck_signs_api',
            },
            {
              id: 'port-scanner',
              name: 'Port Scanner',
              image: './img/projects/port-scanner.png',
              tags: [
                { icon: './icons/security.svg', label: 'IT Security' },
                { icon: './icons/python.svg', label: 'Python' },
                { icon: './icons/shell_b.svg', label: 'Shell' },
              ],
              description:
                `Port Scanner ist ein Python-Security-Tool, das offene Ports überprüft und die Sichtbarkeit exponierter Netzwerkdienste verbessert.\n
       Ich habe es genutzt, um mein Verständnis für Netzwerk-Enumeration, Host-Analyse und den Einsatz kleiner Automatisierungstools in Security-Testing-Workflows zu stärken.\n
       Das Projekt zeigt mein Interesse an praxisnahen Python-basierten Tools für Cyber-Security-Aufgaben und technische Infrastruktur-Analysen.`,
              docUrl: '/docs/projects/python-security-tools/port-scanner',
              githubUrl: 'https://github.com/ognjenmanojlovic/docusaurus-portfolio/tree/main/docs/python-security-tools/port-scanner',
            },
          ]
        : [
            {
              id: 'conduit',
              name: 'Conduit Container',
              image: './img/projects/conduit.png',
              tags: [
                { icon: './icons/yaml_b.svg', label: 'Yaml' },
                { icon: './icons/shell_b.svg', label: 'Shell' },
                { icon: './icons/docker_b.svg', label: 'Docker' },
                { icon: './icons/githubactions_b.svg', label: 'CI/CD' },
              ],
              description:
                `Conduit Container is my approach to deploying full-stack applications in a secure and reliable way.\n
      Both frontend and backend run as Docker services, supported by a CI/CD pipeline that manages builds, releases, and deployments.\n
      The result is fewer manual tasks, lower risk of errors, and faster delivery, reflecting my DevSecOps mindset of combining automation with stability.`,
              docUrl: '/docs/projects/conduit-container',
              githubUrl: 'https://github.com/ognjenmanojlovic/conduit-container',
            },
            {
              id: 'babytools',
              name: 'Baby Tools Shop',
              image: './img/projects/babytools.png',
              tags: [
                { icon: './icons/docker_b.svg', label: 'Docker' },
                { icon: './icons/shell_b.svg', label: 'Shell' },
                { icon: './icons/python.svg', label: 'Python' },
              ],
              description:
                `A Django-based shop packaged as a containerized service with a custom Dockerfile to manage the Python environment and dependencies.\n
       The setup can be started, maintained, and updated consistently across different environments, making deployments simple and reliable.\n
       This project gave me valuable hands-on experience in turning web applications into stable and production-ready containerized services.`,
              docUrl: '/docs/projects/baby-tools-shop',
              githubUrl: 'https://github.com/ognjenmanojlovic/baby-tools-shop',
            },
            {
              id: 'juice',
              name: 'OWASP Juice Shop',
              image: './img/projects/juiceshop.png',
              tags: [
                { icon: './icons/security.svg', label: 'IT Security' },
                { icon: './icons/shell_b.svg', label: 'Shell' },
                { icon: './icons/python.svg', label: 'Python' },
              ],
              description:
                `Juice Shop Meister is a hands-on security project focused on analyzing and exploiting vulnerabilities in OWASP Juice Shop.\n
       I created detailed documentation and video walkthroughs that showed how attacks were performed, how they can be prevented, and why they matter.\n
       The project strengthened my practical penetration testing skills, security awareness, and ability to explain complex risks in a clear and structured way.`,
              docUrl: '/docs/projects/juice-shop-master',
              githubUrl: 'https://github.com/ognjenmanojlovic/juice-shop-meister',
            },
            {
              id: 'password-cracking',
              name: 'Password Cracking',
              image: './img/projects/password-cracking.png',
              tags: [
                { icon: './icons/security.svg', label: 'IT Security' },
                { icon: './icons/shell_b.svg', label: 'Shell' },
                { icon: './icons/python.svg', label: 'Python' },
              ],
              description:
                `Password Cracking is a practical security project that combines Hashcat labs with custom Python-based tooling.\n
       I documented different attack methods, file cracking techniques, and supporting scripts used for password auditing and recovery tasks in controlled environments.\n
       The project strengthened my understanding of authentication weaknesses, attack workflows, and the role of automation in security testing.`,
              docUrl: '/docs/projects/password-cracking',
              githubUrl: 'https://github.com/ognjenmanojlovic/docusaurus-portfolio/tree/main/docs/password-cracking',
            },
            {
              id: 'minecraft',
              name: 'Minecraft Server',
              image: './img/projects/minecraft.png',
              tags: [
                { icon: './icons/docker_b.svg', label: 'Docker' },
                { icon: './icons/yaml_b.svg', label: 'Yaml' },
                { icon: './icons/shell_b.svg', label: 'Shell' },
                { icon: './icons/security.svg', label: 'IT Security' },
              ],
              description:
                `The Minecraft Server project is a containerized solution for running a reliable game server with persistent storage for world data, settings, and logs.\n
       It allows restarts and updates without losing progress, while key configuration values are handled through environment variables for simple management.\n
       The project highlights my ability to build practical, stable, and easy-to-maintain services using modern Docker workflows.`,
              docUrl: '/docs/projects/minecraft-server',
              githubUrl: 'https://github.com/ognjenmanojlovic/minecraft-server',
            },
            {
              id: 'wordpress',
              name: 'WordPress',
              image: './img/projects/wordpress.png',
              tags: [
                { icon: './icons/docker_b.svg', label: 'Docker' },
                { icon: './icons/yaml_b.svg', label: 'Yaml' },
                { icon: './icons/shell_b.svg', label: 'Shell' },
                { icon: './icons/security.svg', label: 'IT Security' },
              ],
              description:
                `A streamlined Docker Compose setup for WordPress and MySQL using official container images.\n
       Persistent volumes protect data across restarts, while environment-based configuration keeps sensitive values out of source control and ensures reliable startup behavior.\n
       This project was my approach to transforming a traditional CMS stack into a clean, stable, and production-ready containerized solution.`,
              docUrl: '/docs/projects/wordpress-docker',
              githubUrl: 'https://github.com/ognjenmanojlovic/wordpress-docker',
            },
            {
              id: 'trucks',
              name: 'Truck Signs API',
              image: './img/projects/trucksigns.png',
              tags: [
                { icon: './icons/docker_b.svg', label: 'Docker' },
                { icon: './icons/yaml_b.svg', label: 'Yaml' },
                { icon: './icons/shell_b.svg', label: 'Shell' },
                { icon: './icons/python.svg', label: 'Python' },
              ],
              description:
                `A Dockerized Django e-commerce backend powered by PostgreSQL for reliable data management.\n
       The services run on a dedicated container network, while environment variables are used to handle configuration and sensitive settings securely. Admin access and product management are included from the start.\n
       This project reflects my focus on building backend systems that are secure, organized, and ready for practical deployment.`,
              docUrl: '/docs/projects/truck-signs-api',
              githubUrl: 'https://github.com/ognjenmanojlovic/truck_signs_api',
            },
            {
              id: 'port-scanner',
              name: 'Port Scanner',
              image: './img/projects/port-scanner.png',
              tags: [
                { icon: './icons/security.svg', label: 'IT Security' },
                { icon: './icons/python.svg', label: 'Python' },
                { icon: './icons/shell_b.svg', label: 'Shell' },
              ],
              description:
                `Port Scanner is a Python security tool built to inspect open ports and improve visibility into exposed network services.\n
       I used it to strengthen my understanding of network enumeration, host analysis, and how small automation tools support security testing workflows.\n
       The project reflects my interest in practical Python-based tooling for cyber security tasks and technical infrastructure analysis.`,
              docUrl: '/docs/projects/python-security-tools/port-scanner',
              githubUrl: 'https://github.com/ognjenmanojlovic/docusaurus-portfolio/tree/main/docs/python-security-tools/port-scanner',
            },
          ],
    [isGerman]
  );

  const title = isGerman ? 'Meine Projekt-Highlights' : 'My project highlights';
  const documentationLabel = isGerman ? 'Dokumentation' : 'Documentation';
  const githubLabel = 'GitHub';
  const seeMoreLabel = isGerman ? 'Mehr Projekte ansehen' : 'See more projects';

  const mobileFeaturedIds = useMemo(
    () => ['conduit', 'babytools', 'juice', 'password-cracking'],
    []
  );

  const [isExpanded, setIsExpanded] = useState(false);
  const [isActiveId, setIsActiveId] = useState(projects[0]?.id);

  const active = useMemo(
    () => projects.find((p) => p.id === isActiveId) ?? projects[0],
    [isActiveId, projects]
  );

  const desktopVisible = projects;

  const mobileFeatured = useMemo(
    () => projects.filter((project) => mobileFeaturedIds.includes(project.id)),
    [projects, mobileFeaturedIds]
  );

  const mobileVisible = useMemo(
    () => (isExpanded ? projects : mobileFeatured),
    [isExpanded, mobileFeatured, projects]
  );

  return (
    <section id="project-highlights" className={styles.section}>
      <div className={styles.wrap}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.desktopOnly}>
          <div className={styles.content}>
            <aside className={styles.listCol}>
              <div className={styles.list}>
                {desktopVisible.map((project, index) => {
                  const isActive = project.id === isActiveId;

                  return (
                    <button
                      key={project.id}
                      type="button"
                      className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
                      onClick={() => setIsActiveId(project.id)}
                      aria-pressed={isActive}
                    >
                      <span className={`${styles.num} ${isActive ? styles.numActive : ''}`}>
                        {index + 1}.
                      </span>
                      <span className={styles.itemLabel}>{project.name}</span>
                    </button>
                  );
                })}
              </div>

              <a href="/docs/projects" className={styles.seeMore} aria-label={seeMoreLabel}>
                <img
                  src="/icons/see-more-default.svg"
                  alt=""
                  className={styles.seeMoreImg}
                />
              </a>
            </aside>

            <ProjectCard
              project={active}
              variant="desktop"
              documentationLabel={documentationLabel}
              githubLabel={githubLabel}
            />
          </div>
        </div>

        <div className={styles.mobileOnly}>
          <div className={styles.content}>
            <div className={styles.mobileStack}>
              {mobileVisible.map((project, index) => (
                <div key={project.id} className={styles.mobileGroup}>
                  <div className={styles.mobileHeader}>
                    <span className={styles.mobileNum}>{index + 1}.</span>
                    <span className={styles.itemLabel}>{project.name}</span>
                  </div>

                  <ProjectCard
                    project={project}
                    variant="mobile"
                    documentationLabel={documentationLabel}
                    githubLabel={githubLabel}
                  />
                </div>
              ))}

              {!isExpanded && (
                <div className={styles.mobileCta}>
                  <button
                    type="button"
                    className={styles.seeMore}
                    onClick={() => setIsExpanded(true)}
                    aria-expanded={isExpanded}
                    aria-label={seeMoreLabel}
                  >
                    <img
                      src="/icons/see-more-default.svg"
                      alt=""
                      className={styles.seeMoreImg}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
