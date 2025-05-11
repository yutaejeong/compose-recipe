"use client";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { ko } from "date-fns/locale";
import { Box, Paper } from "@mui/material";

interface CalendarProps {
  eMartClose: Date[];
}

export default function Calendar({ eMartClose }: CalendarProps) {
  const today = new Date();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
          <DateCalendar
            value={today}
            shouldDisableDate={(date: Date) => {
              return eMartClose.some(
                (closeDate) =>
                  closeDate.getDate() === date.getDate() &&
                  closeDate.getMonth() === date.getMonth() &&
                  closeDate.getFullYear() === date.getFullYear(),
              );
            }}
            sx={{
              "& .MuiPickersDay-root.Mui-disabled": {
                color: "warning.main",
                backgroundColor: "warning.light",
              },
            }}
          />
        </LocalizationProvider>
      </Paper>
    </Box>
  );
}
