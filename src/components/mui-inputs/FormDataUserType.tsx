import { createElement } from 'react';

import {
  TextField,
  SelectTextField,
  SingleCheckedField,
  MultiFilesField,
} from './fields';
const fieldComponents = [
  TextField,
  SelectTextField,
  SingleCheckedField,
  MultiFilesField,
];

interface FormFieldProps {
  name: string;
  label: string;
  fieldData?: { name: string; value: string; id: number }[];
  type: string;
  control?: any;
  setValue?: () => void;
  getValues?: any;
  required: boolean;
  defaultValue?: string;
  apiErrors?: any;
  className?: string;
  onChange?: any;
  value?: any;
  formId?: any;
  setFormData?: any;
}

export default function FormFieldUserType({
  name,
  fieldData = [],
  type,
  control,
  setValue,
  getValues,
  label,
  required,
  defaultValue = '',
  apiErrors,
  onChange,
  value,
  setFormData,
  formId,
  className = 'text-field-style',
}: FormFieldProps) {
  const getIndexOfType = () => {
    if (type == 'Select') {
      return 1;
    } else if (type == 'Checkbox') {
      return 2;
    } else if (type == 'File') {
      return 3;
    } else {
      return 0;
    }
  };

  return createElement(fieldComponents[getIndexOfType()], {
    name,
    label,
    value,
    fieldData,
    control,
    setValue,
    getValues,
    required,
    defaultValue,
    apiErrors,
    onChange,
    className,
    setFormData,
    formId,
  });
}
