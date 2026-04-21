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
      Ich entwickle sichere und zuverlässige IT-Systeme, die Unternehmen vom täglichen Betrieb bis hin zu produktionsreifen Umgebungen unterstützen. Mein Hintergrund umfasst Systemadministration, Second-Level-Support, Infrastruktur und praktische IT-Sicherheit. Durch praxisnahes DevSecOps-Training arbeite ich mit Containerisierung, CI/CD-Pipelines, Automatisierung und sicheren Deployments, die Effizienz und Stabilität verbessern.
      <br />
      <br />
      Gestützt auf ein starkes technisches Fundament aus der HTL Anichstraße, praktische Erfahrung und den kontinuierlichen Antrieb, mich im Bereich Cyber Security weiterzuentwickeln, konzentriere ich mich darauf, Systeme zu schaffen, die heute belastbar und für morgen vorbereitet sind.
    </>
  ) : (
    <>
      I build secure and reliable IT systems that support businesses from daily operations to production-ready environments. My background includes system administration, second-level support, infrastructure, and practical security. Through hands-on DevSecOps training, I work with containerization, CI/CD pipelines, automation, and secure deployments that improve efficiency and stability.
      <br />
      <br />
      Backed by a strong technical foundation from HTL Anichstraße, real-world experience, and a continuous drive to grow in cyber security, I focus on creating systems that are resilient today and prepared for tomorrow.
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
              src="./img/Ognjen_Manojlovic_Picture.png"
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
            src="./img/Ognjen_Manojlovic_Picture.png"
            alt="Portrait"
          />
        </div>
      </div>
    </section>
  );
}