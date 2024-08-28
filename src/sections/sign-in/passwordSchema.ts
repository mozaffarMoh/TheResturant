'use client'
import { z } from "zod";

export const passwordSchema = (t: any, withOldPassword: any) => {
  return z.object({
    ...(withOldPassword && {
      oldPassword: z
        .string()
        .regex(/[A-Z]/, { message: t('validation.one-uppercase') })
        .regex(/[a-z]/, { message: t('validation.one-lowercase') })
        .regex(/[0-9]/, { message: t('validation.one-number') })
        .regex(/[\W_]/, { message: t('validation.one-special') })
        .min(8, { message: t('validation.eight-char') }),
    }),
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
      .min(8, { message: t('validation.eight-char') })
  })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('validation.password-not-match'),
      path: ['confirmPassword'], // specify which path the error should be associated with
    })
}