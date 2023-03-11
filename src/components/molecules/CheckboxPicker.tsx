import * as React from 'react';

import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

interface Props {
  checkbox: {
    label: string,
    checked: boolean,
  },
  setCheckbox: Function,
};

const CheckboxPicker: React.FC<Props> = ({ checkbox, setCheckbox }: Props) => {
  return (
    <FormGroup>
      <FormControlLabel
        label={checkbox.label}
        control={
          <Checkbox
            checked={checkbox.checked}
            id={checkbox.label}
            onChange={() => setCheckbox(!checkbox.checked)}/>
        } />
    </FormGroup>
  );
}

export default CheckboxPicker;