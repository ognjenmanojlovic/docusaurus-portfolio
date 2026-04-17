import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Projects',
      items: [
        {
          type: 'category',
          label: 'Juice Shop Master',
          items: [
            'juice-shop-master/index',
            'juice-shop-master/forged-review',
            'juice-shop-master/poison-null-byte',
            'juice-shop-master/user-credentials',
            'juice-shop-master/change-benders-password',
          ],
        },

        {
          type: 'category',
          label: 'Juice Shop Practice',
          items: [
            'juice-shop-practice/index',

            {
              type: 'category',
              label: '⭐ One-Star Challenges',
              collapsed: true,
              items: [
                'juice-shop-practice/one-star-challenges/bonus-payload',
                'juice-shop-practice/one-star-challenges/bully-chatbot',
                'juice-shop-practice/one-star-challenges/exposed-metrics',
                'juice-shop-practice/one-star-challenges/missing-encoding',
                'juice-shop-practice/one-star-challenges/outdated-allowlist',
                'juice-shop-practice/one-star-challenges/zero-stars',
              ],
            },

            {
              type: 'category',
              label: '⭐⭐ Two-Star Challenges',
              collapsed: true,
              items: [
                'juice-shop-practice/two-star-challenges/admin-section',
                'juice-shop-practice/two-star-challenges/deprecated-interface',
                'juice-shop-practice/two-star-challenges/empty-user-registration',
                'juice-shop-practice/two-star-challenges/five-star-feedback',
                'juice-shop-practice/two-star-challenges/login-admin',
                'juice-shop-practice/two-star-challenges/meta-geo-stalking',
                'juice-shop-practice/two-star-challenges/password-strength',
              ],
            },

            {
              type: 'category',
              label: '⭐⭐⭐ Three-Star Challenges',
              collapsed: true,
              items: [
                'juice-shop-practice/three-star-challenges/admin-registration',
                'juice-shop-practice/three-star-challenges/bjoerns-favourite-pet',
                'juice-shop-practice/three-star-challenges/captcha-bypass',
                'juice-shop-practice/three-star-challenges/deluxe-fraud',
                'juice-shop-practice/three-star-challenges/forged-feedback',
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default sidebars;