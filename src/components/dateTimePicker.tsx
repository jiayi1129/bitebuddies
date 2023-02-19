import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

export default function ResponsiveDateTimePickers() {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs('2023-02-19T00:00:00.000Z'),
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDateTimePicker
          label="When do you want to eat?"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
  );
}