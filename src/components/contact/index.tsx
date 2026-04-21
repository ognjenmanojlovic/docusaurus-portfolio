import React, { JSX } from 'react';
import styles from './contact.module.css';

export default function Contact(): JSX.Element {
  return (
    <section id="contact" className={styles.contact}>
      <div className="section">
        <div className={styles.container}>
          <div className={styles.left}>
            <h2 className={styles.title}>Contact me</h2>
            <p className={styles.offer}>Let’s connect, here’s what I’m looking for and what I can offer:</p>
            <ul className={styles.list}>
              <li>Open to Cyber Security, DevSecOps, and IT Infrastructure roles</li>
              <li>Experienced with secure deployments, automation, and system operations</li>
              <li>Strong analytical mindset, fast learner, and reliable team player</li>
              <li>Open to remote opportunities and relocation</li>
            </ul>
          </div>

          <div className={styles.right}>
            <p className={styles.subtitle}>Looking forward to hearing from you!</p>
            <ul className={styles.details}>
              <li>
                <a className={styles.row} href="mailto:manojlovic.ognjen03@gmail.com" aria-label="Email">
                  <span className={styles.iconWrap}>
                    <img className={styles.icon} src="./icons/mail.svg" alt="" />
                    <img className={styles.iconHover} src="./icons/mail_hover.svg" alt="" />
                  </span>
                  <span>E-Mail</span>
                </a>
              </li>
              <li>
                <a
                  className={styles.row}
                  href="https://linkedin.com/in/ognjen-manojlovic-299a2b2a0"
                  target="_blank" rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <span className={styles.iconWrap}>
                    <img className={styles.icon} src="./icons/linkedin.svg" alt="" />
                    <img className={styles.iconHover} src="./icons/linkedin_hover.svg" alt="" />
                  </span>
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  className={styles.row}
                  href="https://github.com/ognjenmanojlovic"
                  target="_blank" rel="noreferrer"
                  aria-label="GitHub"
                >
                  <span className={styles.iconWrap}>
                    <img className={styles.icon} src="./icons/github.svg" alt="" />
                    <img className={styles.iconHover} src="./icons/github_hover.svg" alt="" />
                  </span>
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
