// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Formal Land',
  // tagline: 'Formal verification for everyday-life programs',
  // tagline: 'The more you are demanding, the more you need us',
  tagline: 'Securing everyday-life programs thanks to formal verification',
  // We disable that so that the text indexed and shown by Google in the results
  // list is not the default message for when the website starts without
  // JavaScript.
  baseUrlIssueBanner: false,
  url: 'https://formal.land',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/land-512.png',
  // The following information are useful for deployment to GitHub Pages.
  organizationName: 'clarus', // Usually your GitHub org/user name.
  projectName: 'formal.land', // Usually your repo name.
  trailingSlash: false,

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
/*
	gtag: {
          trackingID: 'G-MQLHF4EV4J',
          anonymizeIP: true,
        },
*/
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [require('mdx-mermaid')],
          // Please change this to your repo.
          // editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/edit/main/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-google-gtag',
      ({
        trackingID: 'G-MQLHF4EV4J',
        anonymizeIP: true,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/land-512.png',
      navbar: {
        title: 'Formal Land',
        logo: {
          alt: 'Logo',
          src: 'img/land-512.png',
        },
        items: [
          {
            to: 'docs/company/about',
            position: 'left',
            label: 'Company',
          },
          {
            to: 'docs/verification/ocaml',
            position: 'left',
            label: 'Formal verification',
          },
          {
            to: 'docs/services/solidity-development',
            position: 'left',
            label: 'Services',
          },
          {
            to: 'docs/coq-of-ocaml/introduction',
            position: 'left',
            label: 'coq-of-ocaml',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/formal-land',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      announcementBar: {
        id: 'hiring',
        content:
          // 'We are hiring! 📣 See our <a href="/docs/company/careers">job offers 🌷</a>.',
          '📣&nbsp;If you are interested in our services, send us an email at <a href="&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;">&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;</a>!&nbsp;🌷',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: false,
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Content',
            items: [
              {
                label: 'Company',
                to: '/docs/company/about',
              },
              {
                label: 'Claims',
                to: '/docs/company/claims',
              },
              {
                label: 'Press',
                to: '/docs/company/press',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/LandFoobar',
              },
              {
                label: 'Linkedin',
                href: 'https://fr.linkedin.com/company/formal-land',
              },
              {
                label: 'Nomadic Labs',
                href: 'https://www.nomadic-labs.com/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/formal-land',
              },
              {
                label: 'coq-of-ocaml',
                href: 'https://github.com/formal-land/coq-of-ocaml',
              },
              {
                label: 'Coq Tezos of OCaml',
                href: 'https://formal-land.gitlab.io/coq-tezos-of-ocaml/',
              },
            ],
          },
        ],
        // copyright: `Copyright © ${new Date().getFullYear()} Formal Land 🐦, Paris<br /><em>The more you are demanding, the more you need us 🏇.</em>`,
        // copyright: `Copyright © ${new Date().getFullYear()} Formal Land 🐦, Paris<br /><em>Formal verification for everyday-life programs 🏇</em>`,
        copyright: `Copyright © ${new Date().getFullYear()} Formal Land 🐦, Paris<br /><em>While there is work there is money 🏇</em>`,
      },
      colorMode: {
        // Hides the switch in the navbar
        // Useful if you want to support a single color mode
        disableSwitch: false,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['coq', 'ocaml', 'rust', 'solidity'],
      },
    }),
};

module.exports = config;
