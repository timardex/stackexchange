import * as React from 'react';

import { InputLabel, MenuItem, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  label: string,
  value: string,
  items: string[],
  setValue: Function,
};

const SelectPicker: React.FC<Props> = ({ label, value, items, setValue }: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <FormControl
      fullWidth
      sx={{ width: '100%', marginBottom: '1rem' }}
    >
      <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-select-label`}
        id={`${label}-select`}
        value={value}
        label={label}
        onChange={handleChange}
      >
        {items.map((item: string) => <MenuItem  key={item} value={item}>{item}</MenuItem>)}
      </Select>
    </FormControl>
  );
}

export default SelectPicker;