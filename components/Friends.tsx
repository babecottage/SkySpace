// const agent = new BskyAgent({
//   service: "https://bsky.social",
//   // persistSession: (evt: AtpSessionEvent, sess?: AtpSessionData) => {

import { Card } from "./Card";

//   // },
// });

// await agent.login({
//   identifier: import.meta.env.BSKY_USERNAME!,
//   password: import.meta.env.BSKY_PASSWORD!,
// });

// const topEight = await agent
//   .getProfiles({
//     actors: Astro.props.topEight,
//   })
//   .then((r) => r.data.profiles);
// ---

type FriendsProps = {
  // FIXME!
  profile: any;
  topEight: any[];
};

export const Friends = ({ profile, topEight }: FriendsProps) => (
  <Card>
    <h3>{profile.displayName}’s Friend Space</h3>
    <p>
      {profile.displayName} has {profile.followersCount} friends
    </p>
    <ul className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {topEight.map((profile) => {
        return (
          <li className="overflow-hidden">
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
