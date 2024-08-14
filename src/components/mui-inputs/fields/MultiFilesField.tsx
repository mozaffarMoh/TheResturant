import React, { useState } from 'react';
import { useController } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslations } from 'next-intl';

interface FileInputProps {
  name: string;
  control: any;
  label: string;
  required?: boolean;
  value: any;
  setFormData: any;
  formId: any;
  onChange?: any;
  key: string;
}

const MultiFilesField = ({
  key,
  name,
  control,
  label,
  value,
  setFormData,
  formId,
  onChange,
  required,
}: FileInputProps) => {
  const t = useTranslations();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: required ? 'This field is required' : false,
      validate: (value) =>
        value.length <= 5 || 'You can upload up to 5 files only',
    },

    defaultValue: [],
  });
  if (!value) {
    value = [];
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
/*     if (value.length < 5) {
      const newFile: any = event.target.files ? event.target.files[0] : '';

      if (newFile?.type === 'application/pdf') {
        const updatedArray = value ? value : [];
        if (updatedArray && Array(updatedArray)) {
          updatedArray.push(newFile);
        }

        setFormData((prevArray: any) => {
          const index = prevArray.findIndex(
            (item: any) => item.form_field_id === formId,
          );

          if (index !== -1) {
            // Update existing element
            const updatedArray = [...prevArray];
            updatedArray[index].value = value;
            return updatedArray;
          } else {
            // Add new element
            return [
              ...prevArray,
              { form_field_id: formId, value: updatedArray },
            ];
          }
        });

        // Trigger validation
        field.onChange(updatedArray);

        // Reset file input to allow re-upload of the same file
        event.target.value = '';
      }
    } */
  };

  const handleDelete = (indexToDelete: number) => {
    const filteredArray = value.filter(
      (_: any, i: number) => i !== indexToDelete,
    );

    setFormData((prevArray: any) => {
      const index = prevArray.findIndex(
        (item: any) => item.form_field_id === formId,
      );

      // Update existing element
      const updatedArray = [...prevArray];
      updatedArray[index].value = filteredArray;
      return updatedArray;
    });

    field.onChange(filteredArray);
  };

  return (
    <FormControl
      key={key}
      error={!!error}
      className="input-form-control"
      sx={{ marginTop: '0.5rem' }}
      style={{ width: '100%' }}
    >
      <FormLabel sx={{ marginBottom: '0.4rem' }}>{label}</FormLabel>
      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={(e: any) => {
          // Update the onChange handler
          field.onChange(e);
          if (onChange) {
            handleChange(e);
          }
        }}
        style={{ display: 'none' }}
        id={`${name}-input`}
      />
      <label htmlFor={`${name}-input`}>
        <Button
          fullWidth
          variant="outlined"
          component="span"
          sx={{
            borderRadius: '50px',
            color: 'rgba(0, 0, 0, 0.49)',
            minHeight: '3.375rem',
            borderStyle: 'dashed',
          }}
        >
          {t('buttons.upload-files')}
        </Button>
      </label>
      <Stack direction={'row'}>
        {error && <FormHelperText>{error.message}</FormHelperText>}
      </Stack>
      <List>
        {value.map((file: File, index: number) => (
          <ListItem
            key={index}
            dir="ltr"
          >
            <ListItemText
              primary={file.name}
              sx={{ fontSize: '0.8rem' }}
            />
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDelete(index)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </FormControl>
  );
};

export default MultiFilesField;
