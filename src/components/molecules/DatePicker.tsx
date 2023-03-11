import * as React from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface Props {
  label: string,
  value: Date | null,
  setValue: Function;
};


const DatePickerComponent: React.FC<Props> = ({ label, value, setValue }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        sx={{ width: '100%', marginBottom: '1rem' }}
        onChange={(e) => setValue(e)}/>
    </LocalizationProvider>
  );
}

export default DatePickerComponent;