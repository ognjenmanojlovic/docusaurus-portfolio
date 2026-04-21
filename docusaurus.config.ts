import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Ognjen Manojlovic',
  tagline:
    'DevSecOps & Cyber Security Portfolio | Docker • CI/CD • Secure Deployments | Cyber Security Engineer',
  favicon: 'img/portfolio.png',

  future: {
    v4: true,
  },

  url: 'http://localhost:3001',
  baseUrl: '/',

  organizationName: 'ognjenmanojlovic',
  projectName: 'docusaurus-portfolio',

  onBrokenLinks: 'ignore',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'ignore',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.ts'),
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/portfolio.png',
    navbar: {
      hideOnScroll: true,
      items: [
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: undefined,
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;