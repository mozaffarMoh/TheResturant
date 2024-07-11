import React from 'react';
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
  [key: string]: any;
}

const MultiFilesField = ({
  name,
  control,
  label,
  required = false,
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter((file) => file.type === 'application/pdf');

    if (validFiles.length > 5) {
      validFiles.length = 5; // Limit to 5 files
    }

    field.onChange([...field.value, ...validFiles].slice(0, 5));
  };

  const handleDelete = (fileToDelete: File) => {
    const updatedFiles = field.value.filter(
      (file: File) => file !== fileToDelete,
    );
    field.onChange(updatedFiles);
  };

  return (
    <FormControl
      error={!!error}
      className="input-form-control"
      sx={{ marginTop: '0.5rem' }}
    >
      <FormLabel sx={{ marginBottom: '0.4rem' }}>{label}</FormLabel>
      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={handleChange}
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
        {field.value.map((file: File, index: number) => (
          <ListItem key={index}>
            <ListItemText
              primary={file.name}
              sx={{ fontSize: '0.8rem' }}
            />
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleDelete(file)}
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
