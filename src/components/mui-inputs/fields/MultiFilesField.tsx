import React, { ChangeEvent, useState } from 'react';
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
  filesFormArray: any;
  setFilesFormArray: any;
  handleSetFilesFieldId: any;
  onChange?: any;
  key: string;
  setErrorMessage: any;
}

const MultiFilesField = ({
  key,
  name,
  control,
  label,
  value,
  filesFormArray,
  setFilesFormArray,
  handleSetFilesFieldId,
  onChange,
  required,
  setErrorMessage,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSetFilesFieldId();

    const files: any = e.target.files;

    if (files) {
      const newFiles: any = [];
      for (const file of files) {
        if (file.size <= 10 * 1024 * 1024) {
          const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/svg+xml',
            'image/*',
          ];

          if (allowedTypes.includes(file.type)) {
            newFiles.push(file);
          } else {
            setErrorMessage(t('messages.file-type-register'));
          }
        } else {
          setErrorMessage(t('messages.file-max-size-register'));
        }
      }

      const totalFilesCount = filesFormArray.length + newFiles.length;
      if (totalFilesCount <= 5) {
        setFilesFormArray((prevArray: File[]) => {
          return [...prevArray, ...newFiles]; // Concatenate arrays
        });
      } else {
        setErrorMessage(t('messages.file-max-number-register'));
      }
    }

    // Clear the input field after selection
    e.target.value = '';
  };
  const handleDelete = (indexToDelete: number) => {
    const filteredArray = filesFormArray.filter(
      (_: any, i: number) => i !== indexToDelete,
    );
    setFilesFormArray(filteredArray);
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
        accept="application/pdf,application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
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
        {filesFormArray.map((file: File, index: number) => {
          const threeDots = file?.name?.length > 10 ? '...' : '';
          let shortFileName = file?.name.slice(0, 15) + threeDots;
          return (
            <ListItem
              key={index}
              dir="ltr"
            >
              <ListItemText
                primary={shortFileName}
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
          );
        })}
      </List>
    </FormControl>
  );
};

export default MultiFilesField;
