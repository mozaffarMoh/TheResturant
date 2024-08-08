'use client'
import { z } from "zod";

export const signupSchema = (t: any) => {
    return z.object({
        email: z
            .string()
            .min(1, { message: t('validation.email') })
            .email({ message: t('validation.invalid-email') }),
        password: z
            .string()
            .regex(/[A-Z]/, { message: t('validation.one-uppercase') })
            .regex(/[a-z]/, { message: t('validation.one-lowercase') })
            .regex(/[0-9]/, { message: t('validation.one-number') })
            .regex(/[\W_]/, { message: t('validation.one-special') })
            .min(8, { message: t('validation.eight-char') }),
        confirmPassword: z
            .string()
            .regex(/[A-Z]/, { message: t('validation.one-uppercase') })
            .regex(/[a-z]/, { message: t('validation.one-lowercase') })
            .regex(/[0-9]/, { message: t('validation.one-number') })
            .regex(/[\W_]/, { message: t('validation.one-special') })
            .min(8, { message: t('validation.eight-char') }),
        acceptTerms: z.boolean().refine((val) => val === true, {
            message: t('validation.terms'),
        }),
    })
        .refine((data) => data.password === data.confirmPassword, {
            message: t('validation.password-not-match'),
            path: ['confirmPassword'], // specify which path the error should be associated with
        })
}