'use client'
import { z } from 'zod';

export const signupSchema = (inputs: any, t: any) => {
    const schema: any = {};

    inputs.forEach((input: any) => {
        let validation: any;

        switch (input.slug) {
            case 'first_name':
                validation = z.string()
                    .min(3, { message: t('validation.fullNameMin') })
                    .regex(/^[^\d]/, { message: t('validation.fullNameNoNum') });
                break;

            case 'last_name':
                validation = z.string()
                    .min(3, { message: t('validation.fullNameMin') })
                    .regex(/^[^\d]/, { message: t('validation.fullNameNoNum') });
                break;

            case 'phone':
                validation = z.string().regex(/^\d{9}$/, { message: t('validation.validPhone') });
                break;

            case 'email':
                validation = z.string()
                    .email({ message: t('validation.invalid-email') })
                    .regex(/^[^\d]/, { message: t('validation.email-start-with-char') })
                    .regex(/^.{3,}@/, { message: t('validation.invalid-email') })
                    .regex(/^\S+$/, { message: t('validation.no-spaces-in-email') })
                    .min(1, { message: t('validation.email') });
                break;

            case 'password':
                validation = z.string()
                    .regex(/[A-Z]/, { message: t('validation.one-uppercase') })
                    .regex(/[a-z]/, { message: t('validation.one-lowercase') })
                    .regex(/[0-9]/, { message: t('validation.one-number') })
                    .regex(/[\W_]/, { message: t('validation.one-special') })
                    .min(8, { message: t('validation.eight-char') });
                break;

            case 'password_confirmation':
                validation = z.string().min(1, { message: t('validation.required') });
                break;

            case 'gender':
                validation = z.string().min(1, { message: t('validation.required') });
                break;

            case 'place_slug':
                validation = z.string().min(1, { message: t('validation.required') });
                break;

            case 'place_id':
                validation = z.number().min(1, { message: t('validation.required') });
                break;

            case 'terms':
                validation = z.boolean().refine((val) => val === true, {
                    message: t('validation.terms'),
                })


        }


        schema[input.slug] = validation;
    });

    return z.object(schema).refine((data) => data.password === data['password_confirmation'], {
        message: t('validation.password-not-match'),
        path: ['password_confirmation'], // associate the error with the password_confirmation field
    });
};



