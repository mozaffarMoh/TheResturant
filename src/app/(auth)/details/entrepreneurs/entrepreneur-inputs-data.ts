// type >> 0 TextField , 1 for Select(single select)
export const fieldsInputs = [
  {
    id: 0,
    type: 0,
    name: 'full_name',
    label: 'Full Name',
    required: true,
  },
  {
    id: 1,
    type: 0,
    name: 'phone_number',
    label: 'Phone Number',
    required: true,
  },
  {
    id: 2,
    type: 0,
    name: 'email',
    label: 'Email',
    required: true,
  },
  {
    id: 3,
    type: 0,
    name: 'national_number',
    label: 'National/Personal Number ',
    required: true,
  },
  {
    id: 4,
    type: 1,
    name: 'gender',
    label: 'Gender',
    required: true,
    defaultValue: '',
    fieldData: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
    ],
  },
  {
    id: 5,
    type: 0,
    name: 'age',
    label: 'Age',
    required: true,
  },
  {
    id: 6,
    type: 1,
    name: 'educational_qualification',
    label: 'Educational Qualification',
    required: true,
    defaultValue: '',
    fieldData: [
      { label: 'High School', value: 'high-school' },
      { label: 'University Student', value: 'university-student' },
      { label: 'Bachelor', value: 'bachelor' },
    ],
  },
  {
    id: 24,
    type: 1,
    name: 'nationality',
    label: 'Nationality',
    required: true,
    defaultValue: '',
    fieldData: [
      { label: 'Jordanian', value: 'jordanian' },
      { label: 'Syrian', value: 'syrian' },
    ],
  },
  {
    id: 7,
    type: 1,
    name: 'governorate',
    label: 'Governorate',
    required: true,
    defaultValue: '',
    fieldData: [
      { label: 'Amman', value: 'amman' },
      { label: 'Irbid', value: 'irbid' },
      { label: 'Ajloun', value: 'ajloun' },
      { label: 'Jerash', value: 'jerash' },
      { label: 'Mafraq', value: 'mafraq' },
      { label: 'Balqa', value: 'balqa' },
      { label: 'Zarqa', value: 'zarqa' },
      { label: 'Madaba', value: 'madaba' },
      { label: 'Karak', value: 'karak' },
      { label: 'Tafilah', value: 'tafilah' },
      { label: 'Maan', value: 'maan' },
      { label: 'Aqaba', value: 'aqaba' },
    ],
  },
  {
    id: 8,
    type: 0,
    name: 'linkedin_link',
    label: 'LinkedIn Profile Link',
    required: false,
  },
  {
    id: 9,
    type: 0,
    name: 'portfolio_link',
    label: 'Website/Portfolio Link',
    required: false,
  },
  {
    id: 20,
    type: 0,
    name: 'social_media_links',
    label: ' Social Media Links',
    required: false,
  },
  {
    id: 10,
    type: 0,
    name: 'current_company',
    label: 'Current Company Name & Job Title',
    required: false,
  },
  {
    id: 11,
    type: 3,
    name: 'years_experience',
    label: 'Years of Experience',
    required: false,
  },
  {
    id: 12,
    type: 0,
    name: 'areas_of_expertise',
    label: 'Areas of Expertise(Marketing, Finance, Product Development..)',
    required: false,
  },

  // {
  //   id: 13,
  //   type: 4,
  //   name: 'professional_certifications',
  //   label: 'Professional Certifications',
  // },
  {
    id: 14,
    type: 5,
    name: 'is_interested_providing_mentorship',
    label: 'Interested in providing Mentorship?',
  },
];