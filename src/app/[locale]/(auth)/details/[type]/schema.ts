import { z } from 'zod';

export const typeSchema = (inputs: any) => {
  const schema: any = {};

  inputs.forEach((input: any) => {
    let validation: any;

    // Determine initial validation type based on input type
    switch (input.input_type.slug) {


      case 'Checkbox':
        validation = z.boolean().refine((val) => val === true, {
          message: `${input.name} is required`,
        });
        break;
      default:
        validation = z.string();
        break;
    }

    // Apply required validation
    if (input.is_required) {
      validation = validation.min(1, { message: `${input.name} is required` });
    }

    // Apply custom validations
    input.restrictions.forEach((restriction: any) => {
      switch (restriction.type.slug) {
        case 'email':
          validation = validation.email({ message: restriction.validation_message });
          break;
        case 'tel':
          validation = validation.regex(/^\+?\d{10,14}$/, { message: restriction.validation_message });
          break;
        case 'integer':
          validation = validation.regex(/^\d+$/, { message: restriction.validation_message });
          break;
        case 'url':
          validation = validation.url({ message: restriction.validation_message });
          break;
        case 'minValue':
          validation = validation.refine((val: any) => parseInt(val) >= parseInt(restriction.value), {
            message: restriction.validation_message,
          });
          break;
        case 'multiple':
          validation = z.array(z.string());
          break;
        default:
          break;
      }
    });

    schema[input.slug] = validation;
  });

  return z.object(schema);
};
