'use client';
import { z } from 'zod';

export const ProfileSchema = (inputs: any, t: any) => {
    const schema: any = {};

    inputs.forEach((input: any) => {
        let validation: any;

        switch (input.slug) {
            case 'first_name':
                validation = z
                    .union([
                        z.string()
                            .min(3, { message: t('validation.fullNameMin') })
                            .regex(/^[^\d]/, { message: t('validation.fullNameNoNum') }),
                        z.null()
                    ])
                    .refine(value => value !== null, { message: t('validation.required') });
                break; 
 
            case 'last_name':
                validation = z
                    .union([
                        z.string()
                            .min(3, { message: t('validation.fullNameMin') })
                            .regex(/^[^\d]/, { message: t('validation.fullNameNoNum') }),
                        z.null()
                    ])
                    .refine(value => value !== null, { message: t('validation.required') });
                break;

            case 'phone':
                validation = z
                    .union([
                        z.string().regex(/^\d{9}$/, { message: t('validation.validPhone') }),
                        z.null()
                    ])
                    .refine(value => value !== null, { message: t('validation.required') });
                break;

            case 'email':
                validation = z
                    .union([
                        z.string()
                            .email({ message: t('validation.invalid-email') })
                            .regex(/^[^\d]/, { message: t('validation.email-start-with-char') })
                            .regex(/^.{3,}@/, { message: t('validation.invalid-email') })
                            .regex(/^\S+$/, { message: t('validation.no-spaces-in-email') })
                            .min(1, { message: t('validation.email') }),
                        z.null()
                    ])
                    .refine(value => value !== null, { message: t('validation.required') });
                break;

            case 'gender':
                validation = z
                    .union([
                        z.string().min(1, { message: t('validation.required') }),
                        z.null()
                    ])
                    .refine(value => value !== null, { message: t('validation.required') });
                break;

            case 'place_id':
                validation = z
                    .union([
                        z.number().min(1, { message: t('validation.required') }),
                        z.null() // Allow null values for place_id
                    ]);
                break;

            default:
                break;
        }

        schema[input.slug] = validation;
    });

    return z
        .object(schema)
        .refine(
            (data) => data.password === data['password_confirmation'],
            {
                message: t('validation.password-not-match'),
                path: ['password_confirmation'], // associate the error with the password_confirmation field
            }
        );
};
