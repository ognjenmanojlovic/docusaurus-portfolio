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
      Ich bin 22 Jahre alt und Absolvent der HTL Anichstraße in Innsbruck im Zweig Wirtschaftsingenieurwesen mit Schwerpunkt Informatik. Bereits früh konnte ich wertvolle Praxiserfahrung als IT-Systemadministrator und im Second-Level-Support sammeln, wodurch ich ein starkes Fundament in Infrastruktur, Systembetrieb und technischem Problemlösen aufgebaut habe.
      <br />
      <br />
      Heute liegt mein Fokus auf Cyber Security und DevSecOps. Ich arbeite praxisnah mit Containerisierung, CI/CD-Pipelines, Automatisierung und sicheren Deployments, um moderne, stabile und zukunftssichere IT-Systeme zu entwickeln.
    </>
  ) : (
    <>
      I am 22 years old and a graduate of HTL Anichstraße in Innsbruck in the industrial engineering program with a specialization in computer science. Early in my career, I gained valuable hands-on experience as an IT System Administrator and in Second-Level Support, building a strong foundation in infrastructure, operations, and technical problem solving.
      <br />
      <br />
      Today, my main focus is Cyber Security and DevSecOps. I work hands-on with containerization, CI/CD pipelines, automation, and secure deployments to build modern, stable, and future-ready IT systems.
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