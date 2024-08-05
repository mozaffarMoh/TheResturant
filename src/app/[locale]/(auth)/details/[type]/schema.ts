import { z } from 'zod';

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
