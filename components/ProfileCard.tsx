import type { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

import { Card } from "./Card";

export type ProfileCardProps = Pick<
  ProfileViewDetailed,
  "displayName" | "avatar" | "description"
>;

export const ProfileCard = ({
  displayName,
  avatar,
  description,
}: ProfileCardProps) => {
  return (
    <Card>
      <h1 className="font-bold text-md mb-3">{displayName}</h1>
      <div className="grid grid-cols-2 gap-2">
        <img className="w-full" src={avatar} />
        <p className="text-sm">{description}</p>
      </div>
    </Card>
  );
};
