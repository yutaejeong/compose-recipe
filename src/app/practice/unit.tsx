"use client";

import { Recipe } from "@/constants/recipe";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

type Props = Omit<Recipe, "category"> & { testMode: boolean; expaned: boolean };

export default function Unit({ name, recipe, testMode, expaned }: Props) {
  return (
    <Accordion expanded={expaned}>
      <AccordionSummary aria-controls={`${name}-레시피`} tabIndex={-1}>
        <div className="flex flex-col gap-1 flex-1">
          <Typography>{name}</Typography>
          {testMode && <TextField label="레시피" variant="outlined" fullWidth />}
        </div>
      </AccordionSummary>
      <AccordionDetails>{recipe}</AccordionDetails>
    </Accordion>
  );
}
