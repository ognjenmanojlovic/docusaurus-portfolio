import React, { JSX } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './footer.module.css';

export default function Footer(): JSX.Element {
  const year = new Date().getFullYear();
  const arrowDefault = useBaseUrl('/icons/arrow-default.svg');
  const arrowHover = useBaseUrl('/icons/arrow-hover.svg');

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a href="#hero" className={styles.backToTop} aria-label="Back to top">
          <img src={arrowDefault} alt="" className={styles.icon} />
          <img src={arrowHover} alt="" className={`${styles.icon} ${styles.iconHover}`} />
        </a>

        <p className={styles.copy}>© Ognjen Manojlovic {year}</p>
        <a href="/docs/legal-notice" className={styles.legal}>Legal notice</a>
      </div>
    </footer>
  );
}