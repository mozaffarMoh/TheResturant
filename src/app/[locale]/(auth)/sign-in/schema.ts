'use client'
import { z } from "zod";

export const signinSchema = (t: any) => {
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
      .min(8, { message: t('validation.eight-char') })
  })
}