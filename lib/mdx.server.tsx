import "server-only";
import fs from "fs";
import { join } from "path";
import { bundleMDX } from "mdx-bundler";
import matter from "gray-matter";

export async function getMDXByPath<T>(path: string) {
  const contentPath = join(process.cwd(), "content");

  const mdxPath = join(contentPath, `${path}`);

  console.log(mdxPath);

  if (!fs.existsSync(mdxPath)) {
    throw new Error(`MDX file not found for handle: ${path}`);
  }

  const mdxSource = fs.readFileSync(mdxPath, "utf8");
  const { content, data } = matter(mdxSource);
  const { code } = await bundleMDX({
    source: content,
  });

  return {
    code,
    frontmatter: data,
  };
}
