import React, { JSX } from 'react';
import styles from './hero.module.css';

export default function Hero(): JSX.Element {
  return (
    <section id="hero" className={styles.hero}>

      <div className={styles.grid}>
        <div className={styles.textCol}>
          <div className={styles.kicker}>Glad you’re here!, I am</div>
          <h1 className={styles.name}>Ognjen Manojlovic</h1>
          <div className={styles.role}>Cyber Security Engineer</div>

          {/* mobile-only picture directly under the role */}
          <div className={styles.picMobile}>
            <img
              className={styles.photo}
              src="./img/Ognjen_Manojlovic_Picture.png"
              alt="Portrait"
            />
          </div>

          <p className={styles.blurb}>
  I build secure and reliable IT systems that support businesses from daily operations to production-ready environments. My background includes system administration, second-level support, infrastructure, and practical security. Through hands-on DevSecOps training, I work with containerization, CI/CD pipelines, automation, and secure deployments that improve efficiency and stability. <br />
  <br />
  Backed by a strong technical foundation from HTL Anichstraße, real-world experience, and a continuous drive to grow in cyber security, I focus on creating systems that are resilient today and prepared for tomorrow.
</p>

          <a href="#contact" className={styles.cta}>Contact me</a>
        </div>

        {/* desktop picture on the right */}
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
