import "server-only";

import { BskyAgent } from "@atproto/api";

const agent = new BskyAgent({
  service: "https://bsky.social",
});

export const getProfiles = async (actors: string[]) => {
  await agent.login({
    identifier: process.env.BSKY_USERNAME!,
    password: process.env.BSKY_PASSWORD!,
  });

  const res = await agent.getProfiles({
    actors,
  });

  if (!res.success) {
    throw new Error("Could not get profile");
  }
  const {
    data: { profiles },
  } = res;

  return profiles;
};

export const getProfile = async (actor: string) => {
  await agent.login({
    identifier: process.env.BSKY_USERNAME!,
    password: process.env.BSKY_PASSWORD!,
  });

  const res = await agent.getProfile({
    actor,
  });

  if (!res.success) {
    throw new Error("Could not get profile");
  }
  const { data: profile } = res;

  return profile;
};
