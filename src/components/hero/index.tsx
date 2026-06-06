import React, { JSX, useEffect, useMemo, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './hero.module.css';

export default function Hero(): JSX.Element {
  const { i18n } = useDocusaurusContext();
  const isGerman = i18n.currentLocale === 'de';

  const roles = useMemo(
    () =>
      isGerman
        ? ['Cyber Security Engineer', 'DevSecOps Engineer']
        : ['Cyber Security Engineer', 'DevSecOps Engineer'],
    [isGerman]
  );

  const kicker = isGerman
    ? "Schön, dass du hier bist! 👋🏻 Ich bin"
    : "Glad you're here! 👋🏻 I am";

  const blurb = isGerman ? (
    <>
      Ich entwickle sichere und zuverlässige IT-Systeme mit Schwerpunkt auf Automatisierung, Infrastruktur und IT-Sicherheit. Mein Hintergrund umfasst Systemadministration, Second-Level-Support, DevSecOps-Praktiken und Cyber Security mit Fokus auf stabile, abgesicherte und produktionsreife Umgebungen.
      <br />
      <br />
      Durch praxisnahe Projekte mit Terraform, Ansible, Kubernetes, Docker, CI/CD-Pipelines sowie SOC- und SIEM-Technologien konnte ich praktische Erfahrung in Infrastrukturautomatisierung, System-Hardening, sicheren Deployments und Security Monitoring sammeln. Aufbauend auf meiner Ausbildung an der HTL Anichstraße in Innsbruck und meiner Begeisterung für Cyber Security konzentriere ich mich darauf, Systeme zu schaffen, die sicher, skalierbar und zukunftsfähig sind.
    </>
  ) : (
    <>
      I build secure and reliable IT systems with a focus on automation, infrastructure and cyber security. My background includes system administration, second-level support, DevSecOps practices and IT security, with an emphasis on resilient, well-managed and production-ready environments.
      <br />
      <br />
      Through hands-on projects with Terraform, Ansible, Kubernetes, Docker, CI/CD pipelines and SOC & SIEM technologies, I have gained practical experience in infrastructure automation, system hardening, secure deployments and security monitoring. Backed by my technical foundation from HTL Anichstraße in Innsbruck and a continuous drive to grow in cyber security, I focus on building systems that are secure, scalable and prepared for tomorrow.
    </>
  );

  const ctaLabel = isGerman ? 'Kontaktiere mich' : 'Contact me';

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setRoleIndex(0);
    setDisplayText('');
    setIsDeleting(false);
  }, [isGerman]);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 75 : 110);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, roles]);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.grid}>
        <div className={styles.textCol}>
          <div className={styles.kicker}>{kicker}</div>

          <h1 className={styles.name}>Ognjen Manojlovic</h1>

          <div className={styles.role}>
            {displayText}
            <span className={styles.cursor}>|</span>
          </div>

          <div className={styles.picMobile}>
            <img
              className={styles.photo}
              src="./img/Manojlovic_Picture.png"
              alt="Portrait"
            />
          </div>

          <p className={styles.blurb}>{blurb}</p>

          <a href="#contact" className={styles.cta}>
            {ctaLabel}
          </a>
        </div>

        <div className={`${styles.picCol} ${styles.picDesktop}`}>
          <img
            className={styles.photo}
            src="./img/Manojlovic_Picture.png"
            alt="Portrait"
          />
        </div>
      </div>
    </section>
  );
}