
import { z } from 'zod';

export const typeSchema = (inputs: any) => {
  const schema: any = {};

  inputs.forEach((input: any) => {
    let validation: any = z.string();

    // Apply required validation
    if (input.is_required) {
      validation = validation.min(1, { message: `${input.name} is required` });
    }

    // Apply custom validations
    input.restrictions.forEach((restriction: any) => {
      
      if (restriction.type.slug === 'integer') {
        validation = validation.regex(/^\d+$/, {
          message: restriction.validation_message,
        });
      }
      if (restriction.type.slug === 'multiple') {
        //can we add conditions here
      }
      if (restriction.type.slug === 'email') {
        validation = validation.email({ message: restriction.validation_message });
      }
      if (restriction.type.slug === 'tel') {
        validation = validation.regex(/^\+?\d{10,14}$/, { message: restriction.validation_message });
      }
      if (restriction.type.slug === 'integer') {
        validation = validation.regex(/^\d+$/, { message: restriction.validation_message });
      }
      if (restriction.type.slug === 'url') {
        validation = validation.url({ message: restriction.validation_message });
      }
      if (restriction.type.slug === 'minValue') {
        validation = validation.refine((val: any) => parseInt(val) >= parseInt(restriction.value), {
          message: restriction.validation_message,
        });
      }
    });

    schema[input.slug] = validation;
  });

  return z.object(schema);
};







/* 
const entrepreneurSchema = z.object({
  full_name: z.string().min(1, { message: 'Full Name is required' }),
  national_number: z.string().min(1, { message: 'National/personal number is required' }),

  age: z.string().min(1, { message: 'Age must be a positive number' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  phone_number: z.string().min(1, { message: 'Phone Number is required' }),
  nationality: z.string().min(1, { message: 'Nationality is required' }),
  email_1: z.string().email({ message: 'Invalid email format' }),
  nationalpersonal_number: z.string().min(1, { message: 'Nationality_Personal is required' }),
  educational_qualification: z
    .string()
    .min(1, { message: 'Educational qualification is required' }),
  governorate: z.string().min(1, { message: 'Governorate is required' }),

  // Professional Information
  linkedin_profile_link: z.string().url('Invalid URL format'),
  websiteportofolio_link: z.string().url('Invalid URL format').optional(),
  social_media_links: z.string().url('Invalid URL format').optional(),
  current_company_name_jo: z
    .string()
    .min(1, 'Current Company Name & Job Title is required'),
  years_of_experience: z
    .string()
    .min(0, 'Years of Experience must be a non-negative number'),
  areas_of_expertise_marke: z.string().min(1, 'Areas of Expertise is required'),
  professional_certificatio: z.instanceof(File),
  interested_in_providing_m: z.boolean(),

});

export default entrepreneurSchema;


*/