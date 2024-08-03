import { z } from 'zod';

export const studentSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  full_name: z.string().min(1, { message: 'Full name is required' }),
  phone_number: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits' }),
  nationality: z.string().min(1, { message: 'Nationality is required' }),
  national_number: z
    .string()
    .min(1, { message: 'National number is required' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  age: z.string().min(2, { message: 'Age must be a positive number' }),
  educational_qualification: z
    .string()
    .min(1, { message: 'Educational qualification is required' }),
  governorate: z.string().min(1, { message: 'Governorate is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  personal_interests: z
    .array(z.string())
    .min(1, { message: 'At least one personal interest is required' }),
});
