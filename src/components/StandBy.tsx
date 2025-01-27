"use client";

import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useMemo, useState } from "react";
import { CATEGORIES, Category } from "../constants/recipe";

interface CategoryConfiguration {
  category_name: Category;
  test_yn: boolean;
}

interface Props {
  onStart: (testingCategories: Category[]) => void;
}

export default function StandBy({ onStart }: Props) {
  const [categoryConfigurations, setCategoryConfigurations] = useState<CategoryConfiguration[]>([
    { category_name: CATEGORIES[0], test_yn: true },
    ...CATEGORIES.slice(1).map((category_name) => ({ category_name, test_yn: false })),
  ]);
  const isNothingSelected = !useMemo(
    () => categoryConfigurations.reduce((acc, cur) => acc || cur.test_yn, false),
    [categoryConfigurations],
  );

  function handleChangeConfiguration(categoryIndex: number, checked: boolean) {
    const updatedCategoryConfigurations = [...categoryConfigurations];
    updatedCategoryConfigurations[categoryIndex].test_yn = checked;
    setCategoryConfigurations(updatedCategoryConfigurations);
  }

  function handleStart() {
    const testingCategories = categoryConfigurations.reduce<Category[]>(
      (acc, cur) => (cur.test_yn ? [...acc, cur.category_name] : acc),
      [],
    );
    onStart(testingCategories);
  }

  function handleAllCheck() {
    if (categoryConfigurations.reduce<boolean>((acc, config) => acc && config.test_yn, true)) {
      setCategoryConfigurations(categoryConfigurations.map((config) => ({ ...config, test_yn: false })));
    } else {
      setCategoryConfigurations(categoryConfigurations.map((config) => ({ ...config, test_yn: true })));
    }
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 my-1">
      <FormGroup>
        <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 py-2 px-4 border rounded bg-gray-50">
          {categoryConfigurations.map((categoryConfiguration, categoryIndex) => (
            <FormControlLabel
              key={categoryConfiguration.category_name}
              control={
                <Checkbox
                  checked={categoryConfiguration.test_yn}
                  onChange={(e) => handleChangeConfiguration(categoryIndex, e.target.checked)}
                />
              }
              label={categoryConfiguration.category_name}
            />
          ))}
        </div>
      </FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={categoryConfigurations.reduce<boolean>((acc, config) => acc && config.test_yn, true)}
            onChange={(e) => handleAllCheck()}
          />
        }
        label="전체 선택"
      />
      <Button variant="contained" disabled={isNothingSelected} onClick={() => handleStart()}>
        시작하기
      </Button>
    </div>
  );
}
