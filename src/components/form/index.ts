import { z } from "zod";
import { TextField } from "./TextField";
import { createTsForm } from "@ts-react/form";

/**
 * Saying "why can't you keep your promises no more?
 * Say you'll be home by 12, come stumblin' in at 4
 * Out with the girls but leaving with the boy next door"
 * Can you fill me
 */
const mapping = [[z.string(), TextField]] as const;

export const Form = createTsForm(mapping);
