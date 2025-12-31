import type { ZodSchema } from "zod";

function validator(
  schema: ZodSchema,
  payload: any,
  onError: (e: unknown) => void
) {
  try {
    const res = schema.parse(payload);
    return res;
  } catch (e) {
    onError(e);
  }
}
