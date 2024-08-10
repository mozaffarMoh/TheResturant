import { TextField, SelectTextField, TextAreaField } from './fields';
import { createElement } from 'react';

const fieldComponents: any = [TextField, SelectTextField, TextAreaField];

interface FormContactUSFieldProps {
  key: string;
  name: string;
  label: string;
  fieldData?: { name: string; value: string; id: number }[];
  type: string;
  control?: any;
  className?: string;
  onChange?: any;
  value?: any;
}

export default function FormContactUSField({
  key,
  name,
  fieldData = [],
  type,
  control,
  label,
  onChange,
  value,
  className = 'text-field-style',
}: FormContactUSFieldProps) {
  const getIndexOfType = () => {
    if (type == 'Select') {
      return 1;
    } else if (type == 'Textarea') {
      return 2;
    } else {
      return 0;
    }
  };

  return createElement(fieldComponents[getIndexOfType()], {
    name,
    key,
    label,
    value,
    fieldData,
    control,
    onChange,
    className,
  });
}
