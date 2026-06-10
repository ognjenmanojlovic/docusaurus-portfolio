import React, { JSX, useMemo, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './project-highlights.module.css';

interface Tag {
  icon: string;
  label?: string;
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
              {project.tags.map((tag, index) => (
                <span key={`${project.id}-${index}`} className={styles.tag}>
                  <img src={tag.icon} alt="" className={styles.tagIcon} />
                  {tag.label && <span className={styles.tagText}>{tag.label}</span>}
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
          {project.tags.map((tag, index) => (
            <span key={`${project.id}-${index}`} className={styles.tag}>
              <img src={tag.icon} alt="" className={styles.tagIcon} />
              {tag.label && <span className={styles.tagText}>{tag.label}</span>}
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
              id: 'aws-cloud-security-lab',
              name: 'AWS Security Lab',
              image: './img/projects/screenshots/aws-security-lab/aws-security-lab.png',
              tags: [
                { icon: './icons/cloud.svg', label: 'Cloud' },
                { icon: './icons/terraform.svg', label: 'Terraform' },
                { icon: './icons/ansible.svg', label: 'Ansible' },
                { icon: './icons/security.svg', label: 'IT Security' },
              ],
              description:
                `AWS Cloud Security Lab zeigt, wie eine sichere Cloud-Umgebung mit Terraform, Ansible und nativen AWS-Security-Services aufgebaut wird.\n
      Das Projekt kombiniert EC2, S3, IAM, CloudWatch, CloudTrail und AWS Config mit Linux-Hardening, Monitoring, Alerting und Audit Logging.\n
      Der Fokus liegt auf Infrastructure as Code, automatisierter Absicherung und Cloud-Security-Basics nach dem Least-Privilege-Prinzip.`,
              docUrl: '/docs/projects/aws-security-lab',
              githubUrl: 'https://github.com/ognjenmanojlovic/aws-cloud-security-lab',
            },
            {
              id: 'terraform-ansible-lab',
              name: 'Terraform/Ansible',
              image: './img/projects/screenshots/terraform-ansible/terraform-ansible-logo.png',
              tags: [
                { icon: './icons/terraform.svg', label: 'Terraform' },
                { icon: './icons/ansible.svg', label: 'Ansible' },
                { icon: './icons/docker_b.svg', label: 'Docker' },
                { icon: './icons/security.svg', label: 'IT Security' },
              ],
              description:
                `Terraform & Ansible Secure Lab zeigt, wie Infrastructure as Code für automatisiertes Linux-Provisioning, System-Hardening und das Deployment selbst gehosteter Dienste eingesetzt werden kann.\n
      Das Projekt kombiniert Terraform, Ansible, Docker und eine selbst gehostete Gitea-Instanz mit automatisiertem Paketmanagement, UFW-Firewall-Konfiguration, Fail2Ban-Schutz, SSH-Hardening und containerisierten Deployments.\n
      Der Fokus liegt auf reproduzierbarer Infrastruktur, Konfigurationsmanagement und sicherer Automatisierung – zentrale Bestandteile moderner DevOps- und DevSecOps-Umgebungen.`,
              docUrl: '/docs/projects/terraform-ansible-lab',
              githubUrl: 'https://github.com/ognjenmanojlovic/terraform-ansible-secure-lab',
            },
            {
              id: 'fastapi-devsecops',
              name: 'FastAPI DevSecOps',
              image: './img/projects/screenshots/fastapi-devsecops/FastAPI-DevSecOps-Platform.png',
              tags: [
                { icon: './icons/yaml_b.svg', label: 'Yaml' },
                { icon: './icons/docker_b.svg', label: 'Docker' },
                { icon: './icons/githubactions_b.svg', label: 'CI/CD' },
                { icon: './icons/security.svg', label: 'IT Security' },
              ],
              description:
                `FastAPI DevSecOps Platform zeigt, wie eine moderne Full-Stack-Anwendung mit professionellen Security- und CI/CD-Prozessen erweitert wird.\n
      Das Projekt kombiniert FastAPI, React, Docker und GitHub Actions mit Secret Scanning, SAST, Dependency Scanning, Container Scanning, SBOMs und signierten Docker Images.\n
      Der Fokus liegt auf sicherer Automatisierung, Container Hardening und Software Supply Chain Security – genau dort, wo moderne DevSecOps-Arbeit in der Praxis beginnt.`,
              docUrl: '/docs/projects/fastapi-devsecops-platform',
              githubUrl: 'https://github.com/ognjenmanojlovic/fastapi-devsecops-platform',
            },
            {
              id: 'fastapi-kubernetes',
              name: 'FastAPI Kubernetes',
              image: './img/projects/screenshots/fastapi-kubernetes/FastAPI-Kubernetes-Platform.png',
              tags: [
                { icon: './icons/kubernetes.svg', label: 'Kubernetes' },
                { icon: './icons/docker_b.svg', label: 'Docker' },
                { icon: './icons/githubactions_b.svg', label: 'CI/CD' },
                { icon: './icons/security.svg', label: 'IT Security' },
              ],
              description:
                `FastAPI Kubernetes Platform erweitert meine DevSecOps-Anwendung um ein praktisches Kubernetes-Deployment mit k3d, Helm, Traefik Ingress und PostgreSQL.\n
      Frontend, Backend und Datenbank laufen als getrennte Workloads im Cluster und kommunizieren über Kubernetes Services, ConfigMaps, Secrets und Ingress-Routing.\n
      Das Projekt zeigt, wie containerisierte Anwendungen reproduzierbar deployed, abgesichert, skaliert und mit grundlegenden Kubernetes-Security-Konzepten betrieben werden können.`,
              docUrl: '/docs/projects/fastapi-kubernetes-platform',
              githubUrl: 'https://github.com/ognjenmanojlovic/fastapi-kubernetes-platform',
            },
            {
              id: 'soc-siem-lab',
              name: 'SOC & SIEM Lab',
              image: './img/projects/screenshots/soc-lab/SOC-SIEM-Lab.png',
              tags: [
                { icon: './icons/security.svg', label: 'IT Security' },
                { icon: './icons/docker_b.svg', label: 'Docker' },
                { icon: './icons/cloud.svg', label: 'Cloud' },
                { icon: './icons/systemadministration.svg', label: 'Sysadmin' },
              ],
              description:
                `SOC & SIEM Infrastructure Lab ist ein praxisnahes Blue-Team-Projekt mit Wazuh SIEM, File Integrity Monitoring, Fail2Ban und einem Cowrie SSH Honeypot.\n
      In der Lab-Umgebung wurden SSH-Brute-Force-Angriffe, Reconnaissance, Privilege Escalation, Honeypot-Aktivität und Dateiänderungen simuliert und analysiert.\n
      Das Projekt zeigt meine praktische Erfahrung mit Threat Hunting, Log-Analyse, Detection Engineering, MITRE ATT&CK und Incident-Response-Workflows.`,
              docUrl: '/docs/projects/soc-siem-infrastructure-lab',
              githubUrl: 'https://github.com/ognjenmanojlovic/soc-siem-infrastructure-lab',
            },
            {
              id: 'conduit',
              name: 'Conduit Container',
              image: './img/projects/conduit.png',
              tags: [
                { icon: './icons/yaml_b.svg', label: 'Yaml' },
                { icon: './icons/shell_b.svg', label: 'Shell' },
                { icon: './icons/docker_b.svg', label: 'Docker' },
                { icon: './icons/githubactions_b.svg', label: 'CI/CD' },
                { icon: './icons/cloud.svg', label: 'Cloud' }
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
                { icon: './icons/cloud.svg', label: 'Cloud' }
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
          ]
        : [
            {
              id: 'aws-cloud-security-lab',
              name: 'AWS Security Lab',
              image: './img/projects/screenshots/aws-security-lab/aws-security-lab.png',
              tags: [
                { icon: './icons/cloud.svg', label: 'Cloud' },
                { icon: './icons/terraform.svg', label: 'Terraform' },
                { icon: './icons/ansible.svg', label: 'Ansible' },
                { icon: './icons/security.svg', label: 'IT Security' },
              ],
              description:
                `AWS Cloud Security Lab demonstrates how to build a secure cloud environment using Terraform, Ansible and native AWS security services.\n
      The project combines EC2, S3, IAM, CloudWatch, CloudTrail and AWS Config with Linux hardening, monitoring, alerting and audit logging.\n
      It focuses on Infrastructure as Code, automated hardening and cloud security fundamentals based on the principle of least privilege.`,
              docUrl: '/docs/projects/aws-security-lab',
              githubUrl: 'https://github.com/ognjenmanojlovic/aws-cloud-security-lab',
            },
            {
              id: 'terraform-ansible-lab',
              name: 'Terraform/Ansible',
              image: './img/projects/screenshots/terraform-ansible/terraform-ansible-logo.png',
              tags: [
                { icon: './icons/terraform.svg', label: 'Terraform' },
                { icon: './icons/ansible.svg', label: 'Ansible' },
                { icon: './icons/docker_b.svg', label: 'Docker' },
                { icon: './icons/security.svg', label: 'IT Security' },
              ],
              description:
                `Terraform & Ansible Secure Lab demonstrates how Infrastructure as Code can be used to automate Linux provisioning, system hardening and self-hosted service deployment.\n
      The project combines Terraform, Ansible, Docker, and a self-hosted Gitea instance with automated package management, UFW firewall configuration, Fail2Ban protection, SSH hardening and containerized deployments.\n
      It focuses on reproducible infrastructure, configuration management and secure automation — core practices of modern DevOps and DevSecOps environments.`,
              docUrl: '/docs/projects/terraform-ansible-lab',
              githubUrl: 'https://github.com/ognjenmanojlovic/terraform-ansible-secure-lab',
            },
            {
              id: 'fastapi-devsecops',
              name: 'FastAPI DevSecOps',
              image: './img/projects/screenshots/fastapi-devsecops/FastAPI-DevSecOps-Platform.png',
              tags: [
                { icon: './icons/yaml_b.svg', label: 'Yaml' },
                { icon: './icons/docker_b.svg', label: 'Docker' },
                { icon: './icons/githubactions_b.svg', label: 'CI/CD' },
                { icon: './icons/security.svg', label: 'IT Security' },
              ],
              description:
                `FastAPI DevSecOps Platform demonstrates how a modern full-stack application can be extended with professional security and CI/CD workflows.\n
      The project combines FastAPI, React, Docker, and GitHub Actions with secret scanning, SAST, dependency scanning, container scanning, SBOM generation, and signed Docker images.\n
      It focuses on secure automation, container hardening, and software supply chain security — exactly where modern DevSecOps work becomes practical.`,
              docUrl: '/docs/projects/fastapi-devsecops-platform',
              githubUrl: 'https://github.com/ognjenmanojlovic/fastapi-devsecops-platform',
            },
            {
              id: 'fastapi-kubernetes',
              name: 'FastAPI Kubernetes',
              image: './img/projects/screenshots/fastapi-kubernetes/FastAPI-Kubernetes-Platform.png',
              tags: [
                { icon: './icons/kubernetes.svg', label: 'Kubernetes' },
                { icon: './icons/docker_b.svg', label: 'Docker' },
                { icon: './icons/githubactions_b.svg', label: 'CI/CD' },
                { icon: './icons/security.svg', label: 'IT Security' },
              ],
              description:
                `FastAPI Kubernetes Platform extends my DevSecOps application with a practical Kubernetes deployment using k3d, Helm, Traefik Ingress, and PostgreSQL.\n
      Frontend, backend, and database run as separate workloads inside the cluster and communicate through Kubernetes services, ConfigMaps, Secrets, and Ingress routing.\n
      This project shows how containerized applications can be deployed, secured, scaled, and managed with foundational Kubernetes security concepts.`,
              docUrl: '/docs/projects/fastapi-kubernetes-platform',
              githubUrl: 'https://github.com/ognjenmanojlovic/fastapi-kubernetes-platform',
            },
            {
              id: 'soc-siem-lab',
              name: 'SOC & SIEM Lab',
              image: './img/projects/screenshots/soc-lab/SOC-SIEM-Lab.png',
              tags: [
                { icon: './icons/security.svg', label: 'IT Security' },
                { icon: './icons/docker_b.svg', label: 'Docker' },
                { icon: './icons/cloud.svg', label: 'Cloud' },
                { icon: './icons/systemadministration.svg', label: 'Sysadmin' },
              ],
              description:
                `SOC & SIEM Infrastructure Lab is a hands-on Blue Team project using Wazuh SIEM, File Integrity Monitoring, Fail2Ban, and a Cowrie SSH honeypot.\n
      The lab simulates and analyzes SSH brute-force attacks, reconnaissance, privilege escalation, honeypot activity, and file integrity events.\n
      This project demonstrates practical experience in threat hunting, log analysis, detection engineering, MITRE ATT&CK concepts, and incident response workflows.`,
              docUrl: '/docs/projects/soc-siem-infrastructure-lab',
              githubUrl: 'https://github.com/ognjenmanojlovic/soc-siem-infrastructure-lab',
            },
            {
              id: 'conduit',
              name: 'Conduit Container',
              image: './img/projects/conduit.png',
              tags: [
                { icon: './icons/yaml_b.svg', label: 'Yaml' },
                { icon: './icons/shell_b.svg', label: 'Shell' },
                { icon: './icons/docker_b.svg', label: 'Docker' },
                { icon: './icons/githubactions_b.svg', label: 'CI/CD' },
                { icon: './icons/cloud.svg', label: 'Cloud' }
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
                { icon: './icons/cloud.svg', label: 'Cloud' }
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
          ],
    [isGerman]
  );

  const title = isGerman ? 'Meine Projekt-Highlights' : 'My project highlights';
  const documentationLabel = isGerman ? 'Dokumentation' : 'Documentation';
  const githubLabel = 'GitHub';
  const seeMoreLabel = isGerman ? 'Mehr Projekte ansehen' : 'See more projects';

  const mobileFeaturedIds = useMemo(
    () => ['aws-cloud-security-lab', 'terraform-ansible-lab', 'fastapi-devsecops', 'fastapi-kubernetes'],
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
