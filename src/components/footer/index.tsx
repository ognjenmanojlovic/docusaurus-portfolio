import React, { JSX } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './footer.module.css';

export default function Footer(): JSX.Element {
  const { i18n } = useDocusaurusContext();
  const isGerman = i18n.currentLocale === 'de';

  const year = new Date().getFullYear();

  const arrowDefault = useBaseUrl('/icons/arrow-default.svg');
  const arrowHover = useBaseUrl('/icons/arrow-hover.svg');
  const legalNoticeUrl = useBaseUrl('/docs/legal-notice');

  const handleBackToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const heroSection = document.getElementById('hero');

    if (heroSection) {
      heroSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a
          href="#hero"
          onClick={handleBackToTop}
          className={styles.backToTop}
          aria-label={isGerman ? 'Nach oben' : 'Back to top'}
        >
          <img src={arrowDefault} alt="" className={styles.icon} />
          <img
            src={arrowHover}
            alt=""
            className={`${styles.icon} ${styles.iconHover}`}
          />
        </a>

        <p className={styles.copy}>© Ognjen Manojlovic {year}</p>

        <a href={legalNoticeUrl} className={styles.legal}>
          {isGerman ? 'Impressum' : 'Legal notice'}
        </a>
      </div>
    </footer>
  );
}