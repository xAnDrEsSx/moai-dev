// Zod
import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

// Forgot Password Schemas
export const forgotPasswordEmailSchema = z.object({
    email: z.string().email(),
});

export type TForgotPasswordEmailSchema = z.infer<
    typeof forgotPasswordEmailSchema
>;

export const forgotPasswordCodeSchema = z.object({
    code: z.string().length(4),
});

export type TForgotPasswordCodeSchema = z.infer<
    typeof forgotPasswordCodeSchema
>;

export const forgotPasswordChangechema = z.object({
    password: z.string(),
    confirmPassword: z.string(),
});

export type TForgotPasswordChangeSchema = z.infer<
    typeof forgotPasswordChangechema
>;

export const filterUsersSchema = z.object({
    search: z.string().optional(),
    role: z.string().optional(),
    status: z.string().optional(),
});

export type TFilterUsersSchema = z.infer<typeof filterUsersSchema>;

export const parametersSchema = z.object({
    timeReview: z.number().positive(),
    timeReserve: z.number().positive(),
});

export type TParametersSchema = z.infer<typeof parametersSchema>;

export const userSchema = z.object({
    role: z.string().optional(),
    name: z.string().optional(),
    lastName: z.string().optional(),
    userEmail: z.string().email().optional(),
    confirmEmail: z.string().email().optional(),
    documentType: z.string().optional(),
    document: z.string().optional(),
    nacionality: z.string().optional(),
    address: z.string().optional(),
    prefix: z.string().optional(),
    cel: z.string().optional(),
    country: z.string().optional(),
    destination: z.string().optional(),
    bank: z.string().optional(),
    typeAccount: z.string().optional(),
    numberAccount: z.string().optional(),
});

export type TUserSchema = z.infer<typeof userSchema>;
