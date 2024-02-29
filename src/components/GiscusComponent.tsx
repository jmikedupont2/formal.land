import React from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComponent() {
  const { colorMode } = useColorMode();

  return (
    <Giscus
      repo="formal-land/formal.land"
      repoId="R_kgDOGrO-mA"
      category="Blog comments"
      categoryId="DIC_kwDOGrO-mM4CdmKv"
      mapping="url" // Important! To map comments to URL
      term="Welcome to blog comments!"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="1"
      inputPosition="top"
      theme={colorMode}
      lang="en"
      loading="eager"
      // crossorigin="anonymous"
      // async
    />
  );
}
