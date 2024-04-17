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
    code: z.string().length(6),
});

export type TForgotPasswordCodeSchema = z.infer<
    typeof forgotPasswordCodeSchema
>;

export const forgotPasswordChangeSchema = z
    .object({
        password: z
            .string()
            .min(6, {
                message: "La contraseña debe tener al menos 6 caracteres",
            })
            .max(8, {
                message: "La contraseña no puede tener más de 8 caracteres",
            })
            .regex(/[A-Z]/, {
                message:
                    "La contraseña debe incluir al menos una letra mayúscula",
            })
            .regex(/[a-z]/, {
                message:
                    "La contraseña debe incluir al menos una letra minúscula",
            })
            .regex(/[0-9]/, {
                message: "La contraseña debe incluir al menos un número",
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

export type TForgotPasswordChangeSchema = z.infer<
    typeof forgotPasswordChangeSchema
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

export const userSchema = z
    .object({
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
    })
    .refine((data) => data.userEmail === data.confirmEmail, {
        message: "Los correos no coinciden",
        path: ["confirmEmail"],
    });

export type TUserSchema = z.infer<typeof userSchema>;
