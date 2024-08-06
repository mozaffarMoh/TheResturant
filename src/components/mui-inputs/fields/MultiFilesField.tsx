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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface FileInputProps {
  name: string;
  control: any;
  label: string;
  required?: boolean;
  value: any;
  setFormData: any;
  formId: any;
  onChange?: any;
  [key: string]: any;
}

const MultiFilesField = ({
  name,
  control,
  label,
  value,
  setFormData,
  formId,
  onChange,
  required,
}: FileInputProps) => {
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
    if (value.length < 5) {
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
      }
    }

    event.target.files && event.target.files.length == 0;
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
  };

  return (
    <FormControl
      error={!!error}
      className="input-form-control"
      sx={{ marginTop: '0.5rem' }}
      fullWidth
    >
      <FormLabel sx={{ marginBottom: '0.4rem' }}>{label}</FormLabel>
      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={(e) => {
          // Update the onChange handler
          field.onChange();
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
          Upload Files
        </Button>
      </label>
      {error && <FormHelperText>{error.message}</FormHelperText>}
      <List>
        {value.map((file: File, index: number) => (
          <ListItem key={index}>
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
