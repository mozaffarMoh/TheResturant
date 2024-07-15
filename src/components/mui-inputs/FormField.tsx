import { createElement } from 'react';

import {
  TextField,
  SelectTextField,
  SelectMultiField,
  NumberTextField,
  MultiFilesField,
} from './fields';
import SingleCheckboxField from './fields/SingleCheckField';

const fieldComponents = [
  TextField,
  SelectTextField,
  SelectMultiField,
  NumberTextField,
  MultiFilesField,
  SingleCheckboxField,
];
interface FormFieldProps {
  name: string;
  label: string;
  fieldData?: { label: string; value: string }[];
  type: number;
  control: any;
  setValue?: () => void;
  getValues?: any;
  required: boolean;
  defaultValue?: string;
  apiErrors?: any;
  className?: string;
}

export default function FormField({
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
  className = 'text-field-style',
}: FormFieldProps) {
  return createElement(fieldComponents[type], {
    name,
    label,
    fieldData,
    control,
    setValue,
    getValues,
    required,
    defaultValue,
    apiErrors,
    className,
  });
}
// initialItems={initialPlaces}
// getItemKey={(item) => item.id}
// getItemLabel={(item) => item.name}
// getNestedItems={(item) => getPlacesByParentId(item.id)}
// hasNestedItems={(item, level) => item.sub_levels_count > 0}
// isEqual={(item, item2) => item?.id === item2?.id}
// placeholder="Choose Place"
// selectedItem={value !== "" ? JSON.parse(value) : ""}
// onRootChange={setRootSelectedPlace}
// onChange={(val) => {
//   onChange(val !== "" ? JSON.stringify(val) : "");
// }}
// overlay={loadingPlaces}
// error={error && error.message}
