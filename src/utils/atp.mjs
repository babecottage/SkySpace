import { createRequire } from "module";

const require = createRequire(import.meta.url);

export const ATP = require("@atproto/api");
