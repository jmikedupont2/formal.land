/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
// import useThemeContext from '@theme/hooks/useThemeContext';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  image: string;
  imageNight: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  // {
  //   title: 'Verify',
  //   image: 'img/icons/river.png',
  //   imageNight: 'img/icons/river-night.png',
  //   description: (
  //     <>
  //       We use <a href="docs/company/claims#mathematical-methods">mathematical methods&nbsp;📐</a> to make sure that critical parts of your code are totally bugs-free&nbsp;💯. <a href="docs/company/claims#scale-your-code">Scale</a> your codebase&nbsp;🪜 and onboard <a href="docs/company/claims#onboard-new-developers">new developers</a> without risking to break things. Make perfect <a href="docs/company/claims#perfect-code-reviews">🔍&nbsp;code reviews</a>.
  //     </>
  //   ),
  // },
  {
    title: '0% bugs',
    image: 'img/icons/river.png',
    imageNight: 'img/icons/river-night.png',
    description: (
      <p>
        We provide cutting-edge formal verification services to ensure that your software is bug-free. We can prove that a program is bug-free at scale, verifying the implementation&nbsp;🚀.
      </p>
    ),
  },
  {
    title: 'Mathematically proven',
    image: 'img/icons/hills.png',
    imageNight: 'img/icons/hills-night.png',
    description: (
      <p>
        We utilize the proof assistant <a href="https://coq.inria.fr/">🐓&nbsp;Coq</a> to prove that your code is correct. This process, called <a href="https://en.wikipedia.org/wiki/Formal_verification">formal verification</a>, covers all execution cases in your software&nbsp;✅.
      </p>
    ),
  },
  // {
  //   title: 'Minimal cost',
  //   image: 'img/icons/canyon.png',
  //   imageNight: 'img/icons/canyon-night.png',
  //   description: (
  //     <>
  //       We design tools to <a href="docs/company/claims#minimize-the-cost">minimize the cost&nbsp;🏜️</a> of formal verification. We take the necessary <a href="docs/company/claims#use-shortcuts">shortcuts ✂️</a> and decisions to make formal verification accessible to <a href="docs/company/claims#everyday-life-programs">everyday-life programs&nbsp;🏇</a>.
  //     </>
  //   ),
  // },
  {
    title: 'Use cases',
    image: 'img/icons/canyon.png',
    imageNight: 'img/icons/canyon-night.png',
    description: (
      <p>
        Some formal verification projects we made:
        <ul style={{listStylePosition: "inside", paddingLeft: 0, marginTop: 20}}>
          <li>
            Verifying large parts of the <a href="https://formal-land.gitlab.io/coq-tezos-of-ocaml/">Tezos' L1</a>
          </li>
          <li>
            <a href="https://github.com/formal-land/coq-of-rust">coq-of-rust</a> tool to verify Rust programs
          </li>
          <li>
            Verification of the <a href="https://github.com/formal-land/coq-of-python">EVM specification</a> (ongoing)
          </li>
        </ul>
        To talk with us, write at&nbsp;<a href="mailto:contact@formal.land">&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;&nbsp;🏇</a>!
      </p>
    ),
  },
];

const FeatureListPastProjects: FeatureItem[] = [
  {
    title: 'Solidity verification',
    image: 'img/icons/water.png',
    imageNight: 'img/icons/wolf-night.png',
    description: (
      <>
        <p>
          We provide you a formal verification tool for <a href="https://soliditylang.org/">Solidity</a> called <a href="https://github.com/formal-land/solidity">coq-of-solidity</a>. You can now express and verify any property about a smart contract using the proof assistant&nbsp;<a href="https://coq.inria.fr/">Coq</a>&nbsp;🐓.
        </p>
        <p>
          With <code>coq-of-solidity</code>, you can <strong>prove the absence of bugs</strong> in your code and go further than with code audits. This tool is open-source, and we can help you set it up on your project.
        </p>
      </>
    ),
  },
  {
    title: 'Rust verification',
    image: 'img/icons/hills.png',
    imageNight: 'img/icons/hills-night.png',
    description: (
      <p>
        We developed an open-source formal verification tool for Rust&nbsp;🦀 <a href="https://github.com/formal-land/coq-of-rust">coq-of-rust</a> with the cryptocurrency <a href="https://alephzero.org/">Aleph Zero</a>&nbsp;🔗. You can now very arbitrarily large Rust programs, thanks to the use of the interactive theorem prover <a href="https://coq.inria.fr/">Coq</a>&nbsp;🐓 and our support of the <Link to="/blog/2024/04/26/translation-core-alloc-crates">Rust's standard library</Link>.<br />
        We are now improving our reasoning principles for Rust, in order to make the verification process more efficient&nbsp;🏎️.
      </p>
    ),
  },
  {
    title: 'EVM implementation',
    image: 'img/icons/canyon.png',
    imageNight: 'img/icons/canyon-night.png',
    description: (
      <>
        <p>
          To add more trust to the L2s built on top of Ethereum, we are proving the equivalence of the two EVM implementations:
        </p>
        <ul style={{listStylePosition: "inside", paddingLeft: 0, marginTop: 20}}>
          <li>
            <a href="https://github.com/bluealloy/revm">revm</a> in Rust&nbsp;🦀
          </li>
          <li>
            <a href="https://github.com/ethereum/execution-specs">execution-specs</a> in Python&nbsp;🐍
          </li>
        </ul>
        <p>
          This work relies on our tools <a href="https://github.com/formal-land/coq-of-rust">coq-of-rust</a> and <a href="https://github.com/formal-land/coq-of-python">coq-of-python</a>.
        </p>
      </>
    ),
  },
  {
    title: 'L1 of Tezos',
    image: 'img/icons/river.png',
    imageNight: 'img/icons/river-night.png',
    description: (
      <p>
        We <a href="https://formal-land.gitlab.io/coq-tezos-of-ocaml/">formally verified&nbsp;🔍</a> the <em>code</em> of the layer 1 of the security-focused blockchain <a href="https://tezos.com/">Tezos</a>.
        This is a significant achievement as no other blockchains have done that, verifying <em>models</em> of the implementation at best.<br />
        We covered a codebase of more than 100,000 lines of <a href="">OCaml</a>&nbsp;🐫 code, including the storage system and the smart contracts VM, thanks to our <a href="https://github.com/formal-land/coq-of-ocaml">innovative tools</a> and methods. See the <a href="https://formal-land.gitlab.io/coq-tezos-of-ocaml/blog">blog of the project</a> for more details&nbsp;📚.
      </p>
    ),
  },
];

function Feature({title, image, imageNight, description}: FeatureItem) {
  // const { isDarkTheme } = useThemeContext();
  const isDarkTheme = false;

  return (
    <div className={clsx('col col--6')} style={{marginTop: 50}}>
      <div style={{margin: "auto", maxWidth: 500}}>
        <div className="text--center">
          <img
            alt={title}
            className={styles.featureImg}
            src={isDarkTheme ? imageNight : image}
          />
        </div>
        <div className="text--center padding-horiz--md" style={{marginTop: 30}}>
          <h3>{title}</h3>
          {description}
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className="margin-bottom--lg text--center">
          Our current and past projects
        </h2>
        <div className="row">
          {FeatureListPastProjects.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
