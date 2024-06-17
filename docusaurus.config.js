// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const PrismReactRender = require('prism-react-renderer');

const liveChat = `<!-- Start of LiveChat (www.livechat.com) code -->
<script>
    window.__lc = window.__lc || {};
    window.__lc.license = 14938650;
    ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
</script>
<noscript><a href="https://www.livechat.com/chat-with/14938650/" rel="nofollow">Chat with us</a>, powered by <a href="https://www.livechat.com/?welcome" rel="noopener nofollow" target="_blank">LiveChat</a></noscript>
<!-- End of LiveChat code -->`

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Formal Land',
  // tagline: 'Formal verification for everyday-life programs',
  tagline: 'Formal verification for everyday-life applications 🏇',
  // tagline: 'Prevent all bugs',
  // tagline: 'The more you are demanding, the more you need us',
  // tagline: 'Securing everyday-life programs thanks to formal verification',
  // tagline: 'Securing web3 with formal verification',
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
          remarkPlugins: [
            require('mdx-mermaid'),
            remarkMath,
          ],
          rehypePlugins: [
            rehypeKatex,
          ],
          // Please change this to your repo.
          // editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
        },
        blog: {
          showReadingTime: true,
          remarkPlugins: [
            require('mdx-mermaid'),
            remarkMath,
          ],
          rehypePlugins: [
            rehypeKatex,
          ],
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

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
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
          // {
          //   to: 'docs/verification/ocaml',
          //   position: 'left',
          //   label: 'Formal verification',
          // },
          // {
          //   to: 'docs/services/solidity-development',
          //   position: 'left',
          //   label: 'Services',
          // },
          {
            to: 'docs/coq-of-rust/introduction',
            position: 'left',
            label: 'coq-of-rust',
          },
          {
            to: 'docs/coq-of-ocaml/introduction',
            position: 'left',
            label: 'coq-of-ocaml',
          },
          {
            to: 'docs/revm-python-spec/revm-verif',
            position: 'left',
            label: 'Revm',
          },
          {
            to: '/blog',
            label: 'Blog',
            position: 'left',
          },
          {
            href: 'https://github.com/formal-land',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://gitlab.com/formal-land',
            label: 'GitLab',
            position: 'right',
          },
        ],
      },
      announcementBar: {
        id: 'hiring',
        content:
          // 'We are hiring! 📣 See our <a href="/docs/company/careers">job offers 🌷</a>.',
          'For our services, email us at <a href="mailto:&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;">&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;</a>&nbsp;💌&nbsp;!',
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
            title: 'Links',
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
                label: 'Telegram',
                href: 'https://t.me/formal_land',
              },
              {
                label: 'TikTok',
                href: 'https://www.tiktok.com/@formal.land',
              },
              {
                label: 'RSS',
                href: 'https://formal.land/blog/rss.xml',
              },
              {
                label: 'Email',
                href: 'mailto:contact@formal.land',
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
                label: 'GitLab',
                href: 'https://gitlab.com/formal-land',
              },
              {
                label: 'Coq Tezos of OCaml',
                href: 'https://formal-land.gitlab.io/coq-tezos-of-ocaml/',
              },
            ],
          },
        ],
        // copyright: `Copyright © ${new Date().getFullYear()} Formal Land (Arae SARL) 🐦, Paris<br /><em>Formal verification for everyday-life programs 🏇</em>${liveChat}`,
        // copyright: `Copyright © ${new Date().getFullYear()} Formal Land (Arae SARL) 🐦, Paris<br /><em>Prevent all bugs 🏇</em>${liveChat}`,
        copyright: `Copyright © ${new Date().getFullYear()} Formal Land (Arae SARL) 🐦, Paris<br /><em>Formal verification for everyday-life applications</em>${liveChat}`,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      prism: {
        theme: PrismReactRender.themes.github,
        darkTheme: PrismReactRender.themes.dracula,
        additionalLanguages: [
          'bash',
          'coq',
          'diff',
          'haskell',
          'json',
          'ocaml',
          'rust',
          'solidity',
        ],
      },
    }),
};

module.exports = config;
