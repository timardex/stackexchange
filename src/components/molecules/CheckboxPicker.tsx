import * as React from 'react';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

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