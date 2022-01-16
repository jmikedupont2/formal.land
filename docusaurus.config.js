// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Formal Land',
  tagline: 'Formal verification for everyday-life programs',
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
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Introduction',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/foobar-land',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      announcementBar: {
        id: 'hiring',
        content:
          'We are hiring! 📣 See our <a href="/assets/files/formal-verification-ocaml-foobar-land-197b7c8113b2826e7607e76e1f0d633c.pdf" target="_blank">job offers 🌷</a>.',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: false,
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Company',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
              {
                label: 'Claims',
                to: '/docs/claims',
              },
              {
                label: 'Press',
                to: '/docs/press',
              },
              {
                label: 'About',
                to: '/docs/about',
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
                href: 'https://github.com/foobar-land',
              },
              {
                label: 'coq-of-ocaml',
                href: 'https://foobar-land.github.io/coq-of-ocaml/',
              },
              {
                label: 'Coq Tezos of OCaml',
                href: 'https://nomadic-labs.gitlab.io/coq-tezos-of-ocaml/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Formal Land 🐦, Paris<br />❤️`,
      },
      colorMode: {
        // Hides the switch in the navbar
        // Useful if you want to support a single color mode
        disableSwitch: false,
      },  
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
