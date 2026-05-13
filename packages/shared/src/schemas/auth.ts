import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(72),
  fullName: z.string().min(1).max(120),
  organizationName: z.string().min(1).max(120),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(10),
});

export const sessionSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.number().optional(),
});

export const authUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().nullable(),
});

export const registerResponseSchema = z.object({
  user: authUserSchema,
  organization: z.object({ id: z.string().uuid(), slug: z.string() }),
  session: sessionSchema,
});

export const loginResponseSchema = z.object({
  user: authUserSchema,
  session: sessionSchema,
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshInput = z.infer<typeof refreshSchema>;
export type Session = z.infer<typeof sessionSchema>;
export type AuthUser = z.infer<typeof authUserSchema>;
export type RegisterResponse = z.infer<typeof registerResponseSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
