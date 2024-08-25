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

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    handleSetFilesFieldId();
    const files = e.target.files;
    if (files) {
      const totalFilesCount = filesFormArray.length + files.length;
      if (totalFilesCount <= 5) {
        const filePromises = Array.from(files).map((file) => {
          return new Promise<any>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              const arrayBuffer = reader.result as ArrayBuffer;
              const uint8Array = new Uint8Array(arrayBuffer);
              resolve({
                name: file.name,
                type: file.type,
                data: uint8Array,
              });
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file); // Convert file to binary ArrayBuffer
          });
        });
        const binaryFiles = await Promise.all(filePromises);
        setFilesFormArray((prevArray: any) => {
          const newArray = [...prevArray];
          newArray.push(...binaryFiles);
          field.onChange(newArray);
          return newArray;
        });
      }
    }

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
