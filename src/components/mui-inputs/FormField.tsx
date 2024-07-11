import { createElement } from 'react';

import { TextField, SelectTextField } from './fields';

const fieldComponents = [TextField, SelectTextField];
interface FormFieldProps {
  name: string;
  label: string;
  fieldData?: { label: string; value: string }[];
  type: number;
  control: any;
  setValue?: () => void;
  getValues?: () => void;
  required: boolean;
  defaultValue?: string;
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
