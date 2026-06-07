import { z } from "zod";

const booleanStringSchema = z
  .enum(["true", "false"])
  .default("false")
  .transform((value) => value === "true");

const frontendEnvSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().default(""),
  NEXT_PUBLIC_ENABLE_SELF_REGISTRATION: booleanStringSchema
});

const frontendEnv = frontendEnvSchema.parse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  NEXT_PUBLIC_ENABLE_SELF_REGISTRATION:
    process.env.NEXT_PUBLIC_ENABLE_SELF_REGISTRATION || "false"
});

type FrontendEnv = {
  apiBaseUrl: string;
  enableSelfRegistration: boolean;
};

export const env: FrontendEnv = {
  apiBaseUrl: frontendEnv.NEXT_PUBLIC_API_BASE_URL,
  enableSelfRegistration: frontendEnv.NEXT_PUBLIC_ENABLE_SELF_REGISTRATION
};
