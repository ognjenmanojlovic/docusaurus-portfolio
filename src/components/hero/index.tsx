import React, { JSX, useEffect, useState } from 'react';
import styles from './hero.module.css';

const roles = [
  'Cyber Security Engineer',
  'DevSecOps Engineer',
];

export default function Hero(): JSX.Element {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

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
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.grid}>
        <div className={styles.textCol}>
          <div className={styles.kicker}>
            Glad you're here! 👋🏻 I am
          </div>

          <h1 className={styles.name}>
            Ognjen Manojlovic
          </h1>

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

          <p className={styles.blurb}>
            I build secure and reliable IT systems that support businesses from daily operations to production-ready environments. My background includes system administration, second-level support, infrastructure, and practical security. Through hands-on DevSecOps training, I work with containerization, CI/CD pipelines, automation, and secure deployments that improve efficiency and stability.
            <br />
            <br />
            Backed by a strong technical foundation from HTL Anichstraße, real-world experience, and a continuous drive to grow in cyber security, I focus on creating systems that are resilient today and prepared for tomorrow.
          </p>

          <a href="#contact" className={styles.cta}>
            Contact me
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