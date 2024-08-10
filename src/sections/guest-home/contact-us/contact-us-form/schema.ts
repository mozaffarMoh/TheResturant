import { z } from 'zod';

export const contactUsSchema = (data: any, t: any) => {
  const schema: any = {};

  data &&
    data?.children &&
    data?.children[0]?.inputs &&
    data?.children[0]?.inputs.forEach((input: any) => {
      let validation: any;


      switch (input.slug) {
        case 'name':
          validation = z.string()
            .min(3, { message: t('validation.fullNameMin') })
            .regex(/^[^\d]/, { message: t('validation.fullNameNoNum') });
          break;

        case 'email':
          validation = z.string()
            .email({ message: t('validation.invalid-email') })
            .regex(/^[^\d]/, { message: t('validation.email-start-with-char') })
            .regex(/^.{3,}@/, { message: t('validation.invalid-email') })
            .regex(/^\S+$/, { message: t('validation.no-spaces-in-email') })
            .min(1, { message: t('validation.email') });
          break;

        case 'question-type':
          validation = z.number().min(1, { message: t('validation.required') })
          break;

        case "messages":
          validation = z.string().min(10, { message: t('validation.message') });
          break;

        default:
          validation = z.string();
          break;
      }


      schema[input.slug] = validation;
    });

  return z.object(schema);
};



