import type { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

import { Card } from "./Card";

export type ContactCardProps = Pick<ProfileViewDetailed, "displayName">;

export const ContactCard = ({ displayName }: ContactCardProps) => (
  <Card>
    <h3 className="font-bold mb-2">
      Contacting <span>{displayName}</span>
    </h3>
    <ul>
      <li className="py-2">Send Message</li>
      <li className="py-2">Add to Friends</li>
    </ul>
  </Card>
);
