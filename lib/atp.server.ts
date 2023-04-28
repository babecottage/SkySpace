import "server-only";
import { BskyAgent } from "@atproto/api";

const agent = new BskyAgent({
  service: "https://bsky.social",
});

// https://beta.nextjs.org/docs/data-fetching/fetching#data-fetching-without-fetch
export const getProfile = async (handle: string) => {
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
