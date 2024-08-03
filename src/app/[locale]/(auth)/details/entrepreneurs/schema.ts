import { z } from 'zod';

const entrepreneurSchema = z.object({
  full_name: z.string().min(1, 'Full Name is required'),
  national_number: z.string().min(1, 'National/personal number is required'),

  age: z.string().min(1, { message: 'Age must be a positive number' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  phone_number: z.string().min(1, 'Phone Number is required'),
  nationality: z.string().min(1, { message: 'Nationality is required' }),

  email: z.string().email('Invalid email format'),
  educational_qualification: z
    .string()
    .min(1, { message: 'Educational qualification is required' }),
  governorate: z.string().min(1, { message: 'Governorate is required' }),

  // Professional Information
  linkedin_link: z.string().url('Invalid URL format'),
  portfolio_link: z.string().url('Invalid URL format').optional(),
  social_media_links: z.string().url('Invalid URL format').optional(),
  current_company: z
    .string()
    .min(1, 'Current Company Name & Job Title is required'),
  years_experience: z
    .string()
    .min(0, 'Years of Experience must be a non-negative number'),
  areas_of_expertise: z.string().min(1, 'Areas of Expertise is required'),
  is_interested_providing_mentorship: z.boolean(),
});

export default entrepreneurSchema;
