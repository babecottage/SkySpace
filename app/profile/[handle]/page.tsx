import { Card } from "components/Card";
import { ContactCard } from "components/ContactCard";
import { Friends } from "components/Friends";
import { MarkdownRenderer } from "components/MarkdownRenderer";
import { ProfileCard } from "components/ProfileCard";

import { getProfile } from "lib/atp.server";
import { getMDXByPath } from "lib/mdx.server";
import type { ProfileFrontmatter } from "lib/types";
import { Metadata } from "next";

export const dynamicParams = true;
export const revalidate = 3600; // revalidate every hour

const getProfileExtra = async (handle: string) => {
  try {
    const mdx = await getMDXByPath<ProfileFrontmatter>(
      `/profiles/${handle}.mdx`,
    );

    return mdx;
  } catch (error) {
    console.error(error);
    throw new Error("Could not get extra profile data");
  }
};

const themeColorsToVars = (colors: {
  [key: string]: string;
}): { [key: string]: string } => {
  return Object.entries(colors).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [`--${key}`]: value,
    };
  }, {});
};

export async function generateMetadata({
  params: { handle },
}: ProfilePageProps): Promise<Metadata> {
  const profile = await getProfile(handle);

  return {
    title: `${profile.displayName} (@${profile.handle}): SkySpace`,
    description: profile.description,
  };
}

type ProfilePageProps = {
  params: {
    handle: string;
  };
};

type Markdown<T> = {
  code: string;
  frontmatter: T;
};

export default async function ProfilePage({
  params: { handle },
}: ProfilePageProps) {
  const profile = await getProfile(handle);
  let markdown: Markdown<ProfileFrontmatter> | undefined;
  try {
    markdown = (await getProfileExtra(handle)) as Markdown<ProfileFrontmatter>;
  } catch (error) {
    console.error(error);
  }

  const theme = markdown?.frontmatter?.theme || {
    colors: {},
  };

  const topEight = markdown?.frontmatter.topEight || [];

  const vars = themeColorsToVars(theme.colors);

  return (
    <>
      <div style={vars}>
        <div
          className="text-text border-border font-mono h-full"
          style={{
            background: "var(--pageBackground)",
          }}
        >
          <div className="grid grid-cols-4 gap-x-4 container max-w-4xl mx-auto py-8">
            <div className="flex flex-col col-span-2 gap-y-4">
              <ProfileCard
                displayName={profile.displayName}
                avatar={profile.avatar}
                description={profile.description}
              />
              <ContactCard displayName={profile.displayName} />
              <Card>
                Bluesky Handle:
                {profile.handle}
              </Card>
              <Card>
                <table className="overflow-hidden table-fixed text-sm w-full">
                  <tbody>
                    {Object.entries(theme.colors).map(([key, value]) => (
                      <tr key={key}>
                        <td className="font-bold pr-3">{key}</td>
                        <td className="p-2 rounded-sm">
                          <div
                            className="h-10 w-full rounded-sm overflow-hidden border"
                            style={{
                              background: value,
                            }}
                          ></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>

            <div className="flex flex-col col-span-2 gap-y-4">
              <Card>
                <h3 className="text-text">{profile.displayName}’s Blurbs</h3>
                {!!markdown && <MarkdownRenderer {...markdown} />}
              </Card>
              {/* https://beta.nextjs.org/docs/configuring/typescript#async-server-component-typescript-error  */}
              {/* @ts-expect-error Async Server Component */}
              <Friends profile={profile} topEight={topEight} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
