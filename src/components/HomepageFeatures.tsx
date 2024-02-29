/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
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
      <>
        We provide cutting-edge formal verification services to ensure that your software is bug-free. Leveraging the power of mathematical proofs, we analyze and verify the correctness of your code, covering all possible user input cases&nbsp;🔍.<br />
        No need for manual testing or writing tests for each combination of inputs. We can prove that a program is bug-free at scale&nbsp;🚀.
      </>
    ),
  },
  {
    title: 'Mathematically proven',
    image: 'img/icons/hills.png',
    imageNight: 'img/icons/hills-night.png',
    description: (
      <>
        We utilize <a href="https://coq.inria.fr/">🐓&nbsp;Coq</a>, one of the most mature proof assistants, to represent and prove that your code is correct. This process, called <a href="https://en.wikipedia.org/wiki/Formal_verification">formal verification</a>, allows us to guarantee 0% bugs in your software&nbsp;✅.
      </>
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
    title: 'Applications',
    image: 'img/icons/canyon.png',
    imageNight: 'img/icons/canyon-night.png',
    description: (
      <>
        Formal verification is ideal for applications in various industries, including:
        <ul style={{listStylePosition: "inside", paddingLeft: 0}}>
          <li>databases&nbsp;📚</li>
          <li>smart contracts&nbsp;💸</li>
          <li>banks&nbsp;🏦</li>
          <li>automotive&nbsp;🚗</li>
        </ul>
        One of our most notable use cases involved <a href="https://formal-land.gitlab.io/coq-tezos-of-ocaml/">verifying the nodes</a> of the cryptocurrency <a href="https://tezos.com/">Tezos</a>, which consisted of 100,000 lines of code.
      </>
    ),
  },
];

function Feature({title, image, imageNight, description}: FeatureItem) {
  // const { isDarkTheme } = useThemeContext();
  const isDarkTheme = false;

  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img
          alt={title}
          className={styles.featureImg}
          src={isDarkTheme ? imageNight : image}
        />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
