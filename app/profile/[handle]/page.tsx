import { BskyAgent } from "@atproto/api";
import { Card } from "components/Card";
import { ContactCard } from "components/ContactCard";
import { Friends } from "components/Friends";
import { ProfileCard } from "components/ProfileCard";

export const dynamicParams = true;
export const revalidate = 3600; // revalidate every hour

// https://beta.nextjs.org/docs/data-fetching/fetching#data-fetching-without-fetch
const getProfile = async (handle: string) => {
  const agent = new BskyAgent({
    service: "https://bsky.social",
  });

  await agent.login({
    identifier: process.env.BSKY_USERNAME!,
    password: process.env.BSKY_PASSWORD!,
  });

  const res = await agent.getProfile({
    actor: handle,
  });

  if (!res.success) {
    throw new Error("Could not get profile");
  }
  const { data: profile } = res;

  return profile;
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

export default async function ProfilePage({
  params: { handle },
}: {
  params: { handle: string };
}) {
  const profile = await getProfile(handle);
  // const profile = {};

  const topEight = [];
  const theme = {
    colors: {
      pageBackground:
        "linear-gradient(180deg, #321870 13.54%, #FE9ABC 46.35%, #FE9ABC 48.96%, #FC8117 54.17%, #F1BD03 83.33%)",
      background: "#321870",
      border: "#C478FF",
      text: "#C478FF",
    },
  };

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
                <pre className="text-sm overflow-x-scroll">
                  {JSON.stringify(profile, null, 2)}
                </pre>
              </Card>
            </div>

            <div className="flex flex-col col-span-2 gap-y-4">
              <Card>
                <h3 className="text-text">{profile.displayName}’s Blurbs</h3>
              </Card>

              <Friends profile={profile} topEight={topEight || []} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
