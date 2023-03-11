import * as React from 'react';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { ICheckbox } from '../../models';

interface Props {
  checkbox: ICheckbox[],
  setCheckbox: Function,
};

const CheckboxPicker: React.FC<Props> = ({ checkbox, setCheckbox }: Props) => {
  const handleCheckbox = React.useCallback((e: { target: { id: any; }; }) => {
    const updateCheckbox = checkbox.map((item: ICheckbox) => {
      return item.label === e.target.id ? { ...item, checked: !item.checked } : item
    });

    setCheckbox(updateCheckbox);
  }, [setCheckbox, checkbox]);

  return (
    <FormGroup sx={{ display: 'inline-block', width: '100%', marginBottom: '1rem'}}>
      {checkbox.map((item: ICheckbox) => (
        <FormControlLabel
          key={item.label}
          label={item.label}
          control={<Checkbox checked={item.checked} id={item.label} onChange={(e) => handleCheckbox(e)}/>} />
      ))}
    </FormGroup>
  );
}

export default CheckboxPicker;