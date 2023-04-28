import type { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { Card } from "./Card";
import { getProfiles } from "lib/atp.server";

type FriendsProps = {
  profile: Pick<ProfileViewDetailed, "displayName" | "followersCount">;
  topEight: string[];
};

export const Friends = async ({ profile, topEight }: FriendsProps) => {
  const topEightProfiles = topEight.length ? await getProfiles(topEight) : [];
  return (
    <Card>
      <h3>{profile.displayName}’s Friend Space</h3>
      <p>
        {profile.displayName} has {profile.followersCount} friends
      </p>
      <ul className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {topEightProfiles.map((profile) => {
          return (
            <li key={profile.handle} className="overflow-hidden">
              <a href={`/profile/${profile.handle}`}>
                <img src={profile.avatar} />
                <h3 className="sm:text-xs overflow-wrap">
                  {profile.displayName}
                </h3>
              </a>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};
