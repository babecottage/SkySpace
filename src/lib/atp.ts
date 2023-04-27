import { AtpSessionData, AtpSessionEvent, BskyAgent } from "@atproto/api";
import { useStore } from "@nanostores/react";
import { atom } from "nanostores";

export const sessionData = atom<AtpSessionData | null>(null);

export const agent = new BskyAgent({
  service: "https://bsky.social",
  persistSession: (evt: AtpSessionEvent, sess?: AtpSessionData) => {
    switch (evt) {
      case "create":
      case "update":
        sess && sessionData.set(sess);
        break;
      case "expired":
      case "create-failed":
        sessionData.set(null);
        break;
    }
  },
});

// tysm @sabigara/flat
export type AtpError = {
  error: "NotFound";
  message: string;
};

export function isAtpError(err: unknown): err is AtpError {
  if (typeof err !== "object" || err === null) return false;
  return "error" in err && "message" in err;
}
