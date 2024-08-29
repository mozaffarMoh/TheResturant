import {
  TextField,
  SelectTextField,
  SingleCheckedField,
  MultiFilesField,
  SelectMultiField,
} from './fields';
import { createElement } from 'react';

const fieldComponents: any = [
  TextField,
  SelectTextField,
  SingleCheckedField,
  MultiFilesField,
  SelectMultiField,
];

interface FormFieldProps {
  key: string;
  name: string;
  label: string;
  fieldData?: { name: string; value: string; id: number }[];
  type: string;
  control?: any;
  required: boolean;
  className?: string;
  onChange?: any;
  value?: any;
  defaultValue?: any;
  filesFormArray?: any;
  handleSetFilesFieldId?: any;
  setFilesFormArray?: any;
  startDecorator?: any;
}

export default function FormField({
  key,
  name,
  fieldData = [],
  type,
  control,
  label,
  required,
  onChange,
  value,
  defaultValue,
  filesFormArray,
  setFilesFormArray,
  handleSetFilesFieldId,
  startDecorator,
  className = 'text-field-style',
}: FormFieldProps) {
  const getIndexOfType = () => {
    if (name == 'method-of-communication' || name == 'personal-intrests') {
      return 4;
    }
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
    key,
    label,
    value,
    defaultValue,
    fieldData,
    control,
    required,
    onChange,
    className,
    filesFormArray,
    setFilesFormArray,
    handleSetFilesFieldId,
    startDecorator,
  });
}
