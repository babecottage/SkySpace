"use client";

import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";

export const MarkdownRenderer = ({ code, frontmatter }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      <Component />
    </>
  );
};
