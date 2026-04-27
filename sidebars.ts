import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Projects',
      link: { type: 'doc', id: 'projects/index' },
      items: [
        'projects/baby-tools-shop/index',
        'projects/conduit-container/index',

        {
          type: 'category',
          label: 'Document Security Tools',
          link: { type: 'doc', id: 'projects/document-security-tools/index' },
          items: [
            {
              type: 'category',
              label: 'PDF Metadata Extractor',
              link: {
                type: 'doc',
                id: 'projects/document-security-tools/pdf-metadata-extractor/index',
              },
              items: [
                'projects/document-security-tools/pdf-metadata-extractor/source-code',
              ],
            },
            {
              type: 'category',
              label: 'PDF Metadata Cleaner',
              link: {
                type: 'doc',
                id: 'projects/document-security-tools/pdf-metadata-cleaner/index',
              },
              items: [
                'projects/document-security-tools/pdf-metadata-cleaner/source-code',
              ],
            },
          ],
        },

        {
          type: 'category',
          label: 'Juice Shop Master',
          link: { type: 'doc', id: 'projects/juice-shop-master/index' },
          items: [
            'projects/juice-shop-master/forged-review',
            'projects/juice-shop-master/poison-null-byte',
            'projects/juice-shop-master/user-credentials',
            'projects/juice-shop-master/change-benders-password',
          ],
        },

        {
          type: 'category',
          label: 'Juice Shop Practice',
          link: { type: 'doc', id: 'projects/juice-shop-practice/index' },
          items: [
            {
              type: 'category',
              label: '⭐ One-Star Challenges',
              items: [
                'projects/juice-shop-practice/one-star-challenges/bonus-payload',
                'projects/juice-shop-practice/one-star-challenges/bully-chatbot',
                'projects/juice-shop-practice/one-star-challenges/exposed-metrics',
                'projects/juice-shop-practice/one-star-challenges/missing-encoding',
                'projects/juice-shop-practice/one-star-challenges/outdated-allowlist',
                'projects/juice-shop-practice/one-star-challenges/zero-stars',
              ],
            },
            {
              type: 'category',
              label: '⭐⭐ Two-Star Challenges',
              items: [
                'projects/juice-shop-practice/two-star-challenges/admin-section',
                'projects/juice-shop-practice/two-star-challenges/deprecated-interface',
                'projects/juice-shop-practice/two-star-challenges/empty-user-registration',
                'projects/juice-shop-practice/two-star-challenges/five-star-feedback',
                'projects/juice-shop-practice/two-star-challenges/login-admin',
                'projects/juice-shop-practice/two-star-challenges/meta-geo-stalking',
                'projects/juice-shop-practice/two-star-challenges/password-strength',
              ],
            },
            {
              type: 'category',
              label: '⭐⭐⭐ Three-Star Challenges',
              items: [
                'projects/juice-shop-practice/three-star-challenges/admin-registration',
                'projects/juice-shop-practice/three-star-challenges/bjoerns-favourite-pet',
                'projects/juice-shop-practice/three-star-challenges/captcha-bypass',
                'projects/juice-shop-practice/three-star-challenges/deluxe-fraud',
                'projects/juice-shop-practice/three-star-challenges/forged-feedback',
              ],
            },
          ],
        },

        'projects/minecraft-server/index',

        {
          type: 'category',
          label: 'Password Cracking',
          link: { type: 'doc', id: 'projects/password-cracking/index' },
          items: [
            {
              type: 'category',
              label: 'Custom Python Password Tools',
              link: {
                type: 'doc',
                id: 'projects/password-cracking/custom-python-password-tools/index',
              },
              items: [
                {
                  type: 'category',
                  label: 'Python Dictionary Attack',
                  link: {
                    type: 'doc',
                    id: 'projects/password-cracking/custom-python-password-tools/python-dictionary-attack/index',
                  },
                  items: [
                    'projects/password-cracking/custom-python-password-tools/python-dictionary-attack/source-code',
                  ],
                },
                {
                  type: 'category',
                  label: 'Python Mask Attack',
                  link: {
                    type: 'doc',
                    id: 'projects/password-cracking/custom-python-password-tools/python-mask-attack/index',
                  },
                  items: [
                    'projects/password-cracking/custom-python-password-tools/python-mask-attack/source-code',
                  ],
                },
                {
                  type: 'category',
                  label: 'SHA512 Potfile Generator',
                  link: {
                    type: 'doc',
                    id: 'projects/password-cracking/custom-python-password-tools/sha512-potfile-generator/index',
                  },
                  items: [
                    'projects/password-cracking/custom-python-password-tools/sha512-potfile-generator/source-code',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Hashcat Lab',
              link: {
                type: 'doc',
                id: 'projects/password-cracking/hashcat-lab/index',
              },
              items: [
                'projects/password-cracking/hashcat-lab/brute-force-attack',
                'projects/password-cracking/hashcat-lab/dictionary-attack',
                'projects/password-cracking/hashcat-lab/docx-file-cracking',
                'projects/password-cracking/hashcat-lab/keepass-cve-2023-32784',
                'projects/password-cracking/hashcat-lab/mask-attack',
                'projects/password-cracking/hashcat-lab/pptx-file-cracking',
                'projects/password-cracking/hashcat-lab/zip-archive-cracking',
              ],
            },
          ],
        },

        {
          type: 'category',
          label: 'Python Security Tools',
          link: { type: 'doc', id: 'projects/python-security-tools/index' },
          items: [
            {
              type: 'category',
              label: 'Port Scanner',
              link: {
                type: 'doc',
                id: 'projects/python-security-tools/port-scanner/index',
              },
              items: ['projects/python-security-tools/port-scanner/source-code'],
            },
          ],
        },

        'projects/truck-signs-api/index',
        'projects/v-server-setup/index',
        'projects/wordpress-docker/index',
      ],
    },
  ],
};

export default sidebars;