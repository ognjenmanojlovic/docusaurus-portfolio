import React, { JSX, useMemo, useState } from 'react';
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
}

const PROJECTS: Project[] = [
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
    docUrl: '/docs/conduit-container',
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
    docUrl: '/docs/baby-tools-shop',
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
    docUrl: '/docs/juice-shop-master',
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
      `Password Cracking Expert is a practical security project that combines Hashcat labs with custom Python-based tooling.\n
       I documented different attack methods, file cracking techniques, and supporting scripts used for password auditing and recovery tasks in controlled environments.\n
       The project strengthened my understanding of authentication weaknesses, attack workflows, and the role of automation in security testing.`,
    docUrl: '/docs/password-cracking',
    githubUrl: 'https://github.com/ognjenmanojlovic/password-cracking-expert',
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
    docUrl: '/docs/minecraft-server',
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
    docUrl: '/docs/wordpress-docker',
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
    docUrl: '/docs/truck-signs-api',
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
    docUrl: '/docs/python-security-tools/port-scanner',
    githubUrl: 'https://github.com/ognjenmanojlovic/python-security-tools',
  },
];

const MOBILE_FEATURED_IDS = [
  'conduit',
  'babytools',
  'juice',
  'password-cracking',
];

function ProjectCard({ project, variant }: ProjectCardProps) {
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
                  Documentation
                </a>
              )}

              {project.githubUrl && (
                <a
                  className={styles.btnSecondary}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
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
              Documentation
            </a>
          )}

          {project.githubUrl && (
            <a
              className={styles.btnSecondary}
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectHighlights(): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActiveId, setIsActiveId] = useState(PROJECTS[0]?.id);

  const active = useMemo(
    () => PROJECTS.find((p) => p.id === isActiveId) ?? PROJECTS[0],
    [isActiveId]
  );

  const desktopVisible = PROJECTS;

  const mobileFeatured = useMemo(
    () => PROJECTS.filter((project) => MOBILE_FEATURED_IDS.includes(project.id)),
    []
  );

  const mobileVisible = useMemo(
    () => (isExpanded ? PROJECTS : mobileFeatured),
    [isExpanded, mobileFeatured]
  );

  return (
    <section id="project-highlights" className={styles.section}>
      <div className={styles.wrap}>
        <h2 className={styles.title}>My project highlights</h2>

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

              <a href="/docs" className={styles.seeMore} aria-label="See more projects">
                <img
                  src="/icons/see-more-default.svg"
                  alt=""
                  className={styles.seeMoreImg}
                />
              </a>
            </aside>

            <ProjectCard project={active} variant="desktop" />
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

                  <ProjectCard project={project} variant="mobile" />
                </div>
              ))}

              {!isExpanded && (
                <div className={styles.mobileCta}>
                  <button
                    type="button"
                    className={styles.seeMore}
                    onClick={() => setIsExpanded(true)}
                    aria-expanded={isExpanded}
                    aria-label="See more projects"
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
