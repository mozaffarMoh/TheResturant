'use client'
import { z } from "zod";

export const signinSchema = (t: any) => {
  return z.object({
    email: z
      .string()
      .email({ message: t('validation.invalid-email') })
      .regex(/^[^\d]/, { message: t('validation.email-start-with-char') })
      .regex(/^.{3,}@/, { message: t('validation.invalid-email') })
      .regex(/^\S+$/, { message: t('validation.no-spaces-in-email') })
      .min(1, { message: t('validation.email') }),
    password: z
      .string()
      .regex(/[A-Z]/, { message: t('validation.one-uppercase') })
      .regex(/[a-z]/, { message: t('validation.one-lowercase') })
      .regex(/[0-9]/, { message: t('validation.one-number') })
      .regex(/[\W_]/, { message: t('validation.one-special') })
      .min(8, { message: t('validation.eight-char') })
  })
}