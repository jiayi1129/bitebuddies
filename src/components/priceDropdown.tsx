import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function PriceDropdown() {
  return (
    <Box sx={{ minWidth: 5 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Pricing
        </InputLabel>
        <NativeSelect
          defaultValue={'$$'}
          inputProps={{
            name: 'Pricing',
            id: 'uncontrolled-native',
          }}
        >
          <option value={'$'}>$</option>
          <option value={'$$'}>$$</option>
          <option value={'$$$'}>$$$</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}