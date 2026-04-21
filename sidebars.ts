import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'index',
    {
      type: 'category',
      label: 'Projects',
      items: [
        'baby-tools-shop/index',
        'conduit-container/index',

        {
          type: 'category',
          label: 'Document Security Tools',
          link: { type: 'doc', id: 'document-security-tools/index' },
          items: [
            {
              type: 'category',
              label: 'PDF Metadata Extractor',
              link: {
                type: 'doc',
                id: 'document-security-tools/pdf-metadata-extractor/index',
              },
              items: [
                'document-security-tools/pdf-metadata-extractor/source-code',
              ],
            },
            {
              type: 'category',
              label: 'PDF Metadata Cleaner',
              link: {
                type: 'doc',
                id: 'document-security-tools/pdf-metadata-cleaner/index',
              },
              items: [
                'document-security-tools/pdf-metadata-cleaner/source-code',
              ],
            },
          ],
        },

        {
          type: 'category',
          label: 'Juice Shop Master',
          link: { type: 'doc', id: 'juice-shop-master/index' },
          items: [
            'juice-shop-master/forged-review',
            'juice-shop-master/poison-null-byte',
            'juice-shop-master/user-credentials',
            'juice-shop-master/change-benders-password',
          ],
        },

        {
          type: 'category',
          label: 'Juice Shop Practice',
          link: { type: 'doc', id: 'juice-shop-practice/index' },
          items: [
            {
              type: 'category',
              label: '⭐ One-Star Challenges',
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

        'minecraft-server/index',

        {
          type: 'category',
          label: 'Password Cracking',
          link: { type: 'doc', id: 'password-cracking/index' },
          items: [
            {
              type: 'category',
              label: 'Custom Python Password Tools',
              link: {
                type: 'doc',
                id: 'password-cracking/custom-python-password-tools/index',
              },
              items: [
                {
                  type: 'category',
                  label: 'Python Dictionary Attack',
                  link: {
                    type: 'doc',
                    id: 'password-cracking/custom-python-password-tools/python-dictionary-attack/index',
                  },
                  items: [
                    'password-cracking/custom-python-password-tools/python-dictionary-attack/source-code',
                  ],
                },
                {
                  type: 'category',
                  label: 'Python Mask Attack',
                  link: {
                    type: 'doc',
                    id: 'password-cracking/custom-python-password-tools/python-mask-attack/index',
                  },
                  items: [
                    'password-cracking/custom-python-password-tools/python-mask-attack/source-code',
                  ],
                },
                {
                  type: 'category',
                  label: 'SHA512 Potfile Generator',
                  link: {
                    type: 'doc',
                    id: 'password-cracking/custom-python-password-tools/sha512-potfile-generator/index',
                  },
                  items: [
                    'password-cracking/custom-python-password-tools/sha512-potfile-generator/source-code',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Hashcat Lab',
              link: { type: 'doc', id: 'password-cracking/hashcat-lab/index' },
              items: [
                'password-cracking/hashcat-lab/brute-force-attack',
                'password-cracking/hashcat-lab/dictionary-attack',
                'password-cracking/hashcat-lab/docx-file-cracking',
                'password-cracking/hashcat-lab/keepass-cve-2023-32784',
                'password-cracking/hashcat-lab/mask-attack',
                'password-cracking/hashcat-lab/pptx-file-cracking',
                'password-cracking/hashcat-lab/zip-archive-cracking',
              ],
            },
          ],
        },

        {
          type: 'category',
          label: 'Python Security Tools',
          link: { type: 'doc', id: 'python-security-tools/index' },
          items: [
            {
              type: 'category',
              label: 'Port Scanner',
              link: {
                type: 'doc',
                id: 'python-security-tools/port-scanner/index',
              },
              items: [
                'python-security-tools/port-scanner/source-code',
              ],
            },
          ],
        },

        'truck-signs-api/index',
        'v-server-setup/index',
        'wordpress-docker/index',
      ],
    },
  ],
};

export default sidebars;