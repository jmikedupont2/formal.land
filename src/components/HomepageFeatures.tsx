/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import clsx from 'clsx';
import useThemeContext from '@theme/hooks/useThemeContext';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  image: string;
  imageNight: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Verify',
    image: 'img/icons/river.png',
    imageNight: 'img/icons/river-night.png',
    description: (
      <>
        We use <a href="docs/company/claims#mathematical-methods">mathematical methods&nbsp;📐</a> to make sure that critical parts of your code are totally bugs-free&nbsp;💯. <a href="docs/company/claims#scale-your-code">Scale</a> your codebase&nbsp;🪜 and onboard <a href="docs/company/claims#onboard-new-developers">new developers</a> without risking to break things. Make perfect <a href="docs/company/claims#perfect-code-reviews">🔍&nbsp;code reviews</a>.
      </>
    ),
  },
  {
    title: 'Battle-tested',
    image: 'img/icons/hills.png',
    imageNight: 'img/icons/hills-night.png',
    description: (
      <>
        We <a href="docs/company/claims#verify-the-implementation-of-tezos">verify the implementation</a> of the crypto-currency <a href="https://tezos.com/">ꜩ&nbsp;Tezos</a> to make it the safest exchange platform for money ever&nbsp;💸&nbsp;🌍&nbsp;⚔️. We exclusively rely on the <a href="docs/company/claims#mature-proof-system">most mature</a> proof system <a href="https://coq.inria.fr/">🐓&nbsp;Coq</a> for all of our work.
      </>
    ),
  },
  {
    title: 'Minimal cost',
    image: 'img/icons/canyon.png',
    imageNight: 'img/icons/canyon-night.png',
    description: (
      <>
        We design tools to <a href="docs/company/claims#minimize-the-cost">minimize the cost&nbsp;🏜️</a> of formal verification. We take the necessary <a href="docs/company/claims#use-shortcuts">shortcuts ✂️</a> and decisions to make formal verification accessible to <a href="docs/company/claims#everyday-life-programs">everyday-life programs&nbsp;🏇</a>.
      </>
    ),
  },
];

function Feature({title, image, imageNight, description}: FeatureItem) {
  const { isDarkTheme } = useThemeContext();

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
